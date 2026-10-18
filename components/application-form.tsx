"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const contact = String(formData.get("contact") ?? "").trim();
    const comment = String(formData.get("comment") ?? "").trim();
    const destination = new URL(whatsappUrl);

    destination.searchParams.set(
      "text",
      [
        "Здравствуйте! Хочу узнать о курсе.",
        `Имя: ${name}`,
        `Контакт для связи: ${contact}`,
        comment ? `Комментарий: ${comment}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.open(destination.toString(), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="application-success" role="status" aria-live="polite">
        <span><CircleCheck size={24} /></span>
        <h3>Заявка подготовлена в WhatsApp.</h3>
        <p>Проверьте сообщение в WhatsApp и нажмите «Отправить», чтобы связаться с нами.</p>
        <button type="button" className="form-reset" onClick={() => setSubmitted(false)}>Заполнить ещё раз</button>
      </div>
    );
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <div className="form-heading"><span className="eyebrow eyebrow-muted">ЗАЯВКА НА КУРС</span><p>Оставьте контакты — сообщение откроется в WhatsApp, где его можно будет отправить.</p></div>
      <label htmlFor="applicant-name">Как к вам обращаться?</label>
      <input id="applicant-name" name="name" autoComplete="name" required maxLength={100} placeholder="Ваше имя" />
      <label htmlFor="applicant-contact">Телефон, Telegram или WhatsApp</label>
      <input id="applicant-contact" name="contact" autoComplete="tel" required maxLength={160} placeholder="Удобный контакт для связи" />
      <label htmlFor="applicant-comment">Комментарий <span>необязательно</span></label>
      <textarea id="applicant-comment" name="comment" rows={3} maxLength={1000} placeholder="Что хотите узнать о курсе?" />
      <button type="submit" className="button button-primary form-submit">
        Продолжить в WhatsApp
        <ArrowRight size={16} />
      </button>
      <small className="form-privacy">Не указывайте пароли, коды подтверждения или банковские данные.</small>
    </form>
  );
}
