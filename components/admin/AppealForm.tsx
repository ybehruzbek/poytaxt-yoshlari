"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import type { Appeal } from "@prisma/client";
import { updateAppeal, type FormState } from "@/lib/admin/actions";
import styles from "./Admin.module.css";

const STATUSES = ["Yangi", "Ko'rib chiqilmoqda", "Javob berildi"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={pending}>
      {pending ? "Saqlanmoqda..." : "Saqlash"}
    </button>
  );
}

export default function AppealForm({ appeal }: { appeal: Appeal }) {
  const [state, formAction] = useActionState<FormState, FormData>(updateAppeal, {});

  return (
    <form action={formAction} className={`${styles.card} ${styles.form}`}>
      <input type="hidden" name="__id" value={appeal.id} />

      {state.error && <div className={styles.formError}>{state.error}</div>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="status">Holat</label>
        <select
          id="status"
          name="status"
          className={styles.select}
          defaultValue={appeal.status}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {state.fieldErrors?.status && (
          <div className={styles.fieldError}>{state.fieldErrors.status}</div>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="response">Javob</label>
        <textarea
          id="response"
          name="response"
          className={styles.textarea}
          defaultValue={appeal.response ?? ""}
        />
        <div className={styles.help}>
          Hozircha javob faqat panelda saqlanadi. Email/Telegram orqali yuborish — Faza 6.
        </div>
        {state.fieldErrors?.response && (
          <div className={styles.fieldError}>{state.fieldErrors.response}</div>
        )}
      </div>

      <div className={styles.formActions}>
        <SubmitButton />
        <Link href="/admin/murojaatlar" className={`${styles.btn} ${styles.btnGhost}`}>
          Bekor qilish
        </Link>
      </div>
    </form>
  );
}
