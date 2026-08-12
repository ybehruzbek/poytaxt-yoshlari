from aiogram.fsm.state import StatesGroup, State



class Register(StatesGroup):
    full_name = State()
    phone_number = State()
    answer = State()
    every_one = State()
    
    
class QuestionState(StatesGroup):
    question_name = State()
    waiting_for_question = State()
    user_talk = State()
    user_id = State()
    user_answer = State()
    
class ChannelSendState(StatesGroup):
    waiting_for_excel = State()
    waiting_for_message = State()
    waiting_for_confirmation = State()
    waiting_for_post_link= State()


class ChannelState(StatesGroup):
    """Kanallar CRUD oqimi (TZ 2.1)."""
    add_link = State()
    add_name = State()
    edit_value = State()
    import_excel = State()


class BroadcastState(StatesGroup):
    """Yangi tarqatish oqimi (TZ 4)."""
    waiting_post = State()
    waiting_schedule = State()


class AdminMgmtState(StatesGroup):
    """Adminlarni boshqarish (TZ 2.3, faqat superadmin)."""
    add_id = State()
    add_name = State()


class ChatRegState(StatesGroup):
    """Online chatga ro'yxatdan o'tish (TZ F-03, F-04)."""
    full_name = State()
    phone = State()


class ChatAdminState(StatesGroup):
    """Tadbirlar admin bo'limi (TZ F-08)."""
    broadcast = State()
    edit_datetime = State()
    edit_link = State()
    edit_location = State()


class AppealState(StatesGroup):
    """Murojaat yo'llash oqimi."""
    full_name = State()
    phone = State()
    message = State()


class AppealAdminState(StatesGroup):
    """Murojaatga javob yozish (admin)."""
    reply = State()
    link_source = State()