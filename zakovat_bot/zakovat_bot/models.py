from django.db import models
from core.models.basemodel import SafeBaseModel
# Create your models here.


class AdminRole(models.TextChoices):
    SUPERADMIN = "superadmin", "Bosh admin"
    OPERATOR = "operator", "Admin (operator)"
    OBSERVER = "observer", "Kuzatuvchi"


class TelegramAdminsID(SafeBaseModel):
    tg_id = models.BigIntegerField()
    full_name = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(
        max_length=20, choices=AdminRole.choices, default=AdminRole.OPERATOR
    )

    def __str__(self):
        return f"{self.tg_id} ({self.role})"

class Users(SafeBaseModel):
    full_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    tg_id = models.BigIntegerField()

    def __str__(self):
        return self.tg_id

class Questions(SafeBaseModel):
    name = models.CharField(max_length=255, blank=True, null=True)
    file_id = models.CharField(max_length=255, blank=True, null=True)
    file_type = models.CharField(max_length=50, blank=True, null=True)
    questioned_at = models.DateTimeField(null=True, blank=True)
    answers_file_sent = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Question from chat_id: {self.chat_id}"
    
class Answers(SafeBaseModel):
    question = models.ForeignKey(Questions, on_delete=models.CASCADE, related_name='answers')
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='answers')
    answer = models.CharField(max_length=100)
    answered_at = models.DateTimeField(auto_now_add=True)


class OttType(models.TextChoices):
    DAVLAT = "davlat", "Davlat"
    XORIJIY = "xorijiy", "Xorijiy"
    NODAVLAT = "nodavlat", "Nodavlat"


class Channel(SafeBaseModel):
    """OTT Telegram-kanali (TZ 3.1). is_active — SafeBaseModel'dan:
    nofaol kanal tarqatishda qatnashmaydi, lekin tarixi saqlanadi."""
    chat_id = models.BigIntegerField(null=True, blank=True, unique=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    ott_name = models.CharField(max_length=255)
    ott_type = models.CharField(
        max_length=20, choices=OttType.choices, default=OttType.DAVLAT
    )
    tag = models.CharField(max_length=100, blank=True, null=True)
    bot_is_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.ott_name} ({self.username or self.chat_id})"

    @property
    def target(self):
        """sendMessage/forward uchun manzil: chat_id afzal, bo'lmasa @username."""
        if self.chat_id:
            return self.chat_id
        return f"@{self.username}" if self.username else None


class BroadcastStatus(models.TextChoices):
    SCHEDULED = "scheduled", "Rejalashtirilgan"
    IN_PROGRESS = "in_progress", "Jarayonda"
    DONE = "done", "Yakunlangan"
    CANCELLED = "cancelled", "Bekor qilingan"


class Broadcast(SafeBaseModel):
    """Tarqatishlar jurnali (TZ 3.2)."""
    source_chat_id = models.BigIntegerField()
    message_ids = models.JSONField(default=list)
    admin_id = models.BigIntegerField()
    status = models.CharField(
        max_length=20, choices=BroadcastStatus.choices, default=BroadcastStatus.IN_PROGRESS
    )
    # Qamrov: "all" | "type:davlat" | "tag:<teg>"
    target_filter = models.CharField(max_length=150, default="all")
    scheduled_at = models.DateTimeField(null=True, blank=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    success_count = models.IntegerField(default=0)
    failed_count = models.IntegerField(default=0)

    def __str__(self):
        return f"Broadcast #{self.id} [{self.status}]"


class BroadcastResult(SafeBaseModel):
    """Har bir kanal bo'yicha tarqatish natijasi (TZ 3.3)."""
    broadcast = models.ForeignKey(Broadcast, on_delete=models.CASCADE, related_name="results")
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name="broadcast_results")
    delivered = models.BooleanField(default=False)
    error_reason = models.CharField(max_length=255, blank=True, null=True)
    message_id = models.BigIntegerField(null=True, blank=True)
    # Kanaldagi barcha yuborilgan xabar ID'lari (albomda bir nechta bo'ladi) —
    # adashib yuborilgan postni kanallardan o'chirish uchun kerak
    message_ids = models.JSONField(default=list, blank=True)
    deleted_from_channel = models.BooleanField(default=False)
    sent_at = models.DateTimeField(null=True, blank=True)


class AuditLog(SafeBaseModel):
    """Admin harakatlari jurnali (TZ 2.3): kim, qachon, nima qildi."""
    admin_id = models.BigIntegerField()
    action = models.CharField(max_length=100)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.admin_id}: {self.action}"