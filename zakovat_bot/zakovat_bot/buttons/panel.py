"""Kanallar bazasi, tarqatish, statistika va adminlar paneli klaviaturalari."""
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder

from zakovat_bot.models import AdminRole, AppealStatus, AppealType, OttType

TYPE_LABELS = {
    OttType.DAVLAT: "Davlat",
    OttType.XORIJIY: "Xorijiy",
    OttType.NODAVLAT: "Nodavlat",
}


def back_to(target, text="🔙 Orqaga"):
    """Bitta «orqaga» tugmali klaviatura — matn kiritish bosqichlaridan
    chiqib ketish uchun (maqsad handler'lari FSM holatini tozalaydi)."""
    kb = InlineKeyboardBuilder()
    kb.button(text=text, callback_data=target)
    return kb.as_markup()


def channels_menu_keyboard(role):
    kb = InlineKeyboardBuilder()
    kb.button(text="📋 Kanallar ro'yxati", callback_data="ch_list:1:all:all")
    if role == AdminRole.SUPERADMIN:
        kb.button(text="➕ Kanal qo'shish", callback_data="ch_add")
        kb.button(text="📥 Excel'dan import", callback_data="ch_imp")
    kb.button(text="📤 Bazani Excel'ga eksport", callback_data="ch_exp")
    kb.button(text="🔙 Orqaga", callback_data="admin_main_menu")
    kb.adjust(1)
    return kb.as_markup()


def channels_list_keyboard(channels, page, total_pages, type_f, status_f):
    kb = InlineKeyboardBuilder()
    for ch in channels:
        mark = "🟢" if ch.is_active else "🔴"
        kb.button(text=f"{mark} {ch.ott_name[:30]}", callback_data=f"ch_det:{ch.id}")
    kb.adjust(1)

    # Filtrlar: OTT turi va holat (TZ 2.1)
    type_row = []
    for value, label in [("all", "Hammasi")] + [(t.value, l) for t, l in TYPE_LABELS.items()]:
        current = "• " if type_f == value else ""
        type_row.append(InlineKeyboardButton(
            text=f"{current}{label}", callback_data=f"ch_list:1:{value}:{status_f}"
        ))
    kb.row(*type_row)

    status_row = []
    for value, label in [("all", "Barcha holat"), ("on", "Faol"), ("off", "Nofaol")]:
        current = "• " if status_f == value else ""
        status_row.append(InlineKeyboardButton(
            text=f"{current}{label}", callback_data=f"ch_list:1:{type_f}:{value}"
        ))
    kb.row(*status_row)

    nav = []
    if page > 1:
        nav.append(InlineKeyboardButton(
            text="⬅️ Oldingi", callback_data=f"ch_list:{page - 1}:{type_f}:{status_f}"))
    if page < total_pages:
        nav.append(InlineKeyboardButton(
            text="Keyingi ➡️", callback_data=f"ch_list:{page + 1}:{type_f}:{status_f}"))
    if nav:
        kb.row(*nav)

    kb.row(InlineKeyboardButton(text="🔙 Orqaga", callback_data="ch_menu"))
    return kb.as_markup()


def channel_detail_keyboard(channel, role):
    kb = InlineKeyboardBuilder()
    if role == AdminRole.SUPERADMIN:
        kb.button(text="✏️ OTT nomi", callback_data=f"ch_edit:{channel.id}:name")
        kb.button(text="🔗 Link/ID", callback_data=f"ch_edit:{channel.id}:link")
        kb.button(text="🏷 Turi", callback_data=f"ch_edit:{channel.id}:type")
        kb.button(text="🔖 Teg", callback_data=f"ch_edit:{channel.id}:tag")
        toggle_text = "🔴 Nofaol qilish" if channel.is_active else "🟢 Faollashtirish"
        kb.button(text=toggle_text, callback_data=f"ch_tgl:{channel.id}")
        kb.button(text="🗑 O'chirish", callback_data=f"ch_del:{channel.id}")
    kb.button(text="🔄 Bot adminligini tekshirish", callback_data=f"ch_chk:{channel.id}")
    kb.button(text="🔙 Ro'yxatga", callback_data="ch_list:1:all:all")
    kb.adjust(2, 2, 2, 1, 1)
    return kb.as_markup()


def ott_type_keyboard(prefix):
    """prefix masalan: 'ch_addtype' yoki 'ch_settype:5'."""
    kb = InlineKeyboardBuilder()
    for t, label in TYPE_LABELS.items():
        kb.button(text=label, callback_data=f"{prefix}:{t.value}")
    kb.button(text="❌ Bekor qilish", callback_data="ch_menu")
    kb.adjust(3, 1)
    return kb.as_markup()


