"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Check, CircleCheck, CircleDollarSign, Download, Plus, Trash2 } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { instrumentCards } from "@/lib/content";

type ToolType = "instruments" | "tracker" | "challenge";
type Transaction = { id: string; type: "income" | "expense"; date: string; amount: number; category: string; note: string };
const STORAGE_KEY = "money-course-transactions";
const CATEGORY_KEY = "money-course-categories";
const defaultCategories = ["Еда", "Жильё", "Транспорт", "Здоровье", "Подписки", "Отдых", "Покупки", "Другое"];
const challengeTasks = [
  "День 1: Запишите все траты за день",
  "День 2: Зафиксируйте доходы и обязательные платежи",
  "День 3: Проверьте регулярные подписки",
  "День 4: Разделите покупки на необходимые и желаемые",
  "День 5: Подождите 24 часа перед спонтанной покупкой",
  "День 6: Составьте список покупок заранее",
  "День 7: Подведите итоги первой недели без самооценки",
  "День 8: Выберите одну финансовую цель",
  "День 9: Оцените стоимость цели и срок",
  "День 10: Откройте отдельный счёт или копилку для цели",
  "День 11: Отложите посильную сумму на цель",
  "День 12: Сравните тариф связи или интернета",
  "День 13: Проверьте комиссии по своим счетам",
  "День 14: Подведите итоги второй недели",
  "День 15: Посмотрите, где чаще возникают импульсные покупки",
  "День 16: Попробуйте день без необязательных покупок",
  "День 17: Приготовьте список покупок перед походом в магазин",
  "День 18: Сравните цену за единицу товара",
  "День 19: Найдите одну подписку, которой не пользуетесь",
  "День 20: Запланируйте небольшую сумму на отдых",
  "День 21: Подведите итоги третьей недели",
  "День 22: Проверьте стоимость банковского обслуживания",
  "День 23: Отложите покупку, которую хочется сделать под влиянием рекламы",
  "День 24: Найдите безопасный способ сократить один регулярный расход",
  "День 25: Обсудите финансовую цель с близким человеком",
  "День 26: Автоматизируйте посильный перевод в накопления",
  "День 27: Сравните план расходов с реальными тратами",
  "День 28: Подведите итоги четвёртой недели",
  "День 29: Выберите одну привычку, которую хотите сохранить",
  "День 30: Составьте план на следующий месяц",
];

function isTransactionList(value: unknown): value is Transaction[] {
  return Array.isArray(value) && value.every((item) =>
    typeof item === "object" && item !== null &&
    typeof item.id === "string" && (item.type === "income" || item.type === "expense") &&
    typeof item.date === "string" && typeof item.amount === "number" &&
    typeof item.category === "string" && typeof item.note === "string"
  );
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isCategoryList(value: unknown): value is string[] {
  return isStringList(value) && value.includes("Другое") && new Set(value).size === value.length;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value);
}

function useBrowserData<T>(key: string, fallback: T, isValid: (value: unknown) => value is T) {
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (!isValid(parsed)) throw new Error("Сохранённые данные имеют неверный формат.");
        setValue(parsed);
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Не удалось прочитать сохранённые данные.");
    } finally {
      setReady(true);
    }
  }, [key, isValid]);
  const save = (next: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(next));
      setValue(next);
      setError("");
      return null;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Не удалось сохранить данные.";
      setError(message);
      return message;
    }
  };
  return { value, save, ready, error };
}

export function InteractiveTools({ type }: { type: ToolType }) {
  if (type === "instruments") return <InstrumentFilter />;
  if (type === "tracker") return <MoneyTracker />;
  return <SpendingChallenge />;
}

