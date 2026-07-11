/**
 * Oddiy in-memory rate-limit. Ilova bitta jarayonda ishlaydi (standalone VPS) —
 * yuklama oshsa Redis'ga o'tiladi (PLAN.md, Faza 1).
 *
 * Har bir `name` o'z hisobiga ega: appeals va event-registration bir-biriga
 * xalaqit bermaydi.
 */
const buckets = new Map<string, Map<string, number[]>>();

export function isRateLimited(
  name: string,
  key: string,
  { windowMs, max }: { windowMs: number; max: number }
): boolean {
  let bucket = buckets.get(name);
  if (!bucket) {
    bucket = new Map();
    buckets.set(name, bucket);
  }

  const now = Date.now();
  const recent = (bucket.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    bucket.set(key, recent);
    return true;
  }
  recent.push(now);
  bucket.set(key, recent);

  if (bucket.size > 10_000) {
    for (const [k, times] of bucket) {
      if (times.every((t) => now - t >= windowMs)) bucket.delete(k);
    }
  }
  return false;
}

/** `x-forwarded-for` dan birinchi IP ni oladi. */
export function clientIp(headers: Headers): string {
  return (
    (headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown"
  );
}