def confirm_delete_keyboard(channel_id):
    kb = InlineKeyboardBuilder()
    kb.button(text="🗑 Ha, o'chirilsin", callback_data=f"ch_delok:{channel_id}")
    kb.button(text="❌ Yo'q", callback_data=f"ch_det:{channel_id}")
    kb.adjust(2)
    return kb.as_markup()


def broadcast_target_keyboard(tags, counts=None):
    """Qamrov tanlash (TZ 4.1): hammasi / tur / teg.
    counts — {"all": N, "davlat": N, ...} bo'lsa tugmalarda kanal soni ko'rsatiladi."""
    counts = counts or {}

    def _n(key):
        return f" ({counts[key]} ta)" if key in counts else ""

    kb = InlineKeyboardBuilder()
    kb.button(text=f"📡 Barcha faol kanallar{_n('all')}", callback_data="bc_tgt:all")
    for t, label in TYPE_LABELS.items():
        kb.button(
            text=f"🏷 Faqat {label}{_n(t.value)}",
            callback_data=f"bc_tgt:type:{t.value}",
        )
    for tag in tags[:10]:
        kb.button(text=f"🔖 {tag}", callback_data=f"bc_tgt:tag:{tag}")
    kb.button(text="❌ Bekor qilish", callback_data="admin_main_menu")
    kb.adjust(1)
    return kb.as_markup()


def broadcast_confirm_keyboard():
    kb = InlineKeyboardBuilder()
    kb.button(text="🚀 Hozir yuborish", callback_data="bc_go")
    kb.button(text="⏰ Rejalashtirish", callback_data="bc_sched")
    kb.button(text="❌ Bekor qilish", callback_data="bc_cancel")
    kb.adjust(1)
    return kb.as_markup()


def scheduled_list_keyboard(broadcasts):
    kb = InlineKeyboardBuilder()
    for b in broadcasts:
        when = b.scheduled_at.strftime("%d.%m %H:%M") if b.scheduled_at else "?"
        kb.button(text=f"⏰ #{b.id} — {when}", callback_data=f"bc_plan:{b.id}")
    kb.button(text="🔙 Orqaga", callback_data="admin_main_menu")
    kb.adjust(1)
    return kb.as_markup()


def scheduled_detail_keyboard(broadcast_id):
    kb = InlineKeyboardBuilder()
    kb.button(text="🚫 Rejani bekor qilish", callback_data=f"bc_plan_cancel:{broadcast_id}")
    kb.button(text="🔙 Orqaga", callback_data="bc_plans")
    kb.adjust(1)
    return kb.as_markup()


def stats_menu_keyboard():
    kb = InlineKeyboardBuilder()
    kb.button(text="🗂 Tarqatishlar tarixi", callback_data="st_history:1")
    kb.button(text="⚠️ Muammoli kanallar", callback_data="st_problems")
    kb.button(text="🔙 Orqaga", callback_data="admin_main_menu")
    kb.adjust(1)
    return kb.as_markup()


def history_keyboard(broadcasts, page, total_pages):
    kb = InlineKeyboardBuilder()
    for b in broadcasts:
        when = b.created_datetime.strftime("%d.%m %H:%M")
        kb.button(
            text=f"#{b.id} {when} — ✅{b.success_count} ❌{b.failed_count}",
            callback_data=f"st_bc:{b.id}",
        )
    kb.adjust(1)
    nav = []
    if page > 1:
        nav.append(InlineKeyboardButton(text="⬅️", callback_data=f"st_history:{page - 1}"))
    if page < total_pages:
        nav.append(InlineKeyboardButton(text="➡️", callback_data=f"st_history:{page + 1}"))
    if nav:
        kb.row(*nav)
    kb.row(InlineKeyboardButton(text="🔙 Orqaga", callback_data="st_menu"))
    return kb.as_markup()


def broadcast_report_keyboard(broadcast_id, can_delete=False):
    kb = InlineKeyboardBuilder()
    kb.button(text="📥 Excel hisobot", callback_data=f"st_bc_xls:{broadcast_id}")
    if can_delete:
        kb.button(
            text="🗑 Kanallardan o'chirish", callback_data=f"st_bc_del:{broadcast_id}"
        )
    kb.button(text="🔙 Orqaga", callback_data="st_history:1")
    kb.adjust(1)
    return kb.as_markup()


