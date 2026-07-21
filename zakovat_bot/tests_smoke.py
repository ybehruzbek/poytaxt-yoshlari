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
    AdminRole, Answers, AuditLog, Broadcast, BroadcastResult, BroadcastStatus,
    Channel, Questions, TelegramAdminsID, Users,
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

    async def forward_messages(self, chat_id, from_chat_id, message_ids):
        self.calls.append(("forward", chat_id, tuple(message_ids)))
        return [SimpleNamespace(message_id=next(_next_id)) for _ in message_ids]

    async def delete_message(self, chat_id, message_id):
        if message_id in self.fail_delete_ids:
            raise Exception("message to delete not found")
        self.calls.append(("delete", chat_id, message_id))

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
    def __init__(self, user_id, text=None, document=None, contact=None):
        self.from_user = SimpleNamespace(id=user_id, username="smoketest")
        self.chat = SimpleNamespace(id=user_id)
        self.message_id = next(_next_id)
        self.text = text
        self.document = document
        self.contact = contact
        self.audio = self.photo = self.video = self.voice = None
        self.content_type = "document" if document else "text"
        self.out = []

    async def answer(self, text=None, reply_markup=None, **kw):
        self.out.append(("answer", text))
        return FakeMessage(self.from_user.id)

    async def edit_text(self, text=None, reply_markup=None, **kw):
        self.out.append(("edit", text))

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


class FakeCallback:
    def __init__(self, data, user_id, message=None):
        self.data = data
        self.from_user = SimpleNamespace(id=user_id, username="smoketest")
        self.message = message or FakeMessage(user_id)
        self.alerts = []

    async def answer(self, text=None, show_alert=False, **kw):
        if text:
            self.alerts.append(text)


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


async def main():
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
    channel_handler.bot = fake_bot
    broadcast_handler.bot = fake_bot
    admin_handler.bot = fake_bot
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
    check("begonaga rad javobi", "admin emassiz" in m.texts().lower())

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
    st = FakeState()
    m = FakeMessage(USER1, text="/start")
    await user_handler.start(m, st)
    check("yangi foydalanuvchi ro'yxati", Users.objects.filter(tg_id=USER1).exists())
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
