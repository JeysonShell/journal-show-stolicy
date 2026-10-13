"use client";

import { useEffect, useState } from "react";

export function Curtain() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Для отладки: убираем старую метку
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("curtain-shown");
      if (seen) {
        setHidden(true);
        return;
      }
    }

    // Даём браузеру отрисовать закрытый занавес
    const t1 = setTimeout(() => setOpen(true), 300);
    // Убираем из DOM после анимации
    const t2 = setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem("curtain-shown", "1");
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Левая створка */}
      <div
        className="absolute left-0 top-0 h-full w-1/2 transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          background:
            "linear-gradient(90deg, #050505 0%, #0A0A0A 60%, #1a1207 90%, #D4AF37 100%)",
          transform: open ? "translateX(-100%)" : "translateX(0)",
        }}
      />

      {/* Правая створка */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          background:
            "linear-gradient(-90deg, #050505 0%, #0A0A0A 60%, #1a1207 90%, #D4AF37 100%)",
          transform: open ? "translateX(100%)" : "translateX(0)",
        }}
      />

      {/* Центральная надпись */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <div className="font-display text-3xl font-black uppercase tracking-[0.5em] text-gold md:text-5xl">
            Шоу Столицы
          </div>
          <div className="mt-4 text-xs uppercase tracking-[0.6em] text-gold/60">
            Журнал
          </div>
        </div>
      </div>
    </div>
  );
}