function InstrumentFilter() {
  const [risk, setRisk] = useState("Все");
  const risks = ["Все", "Низкий", "Средний", "Высокий"];
  const visible = risk === "Все" ? instrumentCards : instrumentCards.filter((item) => item.risk === risk);
  return (
    <section className="tool-panel" id="praktika">
      <div className="tool-panel-heading"><span className="tool-icon"><CircleDollarSign size={20} /></span><div><div className="eyebrow eyebrow-muted">СПРАВОЧНИК</div><h2>Сравните инструменты</h2></div></div>
      <div className="filter-row"><span>Уровень риска (ориентировочно):</span><div className="filter-pills">{risks.map((item) => <button key={item} className={risk === item ? "is-selected" : ""} onClick={() => setRisk(item)} type="button">{item}</button>)}</div></div>
      <div className="instrument-grid">{visible.map((item) => <article className="instrument-card" key={item.name}><div className="instrument-card-top"><h3>{item.name}</h3><span className={`risk-badge risk-${item.risk.toLowerCase()}`}>{item.risk} риск</span></div><p>{item.essence}</p><dl><div><dt>Плюсы</dt><dd>{item.pros}</dd></div><div><dt>Риски</dt><dd>{item.risks}</dd></div><div><dt>Кому подходит</dt><dd>{item.audience}</dd></div></dl></article>)}</div>
    </section>
  );
}

