import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Compass,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { CourseTopicIcon } from "@/components/course-topic-icon";
import { CourseReceipt } from "@/components/course-receipt";
import { TeacherProfile } from "@/components/teacher-profile";
import { whatsappUrl } from "@/lib/contact";
import { courseTopics } from "@/lib/content";

const situations = [
  { icon: Wallet, title: "Доход есть, ясности нет", text: "Хочется понимать, куда уходят деньги и как планировать без сложных таблиц." },
  { icon: Banknote, title: "Накопления пока не растут", text: "Нужны спокойные первые шаги, понятная цель и подходящий финансовый резерв." },
  { icon: Compass, title: "Инвестиции кажутся сложными", text: "Много незнакомых терминов, обещаний и противоречивых советов — хочется разобраться в основах." },
  { icon: BriefcaseBusiness, title: "Доход меняется", text: "Хотите увереннее говорить о зарплате, бонусах или деньгах в собственном деле." },
];

const outcomes = [
  { icon: ChartNoAxesCombined, title: "Ясная картина", text: "Понимание доходов, расходов, активов и личных финансовых целей." },
  { icon: ShieldCheck, title: "Взвешенные решения", text: "Навык сравнивать условия, комиссии и риски без обещаний лёгкого заработка." },
  { icon: Compass, title: "План действий", text: "Первые шаги, которые можно адаптировать под свой срок, доход и обстоятельства." },
  { icon: Sparkles, title: "Больше уверенности", text: "Понятная опора для разговоров о деньгах, работе и будущем." },
];

const faqs = [
  { question: "Нужен ли опыт или специальное образование?", answer: "Нет. Курс рассчитан на взрослых без финансового образования: термины объясняются простым языком на бытовых примерах." },
  { question: "Будут ли обещания доходности или готовые инвестиционные советы?", answer: "Нет. Цель курса — помочь понимать принципы, варианты и риски, а не обещать прибыль или подбирать индивидуальные инвестиции." },
  { question: "В каком формате проходит курс?", answer: "Занятия проходят офлайн." },
  { question: "Сколько длится каждое занятие?", answer: "Каждое занятие длится 2,5 часа." },
  { question: "Будут ли записи занятий?", answer: "Нет, записей занятий не будет." },
  { question: "Сколько стоит участие и когда старт?", answer: "Стоимость — 24 500 сом. Оплата — 100% предоплата переводом или наличными. Дата начала: [ЗАМЕНИТЬ: ближайшая дата старта]." },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Курс на 5 дней</div>
            <h1>5 дней, которые изменят ваше отношение к деньгам</h1>
            <p className="hero-description">Курс «Финансовое образование для взрослых». Простым языком разберём, как устроены деньги, как создавать и улучшать активы и как изменить свои траты. Подходит тем, кто начинает с нуля.</p>
            <div className="hero-note"><BadgeCheck size={17} /> Курс проводит Манапбаева Нураим Замирбековна</div>
            <div className="hero-actions">
              <Link className="button button-primary" href="#program">Посмотреть, что мы пройдём <ArrowRight size={17} /></Link>
              <a className="button button-quiet" href={whatsappUrl} target="_blank" rel="noreferrer">Написать в WhatsApp <MessageCircle size={16} /></a>
            </div>
          </div>
          <CourseReceipt />
        </div>
        <div className="hero-bottom"><span>ПОНЯТНО О СЛОЖНОМ</span><span>Для тех, кто начинает с нуля</span><span>Без обещаний дохода</span></div>
      </section>

      <TeacherProfile />

      <section className="section-wrap landing-section audience-section" id="audience">
        <div className="section-heading">
          <div><div className="eyebrow eyebrow-muted">ДЛЯ КОГО ЭТОТ КУРС</div><h2>Если деньги важны, <span className="text-accent">начните с ясности.</span></h2></div>
          <p>Не нужно быть инвестором или вести идеальный бюджет. Курс пригодится, если вы хотите лучше понимать свои денежные решения.</p>
        </div>
        <div className="situation-grid">
          {situations.map(({ icon: Icon, title, text }, index) => (
            <article className="situation-card" key={title}>
              <div className="benefit-top"><span className="benefit-icon"><Icon size={20} /></span><span className="benefit-number">0{index + 1}</span></div>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="program-section landing-program" id="program">
        <div className="section-wrap">
          <div className="section-heading program-heading">
            <div><div className="eyebrow eyebrow-muted">ПРОГРАММА КУРСА</div><h2>От финансовых целей — <span className="text-accent">к управлению риском.</span></h2></div>
            <p>За 5 дней вы пройдёте:</p>
          </div>
          <div className="topic-grid">
            {courseTopics.map((topic, index) => (
              <article className="topic-card" key={topic.slug}>
                <div className="topic-card-meta"><span className="topic-card-icon"><CourseTopicIcon icon={topic.icon} /></span><span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <div className="topic-outcome"><span>Что вы поймёте</span><p>{topic.outcome}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap landing-section outcomes-section" id="outcomes">
        <div className="section-heading">
          <div><div className="eyebrow eyebrow-muted">ЧТО МЫ ПОЛУЧИМ?</div><h2>Не готовый ответ за вас, <span className="text-accent">а опору для решений.</span></h2></div>
          <p>Цель курса — не гарантировать финансовый результат, а помочь понимать варианты и действовать осознаннее.</p>
        </div>
        <div className="benefit-grid outcome-grid">
          {outcomes.map(({ icon: Icon, title, text }) => (
            <article className="benefit-card outcome-card" key={title}>
              <div className="benefit-top"><span className="benefit-icon"><Icon size={20} /></span></div>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="course-details-section" id="format">
        <div className="section-wrap">
          <div className="section-heading">
            <div><div className="eyebrow eyebrow-muted">КАК ПРОХОДИТ КУРС</div><h2>Все важные условия — <span className="text-accent">до записи.</span></h2></div>
            <p>Добавьте подтверждённые детали перед публикацией набора.</p>
          </div>
          <div className="course-detail-grid">
            <article><span>Формат</span><strong>Офлайн</strong></article>
            <article><span>Длительность</span><strong>5 дней</strong></article>
            <article><span>Сколько длится каждое занятие</span><strong>2,5 часа</strong></article>
            <article><span>Стоимость</span><strong>24 500 сом. 100% предоплата переводом или наличными.</strong></article>
            <article><span>Старт</span><strong>[ЗАМЕНИТЬ: дата начала курса]</strong></article>
            <article><span>Количество мест</span><strong>12</strong></article>
          </div>
        </div>
      </section>

      <section className="section-wrap landing-section faq-section" id="faq">
        <div className="section-heading">
          <div><div className="eyebrow eyebrow-muted">ЧАСТЫЕ ВОПРОСЫ</div><h2>Лучше знать <span className="text-accent">заранее.</span></h2></div>
          <p>Если у вас остался вопрос, напишите нам в WhatsApp.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details className="faq-item" key={item.question}>
              <summary><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span><i aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="application-section whatsapp-section" id="contact">
        <div className="section-wrap whatsapp-layout">
          <div className="application-copy">
            <div className="eyebrow">СЛЕДУЮЩИЙ ШАГ</div>
            <h2>Хотите узнать больше <span>о курсе?</span></h2>
            <p>Напишите нам в WhatsApp — ответим на вопросы и расскажем подробности о курсе.</p>
            <a className="wa-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={22} aria-hidden="true" />
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
