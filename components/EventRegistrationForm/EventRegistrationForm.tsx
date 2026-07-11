"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  registerForEvent,
  type RegisterState,
} from "@/lib/events/actions";
import styles from "./EventRegistrationForm.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      {pending ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
    </button>
  );
}

export default function EventRegistrationForm({ eventId }: { eventId: string }) {
  const [state, formAction] = useActionState<RegisterState, FormData>(
    registerForEvent,
    {}
  );

  if (state.ok) {
    return (
      <div className={styles.success}>
        <i className="fas fa-circle-check" />
        <p className={styles.successTitle}>Ro&apos;yxatdan o&apos;tdingiz!</p>
        <p className={styles.successText}>
          Tadbir kuni kelganingizda ismingiz va telefon raqamingizni ayting.
          O&apos;zgarish bo&apos;lsa telefon orqali xabar beramiz.
        </p>
      </div>
    );
  }

  const err = (name: string) => state.fieldErrors?.[name];

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="__event" value={eventId} />

      {state.error && <div className={styles.formError}>{state.error}</div>}

      <div className={styles.field}>
        <label htmlFor="reg-fullName" className={styles.label}>
          F.I.Sh. <span className={styles.req}>*</span>
        </label>
        <input
          id="reg-fullName"
          name="fullName"
          className={`${styles.input}${err("fullName") ? ` ${styles.invalid}` : ""}`}
          placeholder="Familiya Ism Sharif"
          required
        />
        {err("fullName") && <div className={styles.fieldError}>{err("fullName")}</div>}
      </div>

      <div className={styles.field}>
        <label htmlFor="reg-phone" className={styles.label}>
          Telefon <span className={styles.req}>*</span>
        </label>
        <input
          id="reg-phone"
          name="phone"
          type="tel"
          className={`${styles.input}${err("phone") ? ` ${styles.invalid}` : ""}`}
          placeholder="+998 90 123 45 67"
          required
        />
        {err("phone") && <div className={styles.fieldError}>{err("phone")}</div>}
      </div>

      <div className={styles.field}>
        <label htmlFor="reg-telegram" className={styles.label}>
          Telegram username
        </label>
        <input
          id="reg-telegram"
          name="telegram"
          className={styles.input}
          placeholder="@username"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="reg-organization" className={styles.label}>
          OTM / muassasa
        </label>
        <input
          id="reg-organization"
          name="organization"
          className={styles.input}
          placeholder="Masalan: TDIU, 2-kurs"
        />
      </div>

      <label className={styles.consent}>
        <input type="checkbox" name="consent" required />
        <span>
          Shaxsiy ma&apos;lumotlarim tadbirni tashkil etish maqsadida qayta
          ishlanishiga roziman.
        </span>
      </label>
      {err("consent") && <div className={styles.fieldError}>{err("consent")}</div>}

      <SubmitButton />
    </form>
  );
}