def broadcast_delete_confirm_keyboard(broadcast_id):
    kb = InlineKeyboardBuilder()
    kb.button(
        text="🗑 Ha, barcha kanallardan o'chirilsin",
        callback_data=f"st_bc_delok:{broadcast_id}",
    )
    kb.button(text="❌ Yo'q, qolsin", callback_data=f"st_bc:{broadcast_id}")
    kb.adjust(1)
    return kb.as_markup()


def admins_menu_keyboard(admins):
    kb = InlineKeyboardBuilder()
    for a in admins:
        role_mark = {"superadmin": "👑", "operator": "🤵", "observer": "👁"}.get(a.role, "")
        name = a.full_name or str(a.tg_id)
        kb.button(text=f"{role_mark} {name}", callback_data=f"adm_det:{a.id}")
    kb.button(text="➕ Admin qo'shish", callback_data="adm_add")
    kb.button(text="🔙 Orqaga", callback_data="admin_main_menu")
    kb.adjust(1)
    return kb.as_markup()


def admin_role_keyboard():
    kb = InlineKeyboardBuilder()
    kb.button(text="👑 Bosh admin", callback_data=f"adm_role:{AdminRole.SUPERADMIN.value}")
    kb.button(text="🤵 Operator", callback_data=f"adm_role:{AdminRole.OPERATOR.value}")
    kb.button(text="👁 Kuzatuvchi", callback_data=f"adm_role:{AdminRole.OBSERVER.value}")
    kb.button(text="❌ Bekor qilish", callback_data="adm_menu")
    kb.adjust(1)
    return kb.as_markup()


def admin_detail_keyboard(admin):
    kb = InlineKeyboardBuilder()
    kb.button(text="🗑 Adminlikdan olish", callback_data=f"adm_del:{admin.id}")
    kb.button(text="🔙 Orqaga", callback_data="adm_menu")
    kb.adjust(1)
    return kb.as_markup()


# ==================== Online chat (TZ online chat bot) ====================

def chat_register_keyboard():
    kb = InlineKeyboardBuilder()
    kb.button(text="✅ Ro'yxatdan o'tish", callback_data="chatreg_start")
    return kb.as_markup()


def subscribe_keyboard(channel_username):
    """Majburiy obuna: kanalga o'tish + qayta tekshirish tugmalari."""
    kb = InlineKeyboardBuilder()
    kb.button(text="📢 Kanalga a'zo bo'lish",
              url=f"https://t.me/{channel_username}")
    kb.button(text="✅ A'zo bo'ldim", callback_data="chatsub_check")
    kb.adjust(1)
    return kb.as_markup()


def chat_confirm_keyboard():
    kb = InlineKeyboardBuilder()
    kb.button(text="✅ Ishtirok etaman", callback_data="chatreg_confirm")
    kb.button(text="✏️ Ma'lumotlarni o'zgartirish", callback_data="chatreg_start")
    kb.adjust(1)
    return kb.as_markup()


def chat_status_keyboard():
    kb = InlineKeyboardBuilder()
    kb.button(text="✏️ Ma'lumotni yangilash", callback_data="chatreg_start")
    kb.button(text="❌ Ishtirokni bekor qilish", callback_data="chatreg_cancel")
    kb.adjust(1)
    return kb.as_markup()


def chat_admin_menu_keyboard(role):
    kb = InlineKeyboardBuilder()
    kb.button(text="📊 Statistika", callback_data="chadm_stats")
    kb.button(text="👥 Ro'yxatdan o'tganlar", callback_data="chadm_list:1")
    kb.button(text="📥 Eksport (.xlsx)", callback_data="chadm_export")
    if role in (AdminRole.SUPERADMIN, AdminRole.OPERATOR):
        kb.button(text="📨 Ishtirokchilarga xabar", callback_data="chadm_bcast")
    kb.button(text="⏰ Eslatmalar holati", callback_data="chadm_reminders")
    if role == AdminRole.SUPERADMIN:
        kb.button(text="⚙️ Sozlamalar", callback_data="chadm_settings")
    kb.button(text="🔙 Orqaga", callback_data="admin_main_menu")
    kb.adjust(1)
    return kb.as_markup()


def chat_participants_keyboard(page, total_pages):
    kb = InlineKeyboardBuilder()
    nav = []
    if page > 1:
        nav.append(InlineKeyboardButton(text="⬅️ Oldingi", callback_data=f"chadm_list:{page - 1}"))
    if page < total_pages:
        nav.append(InlineKeyboardButton(text="Keyingi ➡️", callback_data=f"chadm_list:{page + 1}"))
    if nav:
        kb.row(*nav)
    kb.row(InlineKeyboardButton(text="🔙 Orqaga", callback_data="chadm_menu"))
    return kb.as_markup()


