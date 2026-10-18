const includedTopics = [
  "Финансовые цели",
  "Разумное управление деньгами",
  "Сберегательные продукты",
  "Кредитные средства",
  "Платежи и переводы",
];

export function CourseReceipt() {
  return (
    <aside className="course-receipt" aria-label="Краткая информация о курсе">
      <div className="receipt-brand">
        <span className="receipt-monogram" aria-hidden="true">Ф</span>
        <strong>ФИНАНСОВОЕ ОБРАЗОВАНИЕ<br />ДЛЯ ВЗРОСЛЫХ</strong>
        <span>КУРС ПО ОБРАЩЕНИЮ С ДЕНЬГАМИ</span>
      </div>
      <dl className="receipt-facts">
        <div><dt>Длительность</dt><dd>5 дней</dd></div>
        <div><dt>Ведёт</dt><dd>Манапбаева Нураим Замирбековна</dd></div>
      </dl>
      <div className="receipt-list">
        <div className="receipt-list-heading"><span>Наименование</span><span>Стоимость</span></div>
        {includedTopics.map((topic) => (
          <div className="receipt-row" key={topic}><span>{topic}</span><strong>Входит</strong></div>
        ))}
      </div>
      <div className="receipt-total"><span>Итого к получению</span><strong>Ваш финансовый план</strong></div>
      <div className="receipt-footer">
        <span>ПРОГРАММА КУРСА</span>
        <span>БЕЗ ОБЕЩАНИЙ ДОХОДА</span>
      </div>
    </aside>
  );
}
