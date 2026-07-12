import Link from "next/link";
import ErrorState from "@/components/ui/ErrorState/ErrorState";
import { House } from "@phosphor-icons/react/ssr";

export const metadata = {
  title: "Sahifa topilmadi | O'zbekiston Yoshlar Ittifoqi",
};

export default function NotFound() {
  return (
    <ErrorState
      code="404"
      title="Sahifa topilmadi"
      message="Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan."
      actions={
        <>
          <Link href="/" className="btn-primary">
            <House weight="duotone" style={{ fontSize: 12 }} />
            Bosh sahifaga qaytish
          </Link>
          <Link href="/murojaat" className="btn-secondary">
            Murojaat yuborish
          </Link>
        </>
      }
    />
  );
}
