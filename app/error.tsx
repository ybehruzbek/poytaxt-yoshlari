"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Warning } from "@phosphor-icons/react/ssr";
import ErrorState from "@/components/ui/ErrorState/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      icon={Warning}
      title="Kutilmagan xatolik yuz berdi"
      message="Qayta urinib ko'ring — muammo davom etsa, birozdan keyin qaytib keling."
      actions={
        <>
          <button type="button" className="btn-primary" onClick={reset}>
            Qayta urinish
          </button>
          <Link href="/" className="btn-secondary">
            Bosh sahifaga qaytish
          </Link>
        </>
      }
    />
  );
}