function MoneyTracker() {
  const transactionsStore = useBrowserData<Transaction[]>(STORAGE_KEY, [], isTransactionList);
  const categoriesStore = useBrowserData<string[]>(CATEGORY_KEY, defaultCategories, isCategoryList);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(defaultCategories[0]);
  const [note, setNote] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState("");
  const [editValue, setEditValue] = useState("");
  const [formError, setFormError] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const transactions = transactionsStore.value;
  const categories = categoriesStore.value;
  useEffect(() => {
    if (!categories.includes(category) && categories[0]) setCategory(categories[0]);
  }, [categories, category]);
  const filtered = transactions.filter((item) => item.date.startsWith(month)).sort((a, b) => b.date.localeCompare(a.date));
  const income = filtered.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
  const expense = filtered.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
  const balance = income - expense;
  const savings = income > 0 ? (balance / income) * 100 : null;
  const categoryTotals = Object.entries(filtered.filter((item) => item.type === "expense").reduce<Record<string, number>>((total, item) => {
    total[item.category] = (total[item.category] ?? 0) + item.amount;
    return total;
  }, {})).map(([name, value]) => ({ name, value }));
  const monthTotals = Array.from({ length: 6 }, (_, offset) => {
    const dateAtMonth = new Date(`${month}-01T12:00:00`);
    dateAtMonth.setMonth(dateAtMonth.getMonth() - (5 - offset));
    const key = `${dateAtMonth.getFullYear()}-${String(dateAtMonth.getMonth() + 1).padStart(2, "0")}`;
    const items = transactions.filter((item) => item.date.startsWith(key));
    return { month: dateAtMonth.toLocaleDateString("ru-RU", { month: "short" }), Доходы: items.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0), Расходы: items.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0) };
  });
  const colors = ["#16a477", "#5188db", "#f3a64b", "#9a75df", "#e27575", "#3eaaad", "#b1bd53", "#8190a9"];

  const persistTransactions = (next: Transaction[]) => {
    const error = transactionsStore.save(next);
    setFormError(error ?? "");
    return error === null;
  };
  const persistCategories = (next: string[]) => {
    const error = categoriesStore.save(next);
    setFormError(error ?? "");
    return error === null;
  };
  const addTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericAmount = Number(amount.replace(",", "."));
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setFormError("Укажите сумму больше нуля.");
      return;
    }
    setFormError("");
    try {
      if (persistTransactions([{ id: crypto.randomUUID(), type, date, amount: numericAmount, category: type === "income" ? "Доход" : category, note: note.trim() }, ...transactions])) {
        setAmount(""); setNote("");
      }
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Не удалось сохранить операцию.");
    }
  };
  const removeTransaction = (id: string) => persistTransactions(transactions.filter((item) => item.id !== id));
  const addCategory = () => {
    const name = newCategory.trim();
    if (!name) return;
    if (categories.includes(name)) {
      setFormError("Такая категория уже существует.");
      return;
    }
    if (!persistCategories([...categories, name])) return;
    setNewCategory("");
  };
  const renameCategory = (oldName: string) => {
    const name = editValue.trim();
    if (!name) return;
    if (name !== oldName && categories.includes(name)) {
      setFormError("Такая категория уже существует.");
      return;
    }
    if (!persistCategories(categories.map((item) => item === oldName ? name : item))) return;
    persistTransactions(transactions.map((item) => item.category === oldName ? { ...item, category: name } : item));
    if (category === oldName) setCategory(name);
    setEditingCategory("");
  };
  const deleteCategory = (name: string) => {
    if (name === "Другое") {
      setFormError("Категорию «Другое» нельзя удалить.");
      return;
    }
    if (!persistCategories(categories.filter((item) => item !== name))) return;
    persistTransactions(transactions.map((item) => item.category === name ? { ...item, category: "Другое" } : item));
    if (category === name) setCategory("Другое");
  };
  const exportCsv = () => {
    const safeCell = (value: string) => {
      const safeValue = /^[=+\-@]/.test(value) ? `'${value}` : value;
      return `"${safeValue.replaceAll('"', '""')}"`;
    };
    const rows = [["Дата", "Тип", "Сумма", "Категория", "Заметка"], ...transactions.map((item) => [item.date, item.type === "income" ? "Доход" : "Расход", String(item.amount), item.category, item.note])];
    const csv = `\uFEFF${rows.map((row) => row.map(safeCell).join(";")).join("\r\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `finansy-${month}.csv`; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section className="tracker-wrap" id="praktika">
      <div className="tracker-title-row"><div><div className="eyebrow eyebrow-muted">ВАШИ ДАННЫЕ ОСТАЮТСЯ У ВАС</div><h2>Мой денежный поток</h2></div><button type="button" className="button button-outline export-button" onClick={exportCsv} disabled={!transactions.length}><Download size={16} /> Экспорт CSV</button></div>
      {(transactionsStore.error || categoriesStore.error) && <p className="inline-error" role="alert">{transactionsStore.error || categoriesStore.error}</p>}
      <div className="tracker-summary">
        {[["Доход", income, "income"], ["Расход", expense, "expense"], ["Остаток", balance, balance >= 0 ? "income" : "expense"]].map(([label, value, className]) => <div className="summary-card" key={String(label)}><span>{label} за месяц</span><strong className={String(className)}>{formatMoney(Number(value))} ₽</strong></div>)}
        <div className="summary-card"><span>Норма сбережений</span><strong>{savings === null ? "—" : `${savings.toFixed(1)}%`}</strong><small>остаток ÷ доход</small></div>
      </div>
      <div className="tracker-grid">
        <div className="tracker-form-card">
          <h3>Добавить операцию</h3>
          <form onSubmit={addTransaction}>
            <div className="type-switch"><button type="button" className={type === "expense" ? "active-expense" : ""} onClick={() => setType("expense")}>Расход</button><button type="button" className={type === "income" ? "active-income" : ""} onClick={() => setType("income")}>Доход</button></div>
            <label>Сумма, ₽<input type="number" min="0.01" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Например, 1 500" required /></label>
            <label>Дата<input type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label>
            {type === "expense" && <label>Категория<select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>}
            <label>Заметка <span className="optional-label">необязательно</span><input value={note} onChange={(event) => setNote(event.target.value)} maxLength={120} placeholder="Например, продукты на неделю" /></label>
            {formError && <p className="inline-error" role="alert">{formError}</p>}
            <button className="button button-primary form-submit" type="submit"><Plus size={17} /> Добавить запись</button>
          </form>
          <button className="manage-categories" type="button" onClick={() => setShowCategories(!showCategories)}>{showCategories ? "Скрыть категории" : "Настроить категории"}</button>
          {showCategories && <div className="category-manager"><div className="category-add"><input aria-label="Новая категория" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Новая категория" /><button type="button" onClick={addCategory} aria-label="Добавить категорию"><Plus size={16} /></button></div>{categories.map((item) => <div className="category-row" key={item}>{editingCategory === item ? <><input aria-label="Название категории" value={editValue} onChange={(event) => setEditValue(event.target.value)} /><button type="button" onClick={() => renameCategory(item)} aria-label="Сохранить"><Check size={15} /></button></> : <><span>{item}</span><button type="button" onClick={() => { setEditingCategory(item); setEditValue(item); }} aria-label={`Изменить категорию ${item}`}>Изм.</button><button type="button" onClick={() => deleteCategory(item)} aria-label={`Удалить категорию ${item}`}><Trash2 size={14} /></button></>}</div>)}</div>}
        </div>
        <div className="tracker-charts">
          <div className="chart-card"><div className="chart-heading"><h3>Расходы по категориям</h3><label className="month-picker">Месяц<input type="month" value={month} onChange={(event) => setMonth(event.target.value)} /></label></div>
            {categoryTotals.length ? <div className="pie-chart-wrap"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={categoryTotals} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={3}>{categoryTotals.map((item, index) => <Cell key={item.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip formatter={(value) => `${formatMoney(Number(value))} ₽`} /></PieChart></ResponsiveContainer><div className="chart-legend">{categoryTotals.map((item, index) => <span key={item.name}><i style={{ background: colors[index % colors.length] }} />{item.name} <b>{formatMoney(item.value)} ₽</b></span>)}</div></div> : <div className="chart-empty">Добавьте расходы, чтобы увидеть распределение.</div>}
          </div>
          <div className="chart-card"><div className="chart-heading"><h3>Динамика за 6 месяцев</h3></div><div className="bar-chart-wrap"><ResponsiveContainer width="100%" height={230}><BarChart data={monthTotals} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" /><XAxis dataKey="month" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip formatter={(value) => `${formatMoney(Number(value))} ₽`} /><Bar dataKey="Доходы" fill="#16a477" radius={[4, 4, 0, 0]} /><Bar dataKey="Расходы" fill="#f0a14b" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
        </div>
      </div>
      <div className="transactions-card"><div className="chart-heading"><h3>Операции</h3><label className="month-picker">Показать за<input type="month" value={month} onChange={(event) => setMonth(event.target.value)} /></label></div>
        {filtered.length ? <div className="transaction-list">{filtered.map((item) => <div className="transaction-row" key={item.id}><span className={`transaction-mark ${item.type}`} /> <span className="transaction-date">{new Date(`${item.date}T12:00:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}</span><span className="transaction-detail"><strong>{item.category}</strong><small>{item.note || (item.type === "income" ? "Доход" : "Расход")}</small></span><strong className={`transaction-amount ${item.type}`}>{item.type === "income" ? "+" : "−"}{formatMoney(item.amount)} ₽</strong><button type="button" className="delete-transaction" onClick={() => removeTransaction(item.id)} aria-label="Удалить операцию"><Trash2 size={16} /></button></div>)}</div> : <div className="chart-empty">За этот месяц записей пока нет. Добавьте первую выше.</div>}
      </div>
      {!transactionsStore.ready && <p className="tracker-hint">Загружаем локальные записи…</p>}
      <p className="tracker-hint">Данные хранятся только в localStorage вашего браузера. Регулярно скачивайте CSV-копию.</p>
    </section>
  );
}

