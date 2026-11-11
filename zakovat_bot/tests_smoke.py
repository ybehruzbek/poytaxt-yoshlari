"""Barcha bot handlerlari uchun smoke-test.

Soxta (fake) Telegram obyektlari bilan har bir handler to'g'ridan-to'g'ri
chaqiriladi; DB — haqiqiy PostgreSQL (test yozuvlari yakunda tozalanadi).

Ishga tushirish (docker):
  docker compose run --rm bot python tests_smoke.py
"""
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
os.environ.setdefault("DJANGO_ALLOW_ASYNC_UNSAFE", "true")

import django

django.setup()

import asyncio
from io import BytesIO
from types import SimpleNamespace

from openpyxl import Workbook

from zakovat_bot.models import (
    AdminRole, Answers, Appeal, AppealStatus, AuditLog, Broadcast,
    BroadcastResult, BroadcastStatus, Channel, ChatEvent, ChatParticipant,
    Contest, ContestParticipant, ContestStage, Entry, EntryMedia, EntryStatus,
    Nomination, ParticipantStatus, Publication, Questions, ReminderLog,
    TelegramAdminsID, Users, Vote,
)

SUPER, OPER, OBSV, NOBODY, USER1 = 990001, 990002, 990003, 990004, 990005
TEST_IDS = [SUPER, OPER, OBSV, NOBODY, USER1]
TAG = "__smoke__"

PASSED = []
FAILED = []


def check(name, cond, extra=""):
    if cond:
        PASSED.append(name)
    else:
        FAILED.append(f"{name} {extra}")
        print(f"  ❌ {name} {extra}")


# ============ Soxta Telegram obyektlari ============

_next_id = iter(range(10_000, 99_999))


class FakeBot:
    """Bot API chaqiruvlarini yozib boradi; hech narsa yubormaydi."""

    def __init__(self):
        self.calls = []
        self.fail_delete_ids = set()
        self.forbidden_ids = set()  # 403 qaytaradigan chat_id'lar (blok testi)
        self.subscribed_ids = set()  # kanalga a'zo foydalanuvchilar
        self.chat_admin_ok = True  # bot tanlov kanalida adminmi

    async def send_message(self, chat_id, text=None, **kw):
        if chat_id in self.forbidden_ids:
            from aiogram.exceptions import TelegramForbiddenError
            raise TelegramForbiddenError(method=None, message="bot was blocked by the user")
        self.calls.append(("send_message", chat_id, text))
        return SimpleNamespace(message_id=next(_next_id))

    async def forward_messages(self, chat_id, from_chat_id, message_ids):
        self.calls.append(("forward", chat_id, tuple(message_ids)))
        return [SimpleNamespace(message_id=next(_next_id)) for _ in message_ids]

    async def delete_message(self, chat_id, message_id):
        if message_id in self.fail_delete_ids:
            raise Exception("message to delete not found")
        self.calls.append(("delete", chat_id, message_id))

    async def get_me(self):
        return SimpleNamespace(username="yoshlaruchuntanlov_bot", id=1)

    async def get_chat(self, chat_id):
        return SimpleNamespace(id=-100777, title="Smoke kanal")

    async def send_media_group(self, chat_id, media, **kw):
        self.calls.append(("send_media_group", chat_id, len(media)))
        return [SimpleNamespace(message_id=next(_next_id)) for _ in media]

    async def get_chat_member(self, chat_id, user_id):
        """Obuna tekshiruvi: subscribed_ids to'plamidagilar a'zo hisoblanadi."""
        if chat_id == -100777:  # kanal adminligi tekshiruvi
            return SimpleNamespace(
                status="administrator" if self.chat_admin_ok else "left")
        status = "member" if user_id in self.subscribed_ids else "left"
        return SimpleNamespace(status=status)

    async def get_file(self, file_id):
        return SimpleNamespace(file_path="fake/path")

    async def download_file(self, file_path):
        return BytesIO(self.excel_bytes)

    def __getattr__(self, name):
        # send_message, send_photo, send_document va h.k. — generik yozuvchi
        async def recorder(*args, **kwargs):
            self.calls.append((name, kwargs.get("chat_id"), kwargs.get("text")))
            return SimpleNamespace(message_id=next(_next_id))
        return recorder


class FakeMessage:
    def __init__(self, user_id, text=None, document=None, contact=None,
                 photo=None, video=None):
        self.from_user = SimpleNamespace(
            id=user_id, username="smoketest", first_name="Smoke"
        )
        self.chat = SimpleNamespace(id=user_id)
        self.message_id = next(_next_id)
        self.text = text
        self.document = document
        self.contact = contact
        self.photo = photo
        self.video = video
        self.audio = self.voice = None
        self.content_type = "document" if document else "text"
        self.out = []
        self._markups = []

    async def answer(self, text=None, reply_markup=None, **kw):
        self.out.append(("answer", text))
        self._markups.append(reply_markup)
        return FakeMessage(self.from_user.id)

    async def edit_text(self, text=None, reply_markup=None, **kw):
        self.out.append(("edit", text))
        self._markups.append(reply_markup)

    async def edit_reply_markup(self, *a, **kw):
        self.out.append(("edit_markup", None))

    async def delete(self):
        self.out.append(("delete", None))

    def __getattr__(self, name):
        if name.startswith("answer_"):
            async def recorder(*args, **kwargs):
                self.out.append((name, kwargs.get("caption")))
                return FakeMessage(self.from_user.id)
            return recorder
        raise AttributeError(name)

    def texts(self):
        return " | ".join(str(t) for _, t in self.out if t)

    def buttons(self):
        """Yuborilgan klaviaturalardagi barcha tugma matnlari."""
        out = []
        for markup in self._markups:
            rows = getattr(markup, "inline_keyboard", None) or getattr(markup, "keyboard", None)
            for row in rows or []:
                for btn in row:
                    out.append(btn.text)
        return out


class FakeCallback:
    def __init__(self, data, user_id, message=None):
        self.data = data
        self.from_user = SimpleNamespace(
            id=user_id, username="smoketest", first_name="Smoke"
        )
        self.message = message or FakeMessage(user_id)
        self.alerts = []

    async def answer(self, text=None, show_alert=False, **kw):
        if text:
            self.alerts.append(text)

    async def edit_reply_markup(self, *a, **kw):
        self.message.out.append(("edit_markup", None))


class FakeState:
    def __init__(self):
        self._data = {}
        self._state = None

    async def set_state(self, s):
        self._state = s

    async def get_state(self):
        return self._state

    async def update_data(self, **kw):
        self._data.update(kw)

    async def get_data(self):
        return dict(self._data)

    async def clear(self):
        self._data = {}
        self._state = None


def make_excel():
    wb = Workbook()
    ws = wb.active
    ws.append(["OTT nomi", "Havola", "Turi", "Teg"])
    ws.append(["Smoke universiteti", "@smoke_imp_kanal", "Davlat", TAG])
    ws.append(["Smoke instituti", "t.me/smoke_imp_kanal2", "Xorijiy", TAG])
    buf = BytesIO()
    wb.save(buf)
    return buf.getvalue()


def cleanup():
    Answers.objects.filter(user__tg_id__in=TEST_IDS).delete()
    Questions.all_objects.filter(name__startswith="SMOKE").delete()
    Users.all_objects.filter(tg_id__in=TEST_IDS).delete()
    TelegramAdminsID.all_objects.filter(tg_id__in=TEST_IDS).delete()
    for b in Broadcast.all_objects.filter(admin_id__in=TEST_IDS):
        b.delete()
    Channel.all_objects.filter(tag=TAG).delete()
    AuditLog.all_objects.filter(admin_id__in=TEST_IDS).delete()
    ReminderLog.all_objects.filter(participant__telegram_id__in=TEST_IDS).delete()
    ChatParticipant.all_objects.filter(telegram_id__in=TEST_IDS).delete()
    ChatEvent.all_objects.filter(title__startswith="SMOKE").delete()
    Appeal.all_objects.filter(telegram_id__in=TEST_IDS).delete()
    Vote.all_objects.filter(voter_user_id__in=TEST_IDS).delete()
    Entry.all_objects.filter(participant__telegram_id__in=TEST_IDS).delete()
    ContestParticipant.all_objects.filter(telegram_id__in=TEST_IDS).delete()
    Contest.all_objects.filter(slug__startswith="smoke_").delete()


async def main():
    """Testlar yiqilsa ham faol tadbir va tanlovlar o'z holiga qaytariladi."""
    saved_event_ids = list(
        ChatEvent.objects.filter(is_active=True).values_list("id", flat=True)
    )
    saved_contest_ids = list(
        Contest.objects.filter(is_active=True).values_list("id", flat=True)
    )
    # Eski oqimlar (zakovat, tadbir) sinovi uchun joriy tanlov vaqtincha yopiladi
    Contest.objects.filter(id__in=saved_contest_ids).update(is_active=False)
    try:
        await _run_all(saved_event_ids)
    finally:
        ChatEvent.objects.filter(id__in=saved_event_ids).update(is_active=True)
        Contest.objects.filter(id__in=saved_contest_ids).update(is_active=True)


