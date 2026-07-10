"use client";

import { useFormStatus } from "react-dom";
import { deleteResource } from "@/lib/admin/actions";
import styles from "./Admin.module.css";

function Inner({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`${styles.btn} ${styles.btnDanger}`}
      disabled={pending}
      aria-label={`O'chirish: ${title}`}
    >
      <i className="fas fa-trash" />
      {pending ? "O'chirilmoqda..." : "O'chirish"}
    </button>
  );
}

export default function DeleteButton({
  resourceKey,
  id,
  title,
}: {
  resourceKey: string;
  id: string;
  title: string;
}) {
  return (
    <form
      action={deleteResource}
      onSubmit={(e) => {
        if (!confirm(`"${title}" o'chirilsinmi? Bu amalni qaytarib bo'lmaydi.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="__resource" value={resourceKey} />
      <input type="hidden" name="__id" value={id} />
      <Inner title={title} />
    </form>
  );
}
