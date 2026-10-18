import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InteractiveTools } from "@/components/interactive-tools";

export const metadata: Metadata = {
  title: "Денежный трекер",
  description: "Инструмент для учёта доходов и расходов. Записи хранятся в localStorage вашего браузера.",
};

export default function TrackerPage() {
  return (
    <main className="tracker-page">
      <div className="tracker-page-heading">
        <Link href="/#bonuses" className="back-link"><ArrowLeft size={15} /> Назад к курсу</Link>
        <div className="eyebrow eyebrow-muted">ПРАКТИЧЕСКИЙ ИНСТРУМЕНТ</div>
        <h1>Лист отслеживания доходов и расходов</h1>
        <p>Записи хранятся в localStorage этого браузера и не отправляются на сервер. Экспортируйте CSV, чтобы сохранить резервную копию.</p>
      </div>
      <InteractiveTools type="tracker" />
    </main>
  );
}
