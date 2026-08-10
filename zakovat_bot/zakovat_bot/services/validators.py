"""Umumiy kiritish validatsiyalari (chat ro'yxati va murojaat oqimlari uchun)."""
import re

# Lotin, kirill, o'zbek apostrof variantlari, bo'sh joy, defis
_NAME_RE = re.compile(r"^[A-Za-zА-Яа-яЁёЎўҚқҒғҲҳʼ‘’'` \-]+$")

PHONE_RE = re.compile(
    r"^(\+?998)?[\s\-]?(9[0-9]|33|55|77|88|20)[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$"
)


def validate_full_name(text):
    """5-60 belgi, faqat harflar, kamida ikki so'z. Qaytaradi: xato matni yoki None."""
    value = (text or "").strip()
    if len(value) < 5 or len(value) > 60:
        return "uzunlik 5–60 belgi oralig'ida bo'lishi kerak"
    if not _NAME_RE.match(value):
        return "faqat harflardan foydalaning"
    if len(value.split()) < 2:
        return "ism va familiya alohida so'z bo'lishi shart"
    return None


def normalize_phone(text):
    """Raqamni +998XXXXXXXXX ko'rinishiga keltiradi; noto'g'ri bo'lsa None."""
    value = (text or "").strip()
    if not PHONE_RE.match(value):
        return None
    digits = re.sub(r"\D", "", value)
    if len(digits) == 9:
        digits = "998" + digits
    return f"+{digits}"