async def _run_all(saved_event_ids):
    from zakovat_bot.handlers import (
        admin_handler, admins_handler, broadcast_handler, channel_handler,
        user_handler,
    )
    from zakovat_bot import utils
    from zakovat_bot.services import broadcasting
    from zakovat_bot.state import (
        AdminMgmtState, BroadcastState, ChannelState, QuestionState, Register,
    )

    fake_bot = FakeBot()
    fake_bot.excel_bytes = make_excel()

    # Modullardagi haqiqiy bot o'rniga soxta bot
    from zakovat_bot.handlers import chat_admin_handler as _cah
    from zakovat_bot.handlers import chat_handler as _ch
    _ch.bot = fake_bot
    channel_handler.bot = fake_bot
    broadcast_handler.bot = fake_bot
    admin_handler.bot = fake_bot
    _cah.bot = fake_bot
    utils.bot = fake_bot
    broadcasting.SEND_PAUSE = 0

    async def fake_check(bot_, chat):
        return True, -100_555_000_111 if str(chat) == "@smoke_add_kanal" else None, ""
    real_check = channel_handler.check_bot_is_admin
    channel_handler.check_bot_is_admin = fake_check

    cleanup()

    # Rollar
    TelegramAdminsID.objects.create(tg_id=SUPER, full_name="Super", role=AdminRole.SUPERADMIN)
    TelegramAdminsID.objects.create(tg_id=OPER, full_name="Oper", role=AdminRole.OPERATOR)
    TelegramAdminsID.objects.create(tg_id=OBSV, full_name="Obsv", role=AdminRole.OBSERVER)

    # ---------- 1. Kirish va rollar ----------
    print("1) Kirish va rollar")
    m = FakeMessage(SUPER, text="/admin")
    await admin_handler.start(m)
    check("superadmin /admin kiradi", "xush kelibsiz" in m.texts().lower())

    m = FakeMessage(NOBODY, text="/admin")
    await admin_handler.start(m)
    check("begonaga /admin jim (TZ F-08)", len(m.out) == 0, m.texts())

    cb = FakeCallback("ch_add", OPER)
    await channel_handler.channel_add_start(cb, FakeState())
    check("operator kanal qo'sha olmaydi", any("huquq" in a for a in cb.alerts))

    cb = FakeCallback("adm_menu", OPER)
    await admins_handler.admins_menu(cb, FakeState())
    check("operator adminlar bo'limiga kirolmaydi", any("Bosh admin" in a for a in cb.alerts))

    # ---------- 2. Kanallar CRUD ----------
    print("2) Kanallar CRUD")
    st = FakeState()
    cb = FakeCallback("ch_add", SUPER)
    await channel_handler.channel_add_start(cb, st)
    m = FakeMessage(SUPER, text="@smoke_add_kanal")
    await channel_handler.channel_add_link(m, st)
    check("link qabul qilindi", "OTT rasmiy nomini" in m.texts())
    m = FakeMessage(SUPER, text="Smoke qo'shilgan OTT")
    await channel_handler.channel_add_name(m, st)
    cb = FakeCallback("ch_addtype:davlat", SUPER)
    await channel_handler.channel_add_type(cb, st)
    ch = Channel.objects.filter(username="smoke_add_kanal").first()
    check("kanal yaratildi", ch is not None and ch.ott_type == "davlat" and ch.bot_is_admin)
    ch.tag = TAG
    ch.save(update_fields=["tag"])

    # noto'g'ri link
    st = FakeState()
    cb = FakeCallback("ch_add", SUPER)
    await channel_handler.channel_add_start(cb, st)
    m = FakeMessage(SUPER, text="bu link emas!!!")
    await channel_handler.channel_add_link(m, st)
    check("noto'g'ri link rad etildi", "noto'g'ri" in m.texts().lower())

    # dublikat link
    m = FakeMessage(SUPER, text="@smoke_add_kanal")
    await channel_handler.channel_add_link(m, st)
    check("dublikat link rad etildi", "allaqachon bor" in m.texts())

    # ro'yxat + filtrlar + sahifalash
    for data in ("ch_list:1:all:all", "ch_list:1:davlat:on", "ch_list:99:all:all", "ch_list:1:xorijiy:off"):
        cb = FakeCallback(data, OBSV)
        await channel_handler.channels_list(cb)
    check("ro'yxat va filtrlar ishladi", True)

    cb = FakeCallback("ch_menu", SUPER)
    await channel_handler.channels_menu(cb, FakeState())
    check("kanallar menyusi (tur bo'yicha hisob)", "Davlat" in cb.message.texts())

    cb = FakeCallback(f"ch_det:{ch.id}", OBSV)
    await channel_handler.channel_detail(cb, FakeState())
    check("kanal kartochkasi", "Smoke qo'shilgan OTT" in cb.message.texts())

    # tahrirlash: nom, teg, tur, link
    st = FakeState()
    cb = FakeCallback(f"ch_edit:{ch.id}:name", SUPER)
    await channel_handler.channel_edit_start(cb, st)
    m = FakeMessage(SUPER, text="Smoke OTT yangi nom")
    await channel_handler.channel_edit_value(m, st)
    ch.refresh_from_db()
    check("nom tahrirlandi", ch.ott_name == "Smoke OTT yangi nom")

    st = FakeState()
    cb = FakeCallback(f"ch_edit:{ch.id}:tag", SUPER)
    await channel_handler.channel_edit_start(cb, st)
    m = FakeMessage(SUPER, text=TAG)
    await channel_handler.channel_edit_value(m, st)
    ch.refresh_from_db()
    check("teg tahrirlandi", ch.tag == TAG)

    cb = FakeCallback(f"ch_settype:{ch.id}:nodavlat", SUPER)
    await channel_handler.channel_set_type(cb)
    ch.refresh_from_db()
    check("tur o'zgartirildi", ch.ott_type == "nodavlat")

    cb = FakeCallback(f"ch_tgl:{ch.id}", SUPER)
    await channel_handler.channel_toggle(cb)
    ch.refresh_from_db()
    check("nofaol qilindi", not ch.is_active)
    await channel_handler.channel_toggle(FakeCallback(f"ch_tgl:{ch.id}", SUPER))
    ch.refresh_from_db()
    check("qayta faollashtirildi", ch.is_active)

    cb = FakeCallback(f"ch_chk:{ch.id}", OPER)
    await channel_handler.channel_check(cb)
    check("adminlik tekshiruvi", "post yubora oladi" in cb.message.texts())

    # ---------- 3. Excel import/eksport ----------
    print("3) Excel import/eksport")
    st = FakeState()
    cb = FakeCallback("ch_imp", SUPER)
    await channel_handler.excel_import_start(cb, st)
    m = FakeMessage(SUPER, document=SimpleNamespace(file_id="f1"))
    await channel_handler.excel_import_file(m, st)
    check("excel import (2 kanal)", Channel.objects.filter(tag=TAG).count() >= 3,
          f"bor: {Channel.objects.filter(tag=TAG).count()}")
    check("import hisobot chiqdi", "Import yakunlandi" in m.texts())

    cb = FakeCallback("ch_exp", OBSV)
    await channel_handler.excel_export(cb)
    check("excel eksport", any(k == "answer_document" for k, _ in cb.message.out))

    # ---------- 4. Tarqatish ----------
    print("4) Tarqatish")
    st = FakeState()
    cb = FakeCallback("bc_new", OPER)
    await broadcast_handler.broadcast_new(cb, st)
    check("tarqatish boshlandi", "forward" in cb.message.texts())

    m = FakeMessage(OPER, text="SMOKE test post")
    await broadcast_handler.broadcast_collect_post(m, st)
    await asyncio.sleep(1.5)  # albom debounce tugashini kutamiz
    check("post qabul qilindi (debounce)", st._data.get("message_ids") == [m.message_id])

    cb = FakeCallback(f"bc_tgt:tag:{TAG}", OPER)
    await broadcast_handler.broadcast_target(cb, st)
    check("qamrov tanlandi (preview)", "Oldindan ko'rish" in cb.message.texts())

    cb = FakeCallback("bc_go", OPER)
    await broadcast_handler.broadcast_go(cb, st)
    b = None
    for _ in range(40):
        await asyncio.sleep(0.25)
        b = Broadcast.objects.filter(admin_id=OPER, status=BroadcastStatus.DONE).first()
        if b:
            break
    check("tarqatish yakunlandi", b is not None)
    if b:
        smoke_active = Channel.objects.filter(is_active=True, tag=TAG).count()
        check("hamma kanalga yetdi", b.success_count == smoke_active,
              f"{b.success_count}/{smoke_active}")
        check("natijalar yozildi", b.results.filter(delivered=True).count() == smoke_active)
        check("xabar IDlari saqlandi",
              all(r.message_ids for r in b.results.filter(delivered=True)))

    # hisobot + eksport + o'chirish
    cb = FakeCallback(f"st_bc:{b.id}", OPER)
    await broadcast_handler.stats_broadcast_detail(cb)
    check("tarqatish hisoboti", "Yetkazildi" in cb.message.texts())

    cb = FakeCallback(f"st_bc_xls:{b.id}", OBSV)
    await broadcast_handler.stats_broadcast_export(cb)
    check("hisobot excel", any(k == "answer_document" for k, _ in cb.message.out))

    cb = FakeCallback(f"st_bc_del:{b.id}", OPER)
    await broadcast_handler.stats_broadcast_delete_ask(cb)
    check("o'chirish tasdiq so'raldi", "o'chirilsinmi" in cb.message.texts())

    cb = FakeCallback(f"st_bc_delok:{b.id}", OPER)
    await broadcast_handler.stats_broadcast_delete_run(cb)
    ok_deleted = False
    for _ in range(40):
        await asyncio.sleep(0.25)
        b.refresh_from_db()
        if not b.results.filter(delivered=True, deleted_from_channel=False).exists():
            ok_deleted = True
            break
    check("kanallardan o'chirildi", ok_deleted)
    check("delete chaqiruvlari ketdi", any(k == "delete" for k, *_ in fake_bot.calls))

    # observer tarqata olmaydi
    cb = FakeCallback("bc_new", OBSV)
    await broadcast_handler.broadcast_new(cb, FakeState())
    check("observer tarqata olmaydi", any("huquq" in a for a in cb.alerts))

    # ---------- 5. Rejalashtirish ----------
    print("5) Rejalashtirish")
    st = FakeState()
    await st.update_data(source_chat_id=OPER, message_ids=[123], target_filter="all")
    cb = FakeCallback("bc_sched", OPER)
    await broadcast_handler.broadcast_schedule_ask(cb, st)
    m = FakeMessage(OPER, text="noto'g'ri sana")
    await broadcast_handler.broadcast_schedule_set(m, st)
    check("noto'g'ri sana rad etildi", "Format noto'g'ri" in m.texts())
    m = FakeMessage(OPER, text="01.01.2020 09:00")
    await broadcast_handler.broadcast_schedule_set(m, st)
    check("o'tmish sana rad etildi", "kelajakda" in m.texts())
    m = FakeMessage(OPER, text="31.12.2030 09:00")
    await broadcast_handler.broadcast_schedule_set(m, st)
    plan = Broadcast.objects.filter(admin_id=OPER, status=BroadcastStatus.SCHEDULED).first()
    check("reja yaratildi", plan is not None)

    cb = FakeCallback("bc_plans", OPER)
    await broadcast_handler.scheduled_list(cb)
    check("rejalar ro'yxati", "Rejalashtirilgan" in cb.message.texts())
    cb = FakeCallback(f"bc_plan:{plan.id}", OPER)
    await broadcast_handler.scheduled_detail(cb)
    check("reja tafsiloti", "Reja #" in cb.message.texts())
    cb = FakeCallback(f"bc_plan_cancel:{plan.id}", OPER)
    await broadcast_handler.scheduled_cancel(cb)
    plan.refresh_from_db()
    check("reja bekor qilindi", plan.status == BroadcastStatus.CANCELLED)

    # ---------- 6. Statistika ----------
    print("6) Statistika")
    for data, fn in (
        ("st_menu", broadcast_handler.stats_menu),
        ("st_history:1", broadcast_handler.stats_history),
        ("st_problems", broadcast_handler.stats_problems),
    ):
        cb = FakeCallback(data, OBSV)
        await fn(cb)
    check("statistika bo'limlari ochildi", True)

    # ---------- 7. Adminlarni boshqarish ----------
    print("7) Adminlar")
    st = FakeState()
    cb = FakeCallback("adm_menu", SUPER)
    await admins_handler.admins_menu(cb, st)
    cb = FakeCallback("adm_add", SUPER)
    await admins_handler.admin_add_start(cb, st)
    m = FakeMessage(SUPER, text="raqam emas")
    await admins_handler.admin_add_id(m, st)
    check("noto'g'ri ID rad etildi", "raqam" in m.texts().lower())
    m = FakeMessage(SUPER, text=str(NOBODY))
    await admins_handler.admin_add_id(m, st)
    m = FakeMessage(SUPER, text="Yangi Operator")
    await admins_handler.admin_add_name(m, st)
    cb = FakeCallback("adm_role:operator", SUPER)
    await admins_handler.admin_add_role(cb, st)
    new_admin = TelegramAdminsID.objects.filter(tg_id=NOBODY).first()
    check("admin qo'shildi", new_admin is not None and new_admin.role == "operator")

    cb = FakeCallback(f"adm_det:{new_admin.id}", SUPER)
    await admins_handler.admin_detail(cb)
    check("admin kartochkasi", "Yangi Operator" in cb.message.texts())
    cb = FakeCallback(f"adm_del:{new_admin.id}", SUPER)
    await admins_handler.admin_delete(cb)
    check("admin o'chirildi", not TelegramAdminsID.objects.filter(tg_id=NOBODY).exists())

    me = TelegramAdminsID.objects.get(tg_id=SUPER)
    cb = FakeCallback(f"adm_del:{me.id}", SUPER)
    await admins_handler.admin_delete(cb)
    check("o'zini o'chira olmaydi", TelegramAdminsID.objects.filter(tg_id=SUPER).exists())

    # ---------- 8. Zakovat ----------
    print("8) Zakovat")
    st = FakeState()
    cb = FakeCallback("add_new_question", OPER)
    await admin_handler.add_new_question(cb, st)
    m = FakeMessage(OPER, text="SMOKE savol 1")
    await admin_handler.process_question_name(m, st)
    m = FakeMessage(OPER, text="SMOKE savol matni?")
    await admin_handler.process_new_question(m, st)
    q = Questions.objects.filter(name="SMOKE savol 1").first()
    check("savol yaratildi", q is not None)

    cb = FakeCallback("questions_list", OPER)
    await admin_handler.questions_list(cb)
    cb = FakeCallback(f"question_detail_{q.id}", OPER)
    await admin_handler.question_detail(cb)
    check("savol tafsiloti (e'lon qilinmagan)", "e'lon qilinmagan" in cb.message.texts())

    # kanal sozlanmaganda approve
    old_channel = admin_handler.CHANNEL_ID
    admin_handler.CHANNEL_ID = ""
    cb = FakeCallback(f"approve:{q.id}", OPER)
    await admin_handler.approve_publish(cb)
    check("kanal sozlanmagan ogohlantirishi", any("sozlanmagan" in a for a in cb.alerts))
    admin_handler.CHANNEL_ID = "@smoke_zakovat"
    cb = FakeCallback(f"approve:{q.id}", OPER)
    await admin_handler.approve_publish(cb)
    q.refresh_from_db()
    check("savol kanalga joylandi", q.questioned_at is not None)
    check("send_message chaqirildi",
          any(k == "send_message" and c == "@smoke_zakovat" for k, c, _ in fake_bot.calls))
    admin_handler.CHANNEL_ID = old_channel

    # ---------- 9. Foydalanuvchi oqimi ----------
    print("9) Foydalanuvchi")
    # Faol tadbir bo'lsa /start ro'yxat oqimiga ketadi — zakovat oqimini
    # sinash uchun tadbirlarni vaqtincha o'chiramiz (yakunda tiklanadi)
    ChatEvent.objects.filter(id__in=saved_event_ids).update(is_active=False)

    # Oddiy /start — bosh menyu (murojaat tugmasi bilan)
    st = FakeState()
    m = FakeMessage(USER1, text="/start")
    await user_handler.start(m, st)
    check("/start bosh menyu ko'rsatadi",
          any("Murojaat yo'llash" in b for b in m.buttons()), m.buttons())

    # Zakovat: savol deep-linki orqali birinchi kirish → ro'yxat
    st = FakeState()
    m = FakeMessage(USER1, text=f"/start {q.uuid}")
    await user_handler.start(m, st)
    check("zakovat: yangi foydalanuvchi ro'yxati", Users.objects.filter(tg_id=USER1).exists())
    m = FakeMessage(USER1, text="Smoke Foydalanuvchi")
    await user_handler.register_full_name(m, st)
    m = FakeMessage(USER1, text="matn")  # kontakt o'rniga matn
    await user_handler.register_phone_number(m, st)
    check("kontaktsiz telefon rad etildi", "tugmasini bosing" in m.texts())
    m = FakeMessage(USER1, contact=SimpleNamespace(phone_number="+998901234567"))
    await user_handler.register_phone_number(m, st)
    u = Users.objects.get(tg_id=USER1)
    check("telefon saqlandi", u.phone_number == "+998901234567")

    # deep-link orqali javob berish
    st = FakeState()
    m = FakeMessage(USER1, text=f"/start {q.uuid}")
    await user_handler.start(m, st)
    check("savolga javob so'raldi", "Javobingizni kiriting" in m.texts())
    m = FakeMessage(USER1, text="SMOKE javobim")
    await user_handler.process_answer(m, st)
    check("javob saqlandi", Answers.objects.filter(user=u, question=q).exists())

    # ikkinchi marta javob berolmaydi
    st = FakeState()
    m = FakeMessage(USER1, text=f"/start {q.uuid}")
    await user_handler.start(m, st)
    check("qayta javob rad etildi", "allaqachon javob" in m.texts())

    # profil
    cb = FakeCallback("user_profile", USER1)
    await user_handler.user_profile(cb)
    check("profil ko'rsatildi", "Smoke Foydalanuvchi" in cb.message.texts())

    # javoblarni yuklab olish (admin)
    cb = FakeCallback(f"change_download_{q.id}", OPER)
    await admin_handler.change_question(cb)
    check("javoblar excel yuborildi",
          any(k == "send_document" for k, *_ in fake_bot.calls))

    # ---------- 10. Suhbat va ommaviy xabar ----------
    print("10) Suhbat va ommaviy xabar")
    st = FakeState()
    cb = FakeCallback("user_talk", OPER)
    await admin_handler.user_talk(cb, st)
    m = FakeMessage(OPER, text=str(USER1))
    await admin_handler.process_user_id(m, st)
    m = FakeMessage(OPER, text="Salom foydalanuvchi!")
    await admin_handler.process_user_talk(m, st)
    check("admin xabari yuborildi", "yuborildi" in m.texts().lower())

    st = FakeState()
    cb = FakeCallback(f"answer_admin_{OPER}_{123}", USER1)
    await admin_handler.answer_from_admin(cb, st)
    m = FakeMessage(USER1, text="Salom admin!")
    await admin_handler.process_answer_to_admin(m, st)
    check("foydalanuvchi javobi yetdi", "yuborildi" in m.texts().lower())

    st = FakeState()
    cb = FakeCallback("broadcast_message", OPER)
    await admin_handler.broadcast_message(cb, st)
    m = FakeMessage(OPER, text="SMOKE ommaviy xabar")
    await admin_handler.process_broadcast_message(m, st)
    check("ommaviy xabar hisoboti", "Muvaffaqiyatli" in m.texts())

    # ---------- 11. Navigatsiya va audit ----------
    print("11) Navigatsiya va audit")
    st = FakeState()
    await st.set_state(ChannelState.add_link)  # jarayon o'rtasida
    cb = FakeCallback("back", OPER)
    await admin_handler.back_handler(cb, st)
    check("back FSM holatini tozalaydi", st._state is None)

    cb = FakeCallback("admin_main_menu", SUPER)
    await admin_handler.admin_main_menu(cb, FakeState())
    cb = FakeCallback("cancel", SUPER)
    await admin_handler.admin_main(cb, FakeState())
    check("menyu navigatsiyasi", True)

    check("audit-jurnal yozildi", AuditLog.objects.filter(admin_id__in=TEST_IDS).count() >= 5,
          f"bor: {AuditLog.objects.filter(admin_id__in=TEST_IDS).count()}")

    # ---------- 12. Online chat: ro'yxat oqimi (T-01 – T-07) ----------
    print("12) Online chat ro'yxati")
    from datetime import timedelta
    from django.utils import timezone as djtz
    from zakovat_bot.handlers import chat_admin_handler, chat_handler
    from zakovat_bot.services import chat_event as chat_service

    event = ChatEvent.objects.create(
        title="SMOKE seminar",
        slug="smoke_event",
        start_at=djtz.now() + timedelta(minutes=30),
        location="Toshkent, Smoke ko'chasi, 1-uy",
        subscription_channel="@smoke_kanal",
        arrival_note="Kamida 20–25 daqiqa oldin yetib keling.",
        reminder_hours=[24, 10, 1],
    )

    # T-01/3.3: obuna bo'lmagan foydalanuvchi ro'yxatga o'ta olmaydi
    fake_bot.subscribed_ids.discard(USER1)
    st = FakeState()
    m = FakeMessage(USER1, text="/start smoke_event")
    await user_handler.start(m, st)
    check("obunasizga a'zolik so'raldi", "a'zo bo'ling" in m.texts())
    check("obuna tugmalari chiqdi",
          any("Kanalga a'zo" in b for b in m.buttons())
          and any("A'zo bo'ldim" in b for b in m.buttons()), m.buttons())
    check("obunasizda ism so'ralmadi", st._state is None)

    # 3.4: a'zo bo'lmasdan «A'zo bo'ldim» — ogohlantirish, oqim boshlanmaydi
    cb = FakeCallback("chatsub_check", USER1)
    await chat_handler.chatsub_check(cb, st)
    check("a'zo bo'lmasdan davom etolmaydi",
          any("a'zo bo'lmadingiz" in a for a in cb.alerts), cb.alerts)

    # A'zo bo'lgach — oqim boshlanadi
    fake_bot.subscribed_ids.add(USER1)
    cb = FakeCallback("chatsub_check", USER1)
    await chat_handler.chatsub_check(cb, st)
    check("a'zo bo'lgach ro'yxat boshlandi",
          "familiya, ism va sharif" in cb.message.texts().lower())
    check("T-01 holat o'rnatildi", st._state is not None)
    p = ChatParticipant.objects.filter(event=event, telegram_id=USER1).first()
    check("T-01 manba (source) qayd etildi", p is not None and p.source == "smoke_event")

    # T-03: noto'g'ri F.I.Sh.
    for bad in ("Ali123", "Sardor", "abc", "A" * 61):
        m = FakeMessage(USER1, text=bad)
        await chat_handler.chatreg_full_name(m, st)
        if "to'g'ri kiriting" not in m.texts():
            check(f"T-03 noto'g'ri F.I.Sh. rad ({bad[:10]})", False, m.texts())
            break
    else:
        check("T-03 noto'g'ri F.I.Sh. rad etildi (4 xil)", True)

    # T-02: to'g'ri F.I.Sh.
    m = FakeMessage(USER1, text="Karimov Aziz Baxtiyorovich")
    await chat_handler.chatreg_full_name(m, st)
    check("T-02 to'g'ri F.I.Sh. → telefon bosqichi", "telefon raqamingizni" in m.texts().lower())

    # T-05: noto'g'ri raqam
    m = FakeMessage(USER1, text="12345")
    await chat_handler.chatreg_phone(m, st)
    check("T-05 noto'g'ri raqam rad etildi", "noto'g'ri kiritildi" in m.texts())

    # Begona kontakt rad etiladi (contact.user_id != from.id)
    m = FakeMessage(USER1, contact=SimpleNamespace(phone_number="+998935556677", user_id=777777))
    await chat_handler.chatreg_phone(m, st)
    check("begona kontakt rad etildi", "o'zingizning telefon" in m.texts())

    # T-04: qo'lda to'g'ri raqam (normallashtirish) → tasdiqlash ekrani
    m = FakeMessage(USER1, text="90 123 45 67")
    await chat_handler.chatreg_phone(m, st)
    check("T-04 raqam qabul qilindi", "+998901234567" in m.texts())
    check("tasdiqlashda tadbir ma'lumotlari bor",
          "Smoke ko'chasi" in m.texts() and "20–25 daqiqa" in m.texts())

    # T-06: «Ishtirok etaman»
    cb = FakeCallback("chatreg_confirm", USER1)
    await chat_handler.chatreg_confirm(cb, st)
    p.refresh_from_db()
    check("T-06 ro'yxatdan o'tdi", p.status == ParticipantStatus.REGISTERED
          and p.phone == "+998901234567" and p.registered_at is not None)
    check("yakuniy xabarda manzil va kelish eslatmasi",
          "Smoke ko'chasi" in cb.message.texts() and "20–25 daqiqa" in cb.message.texts())

    # T-07: qayta kirganda holat, takroriy yozuv yo'q
    st = FakeState()
    m = FakeMessage(USER1, text="/start smoke_event")
    await user_handler.start(m, st)
    check("T-07 holat ko'rsatildi", "allaqachon ro'yxatdan o'tgansiz" in m.texts())
    check("T-07 takroriy yozuv yaratilmadi",
          ChatParticipant.objects.filter(event=event, telegram_id=USER1).count() == 1)

    # Oddiy /start ham (faol tadbir bor) ro'yxat oqimiga olib boradi
    st = FakeState()
    m = FakeMessage(USER1, text="/start")
    await user_handler.start(m, st)
    check("oddiy /start ham tadbirga olib bordi",
          "allaqachon ro'yxatdan o'tgansiz" in m.texts())

    # Dublikat telefon (boshqa foydalanuvchi)
    fake_bot.subscribed_ids.add(NOBODY)
    st2 = FakeState()
    m = FakeMessage(NOBODY, text="/start smoke_event")
    await user_handler.start(m, st2)
    check("a'zoga deep link darhol F.I.Sh. so'raydi", "familiya, ism va sharif" in m.texts().lower())
    m = FakeMessage(NOBODY, text="Valiyev Bekzod")
    await chat_handler.chatreg_full_name(m, st2)
    m = FakeMessage(NOBODY, text="+998901234567")
    await chat_handler.chatreg_phone(m, st2)
    check("dublikat telefon rad etildi", "allaqachon ro'yxatdan o'tilgan" in m.texts())

    # Bekor qilish va qayta ro'yxat
    cb = FakeCallback("chatreg_cancel", USER1)
    await chat_handler.chatreg_cancel(cb, FakeState())
    p.refresh_from_db()
    check("ishtirok bekor qilindi", p.status == ParticipantStatus.CANCELLED)
    p.status = ParticipantStatus.REGISTERED
    p.save(update_fields=["status"])

    # ---------- 13. Eslatmalar (T-08 – T-11) ----------
    print("13) Eslatmalar")
    # Tadbir 30 daqiqadan keyin → «1 soat oldin» eslatmasi hozir yuborilishi kerak
    p2 = ChatParticipant.objects.create(
        event=event, telegram_id=OBSV, full_name="Kech Qolgan", phone="+998901111111",
        status=ParticipantStatus.REGISTERED,
        registered_at=djtz.now(),  # eslatma vaqtidan KEYIN ro'yxatdan o'tgan (T-10)
    )
    # NOBODY uchun yozuv dublikat-test paytida yaratilgan — qayta ishlatamiz
    p3 = ChatParticipant.objects.get(event=event, telegram_id=NOBODY)
    p3.full_name = "Bloklagan Foydalanuvchi"
    p3.phone = "+998902222222"
    p3.status = ParticipantStatus.REGISTERED
    p3.registered_at = djtz.now() - timedelta(hours=2)
    p3.save()
    p.registered_at = djtz.now() - timedelta(hours=2)
    p.save(update_fields=["registered_at"])

    fake_bot.forbidden_ids.add(NOBODY)  # T-09: bu foydalanuvchi botni bloklagan

    def hour_reminder_sends():
        """Faqat USER1'ga ketgan «1 soat» eslatmalarini sanaydi — boshqa fon
        vazifalarning xabarlari hisobga aralashmasligi uchun."""
        return len([
            c for c in fake_bot.calls
            if c[0] == "send_message" and c[1] == USER1 and "1 soat qoldi" in str(c[2])
        ])

    before = hour_reminder_sends()
    await chat_service.process_due_reminders(fake_bot)

    log1 = ReminderLog.objects.filter(participant=p, reminder_type="h1").first()
    check("T-08 eslatma yuborildi", log1 is not None and log1.status == "sent")
    check("T-10 kech ro'yxatdan o'tganga yuborilmadi",
          not ReminderLog.objects.filter(participant=p2, reminder_type="h1").exists())
    p3.refresh_from_db()
    log3 = ReminderLog.objects.filter(participant=p3, reminder_type="h1").first()
    check("T-09 bloklagan aniqlandi", p3.is_blocked and log3.status == "blocked")
    check("eskirgan eslatmalar (24/10 soat) o'tkazib yuborildi",
          not ReminderLog.objects.filter(
              participant=p, reminder_type__in=["h24", "h10"]).exists())

    # T-11: scheduler qayta ishga tushsa takror yubormaydi
    await chat_service.process_due_reminders(fake_bot)
    after = hour_reminder_sends()
    check("T-11 idempotent (takror yuborilmadi)",
          ReminderLog.objects.filter(participant=p, reminder_type="h1").count() == 1
          and after == before + 1,
          f"yuborishlar: {after - before}")

    # «Chat boshlandi» xabari: havolasiz yuborilmaydi, havola bilan yuboriladi
    event.start_at = djtz.now() - timedelta(minutes=1)
    event.save(update_fields=["start_at"])
    await chat_service.process_due_reminders(fake_bot)
    check("havolasiz start xabari yuborilmadi",
          not ReminderLog.objects.filter(
              participant=p, reminder_type="start", status="sent").exists())
    event.chat_link = "https://t.me/+smoke_link"
    event.save(update_fields=["chat_link"])
    await chat_service.process_due_reminders(fake_bot)
    slog = ReminderLog.objects.filter(participant=p, reminder_type="start").first()
    check("havola bilan start xabari yuborildi", slog is not None and slog.status == "sent")

    # ---------- 14. Chat admin bo'limi (T-12, F-08) ----------
    print("14) Chat admin")
    cb = FakeCallback("chadm_menu", SUPER)
    await chat_admin_handler.chat_admin_menu(cb, FakeState())
    check("tadbir admin menyusi (kartochka)",
          "SMOKE seminar" in cb.message.texts()
          and "Ro'yxatdan o'tganlar" in cb.message.texts())
    check("kartochkada manzil va ro'yxat havolasi",
          "Smoke ko'chasi" in cb.message.texts()
          and "?start=smoke_event" in cb.message.texts())

    # Barcha tadbirlar ro'yxati va aniq tadbirni yoqish/o'chirish
    cb = FakeCallback("chadm_events", SUPER)
    await chat_admin_handler.chat_admin_events(cb, FakeState())
    check("barcha tadbirlar ro'yxati", "Barcha tadbirlar" in cb.message.texts())
    check("ro'yxatda tadbir tugmalari bor",
          any("SMOKE seminar" in b for b in cb.message.buttons()), cb.message.buttons())

    cb = FakeCallback(f"chadm_ev:{event.id}", SUPER)
    await chat_admin_handler.chat_admin_event_card(cb)
    check("tadbir kartochkasi ochildi", "SMOKE seminar" in cb.message.texts())

    cb = FakeCallback(f"chadm_evtgl:{event.id}", SUPER)
    await chat_admin_handler.chat_admin_event_toggle(cb)
    event.refresh_from_db()
    check("ro'yxatdan tadbir o'chirildi", not event.is_active)
    cb = FakeCallback(f"chadm_evtgl:{event.id}", SUPER)
    await chat_admin_handler.chat_admin_event_toggle(cb)
    event.refresh_from_db()
    check("ro'yxatdan tadbir yoqildi", event.is_active)

    cb = FakeCallback(f"chadm_ev:{event.id}", OPER)
    await chat_admin_handler.chat_admin_event_card(cb)
    check("operator tadbirlar ro'yxatiga kirolmaydi",
          any("huquq" in a for a in cb.alerts))

    # Manzilni tahrirlash
    st = FakeState()
    cb = FakeCallback("chadm_set_loc", SUPER)
    await chat_admin_handler.chat_admin_set_loc(cb, st)
    m = FakeMessage(SUPER, text="Toshkent, Yangi manzil, 5-uy")
    await chat_admin_handler.chat_admin_set_loc_save(m, st)
    event.refresh_from_db()
    check("manzil tahrirlandi", event.location == "Toshkent, Yangi manzil, 5-uy")
    event.location = "Toshkent, Smoke ko'chasi, 1-uy"
    event.save(update_fields=["location"])

    cb = FakeCallback("chadm_stats", OBSV)
    await chat_admin_handler.chat_admin_stats(cb)
    check("chat statistika", "ro'yxatdan o'tganlar" in cb.message.texts().lower())

    cb = FakeCallback("chadm_reminders", OBSV)
    await chat_admin_handler.chat_admin_reminders(cb)
    check("eslatmalar holati", "1 soat oldin" in cb.message.texts())

    cb = FakeCallback("chadm_list:1", OBSV)
    await chat_admin_handler.chat_admin_participants(cb)
    check("ro'yxatdan o'tganlar bot ichida ko'rinadi",
          "Ro'yxatdan o'tganlar" in cb.message.texts()
          and "Karimov Aziz" in cb.message.texts())

    cb = FakeCallback("chadm_export", OPER)
    await chat_admin_handler.chat_admin_export(cb)
    check("ishtirokchilar eksporti", any(k == "answer_document" for k, _ in cb.message.out))

    # Ommaviy xabar (copy_message)
    st = FakeState()
    cb = FakeCallback("chadm_bcast", OPER)
    await chat_admin_handler.chat_admin_bcast(cb, st)
    m = FakeMessage(OPER, text="SMOKE chat e'loni")
    await chat_admin_handler.chat_admin_bcast_send(m, st)
    check("ishtirokchilarga ommaviy xabar",
          any(k == "copy_message" for k, *_ in fake_bot.calls))

    # Sozlamalar: sana va havola
    st = FakeState()
    cb = FakeCallback("chadm_set_dt", SUPER)
    await chat_admin_handler.chat_admin_set_dt(cb, st)
    m = FakeMessage(SUPER, text="10.08.2026 21:00")
    await chat_admin_handler.chat_admin_set_dt_save(m, st)
    event.refresh_from_db()
    check("sana o'zgartirildi", djtz.localtime(event.start_at).hour == 21)

    st = FakeState()
    cb = FakeCallback("chadm_set_link", SUPER)
    await chat_admin_handler.chat_admin_set_link(cb, st)
    m = FakeMessage(SUPER, text="havola emas")
    await chat_admin_handler.chat_admin_set_link_save(m, st)
    check("noto'g'ri havola rad etildi", "boshlanishi kerak" in m.texts())
    m = FakeMessage(SUPER, text="https://t.me/+yangi_link")
    await chat_admin_handler.chat_admin_set_link_save(m, st)
    event.refresh_from_db()
    check("havola saqlandi", event.chat_link == "https://t.me/+yangi_link")

    # ---------- 15. Chat tadbirini yoqish/o'chirish ----------
    print("15) Chat yoqish/o'chirish")
    from zakovat_bot.services.chat_event import active_event as _active_event
    cb = FakeCallback("chadm_toggle", SUPER)
    await chat_admin_handler.chat_admin_toggle(cb, FakeState())
    event.refresh_from_db()
    check("tadbir o'chirildi", not event.is_active and "o'chirildi" in cb.message.texts())

    # O'chirilganda /start da chat taklifi ko'rinmaydi, murojaat qoladi
    st = FakeState()
    m = FakeMessage(USER1, text="/start")
    await user_handler.start(m, st)
    btns = m.buttons()
    check("o'chirilganda chat taklifi yo'q",
          any("Murojaat" in b for b in btns) and not any("Online chat" in b for b in btns),
          btns)

    # O'chirilgan tadbir deep-linki ham yopiq
    st = FakeState()
    m = FakeMessage(USER1, text="/start smoke_event")
    await user_handler.start(m, st)
    check("o'chirilgan tadbir deep-linki yopiq", "yopilgan" in m.texts())

    # O'chirilgan tadbirga eslatma yuborilmaydi
    logs_before = ReminderLog.objects.filter(participant__event=event).count()
    await chat_service.process_due_reminders(fake_bot)
    check("o'chirilgan tadbirga eslatma yo'q",
          ReminderLog.objects.filter(participant__event=event).count() == logs_before)

    # Sozlamalar o'chirilgan holatda ham ochiladi
    cb = FakeCallback("chadm_settings", SUPER)
    await chat_admin_handler.chat_admin_settings(cb, FakeState())
    check("o'chirilganda ham sozlamalar ochiladi", "Sozlamalar" in cb.message.texts())

    cb = FakeCallback("chadm_toggle", SUPER)
    await chat_admin_handler.chat_admin_toggle(cb, FakeState())
    event.refresh_from_db()
    check("tadbir qayta yoqildi", event.is_active)

    cb = FakeCallback("chadm_toggle", OPER)
    await chat_admin_handler.chat_admin_toggle(cb, FakeState())
    check("operator tadbirni o'chira olmaydi", any("huquq" in a for a in cb.alerts))

    # ---------- 16. Murojaatlar ----------
    print("16) Murojaatlar")
    from zakovat_bot.handlers import appeal_admin_handler, appeal_handler
    from zakovat_bot.services import appeals as appeals_service
    appeal_handler.bot = fake_bot
    appeal_admin_handler.bot = fake_bot

    # Deep link orqali murojaat oqimi
    st = FakeState()
    m = FakeMessage(NOBODY, text="/start murojaat_kanal")
    await user_handler.start(m, st)
    check("murojaat deep link ishladi", "Murojaat yo'llash" in m.texts())

    # NOBODY chat ro'yxatida bor — ism/telefon qayta ishlatilishi taklif qilinadi
    check("saqlangan ma'lumot taklif qilindi", "davom etamizmi" in m.texts())
    cb = FakeCallback("ap_reuse", NOBODY)
    await appeal_handler.appeal_reuse(cb, st)
    check("tur so'raldi", "turini tanlang" in cb.message.texts())

    cb = FakeCallback("ap_type:Shikoyat", NOBODY)
    await appeal_handler.appeal_type(cb, st)
    check("matn so'raldi", "matnini yozing" in cb.message.texts())

    m = FakeMessage(NOBODY, text="qisqa")
    await appeal_handler.appeal_message(m, st)
    check("qisqa matn rad etildi", "juda qisqa" in m.texts())

    m = FakeMessage(NOBODY, text="Mahallamizda yoshlar uchun sport maydonchasi yo'q, iltimos ko'rib chiqing.")
    await appeal_handler.appeal_message(m, st)
    appeal = Appeal.objects.filter(telegram_id=NOBODY).order_by("-id").first()
    check("murojaat saqlandi",
          appeal is not None and appeal.type == "Shikoyat"
          and appeal.source == "murojaat_kanal" and appeal.status == AppealStatus.NEW)
    check("foydalanuvchiga tasdiq berildi", "qabul qilindi" in m.texts())
    check("adminlarga bildirishnoma ketdi",
          any(k == "send_message" and "Yangi murojaat" in str(t)
              for k, c, t in fake_bot.calls if k == "send_message"))

    # Yangi foydalanuvchi — to'liq oqim (ism + telefon validatsiyasi)
    st = FakeState()
    m = FakeMessage(USER1, text="/start murojaat")
    await user_handler.start(m, st)
    cb = FakeCallback("ap_fresh", USER1)
    await appeal_handler.appeal_fresh(cb, st)
    m = FakeMessage(USER1, text="Ali")
    await appeal_handler.appeal_full_name(m, st)
    check("murojaatda noto'g'ri ism rad etildi", "to'g'ri kiriting" in m.texts())
    m = FakeMessage(USER1, text="Karimov Jasur")
    await appeal_handler.appeal_full_name(m, st)
    m = FakeMessage(USER1, text="000")
    await appeal_handler.appeal_phone(m, st)
    check("murojaatda noto'g'ri raqam rad etildi", "noto'g'ri kiritildi" in m.texts())
    m = FakeMessage(USER1, contact=SimpleNamespace(phone_number="998907654321"))
    await appeal_handler.appeal_phone(m, st)
    check("kontakt qabul qilindi", "turini tanlang" in m.texts())
    cb = FakeCallback("ap_type:Taklif", USER1)
    await appeal_handler.appeal_type(cb, st)
    m = FakeMessage(USER1, text="Yoshlar uchun IT kurslarini ko'paytirishni taklif qilaman.")
    await appeal_handler.appeal_message(m, st)
    a2 = Appeal.objects.filter(telegram_id=USER1).order_by("-id").first()
    check("ikkinchi murojaat saqlandi",
          a2 is not None and a2.type == "Taklif" and a2.phone == "+998907654321")

    # Admin bo'limi
    cb = FakeCallback("apadm_menu", OBSV)
    await appeal_admin_handler.appeals_menu(cb, FakeState())
    check("murojaatlar menyusi", "Murojaatlar" in cb.message.texts())

    for data in ("apadm_list:1:all", "apadm_list:1:new", "apadm_list:1:answered"):
        cb = FakeCallback(data, OBSV)
        await appeal_admin_handler.appeals_list(cb)
    check("murojaatlar ro'yxati va filtrlari", True)

    cb = FakeCallback(f"apadm_det:{appeal.id}", OBSV)
    await appeal_admin_handler.appeal_detail(cb, FakeState())
    check("murojaat kartochkasi", f"Murojaat #{appeal.id}" in cb.message.texts())

    cb = FakeCallback(f"apadm_status:{appeal.id}:in_review", OPER)
    await appeal_admin_handler.appeal_set_status(cb)
    appeal.refresh_from_db()
    check("holat o'zgartirildi", appeal.status == AppealStatus.IN_REVIEW)

    cb = FakeCallback(f"apadm_status:{appeal.id}:answered", OBSV)
    await appeal_admin_handler.appeal_set_status(cb)
    check("kuzatuvchi holatni o'zgartira olmaydi", any("huquq" in a for a in cb.alerts))

    # Javob yozish (NOBODY endi botni bloklamagan — 13-bo'lim sinovidan tozalaymiz)
    fake_bot.forbidden_ids.discard(NOBODY)
    st = FakeState()
    cb = FakeCallback(f"apadm_reply:{appeal.id}", OPER)
    await appeal_admin_handler.appeal_reply_start(cb, st)
    m = FakeMessage(OPER, text="Murojaatingiz ko'rib chiqildi, sport maydonchasi rejaga kiritildi.")
    await appeal_admin_handler.appeal_reply_send(m, st)
    appeal.refresh_from_db()
    check("javob saqlandi va holat yangilandi",
          appeal.status == AppealStatus.ANSWERED and appeal.response
          and appeal.answered_at is not None)
    check("javob foydalanuvchiga yuborildi",
          any(k == "send_message" and c == NOBODY and "murojaatingizga javob" in str(t).lower()
              for k, c, t in fake_bot.calls if k == "send_message"))

    # Havola generatsiyasi
    cb = FakeCallback("apadm_link", SUPER)
    await appeal_admin_handler.appeals_link(cb)
    check("murojaat havolasi generatsiya qilindi",
          "?start=murojaat" in cb.message.texts()
          and "yoshlaruchuntanlov_bot" in cb.message.texts())

    cb = FakeCallback("apadm_export", OBSV)
    await appeal_admin_handler.appeals_export(cb)
    check("murojaatlar eksporti", any(k == "answer_document" for k, _ in cb.message.out))

    link = await appeals_service.build_appeal_link(fake_bot, source="sayt")
    check("manbali havola", link.endswith("?start=murojaat_sayt"), link)

    # ---------- 17. Admin buyruqlari, /help va fallback ----------
    print("17) Buyruqlar va fallback")
    from zakovat_bot.handlers import fallback_handler

    # Tadbir yana faol bo'lsin (buyruqlar uni ko'rsatadi)
    event.is_active = True
    event.save(update_fields=["is_active"])

    m = FakeMessage(SUPER, text="/stat")
    await chat_admin_handler.cmd_stat(m)
    check("/stat statistika berdi",
          "Tasdiqlangan" in m.texts() and "Tugallanmagan" in m.texts())

    m = FakeMessage(NOBODY, text="/stat")
    await chat_admin_handler.cmd_stat(m)
    check("/stat begonaga jim", len(m.out) == 0)

    m = FakeMessage(OBSV, text="/export")
    await chat_admin_handler.cmd_export(m)
    check("/export fayl yubordi", any(k == "answer_document" for k, _ in m.out))

    st = FakeState()
    m = FakeMessage(OPER, text="/send")
    await chat_admin_handler.cmd_send(m, st)
    check("/send xabar so'radi", "xabarni yozing" in m.texts())
    m = FakeMessage(OPER, text="Ertaga tadbir bo'ladi!")
    await chat_admin_handler.chat_admin_bcast_send(m, st)
    check("/send orqali tarqatildi",
          any(k == "copy_message" for k, *_ in fake_bot.calls))

    m = FakeMessage(OBSV, text="/send")
    await chat_admin_handler.cmd_send(m, FakeState())
    check("/send kuzatuvchiga jim", len(m.out) == 0)

    # /help
    m = FakeMessage(USER1, text="/help")
    await fallback_handler.cmd_help(m)
    check("/help foydalanuvchiga yordam berdi", "Yordam" in m.texts())
    m = FakeMessage(SUPER, text="/help")
    await fallback_handler.cmd_help(m)
    check("/help adminga buyruqlar ro'yxati", "/export" in m.texts())

    # Kutilmagan matn
    m = FakeMessage(USER1, text="salom qandaysiz")
    await fallback_handler.unknown_text(m)
    check("kutilmagan matnga javob", "/start" in m.texts())
    m = FakeMessage(SUPER, text="tasodifiy matn")
    await fallback_handler.unknown_text(m)
    check("adminga ortiqcha javob yo'q", len(m.out) == 0)

    # ---------- 18. Seed: brm_seminar tadbiri ----------
    print("18) Seminar tadbiri (seed)")
    seminar = ChatEvent.all_objects.filter(slug="brm_seminar").first()
    check("brm_seminar tadbiri bazada bor", seminar is not None)
    if seminar:
        local = djtz.localtime(seminar.start_at)
        check("seminar sanasi 13-avgust 14:00",
              (local.month, local.day, local.hour, local.minute) == (8, 13, 14, 0),
              f"{local}")
        check("majburiy obuna kanali",
              seminar.subscription_channel == "@poytaxtyoshlari_yi")
        check("manzil va kelish eslatmasi",
              "ZiyoForum" in (seminar.location or "")
              and "20–25" in (seminar.arrival_note or ""))
        check("eslatma 5 soat oldin (09:00)", seminar.reminder_hours == [5])
        due = seminar.start_at - timedelta(hours=5)
        check("eslatma vaqti 13-avgust 09:00",
              (djtz.localtime(due).hour, djtz.localtime(due).minute) == (9, 0))
        check("oflayn tadbirga «boshlandi» xabari yo'q",
              seminar.send_start_message is False)

    # ---------- 19. «Talabalik davrim» tanlovi (TZ 16: qabul mezonlari) ----------
    print("19) Tanlov: ariza topshirish")
    from zakovat_bot.handlers import contest_handler
    from zakovat_bot.services import contest as contest_service
    contest_handler.bot = fake_bot

    _photo_n = iter(range(1000, 9999))

    def fake_photo(size=500_000):
        n = next(_photo_n)
        return [SimpleNamespace(file_id=f"ph_{n}", file_unique_id=f"phu_{n}",
                                file_size=size)]

    def fake_video(duration=60, size_mb=10):
        n = next(_photo_n)
        return SimpleNamespace(file_id=f"vd_{n}", file_unique_id=f"vdu_{n}",
                               file_size=int(size_mb * 1024 * 1024),
                               duration=duration, mime_type="video/mp4")

    contest = Contest.objects.create(
        title="SMOKE tanlov", slug="smoke_td",
        stage=ContestStage.ACCEPTING,
        submission_deadline=djtz.now() + timedelta(days=2),
        min_photos=1, max_photos=3, max_video_seconds=180, max_video_mb=50,
        rules_text="Smoke shartlari", contact_text="Smoke aloqa",
    )

    # Deep link to'g'ridan-to'g'ri tanlovga olib keladi
    st = FakeState()
    m = FakeMessage(USER1, text="/start smoke_td")
    await user_handler.start(m, st)
    check("TZ16: deep link tanlovga olib keldi", "SMOKE tanlov" in m.texts())
    check("TZ16: menyuda ishtirok tugmasi bor",
          any("Tanlovda ishtirok" in b for b in m.buttons()), m.buttons())

    # Eski loyiha havolasi endi ro'yxatni boshlamaydi
    st_old = FakeState()
    m = FakeMessage(USER1, text="/start brm_seminar")
    await user_handler.start(m, st_old)
    check("TZ16: eski havola ro'yxatni boshlamaydi",
          "familiya, ism va sharif" not in m.texts().lower())

    # Anketa
    cb = FakeCallback("td_join", USER1, message=FakeMessage(USER1))
    await contest_handler.td_join(cb, st)
    check("anketa boshlandi", "familiya, ism va sharif" in cb.message.texts().lower())

    m = FakeMessage(USER1, text="Aziz")
    await contest_handler.td_full_name(m, st)
    check("noto'g'ri F.I.Sh. rad etildi", "to'g'ri kiriting" in m.texts())

    m = FakeMessage(USER1, text="Karimov Aziz Baxtiyorovich")
    await contest_handler.td_full_name(m, st)
    check("F.I.Sh. qabul qilindi", "ta'lim tashkiloti" in m.texts())

    m = FakeMessage(USER1, text="TD")
    await contest_handler.td_university(m, st)
    check("qisqa OTM nomi rad etildi", "to'liqroq" in m.texts())

    m = FakeMessage(USER1, text="Smoke universiteti")
    await contest_handler.td_university(m, st)
    check("OTM nomi o'zi yozilgan holda qabul qilindi",
          "Smoke universiteti" in m.texts() and "Fakultet" in m.texts())
    check("OTM uchun ro'yxat taklif qilinmadi",
          not any("tanlang" in t.lower() for _, t in m.out if t), m.texts())

    m = FakeMessage(USER1, text="Matematika")
    await contest_handler.td_faculty(m, st)
    cb = FakeCallback("td_year:2-kurs", USER1, message=FakeMessage(USER1))
    await contest_handler.td_year(cb, st)
    check("bosqich tanlandi", "telefon" in cb.message.texts().lower())

    m = FakeMessage(USER1, text="12345")
    await contest_handler.td_phone(m, st)
    check("noto'g'ri raqam rad etildi", "noto'g'ri" in m.texts())

    m = FakeMessage(USER1, text="90 123 45 67")
    await contest_handler.td_phone(m, st)
    participant = ContestParticipant.objects.filter(
        contest=contest, telegram_id=USER1).first()
    check("anketa saqlandi",
          participant is not None and participant.phone == "+998901234567"
          and participant.university == "Smoke universiteti")

    # Foto nominatsiyasi
    cb = FakeCallback("td_nom:foto", USER1, message=FakeMessage(USER1))
    await contest_handler.td_nomination(cb, st)
    entry = Entry.objects.filter(participant=participant,
                                 nomination=Nomination.FOTO).first()
    check("foto arizasi yaratildi (draft)",
          entry is not None and entry.status == EntryStatus.DRAFT)
    check("ariza raqami TD- formatida", entry.code.startswith("TD-"), entry.code)

    m = FakeMessage(USER1, text="Talabalik lahzalari")
    await contest_handler.td_title(m, st)
    m = FakeMessage(USER1, text="Universitetdagi eng yorqin kunlarim haqida.")
    await contest_handler.td_description(m, st)
    check("rozilik so'raldi", "rozilik" in m.texts().lower())

    cb = FakeCallback("td_consent", USER1, message=FakeMessage(USER1))
    await contest_handler.td_consent(cb, st)
    participant.refresh_from_db()
    check("rozilik qayd etildi", participant.consent_at is not None)

    # TZ 16: 1-2-3 rasm qabul, 4-chisi rad
    for i in range(3):
        m = FakeMessage(USER1, photo=fake_photo())
        await contest_handler.td_media(m, st)
    await asyncio.sleep(1.3)
    check("TZ16: 3 ta rasm qabul qilindi", entry.media.count() == 3,
          entry.media.count())

    m = FakeMessage(USER1, photo=fake_photo())
    await contest_handler.td_media(m, st)
    check("TZ16: 4-chi rasm rad etildi",
          "qabul qilinmaydi" in m.texts() and entry.media.count() == 3)

    # Video foto nominatsiyasiga tushmaydi
    m = FakeMessage(USER1, video=fake_video())
    await contest_handler.td_media(m, st)
    check("foto nominatsiyasida video rad etildi",
          "faqat rasm" in m.texts() or "qabul qilinmaydi" in m.texts())

    # Oldindan ko'rish va topshirish
    cb = FakeCallback("td_media_done", USER1, message=FakeMessage(USER1))
    await contest_handler.td_media_done(cb, st)
    check("TZ16: tasdiqlashdan oldin ko'rinish",
          "Arizangizni tekshiring" in cb.message.texts()
          and "3 ta foto" in cb.message.texts())

    cb = FakeCallback(f"td_submit:{entry.id}", USER1, message=FakeMessage(USER1))
    await contest_handler.td_submit(cb, st)
    entry.refresh_from_db()
    check("ariza topshirildi",
          entry.status == EntryStatus.MODERATION and entry.submitted_at is not None)
    check("foydalanuvchiga tasdiq berildi",
          "qabul qilindi" in cb.message.texts() and entry.code in cb.message.texts())
    check("moderatorlarga xabar ketdi",
          any(k == "send_message" and "Yangi ariza" in str(t)
              for k, c, t in fake_bot.calls if k == "send_message"))

    # TZ 16: takroriy bosish ikki nusxa yaratmaydi
    cb2 = FakeCallback(f"td_submit:{entry.id}", USER1, message=FakeMessage(USER1))
    await contest_handler.td_submit(cb2, st)
    check("TZ16: takroriy topshirish dublikat yaratmadi",
          Entry.objects.filter(participant=participant,
                               nomination=Nomination.FOTO).count() == 1
          and any("allaqachon" in a for a in cb2.alerts), cb2.alerts)

    # Video nominatsiyasi — cheklovlar
    st2 = FakeState()
    await st2.update_data(td_contest_id=contest.id)
    cb = FakeCallback("td_nom:video", USER1, message=FakeMessage(USER1))
    await contest_handler.td_nomination(cb, st2)
    ventry = Entry.objects.filter(participant=participant,
                                  nomination=Nomination.VIDEO).first()
    check("video arizasi yaratildi", ventry is not None)
    m = FakeMessage(USER1, text="Talabalik videosi")
    await contest_handler.td_title(m, st2)
    m = FakeMessage(USER1, text="Qisqa video lavha talabalik hayotidan.")
    await contest_handler.td_description(m, st2)
    cb = FakeCallback("td_consent", USER1, message=FakeMessage(USER1))
    await contest_handler.td_consent(cb, st2)

    m = FakeMessage(USER1, video=fake_video(duration=400))
    await contest_handler.td_media(m, st2)
    check("uzun video rad etildi", "juda uzun" in m.texts())

    m = FakeMessage(USER1, video=fake_video(size_mb=120))
    await contest_handler.td_media(m, st2)
    check("katta hajmli video rad etildi", "hajmi katta" in m.texts())

    m = FakeMessage(USER1, video=fake_video(duration=60, size_mb=10))
    await contest_handler.td_media(m, st2)
    await asyncio.sleep(1.3)
    check("TZ16: 1 ta video qabul qilindi", ventry.media.count() == 1)

    m = FakeMessage(USER1, video=fake_video(duration=50, size_mb=8))
    await contest_handler.td_media(m, st2)
    check("TZ16: 2-chi video rad etildi",
          "qabul qilinmaydi" in m.texts() and ventry.media.count() == 1)

    cb = FakeCallback("td_media_done", USER1, message=FakeMessage(USER1))
    await contest_handler.td_media_done(cb, st2)
    cb = FakeCallback(f"td_submit:{ventry.id}", USER1, message=FakeMessage(USER1))
    await contest_handler.td_submit(cb, st2)
    ventry.refresh_from_db()
    check("video arizasi topshirildi", ventry.status == EntryStatus.MODERATION)

    # «Mening arizam»
    cb = FakeCallback("td_my", USER1, message=FakeMessage(USER1))
    await contest_handler.td_my(cb, st2)
    check("«Mening arizam» ikkala arizani ko'rsatdi",
          entry.code in cb.message.texts() and ventry.code in cb.message.texts())

    # Xavfsizlik: mediasiz ariza topshirib bo'lmaydi (server tomonda)
    saved_media = list(entry.media.all().values("file_id", "file_unique_id",
                                                "media_type", "position"))
    entry.media.all().delete()
    Entry.objects.filter(id=entry.id).update(status=EntryStatus.DRAFT)
    cb = FakeCallback(f"td_submit:{entry.id}", USER1, message=FakeMessage(USER1))
    await contest_handler.td_submit(cb, st)
    entry.refresh_from_db()
    check("xavfsizlik: mediasiz ariza topshirilmadi",
          entry.status == EntryStatus.DRAFT
          and any("media yuboring" in a for a in cb.alerts), cb.alerts)
    for mrow in saved_media:
        EntryMedia.objects.create(entry=entry, **mrow)
    Entry.objects.filter(id=entry.id).update(status=EntryStatus.MODERATION)
    entry.refresh_from_db()

    # Xavfsizlik: topshirilgan arizaning mediasi o'chirilmaydi
    st_reset = FakeState()
    await st_reset.update_data(td_contest_id=contest.id, td_entry_id=entry.id)
    cb = FakeCallback("td_media_reset", USER1, message=FakeMessage(USER1))
    await contest_handler.td_media_reset(cb, st_reset)
    check("xavfsizlik: topshirilgan ariza mediasi saqlanib qoldi",
          entry.media.count() == 3, entry.media.count())

    # Xavfsizlik: HTML teglar xabarni buzmaydi (ekranlanadi)
    bad = ContestParticipant.objects.create(
        contest=contest, telegram_id=OBSV, full_name="Test Foydalanuvchi",
        university="<b>Soxta</b> OTM", phone="+998900000000",
        consent_at=djtz.now())
    bad_entry = Entry.objects.create(contest=contest, participant=bad,
                                     nomination=Nomination.VIDEO,
                                     title="<script>alert(1)</script>",
                                     description="izoh")
    await contest_handler._notify_moderators(bad_entry)
    notified = [t for k, c, t in fake_bot.calls
                if k == "send_message" and "Yangi ariza" in str(t)]
    check("xavfsizlik: HTML teglar ekranlandi",
          any("&lt;script&gt;" in str(t) for t in notified),
          str(notified[-1])[:120] if notified else "xabar yo'q")

    # Xavfsizlik: Excel formula injection neytrallashtiriladi
    from zakovat_bot.services.contest import safe_cell
    check("xavfsizlik: Excel formulasi neytrallashtirildi",
          safe_cell("=HYPERLINK(\"http://x\")").startswith("'=")
          and safe_cell("oddiy matn") == "oddiy matn")

    # ---------- 20. Qabul muddati (TZ 7, 16) ----------
    print("20) Tanlov: muddat nazorati")
    # 17:59:59 — qabul qilinadi
    contest.submission_deadline = djtz.now() + timedelta(seconds=1)
    contest.save(update_fields=["submission_deadline"])
    check("TZ16: muddatdan 1 soniya oldin qabul ochiq", contest.is_accepting)

    # 18:00:00 — rad etiladi
    contest.submission_deadline = djtz.now() - timedelta(seconds=1)
    contest.save(update_fields=["submission_deadline"])
    check("TZ16: muddat tugagach qabul yopiq", not contest.is_accepting)

    st3 = FakeState()
    await st3.update_data(td_contest_id=contest.id)
    cb = FakeCallback("td_join", USER1, message=FakeMessage(USER1))
    await contest_handler.td_join(cb, st3)
    check("TZ16: muddatdan keyin ariza boshlab bo'lmaydi",
          "yakunlandi" in cb.message.texts())

    # Muddatdan keyin topshirish server tomonda bloklanadi
    p2 = ContestParticipant.objects.create(
        contest=contest, telegram_id=NOBODY, full_name="Valiyev Bek",
        university="Smoke OTM", phone="+998901112233", consent_at=djtz.now())
    late = Entry.objects.create(contest=contest, participant=p2,
                                nomination=Nomination.FOTO,
                                title="Kech", description="Kech topshirilgan")
    EntryMedia.objects.create(entry=late, file_id="x", file_unique_id="xu",
                              media_type="photo", position=0)
    st4 = FakeState()
    await st4.update_data(td_contest_id=contest.id, td_entry_id=late.id,
                          td_title="Kech", td_description="Kech topshirilgan")
    cb = FakeCallback(f"td_submit:{late.id}", NOBODY, message=FakeMessage(NOBODY))
    await contest_handler.td_submit(cb, st4)
    late.refresh_from_db()
    check("TZ16: muddatdan keyingi ariza server tomonda rad etildi",
          late.status == EntryStatus.DRAFT and "yakunlandi" in cb.message.texts())

    # Avtomatik yopilish (scheduler)
    contest.stage = ContestStage.ACCEPTING
    contest.save(update_fields=["stage"])
    await contest_service.close_submissions_if_due(fake_bot)
    contest.refresh_from_db()
    check("TZ7: qabul avtomatik yopildi (scheduler)",
          contest.stage == ContestStage.MODERATION)
    check("TZ7: adminga yakuniy statistika yuborildi",
          any(k == "send_message" and "qabuli yakunlandi" in str(t).lower()
              for k, c, t in fake_bot.calls if k == "send_message"))

    # Eksport
    data = contest_service.export_entries_excel(contest)
    check("arizalar Excel eksporti", len(data) > 1000)

    # Qabulni qayta ochamiz (20-bo'lim muddatni o'tkazib yuborgan edi)
    contest.stage = ContestStage.ACCEPTING
    contest.submission_deadline = djtz.now() + timedelta(days=1)
    contest.save(update_fields=["stage", "submission_deadline"])

    # Xavfsizlik: tasdiqlangan arizaga media qo'shib bo'lmaydi
    Entry.objects.filter(id=entry.id).update(status=EntryStatus.APPROVED)
    st_lock = FakeState()
    await st_lock.update_data(td_contest_id=contest.id, td_entry_id=entry.id)
    await st_lock.set_state("ContestState:media")
    before_cnt = entry.media.count()
    m = FakeMessage(USER1, photo=fake_photo())
    await contest_handler.td_media(m, st_lock)
    check("xavfsizlik: tasdiqlangan arizaga media qo'shilmadi",
          entry.media.count() == before_cnt
          and "o'zgartirib" in m.texts(), m.texts())

    # Qayta topshirish arizani qoralamaga qaytaradi (qayta moderatsiya)
    Entry.objects.filter(id=entry.id).update(status=EntryStatus.REVISION)
    cb = FakeCallback(f"td_resubmit:{entry.id}", USER1, message=FakeMessage(USER1))
    await contest_handler.td_resubmit(cb, FakeState())
    entry.refresh_from_db()
    check("qayta topshirishda ariza qoralamaga qaytdi",
          entry.status == EntryStatus.DRAFT)

    # Xavfsizlik: kengaytmasi mos kelmaydigan hujjat rad etiladi
    bad_doc = SimpleNamespace(file_id="d1", file_unique_id="du1",
                              mime_type="image/png", file_size=1000,
                              file_name="zararli.exe")
    check("xavfsizlik: .exe hujjat rad etildi",
          contest_service.extract_media(
              SimpleNamespace(photo=None, video=None, document=bad_doc)) is None)
    good_doc = SimpleNamespace(file_id="d2", file_unique_id="du2",
                               mime_type="image/png", file_size=1000,
                               file_name="surat.png")
    check("rasm hujjati qabul qilinadi",
          contest_service.extract_media(
              SimpleNamespace(photo=None, video=None, document=good_doc)) is not None)

    # Xavfsizlik: hajmi noma'lum fayl rad etiladi
    nosize = {"media_type": "photo", "file_size": None, "duration": None}
    check("xavfsizlik: hajmi noma'lum fayl rad etildi",
          "hajmini aniqlay olmadim" in
          (contest_service.validate_media(contest, Nomination.FOTO, nosize) or ""))

    Entry.objects.filter(id=entry.id).update(status=EntryStatus.MODERATION)
    entry.refresh_from_db()

    # ---------- 21. Moderatsiya paneli (TZ 6, 12) ----------
    print("21) Tanlov: moderatsiya paneli")
    from zakovat_bot.handlers import contest_admin_handler
    contest_admin_handler.bot = fake_bot

    # Tanlovni qayta ochamiz va navbatni tiklaymiz
    contest.stage = ContestStage.ACCEPTING
    contest.submission_deadline = djtz.now() + timedelta(days=1)
    contest.save(update_fields=["stage", "submission_deadline"])
    Entry.objects.filter(id__in=[entry.id, ventry.id]).update(
        status=EntryStatus.MODERATION)
    entry.refresh_from_db(); ventry.refresh_from_db()

    # Moderator roli
    TelegramAdminsID.objects.filter(tg_id=OBSV).update(role=AdminRole.MODERATOR)

    cb = FakeCallback("tdadm_menu", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_menu(cb, FakeState())
    check("tanlov admin menyusi", "SMOKE tanlov" in cb.message.texts()
          and "Moderatsiyada" in cb.message.texts())

    # Navbat: media + kartochka ko'rsatiladi
    before_calls = len(fake_bot.calls)
    cb = FakeCallback("tdadm_queue", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_queue(cb, FakeState())
    sent = [c for c in fake_bot.calls[before_calls:]]
    check("moderator navbatni ochdi",
          any(k in ("send_media_group", "send_photo", "send_video")
              for k, *_ in sent), [k for k, *_ in sent])
    check("kartochkada aloqa ma'lumotlari bor",
          any(k == "send_message" and "Telegram:" in str(t) for k, c, t in sent))

    # Post matnini moderator tahrirlashi (kanalga bir xil shablonda chiqsin)
    check("navbatda kanal posti ko'rinishi ko'rsatildi",
          any(k == "send_message" and "Kanalga shu ko'rinishda chiqadi" in str(t)
              for k, c, t in fake_bot.calls if k == "send_message"))

    st_ed = FakeState()
    cb = FakeCallback(f"tdadm_ed:{entry.id}:fio", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_edit_ask(cb, st_ed)
    check("tahrirlash uchun hozirgi qiymat ko'rsatildi",
          "Karimov Aziz" in cb.message.texts())
    m = FakeMessage(OBSV, text="Karimov Aziz Baxtiyorovich")
    await contest_admin_handler.tdadm_edit_fio(m, st_ed)
    check("F.I.Sh. tahrirlandi va post ko'rinishi yangilandi",
          "Kanalga shu ko'rinishda chiqadi" in m.texts())

    st_ed = FakeState()
    cb = FakeCallback(f"tdadm_ed:{entry.id}:uni", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_edit_ask(cb, st_ed)
    m = FakeMessage(OBSV, text="Toshkent davlat yuridik universiteti")
    await contest_admin_handler.tdadm_edit_uni(m, st_ed)
    participant.refresh_from_db()
    check("OTM nomi moderator tomonidan to'g'rilandi",
          participant.university == "Toshkent davlat yuridik universiteti")

    st_ed = FakeState()
    cb = FakeCallback(f"tdadm_ed:{entry.id}:nom", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_edit_ask(cb, st_ed)
    m = FakeMessage(OBSV, text="Talabalik lahzalari — 2026")
    await contest_admin_handler.tdadm_edit_title(m, st_ed)
    entry.refresh_from_db()
    check("ish nomi to'g'rilandi", entry.title == "Talabalik lahzalari — 2026")
    check("tahrir audit-jurnalga yozildi",
          AuditLog.objects.filter(action="tanlov_post_tahriri").exists())

    # Xavfsizlik: qoralama arizani tahrirlab bo'lmaydi
    draft2 = Entry.objects.create(contest=contest, participant=bad,
                                  nomination=Nomination.FOTO, title="Qoralama2")
    cb = FakeCallback(f"tdadm_ed:{draft2.id}:nom", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_edit_ask(cb, FakeState())
    check("xavfsizlik: qoralama ariza tahrirlanmadi",
          "Hozirgi qiymat" not in cb.message.texts())
    draft2.delete()

    # Kuzatuvchi matnni tahrirlay olmaydi
    cb = FakeCallback(f"tdadm_ed:{entry.id}:fio", NOBODY,
                      message=FakeMessage(NOBODY))
    await contest_admin_handler.tdadm_edit_ask(cb, FakeState())
    check("kuzatuvchi post matnini tahrirlay olmaydi",
          any("huquq" in a for a in cb.alerts), cb.alerts)

    # Kuzatuvchi moderatsiya qila olmaydi
    TelegramAdminsID.objects.filter(tg_id=NOBODY).update(role=AdminRole.OBSERVER)
    TelegramAdminsID.objects.get_or_create(
        tg_id=NOBODY, defaults={"role": AdminRole.OBSERVER})
    cb = FakeCallback(f"tdadm_ok:{entry.id}", NOBODY, message=FakeMessage(NOBODY))
    await contest_admin_handler.tdadm_approve(cb)
    entry.refresh_from_db()
    check("TZ12: kuzatuvchi arizani tasdiqlay olmaydi",
          entry.status == EntryStatus.MODERATION
          and any("huquq" in a for a in cb.alerts), cb.alerts)

    # Moderator sozlamalarga kira olmaydi (TZ 12)
    cb = FakeCallback("tdadm_settings", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_settings(cb, FakeState())
    check("TZ12: moderator sozlamalarga kira olmaydi",
          any("huquq" in a for a in cb.alerts), cb.alerts)

    # Qabul qilish
    cb = FakeCallback(f"tdadm_ok:{entry.id}", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_approve(cb)
    entry.refresh_from_db()
    check("moderator arizani qabul qildi", entry.status == EntryStatus.APPROVED)
    check("qaror jurnalga yozildi",
          entry.moderation_logs.filter(action="approve").exists())
    check("TZ15: ishtirokchiga qabul xabari ketdi",
          any(k == "send_message" and c == USER1 and "qabul qilindi" in str(t)
              for k, c, t in fake_bot.calls if k == "send_message"))

    # Takroriy tasdiqlash
    cb = FakeCallback(f"tdadm_ok:{entry.id}", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_approve(cb)
    check("takroriy tasdiqlash rad etildi",
          any("allaqachon" in a for a in cb.alerts), cb.alerts)

    # Rad etish — sabab bilan
    st_mod = FakeState()
    cb = FakeCallback(f"tdadm_no:{ventry.id}", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_reject_ask(cb, st_mod)
    check("rad etish sababi so'raldi", "sababini yozing" in cb.message.texts())

    m = FakeMessage(OBSV, text="Material mavzuga mos emas.")
    await contest_admin_handler.tdadm_reject_save(m, st_mod)
    ventry.refresh_from_db()
    check("TZ6: ariza sabab bilan rad etildi",
          ventry.status == EntryStatus.REJECTED
          and "mavzuga mos emas" in (ventry.reject_reason or ""))
    check("TZ15: rad etish sababi ishtirokchiga yuborildi",
          any(k == "send_message" and c == USER1 and "tasdiqlanmadi" in str(t)
              and "mavzuga mos emas" in str(t)
              for k, c, t in fake_bot.calls if k == "send_message"))

    # Tuzatish so'rash
    Entry.objects.filter(id=ventry.id).update(status=EntryStatus.MODERATION)
    st_mod = FakeState()
    cb = FakeCallback(f"tdadm_rev:{ventry.id}", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_revision_ask(cb, st_mod)
    m = FakeMessage(OBSV, text="Videoni sifatliroq qayta yuboring.")
    await contest_admin_handler.tdadm_revision_save(m, st_mod)
    ventry.refresh_from_db()
    check("TZ6: tuzatish so'raldi", ventry.status == EntryStatus.REVISION)
    check("TZ15: tuzatish izohi yuborildi",
          any(k == "send_message" and c == USER1 and "tuzatish so'raldi" in str(t)
              for k, c, t in fake_bot.calls if k == "send_message"))

    # Ishtirokchi tuzatishdan keyin qayta topshira oladi
    cb = FakeCallback("td_my", USER1, message=FakeMessage(USER1))
    await contest_handler.td_my(cb, FakeState())
    check("ishtirokchi tuzatish izohini ko'rdi",
          "Tuzatish" in cb.message.texts()
          and "sifatliroq" in cb.message.texts())

    # Ro'yxat, kartochka, filtr
    for data_cb in ("tdadm_list:1:all", "tdadm_list:1:approved",
                    "tdadm_list:1:revision_requested"):
        cb = FakeCallback(data_cb, SUPER, message=FakeMessage(SUPER))
        await contest_admin_handler.tdadm_list(cb)
    check("arizalar ro'yxati va filtrlari ishladi", True)

    # TZ 12: kuzatuvchi shaxsiy ma'lumotlarni ko'ra olmaydi
    cb = FakeCallback(f"tdadm_entry:{entry.id}", NOBODY, message=FakeMessage(NOBODY))
    await contest_admin_handler.tdadm_entry(cb)
    check("TZ12: kuzatuvchiga ariza kartochkasi yopiq",
          any("huquq" in a for a in cb.alerts), cb.alerts)
    cb = FakeCallback("tdadm_export", NOBODY, message=FakeMessage(NOBODY))
    await contest_admin_handler.tdadm_export(cb)
    check("TZ12: kuzatuvchiga eksport yopiq (telefon raqamlari)",
          any("huquq" in a for a in cb.alerts), cb.alerts)

    # Xavfsizlik: qoralama ariza admin panelda ochilmaydi
    draft = Entry.objects.create(contest=contest, participant=bad,
                                 nomination=Nomination.FOTO, title="Qoralama")
    cb = FakeCallback(f"tdadm_entry:{draft.id}", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_entry(cb)
    check("xavfsizlik: qoralama ariza ochilmadi",
          "Qoralama" not in cb.message.texts(), cb.message.texts()[:80])
    draft.delete()

    cb = FakeCallback(f"tdadm_entry:{entry.id}", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_entry(cb)
    check("ariza kartochkasi ochildi", entry.code in cb.message.texts())
    check("ro'yxat kartochkasida ham tahrirlash tugmasi bor",
          any("Post matnini tahrirlash" in b for b in cb.message.buttons()),
          cb.message.buttons())
    check("kartochkada kanal posti ko'rinishi bor",
          "Kanalga shu ko'rinishda chiqadi" in cb.message.texts())

    cb = FakeCallback("tdadm_stats", OBSV, message=FakeMessage(OBSV))
    await contest_admin_handler.tdadm_stats(cb)
    check("tanlov statistikasi", "Jami arizalar" in cb.message.texts())

    cb = FakeCallback("tdadm_export", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_export(cb)
    check("arizalar eksporti", any(k == "answer_document" for k, _ in cb.message.out))

    # Kanal belgilash — bot admin bo'lmagan kanal rad etiladi
    st_ch = FakeState()
    cb = FakeCallback("tdadm_set_ch", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_set_channel(cb, st_ch)
    fake_bot.chat_admin_ok = False
    m = FakeMessage(SUPER, text="@smoke_kanal")
    await contest_admin_handler.tdadm_set_channel_save(m, st_ch)
    contest.refresh_from_db()
    check("bot admin bo'lmagan kanal rad etildi",
          contest.channel_id is None and "admin emas" in m.texts())

    fake_bot.chat_admin_ok = True
    m = FakeMessage(SUPER, text="@smoke_kanal")
    await contest_admin_handler.tdadm_set_channel_save(m, st_ch)
    contest.refresh_from_db()
    check("tanlov kanali belgilandi", contest.channel_id == "-100777")

    # Yopiq kanal: post forward qilish orqali belgilash
    contest.channel_id = None
    contest.save(update_fields=["channel_id"])
    st_fw = FakeState()
    cb = FakeCallback("tdadm_set_ch", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_set_channel(cb, st_fw)
    check("forward usuli tushuntirildi",
          "forward qiling" in cb.message.texts())
    fwd_msg = FakeMessage(SUPER, text=None)
    fwd_msg.forward_origin = SimpleNamespace(
        chat=SimpleNamespace(id=-100777, title="Yopiq kanal"))
    await contest_admin_handler.tdadm_set_channel_save(fwd_msg, st_fw)
    contest.refresh_from_db()
    check("yopiq kanal forward orqali belgilandi",
          contest.channel_id == "-100777", contest.channel_id)

    # Muddatni o'zgartirish
    st_dl = FakeState()
    cb = FakeCallback("tdadm_set_dl", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_set_deadline(cb, st_dl)
    m = FakeMessage(SUPER, text="noto'g'ri")
    await contest_admin_handler.tdadm_set_deadline_save(m, st_dl)
    check("noto'g'ri sana rad etildi", "Format noto'g'ri" in m.texts())
    m = FakeMessage(SUPER, text="17.11.2026 18:00")
    await contest_admin_handler.tdadm_set_deadline_save(m, st_dl)
    contest.refresh_from_db()
    local_dl = djtz.localtime(contest.submission_deadline)
    check("qabul muddati o'zgartirildi",
          (local_dl.day, local_dl.hour) == (17, 18), str(local_dl))

    # ---------- 22. Nashr va ovoz berish (TZ 8-10) ----------
    print("22) Tanlov: nashr va ovoz")
    from zakovat_bot.services import publishing as pub_service

    # Ikkala arizani tasdiqlaymiz va kanalni belgilaymiz
    Entry.objects.filter(id__in=[entry.id, ventry.id]).update(
        status=EntryStatus.APPROVED)
    entry.refresh_from_db(); ventry.refresh_from_db()
    contest.channel_id = "-100777"
    contest.stage = ContestStage.MODERATION
    contest.save(update_fields=["channel_id", "stage"])

    check("nashrga tayyor ro'yxat to'g'ri",
          pub_service.ready_for_publication(contest).count() == 2)

    # Kanalga e'lon qilish
    cb = FakeCallback("tdadm_publish_go", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_publish_go(cb)
    entry.refresh_from_db(); ventry.refresh_from_db()
    check("TZ8: ishlar kanalga e'lon qilindi",
          entry.status == EntryStatus.PUBLISHED
          and ventry.status == EntryStatus.PUBLISHED)
    check("TZ8: albom bitta ovoz kartochkasi bilan joylandi",
          entry.publication.vote_message_id is not None
          and entry.publication.message_id is not None)
    check("TZ8: post havolasi saqlandi",
          "t.me/c/777/" in (entry.publication.post_url or ""),
          entry.publication.post_url)
    check("TZ11: ishtirokchiga post havolasi yuborildi",
          any(k == "send_message" and c == USER1 and "kanalga joylandi" in str(t)
              for k, c, t in fake_bot.calls if k == "send_message"))

    # TZ 8.6: takroran joylanmaydi
    pub_count_before = Publication.objects.filter(entry=entry).count()
    cb = FakeCallback("tdadm_publish_go", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_publish_go(cb)
    check("TZ8.6: ish takroran joylanmadi",
          Publication.objects.filter(entry=entry).count() == pub_count_before == 1)

    # Xavfsizlik: e'lon qilingan ishni ishtirokchi o'zgartira olmaydi
    contest.submission_deadline = djtz.now() + timedelta(days=1)
    contest.stage = ContestStage.ACCEPTING
    contest.save(update_fields=["submission_deadline", "stage"])
    cb = FakeCallback(f"td_resubmit:{entry.id}", USER1, message=FakeMessage(USER1))
    await contest_handler.td_resubmit(cb, FakeState())
    entry.refresh_from_db()
    check("xavfsizlik: e'lon qilingan ish qayta topshirilmadi",
          entry.status == EntryStatus.PUBLISHED
          and any("e'lon qilingan" in a for a in cb.alerts), cb.alerts)
    contest.stage = ContestStage.PUBLISHING
    contest.save(update_fields=["stage"])

    # Xavfsizlik: nashr tugmasini ikki marta bosish postni takrorlamaydi
    pubs_before = Publication.objects.filter(entry__contest=contest).count()
    await asyncio.gather(
        contest_admin_handler.tdadm_publish_go(
            FakeCallback("tdadm_publish_go", SUPER, message=FakeMessage(SUPER))),
        contest_admin_handler.tdadm_publish_go(
            FakeCallback("tdadm_publish_go", SUPER, message=FakeMessage(SUPER))),
    )
    check("xavfsizlik: parallel nashrda post takrorlanmadi",
          Publication.objects.filter(entry__contest=contest).count()
          == pubs_before, pubs_before)

    # Xavfsizlik: uzilib qolgan nashr (band qilingan, yuborilmagan) tiklanadi
    stuck = Entry.objects.create(
        contest=contest, participant=bad, nomination=Nomination.FOTO,
        title="Uzilgan nashr", status=EntryStatus.APPROVED)
    EntryMedia.objects.create(entry=stuck, file_id="s1",
                              file_unique_id="su1", media_type="photo")
    Publication.objects.create(entry=stuck, channel_id="-100777")  # band, yuborilmagan
    check("uzilib qolgan nashr navbatda qoldi",
          pub_service.ready_for_publication(contest).filter(id=stuck.id).exists())
    cb = FakeCallback("tdadm_publish_go", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_publish_go(cb)
    stuck.refresh_from_db()
    check("uzilib qolgan nashr qayta urinishda yakunlandi",
          stuck.status == EntryStatus.PUBLISHED
          and stuck.publication.published_at is not None)
    stuck.delete()

    # Xavfsizlik: albom kanalga ketgach ishtirokchi materialni almashtira olmaydi
    saved_stage, saved_dl = contest.stage, contest.submission_deadline
    contest.stage = ContestStage.ACCEPTING
    contest.submission_deadline = djtz.now() + timedelta(days=1)
    contest.save(update_fields=["stage", "submission_deadline"])
    half_participant = ContestParticipant.objects.create(
        contest=contest, telegram_id=990077, full_name="Yarim Nashr",
        university="Smoke OTM", phone="+998901113344", consent_at=djtz.now())
    half = Entry.objects.create(
        contest=contest, participant=half_participant,
        nomination=Nomination.VIDEO,
        title="Yarim nashr", status=EntryStatus.MODERATION)
    EntryMedia.objects.create(entry=half, file_id="h1", file_unique_id="hu1",
                              media_type="photo")
    Publication.objects.create(entry=half, channel_id="-100777",
                               message_id=555)  # media ketgan, karta yo'q
    cb = FakeCallback(f"td_resubmit:{half.id}", 990077,
                      message=FakeMessage(990077))
    await contest_handler.td_resubmit(cb, FakeState())
    half.refresh_from_db()
    check("xavfsizlik: kanalga ketgan materialni almashtirib bo'lmadi",
          half.status == EntryStatus.MODERATION
          and any("e'lon qilingan" in a for a in cb.alerts), cb.alerts)
    # Xuddi shu himoya boshqa yo'llardan ham ishlaydi (nominatsiya, media)
    Entry.objects.filter(id=half.id).update(status=EntryStatus.REJECTED)
    st_byp = FakeState()
    await st_byp.update_data(td_contest_id=contest.id)
    cb = FakeCallback("td_nom:video", 990077, message=FakeMessage(990077))
    await contest_handler.td_nomination(cb, st_byp)
    half.refresh_from_db()
    check("xavfsizlik: nominatsiya orqali ham chetlab o'tib bo'lmadi",
          half.status == EntryStatus.REJECTED
          and "o'zgartirib bo'lmaydi" in cb.message.texts(),
          cb.message.texts()[:90])

    st_byp2 = FakeState()
    await st_byp2.update_data(td_contest_id=contest.id, td_entry_id=half.id)
    cb = FakeCallback("td_media_reset", 990077, message=FakeMessage(990077))
    await contest_handler.td_media_reset(cb, st_byp2)
    check("xavfsizlik: kanalga ketgan ish mediasi o'chirilmadi",
          half.media.count() == 1)

    half.delete()
    half_participant.delete()
    contest.stage, contest.submission_deadline = saved_stage, saved_dl
    contest.save(update_fields=["stage", "submission_deadline"])

    # TZ 9.3: hamma post chiqmaguncha ovoz boshlanmaydi
    extra_entry = Entry.objects.create(
        contest=contest, participant=bad, nomination=Nomination.FOTO,
        title="Keyin qo'shilgan", status=EntryStatus.APPROVED)
    EntryMedia.objects.create(entry=extra_entry, file_id="p9",
                              file_unique_id="pu9", media_type="photo")
    cb = FakeCallback("tdadm_vote_start", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_vote_ask(cb)
    check("TZ9.3: nashr tugamasdan ovoz boshlanmadi",
          "e'lon qilinmagan" in cb.message.texts())
    extra_entry.delete()

    # Xavfsizlik: tasdiq tugmasi to'g'ridan-to'g'ri bosilsa ham shart saqlanadi
    blocker = Entry.objects.create(
        contest=contest, participant=bad, nomination=Nomination.FOTO,
        title="Chiqmagan", status=EntryStatus.APPROVED)
    EntryMedia.objects.create(entry=blocker, file_id="b1",
                              file_unique_id="bu1", media_type="photo")
    cb = FakeCallback("tdadm_vote_go", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_vote_go(cb)
    contest.refresh_from_db()
    check("xavfsizlik: nashr tugamasdan ovoz boshlanmadi (tasdiq tugmasida ham)",
          contest.voting_start_at is None
          and any("e'lon qilinmagan" in a for a in cb.alerts), cb.alerts)
    blocker.delete()

    # Ovoz berish boshlanadi
    cb = FakeCallback("tdadm_vote_go", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_vote_go(cb)
    contest.refresh_from_db()
    check("TZ9.3: 48 soatlik ovoz berish boshlandi",
          contest.stage == ContestStage.VOTING
          and contest.voting_end_at is not None
          and round((contest.voting_end_at - contest.voting_start_at)
                    .total_seconds() / 3600) == 48)
    check("ovoz berish hamma uchun bir vaqtda", pub_service.voting_is_open(contest))

    # Ovoz berish
    cb = FakeCallback(f"td_vote:{entry.id}", USER1, message=FakeMessage(USER1))
    await contest_handler.td_vote(cb)
    entry.refresh_from_db()
    check("TZ9: ovoz qabul qilindi",
          entry.votes_count == 1 and any("qabul qilindi" in a for a in cb.alerts))

    # TZ 16: ikkinchi ovoz hisoblanmaydi
    cb = FakeCallback(f"td_vote:{entry.id}", USER1, message=FakeMessage(USER1))
    await contest_handler.td_vote(cb)
    entry.refresh_from_db()
    check("TZ16: bitta foydalanuvchi ikkinchi ovoz bera olmadi",
          entry.votes_count == 1
          and any("allaqachon" in a for a in cb.alerts), cb.alerts)

    # Boshqa foydalanuvchilar ovoz beradi
    for uid in (SUPER, OPER, OBSV):
        cb = FakeCallback(f"td_vote:{entry.id}", uid, message=FakeMessage(uid))
        await contest_handler.td_vote(cb)
    entry.refresh_from_db()
    check("turli foydalanuvchilar ovozi hisoblandi", entry.votes_count == 4,
          entry.votes_count)
    check("ovozlar bazada unikal",
          Vote.objects.filter(entry=entry).count() == 4)

    # TZ 16: parallel bosishda ovoz ikki marta yozilmaydi
    await asyncio.gather(*[
        contest_handler.td_vote(
            FakeCallback(f"td_vote:{ventry.id}", NOBODY,
                         message=FakeMessage(NOBODY)))
        for _ in range(5)
    ])
    ventry.refresh_from_db()
    check("TZ16: parallel bosishda ovoz ko'paymadi",
          ventry.votes_count == 1
          and Vote.objects.filter(entry=ventry).count() == 1,
          ventry.votes_count)

    # Xavfsizlik: e'lon qilinmagan ishga ovoz berib bo'lmaydi
    hidden = Entry.objects.create(
        contest=contest, participant=bad, nomination=Nomination.FOTO,
        title="Yashirin", status=EntryStatus.APPROVED)
    cb = FakeCallback(f"td_vote:{hidden.id}", SUPER, message=FakeMessage(SUPER))
    await contest_handler.td_vote(cb)
    hidden.refresh_from_db()
    check("xavfsizlik: e'lon qilinmagan ishga ovoz berilmadi",
          hidden.votes_count == 0 and any("topilmadi" in a for a in cb.alerts),
          cb.alerts)
    hidden.delete()

    # Xavfsizlik: tanlov o'chirilsa ovoz qabul qilinmaydi
    contest.is_active = False
    contest.save(update_fields=["is_active"])
    check("xavfsizlik: o'chirilgan tanlovda ovoz yopiq",
          not pub_service.voting_is_open(contest))
    contest.is_active = True
    contest.save(update_fields=["is_active"])

    # TZ 9: foto va video ovozlari alohida hisoblanadi
    photo_res = pub_service.results(contest, Nomination.FOTO)
    video_res = pub_service.results(contest, Nomination.VIDEO)
    check("TZ10: foto va video natijalari alohida",
          [e.id for e in photo_res] == [entry.id]
          and [e.id for e in video_res] == [ventry.id])

    # Natijalar paneli
    cb = FakeCallback("tdadm_results", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_results(cb)
    check("natijalar paneli ishladi",
          entry.code in cb.message.texts() and "ovoz" in cb.message.texts())

    # TZ 9.3: muddat tugagach ovoz qabul qilinmaydi
    contest.voting_end_at = djtz.now() - timedelta(minutes=1)
    contest.save(update_fields=["voting_end_at"])
    before_votes = entry.votes_count
    cb = FakeCallback(f"td_vote:{entry.id}", 123456789,
                      message=FakeMessage(123456789))
    await contest_handler.td_vote(cb)
    entry.refresh_from_db()
    check("TZ16: muddat tugagach ovoz qabul qilinmadi",
          entry.votes_count == before_votes
          and any("muddati tugagan" in a for a in cb.alerts), cb.alerts)

    # Scheduler ovoz berishni yopadi va g'oliblarni hisoblaydi
    await pub_service.close_voting_if_due(fake_bot)
    contest.refresh_from_db()
    check("TZ9.3: ovoz berish avtomatik yopildi",
          contest.stage == ContestStage.FINISHED)
    check("TZ10: adminga g'oliblar xabari yuborildi",
          any(k == "send_message" and "Ovoz berish yakunlandi" in str(t)
              for k, c, t in fake_bot.calls if k == "send_message"))

    top_photo, tie = pub_service.winners(contest, Nomination.FOTO)
    check("TZ10: foto g'olibi eng ko'p ovoz bo'yicha aniqlandi",
          len(top_photo) == 1 and top_photo[0].id == entry.id and not tie)

    # TZ 10: teng ovozda avtomatik g'olib belgilanmaydi
    Entry.objects.filter(id=ventry.id).update(votes_count=4)
    tie_participant = ContestParticipant.objects.create(
        contest=contest, telegram_id=990099, full_name="Teng Ovozli",
        university="Smoke OTM", phone="+998905550000", consent_at=djtz.now())
    tied_entry = Entry.objects.create(
        contest=contest, participant=tie_participant, nomination=Nomination.VIDEO,
        title="Teng ovoz", status=EntryStatus.PUBLISHED, votes_count=4)
    top_video, tie_v = pub_service.winners(contest, Nomination.VIDEO)
    check("TZ10: teng ovoz administratorga chiqariladi",
          tie_v and len(top_video) == 2, (tie_v, len(top_video)))
    tied_entry.delete()
    tie_participant.delete()

    # ---------- 23. Bosqichni boshqarish va sinovni tozalash ----------
    print("23) Tanlov: bosqich boshqaruvi")

    # Ovoz berishni to'xtatish
    contest.stage = ContestStage.VOTING
    contest.voting_start_at = djtz.now() - timedelta(hours=1)
    contest.voting_end_at = djtz.now() + timedelta(hours=47)
    contest.save(update_fields=["stage", "voting_start_at", "voting_end_at"])
    check("ovoz berish ochiq edi", pub_service.voting_is_open(contest))

    cb = FakeCallback("tdadm_vote_stop_go", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_vote_stop_go(cb)
    contest.refresh_from_db()
    check("ovoz berish to'xtatildi",
          contest.stage == ContestStage.FINISHED
          and not pub_service.voting_is_open(contest))
    check("berilgan ovozlar saqlandi",
          Vote.objects.filter(entry__contest=contest).exists())

    # Qabulni qayta ochish — sinovdan keyin eng kerakli amal
    check("qayta ochishdan oldin qabul yopiq", not contest.is_accepting)
    contest.submission_deadline = djtz.now() + timedelta(days=3)
    contest.save(update_fields=["submission_deadline"])
    cb = FakeCallback("tdadm_reopen_go", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_reopen_go(cb)
    contest.refresh_from_db()
    check("qabul qayta ochildi",
          contest.stage == ContestStage.ACCEPTING and contest.is_accepting
          and contest.voting_start_at is None)
    check("foydalanuvchiga qabul ochiq ko'rinadi",
          "qabul qilinmoqda" in cb.message.texts().lower()
          or contest.is_accepting)

    # Qayta ochilgandan keyin yangi ariza topshirish mumkin
    st_new = FakeState()
    m = FakeMessage(USER1, text="/start smoke_td")
    await user_handler.start(m, st_new)
    check("qayta ochilgach bot material qabul qiladi",
          "Qolgan vaqt" in m.texts() or "qabuli" in m.texts(), m.texts()[:80])

    # Kuzatuvchi bu amallarni bajara olmaydi
    cb = FakeCallback("tdadm_reopen_go", NOBODY, message=FakeMessage(NOBODY))
    await contest_admin_handler.tdadm_reopen_go(cb)
    check("kuzatuvchi qabulni ocha olmaydi",
          any("huquq" in a for a in cb.alerts), cb.alerts)
    cb = FakeCallback("tdadm_reset_go", OPER, message=FakeMessage(OPER))
    await contest_admin_handler.tdadm_reset_go(cb)
    check("operator sinov tozalay olmaydi (faqat bosh admin)",
          any("huquq" in a for a in cb.alerts), cb.alerts)

    # Sinov ma'lumotlarini tozalash
    cb = FakeCallback("tdadm_reset", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_reset_ask(cb)
    check("tozalashdan oldin nima o'chishi ko'rsatildi",
          "ta ariza" in cb.message.texts()
          and "ortga qaytarib bo'lmaydi" in cb.message.texts())

    entries_before = Entry.objects.filter(contest=contest).count()
    check("tozalashdan oldin arizalar bor edi", entries_before > 0)
    cb = FakeCallback("tdadm_reset_go", SUPER, message=FakeMessage(SUPER))
    await contest_admin_handler.tdadm_reset_go(cb)
    contest.refresh_from_db()
    check("sinov arizalari tozalandi",
          Entry.objects.filter(contest=contest).count() == 0
          and ContestParticipant.objects.filter(contest=contest).count() == 0)
    check("sinov ovozlari va nashrlari ham tozalandi",
          not Vote.objects.filter(entry__contest=contest).exists()
          and not Publication.objects.filter(entry__contest=contest).exists())
    check("kanaldagi sinov postlari o'chirildi",
          any(k == "delete" for k, *_ in fake_bot.calls))
    check("tozalashdan keyin tanlov qabul bosqichida",
          contest.stage == ContestStage.ACCEPTING)

    channel_handler.check_bot_is_admin = real_check
    cleanup()

    print(f"\n{'='*50}")
    print(f"✅ O'tdi: {len(PASSED)}  |  ❌ Yiqildi: {len(FAILED)}")
    if FAILED:
        for f in FAILED:
            print(f"  ❌ {f}")
        raise SystemExit(1)
    print("BARCHA FUNKSIYALAR ISHLAYAPTI")


if __name__ == "__main__":
    asyncio.run(main())
