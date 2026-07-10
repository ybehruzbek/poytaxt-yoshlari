/**
 * Bazadagi oddiy matnni paragraflarga bo'lib chiqaradi.
 * Paragraflar bo'sh qator (`\n\n`) bilan ajratiladi.
 *
 * HTML render qilmaydi — matn React tomonidan escape qilinadi, ya'ni admin
 * kiritgan kontent orqali XSS bo'lmaydi.
 */
export default function RichText({
  text,
  className,
  style,
}: {
  text: string | null | undefined;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!text) return null;

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={className} style={style}>
          {p}
        </p>
      ))}
    </>
  );
}
