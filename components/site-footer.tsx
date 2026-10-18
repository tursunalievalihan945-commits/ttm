import Link from "next/link";
import { whatsappUrl } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand"><Link href="/" className="brand"><span className="brand-symbol" aria-hidden="true">Ф</span><span>Финансовое образование<span className="brand-light">для взрослых</span></span></Link><p>Курс на 5 дней. Ведёт Манапбаева Нураим Замирбековна.</p></div>
        <div className="footer-links"><Link href="/#program">Программа</Link><Link href="/tracker">Денежный трекер</Link><a href={whatsappUrl} target="_blank" rel="noreferrer">Написать в WhatsApp</a></div>
        <div className="footer-contact"><span>Контакты</span><p>Телефон: [ЗАМЕНИТЬ: номер телефона]</p><p><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp: +996 776 557 016</a></p><p>Email: [ЗАМЕНИТЬ: адрес]</p></div>
        <p className="disclaimer">Материалы курса носят образовательный характер и не являются инвестиционной рекомендацией.</p>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Финансовое образование для взрослых</span><span>Курс на 5 дней</span></div>
    </footer>
  );
}
