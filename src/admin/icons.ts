/**
 * Admin menyusi va boş sahifa kartalari uçun ikonkalar (24×24, çiziqli — saytdagi ikonkalar uslubida).
 * Kalit — töplam yoki global slug'i. Yangi bölim qöşilganda şu yerga ikonka yoziladi va
 * `pnpm tsx scripts/gen-admin-icons.ts` işga tuşiriladi (app/(payload)/admin-icons.scss yangilanadi).
 */
export const ADMIN_ICONS: Record<string, string> = {
  // Bosh sahifa va Biz haqimizda
  'bosh-sahifa': '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  'ittifoq-sahifa': '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
  'markaziy-kengash': '<path d="M3 10 12 4l9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  'hududiy-kengash': '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  staff: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a5.5 5.5 0 0 1 3.5 6"/>',
  departments: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
  'act-groups': '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  otts: '<path d="M2.5 9 12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4V11"/>',
  harbiy: '<path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
  partners: '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a3.9 3.9 0 0 1 4.6-.7l.4.2a3 3 0 0 0 1.8.3H21"/><path d="M3 4h3l3 1"/><path d="M3 13.5 7.5 18a1.4 1.4 0 0 0 2-2"/>',
  // Faoliyat
  directions: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  projects: '<path d="M12 3 3 8l9 5 9-5z"/><path d="m3 13 9 5 9-5"/>',
  events: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2"/>',
  natijalar: '<path d="M4 20V10M10 20V4M16 20v-7M2.5 20h19"/>',
  grants: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M16 15h2"/>',
  stipends: '<path d="M2.5 9 12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4V11M21.5 9v5"/>',
  contests: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>',
  awards: '<circle cx="12" cy="9" r="5"/><path d="M8.6 13.3 7 21l5-2.6 5 2.6-1.6-7.7"/>',
  benefits: '<rect x="3.5" y="9" width="17" height="11.5" rx="2"/><path d="M12 9v11.5M3.5 13h17M12 9C9 9 7 7.5 8 5.5S12 6 12 9c0-3 3-5.5 4-3.5S15 9 12 9z"/>',
  'vol-directions': '<path d="M12 11.5S7 8.6 7 5.6A2.6 2.6 0 0 1 12 4.3a2.6 2.6 0 0 1 5 1.3c0 3-5 5.9-5 5.9z"/><path d="M3 15.5h3.5l3.5 2h4.5a1.5 1.5 0 0 0 0-3H11M14 14.5l4.5-1.8a1.6 1.6 0 0 1 1.8 2.5L16 19.5H9L5.5 21H3"/>',
  'volontyorlik-sahifa': '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  miqdorlar: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h7"/>',
  // Yangiliklar
  news: '<path d="M4 5h13v14a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2z"/><path d="M17 9h3v10a2 2 0 0 1-2 2M8 9h5M8 13h5M8 17h3"/>',
  authors: '<path d="M4 20l1.2-4.8L15.5 4.9a2 2 0 0 1 2.8 0l.8.8a2 2 0 0 1 0 2.8L8.8 18.8z"/><path d="m13.5 7 3.5 3.5"/>',
  'news-ratings': '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9z"/>',
  'news-reactions': '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
  // Hujjatlar va Axborot xizmati
  acts: '<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7 2.5 13a2.5 2.5 0 0 0 5 0zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/>',
  'kengash-docs': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  templates: '<path d="M8 4h8M6 8h12"/><rect x="4" y="12" width="16" height="9" rx="2"/>',
  press: '<path d="M3 11v2a2 2 0 0 0 2 2h1l4 4V5L6 9H5a2 2 0 0 0-2 2z"/><path d="M14 8a5 5 0 0 1 0 8M17 5a9 9 0 0 1 0 14"/>',
  oav: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="m8 3 4 3 4-3M7 10h6M7 14h4M16 10v4"/>',
  albums: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="10" r="1.8"/><path d="m21 16-5-5-9 8"/>',
  videos: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
  // Boğlaniş
  faqs: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.4v.3M12 17h.01"/>',
  aloqa: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  'azolik-sahifa': '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.5 16a3.5 3.5 0 0 1 7 0M15 10h3M15 13.5h3"/>',
  // Murojaatlar
  appeals: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5.5 5h13L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z"/>',
  'appeal-files': '<path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L13 4a3.3 3.3 0 0 1 4.7 4.7l-8.4 8.4a1.7 1.7 0 0 1-2.4-2.4L14.5 7"/>',
  memberships: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M19 8v6M16 11h6"/>',
  volunteers: '<path d="M12 11.5S7 8.6 7 5.6A2.6 2.6 0 0 1 12 4.3a2.6 2.6 0 0 1 5 1.3c0 3-5 5.9-5 5.9z"/><path d="M3 15.5h3.5l3.5 2h4.5a1.5 1.5 0 0 0 0-3H11M14 14.5l4.5-1.8a1.6 1.6 0 0 1 1.8 2.5L16 19.5H9L5.5 21H3"/>',
  'text-errors': '<path d="M4 7V5h10v2M9 5v14M7 19h4"/><path d="m15 13 6 6M21 13l-6 6"/>',
  // Sozlamalar va tizim
  media: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="10" r="1.8"/><path d="m21 16-5-5-9 8"/>',
  files: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  socials: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.3 13.3 7.4 4M15.7 6.7l-7.4 4"/>',
  footer: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 15h18M7 18h4"/>',
  users: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
}
