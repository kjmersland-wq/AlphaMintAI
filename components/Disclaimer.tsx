"use client";

import { useDictionary } from "./I18nProvider";

export function Disclaimer() {
  const { dict } = useDictionary();
  return (
    <p className="mt-3 text-[11px] leading-relaxed text-muted">
      <span className="font-medium uppercase tracking-widest text-gold-soft">
        {dict.disclaimer.label}{" "}
      </span>
      {dict.disclaimer.body}
    </p>
  );
}
