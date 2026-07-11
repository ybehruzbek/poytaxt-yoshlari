"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import type { Field, ResourceDef } from "@/lib/admin/resources";
import { saveResource, type FormState } from "@/lib/admin/actions";
import styles from "./Admin.module.css";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={pending}>
      {pending ? "Saqlanmoqda..." : label}
    </button>
  );
}

function FieldControl({
  field,
  defaultValue,
  invalid,
}: {
  field: Field;
  defaultValue: unknown;
  invalid: boolean;
}) {
  const cls = `${styles.input}${invalid ? ` ${styles.inputInvalid}` : ""}`;
  const id = `f-${field.name}`;

  if (field.type === "checkbox") {
    return (
      <input
        id={id}
        type="checkbox"
        name={field.name}
        defaultChecked={Boolean(defaultValue)}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        id={id}
        name={field.name}
        className={`${styles.textarea}${invalid ? ` ${styles.inputInvalid}` : ""}`}
        defaultValue={(defaultValue as string) ?? ""}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={id}
        name={field.name}
        className={`${styles.select}${invalid ? ` ${styles.inputInvalid}` : ""}`}
        defaultValue={(defaultValue as string) ?? field.options?.[0] ?? ""}
      >
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  if (field.type === "datetime") {
    return (
      <input
        id={id}
        type="datetime-local"
        name={field.name}
        className={cls}
        defaultValue={toDatetimeLocal(defaultValue)}
      />
    );
  }

  return (
    <input
      id={id}
      type={field.type === "number" ? "number" : "text"}
      step={field.float ? "any" : undefined}
      name={field.name}
      className={cls}
      defaultValue={(defaultValue as string | number) ?? ""}
    />
  );
}

/** Date → "YYYY-MM-DDTHH:mm" (datetime-local qiymati, lokal vaqtda). */
function toDatetimeLocal(value: unknown): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ResourceForm({
  resource,
  item,
}: {
  resource: ResourceDef;
  /** null bo'lsa — yangi yozuv */
  item: Record<string, unknown> | null;
}) {
  const id = item ? String(item.id) : null;
  const [state, formAction] = useActionState<FormState, FormData>(saveResource, {});

  // Checkbox'lar yangi yozuvda sukut bo'yicha yoqilgan bo'lsin.
  const defaultFor = (field: Field): unknown => {
    if (item) return item[field.name];
    if (field.type === "checkbox")
      return (
        field.name === "published" ||
        field.name === "regOpen" ||
        field.name === "visible"
      );
    return "";
  };

  return (
    <form action={formAction} className={`${styles.card} ${styles.form}`}>
      {/* Resurs va id `.bind()` emas, yashirin maydon orqali — sababi actions.ts da. */}
      <input type="hidden" name="__resource" value={resource.key} />
      {id && <input type="hidden" name="__id" value={id} />}

      {state.error && <div className={styles.formError}>{state.error}</div>}

      {resource.fields.map((field) => {
        const error = state.fieldErrors?.[field.name];
        const isCheckbox = field.type === "checkbox";
        return (
          <div
            key={field.name}
            className={`${styles.field}${isCheckbox ? ` ${styles.checkboxField}` : ""}`}
          >
            {!isCheckbox && (
              <label className={styles.label} htmlFor={`f-${field.name}`}>
                {field.label}
                {field.required && <span className={styles.required}>*</span>}
              </label>
            )}

            <FieldControl field={field} defaultValue={defaultFor(field)} invalid={Boolean(error)} />

            {isCheckbox && (
              <label className={styles.label} htmlFor={`f-${field.name}`}>
                {field.label}
              </label>
            )}

            {field.help && !error && <div className={styles.help}>{field.help}</div>}
            {error && <div className={styles.fieldError}>{error}</div>}
          </div>
        );
      })}

      <div className={styles.formActions}>
        <SubmitButton label={id ? "Saqlash" : "Yaratish"} />
        <Link href={`/admin/${resource.key}`} className={`${styles.btn} ${styles.btnGhost}`}>
          Bekor qilish
        </Link>
      </div>
    </form>
  );
}