function SpendingChallenge() {
  const { value: checked, save, error } = useBrowserData<string[]>("money-course-spending-challenge", [], isStringList);
  const progress = Math.round((checked.length / challengeTasks.length) * 100);
  const toggle = (task: string) => save(checked.includes(task) ? checked.filter((item) => item !== task) : [...checked, task]);
  return (
    <section className="tool-panel challenge-panel" id="praktika">
      <div className="tool-panel-heading"><span className="tool-icon"><CircleCheck size={20} /></span><div><div className="eyebrow eyebrow-muted">ПРОГРАММА НА 30 ДНЕЙ</div><h2>Ваш спокойный денежный челлендж</h2></div></div>
      <p className="tool-intro">Отмечайте действия в любом порядке. Чек-лист сохраняется на этом устройстве — не обязательно делать всё идеально или за один день.</p>
      <div className="challenge-progress"><div><span>Выполнено пунктов</span><strong>{checked.length} из {challengeTasks.length}</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><small>{progress}% прогресса · {progress === 100 ? "Отличная работа — продолжайте подходящим вам темпом." : "Каждый небольшой шаг — уже прогресс."}</small></div>
      <div className="challenge-list">{challengeTasks.map((task, index) => <label className={`challenge-item${checked.includes(task) ? " checked" : ""}`} key={task}><input type="checkbox" checked={checked.includes(task)} onChange={() => toggle(task)} /><span className="challenge-check">{checked.includes(task) && <Check size={14} />}</span><span className="challenge-number">{String(index + 1).padStart(2, "0")}</span><span>{task}</span></label>)}</div>
      {error && <p className="inline-error" role="alert">{error}</p>}
      <p className="challenge-note">План — ориентир, а не соревнование. Изменяйте или пропускайте шаги, которые не подходят вашей ситуации.</p>
    </section>
  );
}
