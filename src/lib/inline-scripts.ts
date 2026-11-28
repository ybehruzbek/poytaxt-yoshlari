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

/**
 * Sahifa körinmay turib oçilsa (fondagi yangi tab, yopiq panel), yuklaniş animatsiyalari pauzada turadi
 * va foydalanuvçi sahifaga qaraganda boşlanadi — aks holda ular u körmay turib tugab qoladi.
 * JS işlamasa sinf qöyilmaydi va heç narsa töxtatilmaydi.
 */
export const LOAD_GATE = `(function(){if(document.visibilityState!=='hidden')return;var d=document.documentElement;d.classList.add('ld-wait');function go(){if(document.visibilityState==='visible'){d.classList.remove('ld-wait');document.removeEventListener('visibilitychange',go)}}document.addEventListener('visibilitychange',go)})()`

/**
 * Alifbo tanlovi (components/site/Alifbo.tsx): tashrif buyuruvchi yangi alifboni tanlagan bo'lsa, matn
 * o'girilguncha sahifa bir lahza yashiriladi (“abc-wait”) — joriy alifbodagi matn ko'rinib qolmaydi.
 * Faqat o'zbekcha sahifalarda qo'yiladi. JS ishlamasa yoki xato bo'lsa CSS 1,5 soniyadan keyin baribir ko'rsatadi.
 */
export const ALIFBO_GATE = `try{if(localStorage.getItem('alifbo')==='yangi'){var d=document.documentElement;d.classList.add('abc-wait');d.setAttribute('data-alifbo','yangi')}}catch(e){}`
