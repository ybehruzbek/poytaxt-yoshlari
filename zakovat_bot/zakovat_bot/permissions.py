"""Rol tekshiruvi va audit-jurnal (TZ 2.3).

Rollar ierarxiyasi: superadmin > operator > observer.
Birinchi superadmin SUPER_ADMIN_ID env orqali bootstrap qilinadi.
"""
from decouple import config

from zakovat_bot.models import AdminRole, AuditLog, TelegramAdminsID

_ROLE_ORDER = {
    AdminRole.OBSERVER: 1,
    AdminRole.OPERATOR: 2,
    AdminRole.SUPERADMIN: 3,
}


def ensure_super_admin():
    """SUPER_ADMIN_ID env'dagi foydalanuvchini superadmin sifatida kafolatlaydi."""
    raw = config("SUPER_ADMIN_ID", default="")
    if not str(raw).strip():
        return
    tg_id = int(str(raw).strip())
    admin, created = TelegramAdminsID.objects.get_or_create(
        tg_id=tg_id, defaults={"role": AdminRole.SUPERADMIN}
    )
    if not created and admin.role != AdminRole.SUPERADMIN:
        admin.role = AdminRole.SUPERADMIN
        admin.save(update_fields=["role"])


def get_admin(tg_id):
    return TelegramAdminsID.objects.filter(tg_id=tg_id).first()


def has_role(tg_id, minimum=AdminRole.OPERATOR):
    admin = get_admin(tg_id)
    if not admin:
        return False
    return _ROLE_ORDER.get(admin.role, 0) >= _ROLE_ORDER[minimum]


def is_admin(tg_id):
    """Istalgan rol (observer ham) — panelga kirish huquqi."""
    return has_role(tg_id, minimum=AdminRole.OBSERVER)


def log_action(tg_id, action, details=""):
    """Audit-jurnal: kim, qachon (created_datetime), qaysi amal."""
    AuditLog.objects.create(admin_id=tg_id, action=action, details=details or "")
