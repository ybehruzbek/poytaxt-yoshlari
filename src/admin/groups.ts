/**
 * Admin menyusi guruhlari — saytning yuqori menyusi tartibida (xodim saytda nimani körsa, adminda şu nom va şu
 * guruhda topadi). Guruhlar menyuda töplamlar `payload.config.ts` ga qöşilgan tartibda çiqadi.
 * Nomlar uç tilda: admin interfeysi tili almaştirilsa, guruh nomi ham özgaradi.
 */
export const G = {
  bosh: { uz: 'Boş sahifa', ru: 'Главная', en: 'Home page' },
  biz: { uz: 'Biz haqimizda', ru: 'О нас', en: 'About us' },
  faoliyat: { uz: 'Faoliyat', ru: 'Деятельность', en: 'Activity' },
  yangiliklar: { uz: 'Yangiliklar', ru: 'Новости', en: 'News' },
  hujjatlar: { uz: 'Hujjatlar', ru: 'Документы', en: 'Documents' },
  axborot: { uz: 'Axborot xizmati', ru: 'Пресс-служба', en: 'Press service' },
  boglanish: { uz: 'Boğlaniş', ru: 'Контакты', en: 'Contact' },
  murojaatlar: { uz: 'Murojaatlar', ru: 'Обращения', en: 'Inbox' },
  sozlamalar: { uz: 'Sayt sozlamalari', ru: 'Настройки сайта', en: 'Site settings' },
  tizim: { uz: 'Tizim', ru: 'Система', en: 'System' },
} as const