def chat_settings_keyboard(is_active=True):
    kb = InlineKeyboardBuilder()
    kb.button(text="📅 Sana/vaqtni o'zgartirish", callback_data="chadm_set_dt")
    kb.button(text="🔗 Chat havolasini o'zgartirish", callback_data="chadm_set_link")
    if is_active:
        kb.button(text="🔕 Tadbirni o'chirish (botda ko'rinmasin)",
                  callback_data="chadm_toggle")
    else:
        kb.button(text="🔔 Tadbirni yoqish", callback_data="chadm_toggle")
    kb.button(text="🔙 Orqaga", callback_data="chadm_menu")
    kb.adjust(1)
    return kb.as_markup()


# ==================== Murojaatlar ====================

def user_menu_keyboard(chat_active=False):
    """Botga kirgan oddiy foydalanuvchi menyusi."""
    kb = InlineKeyboardBuilder()
    kb.button(text="📝 Murojaat yo'llash", callback_data="ap_start")
    if chat_active:
        kb.button(text="💬 Online chatga ro'yxatdan o'tish", callback_data="chatreg_start")
    kb.adjust(1)
    return kb.as_markup()


def appeal_type_keyboard():
    kb = InlineKeyboardBuilder()
    icons = {
        AppealType.MUROJAAT: "📩", AppealType.TAKLIF: "💡",
        AppealType.SHIKOYAT: "⚠️", AppealType.TASHABBUS: "🚀",
        AppealType.SAVOL: "❓",
    }
    for t in AppealType:
        kb.button(text=f"{icons[t]} {t.label}", callback_data=f"ap_type:{t.value}")
    kb.adjust(2, 2, 1)
    return kb.as_markup()


def appeal_reuse_keyboard():
    kb = InlineKeyboardBuilder()
    kb.button(text="✅ Ha, shu ma'lumotlar bilan", callback_data="ap_reuse")
    kb.button(text="✏️ O'zgartiraman", callback_data="ap_fresh")
    kb.adjust(1)
    return kb.as_markup()


def appeals_menu_keyboard(role):
    kb = InlineKeyboardBuilder()
    kb.button(text="🆕 Yangi murojaatlar", callback_data="apadm_list:1:new")
    kb.button(text="📋 Barcha murojaatlar", callback_data="apadm_list:1:all")
    kb.button(text="🔗 Murojaat havolasi", callback_data="apadm_link")
    kb.button(text="📥 Eksport (.xlsx)", callback_data="apadm_export")
    kb.button(text="🔙 Orqaga", callback_data="admin_main_menu")
    kb.adjust(1)
    return kb.as_markup()


def appeals_list_keyboard(appeals, page, total_pages, status_f):
    kb = InlineKeyboardBuilder()
    for a in appeals:
        mark = {"new": "🆕", "in_review": "🔄", "answered": "✅"}.get(a.status, "")
        kb.button(text=f"{mark} #{a.id} {a.full_name[:22]}", callback_data=f"apadm_det:{a.id}")
    kb.adjust(1)

    filters = [("all", "Barchasi"), ("new", "Yangi"),
               ("in_review", "Ko'rilmoqda"), ("answered", "Javob berilgan")]
    kb.row(*[
        InlineKeyboardButton(
            text=f"{'• ' if status_f == value else ''}{label}",
            callback_data=f"apadm_list:1:{value}",
        )
        for value, label in filters
    ])

    nav = []
    if page > 1:
        nav.append(InlineKeyboardButton(
            text="⬅️ Oldingi", callback_data=f"apadm_list:{page - 1}:{status_f}"))
    if page < total_pages:
        nav.append(InlineKeyboardButton(
            text="Keyingi ➡️", callback_data=f"apadm_list:{page + 1}:{status_f}"))
    if nav:
        kb.row(*nav)
    kb.row(InlineKeyboardButton(text="🔙 Orqaga", callback_data="apadm_menu"))
    return kb.as_markup()


def appeal_detail_keyboard(appeal):
    kb = InlineKeyboardBuilder()
    kb.button(text="✍️ Javob yozish", callback_data=f"apadm_reply:{appeal.id}")
    if appeal.status == AppealStatus.NEW:
        kb.button(text="🔄 «Ko'rib chiqilmoqda» deb belgilash",
                  callback_data=f"apadm_status:{appeal.id}:in_review")
    if appeal.status != AppealStatus.ANSWERED:
        kb.button(text="✅ «Javob berildi» deb belgilash",
                  callback_data=f"apadm_status:{appeal.id}:answered")
    kb.button(text="🔙 Ro'yxatga", callback_data="apadm_list:1:all")
    kb.adjust(1)
    return kb.as_markup()
