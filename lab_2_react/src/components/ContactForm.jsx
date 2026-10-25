import { useCallback, useEffect, useState } from 'react';

const ENDPOINT = 'https://formspree.io/f/xeaedwjk';
const DELAY_MS = 60000; 
const DISMISSED_KEY = 'feedbackModalDismissed';

const inputClass =
  'w-full rounded-md border border-emerald-400/30 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const close = useCallback(() => {
    setIsOpen(false);
    // запам'ятовуємо на сесію, щоб вікно не з'являлося знову
    sessionStorage.setItem(DISMISSED_KEY, '1');
  }, []);

  // таймер: відкрити модалку через 1 хвилину
  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    const timer = setTimeout(() => setIsOpen(true), DELAY_MS);
    return () => clearTimeout(timer); // прибираємо таймер при демонтуванні
  }, []);

  // закриття клавішею Escape, поки вікно відкрите
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  async function handleSubmit(event) {
    event.preventDefault(); // не перезавантажуємо сторінку
    const form = event.currentTarget;
    setStatus('sending');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: new FormData(form), // поля беруться за атрибутами name
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setStatus('success');
      form.reset();
      sessionStorage.setItem(DISMISSED_KEY, '1');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 2000);
    } catch (err) {
      console.error('Помилка надсилання форми:', err);
      setStatus('error');
    }
  }

  // умовний рендеринг: поки isOpen === false, нічого не малюємо
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) close(); // клік по фону
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-emerald-400/40 bg-slate-900 p-6 shadow-2xl shadow-emerald-500/20">
        <button
          type="button"
          onClick={close}
          aria-label="Закрити"
          className="absolute top-3 right-4 text-2xl leading-none text-slate-500 hover:text-emerald-400"
        >
          ×
        </button>

        <h2 id="modal-title" className="mb-4 font-mono text-xl font-bold text-white">
          <span className="text-emerald-400">&gt; </span>Зворотний зв'язок
        </h2>

        <form action={ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="c-name" className="mb-1 block font-mono text-xs text-emerald-400">
              Ім'я
            </label>
            <input id="c-name" name="name" type="text" required autoFocus className={inputClass} />
          </div>

          <div>
            <label htmlFor="c-email" className="mb-1 block font-mono text-xs text-emerald-400">
              Email
            </label>
            <input id="c-email" name="email" type="email" required className={inputClass} />
          </div>

          <div>
            <label htmlFor="c-phone" className="mb-1 block font-mono text-xs text-emerald-400">
              Номер телефону
            </label>
            <input
              id="c-phone"
              name="phone"
              type="tel"
              required
              placeholder="+380 XX XXX XX XX"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="c-message" className="mb-1 block font-mono text-xs text-emerald-400">
              Повідомлення
            </label>
            <textarea id="c-message" name="message" rows="4" required className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-md bg-emerald-400 px-4 py-2 font-mono font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-wait disabled:opacity-60"
          >
            {status === 'sending' ? 'Надсилання…' : 'Надіслати'}
          </button>

          <p className="min-h-5 font-mono text-xs" role="status">
            {status === 'success' && (
              <span className="text-emerald-400">Дякуємо! Повідомлення надіслано.</span>
            )}
            {status === 'error' && (
              <span className="text-rose-400">Не вдалося надіслати. Перевірте endpoint і спробуйте ще раз.</span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
