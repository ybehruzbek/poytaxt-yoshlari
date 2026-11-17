/**
 * <head> dagi kiçik skriptlar (sahifa çizilişidan oldin bajariladi). Bu fayl kod — imlo tekşiruvidan
 * çiqarilgan (scripts/imlo.ts → SKIP_FILES), çunki satrlar içida JavaScript bor.
 */
/**
 * Kuçsiz qurilma yoki “trafikni tejaş” rejimi: sahifa çizilişidan oldin <html data-lite> qöyiladi —
 * skroll animatsiyalari, cheksiz lentalar va şişa (blur) effektlari öçadi, mazmun darhol körinadi.
 * Mezon: tejaş rejimi, 2 GB gaça xotira yoki 2 ta yadro, yoki 4 GB va 4 yadrogaça birga.
 */
export const LITE = `try{var n=navigator,c=n.connection,m=n.deviceMemory,h=n.hardwareConcurrency;if((c&&c.saveData)||(m&&m<=2)||(h&&h<=2)||(m&&h&&m<=4&&h<=4))document.documentElement.setAttribute('data-lite','')}catch(e){}`

/**
 * Yuklanmagan (singan) rasm: brauzerning singan rasm belgisi va alt matni örniga rasm örni
 * (kartaning rangli foni) qoladi. Tinglovçi sahifa çizilişidan oldin qöyiladi — birinçi rasmlarni ham ushlaydi.
 */
export const IMG_ERR = `document.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='IMG')t.setAttribute('data-broken','')},true)`
