import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

const MANUAL_KEY = 'themeManual'; // ручний вибір діє до кінця сесії

// Денна тема: 07:00–20:59, нічна: увесь інший час
function themeByTime(date = new Date()) {
  const hours = date.getHours(); // 0–23
  return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState('dark');

  // при завантаженні перевіряємо час (або ручний вибір, якщо він є)
  useEffect(() => {
    setTheme(sessionStorage.getItem(MANUAL_KEY) || themeByTime());

    // якщо вручну не перемикали — раз на хвилину звіряємо з часом доби
    const id = setInterval(() => {
      if (!sessionStorage.getItem(MANUAL_KEY)) setTheme(themeByTime());
    }, 60000);
    return () => clearInterval(id);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    sessionStorage.setItem(MANUAL_KEY, next);
    setTheme(next);
  }

  return (
    // клас light вмикає світлу палітру з index.css
    <div
      className={`${theme === 'light' ? 'light' : ''} min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.18),transparent_55%)] bg-no-repeat text-slate-200 font-sans leading-relaxed transition-colors duration-300`}
    >
      <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
        {/* перемикач теми */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-emerald-400/40 bg-slate-900 px-4 py-1.5 font-mono text-sm text-emerald-400 transition hover:bg-emerald-400 hover:text-slate-950"
          >
            {theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема'}
          </button>
        </div>

        <Header />

        {/* банер: градієнтна рамка через p-px + внутрішній блок */}
        <div className="rounded-2xl bg-linear-to-r from-emerald-500 via-cyan-500 to-indigo-500 p-px shadow-lg shadow-cyan-500/20">
          <p className="rounded-2xl bg-slate-950 px-6 py-3 text-center font-mono text-lg tracking-widest text-white md:text-xl">
            I <span className="animate-pulse text-rose-400">♥</span> cybersecurity
          </p>
        </div>

        {/* 1 колонка на телефоні; від md: 3 колонки, «Навички» справа на всю висоту */}
        <main className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <About />
          <Education />
          <Experience />
          <Skills />
        </main>

        <Reviews />
        <Footer />
      </div>

      {/* модальне вікно (з'являється через 1 хвилину) */}
      <ContactForm />
    </div>
  );
}

export default App;
