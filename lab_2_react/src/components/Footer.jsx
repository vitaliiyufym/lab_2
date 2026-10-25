import { useEffect, useState } from 'react';

// Збираємо інформацію про систему та браузер
function collectSystemInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: (navigator.languages || []).join(', '),
    vendor: navigator.vendor || 'недоступно',
    cookieEnabled: String(navigator.cookieEnabled),
    onLine: String(navigator.onLine),
    hardwareConcurrency: String(navigator.hardwareConcurrency ?? 'недоступно'),
    screen: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

function Footer() {
  // стан, у якому лежить усе, що прочитали з localStorage
  const [stored, setStored] = useState([]);

  // [] — виконається один раз, коли компонент змонтується
  useEffect(() => {
    // 1. зберігаємо у localStorage
    for (const [key, value] of Object.entries(collectSystemInfo())) {
      localStorage.setItem(key, value);
    }

    // 2. зчитуємо з localStorage все, що там є
    const entries = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      entries.push([key, localStorage.getItem(key)]);
    }
    entries.sort(([a], [b]) => a.localeCompare(b));
    setStored(entries);
  }, []);

  return (
    <footer className="rounded-2xl border-t-2 border-emerald-400/40 p-4 font-mono text-sm text-slate-500">
      <p className="text-center">
        <span className="text-emerald-400">$ </span>
        &copy; 2026 Юфим Віталій. Резюме створено в рамках лабораторної роботи №4.
      </p>

      <h2 className="mt-6 mb-3 text-base font-bold text-white">
        <span className="text-emerald-400">&gt; </span>
        Інформація про систему (localStorage)
      </h2>

      <dl className="grid gap-x-4 gap-y-1 text-xs md:grid-cols-[max-content_1fr]">
        {stored.map(([key, value]) => (
          <div key={key} className="contents">
            <dt className="font-bold text-emerald-400">{key}</dt>
            <dd className="mb-2 break-all md:mb-0">{value}</dd>
          </div>
        ))}
      </dl>
    </footer>
  );
}

export default Footer;
