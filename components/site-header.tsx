"use client";

import Link from "next/link";
import { whatsappUrl } from "@/lib/contact";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Финансовое образование для взрослых — главная"><span className="brand-symbol" aria-hidden="true">Ф</span><span>Финансовое образование<span className="brand-light">для взрослых</span></span></Link>
        <nav className="header-nav" aria-label="Основная навигация">
          <Link href="/#teacher">Преподаватель</Link><Link href="/#program">Программа</Link><Link href="/#outcomes">Итоги</Link><Link href="/#format">Формат</Link><Link href="/#faq">Вопросы</Link>
        </nav>
        <div className="header-actions">
          <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Записаться <span>↗</span></a>
        </div>
      </div>
    </header>
  );
}
