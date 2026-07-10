import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // O'zbek lotin alifbosida apostrof harf hisoblanadi (o', g', ma'lumot).
      // Bu qoida 154 ta soxta xato beradi va lint'ni foydasiz qiladi.
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".agent/**",
    ".agents/**",
  ]),
]);

export default eslintConfig;
