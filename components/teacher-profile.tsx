import { HandCoins } from "lucide-react";

const teacherFacts = [
  { value: "Около 20 лет", label: "опыта в коммуникациях, банковской сфере, консалтинге и коучинге" },
  { value: "650+", label: "часов практики коучинга" },
  { value: "Более 5 000", label: "учеников" },
  { value: "4 региона", label: "Центральная Азия, Европа, Азия и США" },
];

const currentRoles = [
  "Коуч и ментор Менторской программы EBRD в Казахстане и Кыргызстане",
  "CMC®-консультант",
  "Сооснователь NegizPro",
  "Партнёр Baker Tilly Academy",
];

const certifications = [
  "Executive and Team Coach ICF",
  "Сертифицированный тренер по финансовому образованию и Client Experience",
];

const communities = [
  "ICF в Кыргызстане",
  "CELA",
  "CMC Central Asia",
  "Business Consultants Club",
  "IAF",
];

export function TeacherProfile() {
  return (
    <section className="section-wrap landing-section teacher-section" id="teacher">
      <div className="teacher-card">
        <div className="teacher-visual">
          <div className="teacher-photo-placeholder" role="img" aria-label="Место для фотографии Манапбаевой Нураим Замирбековны">
            <span><HandCoins size={38} /></span>
            <strong>[ЗАМЕНИТЬ: фото преподавателя]</strong>
          </div>
          <blockquote className="teacher-motto">Управляем финансами разумно</blockquote>
        </div>
        <div className="teacher-copy">
          <div className="eyebrow eyebrow-muted">О ПРЕПОДАВАТЕЛЕ</div>
          <h2 className="teacher-name">Манапбаева Нураим Замирбековна</h2>
          <p className="teacher-role">Executive and Team Coach ICF · Коуч · Ментор · CMC®-консультант</p>
          <p className="teacher-bio">Работает с руководителями и командами как коуч и ментор, а также обучает финансовому образованию и Client Experience. Практика коучинга охватывает Центральную Азию, Европу, Азию и США.</p>
          <div className="teacher-facts">
            {teacherFacts.map((fact) => (
              <div className="teacher-fact" key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
          <div className="teacher-credentials">
            <h3>Роли и сотрудничество</h3>
            <ul>{currentRoles.map((role) => <li key={role}>{role}</li>)}</ul>
          </div>
          <div className="teacher-credentials">
            <h3>Квалификации</h3>
            <ul>{certifications.map((certification) => <li key={certification}>{certification}</li>)}</ul>
          </div>
          <div className="teacher-credentials">
            <h3>Профессиональные сообщества</h3>
            <ul>{communities.map((community) => <li key={community}>{community}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
