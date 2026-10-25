/* ==========================================================
   Лабораторна робота №4 — JavaScript
   1. localStorage + інформація про систему у футері
   2. Fetch: відгуки з JSONPlaceholder
   3. Модальне вікно з формою через 1 хвилину (Formspree)
   4. Денна / нічна тема
   ========================================================== */

// ===== НАЛАШТУВАННЯ — змініть під себе =====
const VARIANT = 26;               // ваш номер у журналі групи
const MODAL_DELAY_MS = 60000;    // 1 хвилина (для тесту поставте 5000)
// ============================================


/* ---------- 1. Системна інформація → localStorage → футер ---------- */

function collectSystemInfo() {
  const nav = navigator;
  return {
    userAgent: nav.userAgent,
    platform: nav.platform,
    uaDataPlatform: nav.userAgentData ? nav.userAgentData.platform : 'недоступно',
    vendor: nav.vendor || 'недоступно',
    language: nav.language,
    languages: (nav.languages || []).join(', '),
    cookieEnabled: String(nav.cookieEnabled),
    onLine: String(nav.onLine),
    hardwareConcurrency: String(nav.hardwareConcurrency ?? 'недоступно'),
    deviceMemory: nav.deviceMemory ? nav.deviceMemory + ' GB' : 'недоступно',
    maxTouchPoints: String(nav.maxTouchPoints ?? 0),
    screen: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth + ' bit',
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

function saveSystemInfo() {
  const info = collectSystemInfo();
  for (const [key, value] of Object.entries(info)) {
    localStorage.setItem(key, value); // localStorage зберігає лише рядки
  }
}

function renderLocalStorage() {
  const list = document.getElementById('system-info');
  list.replaceChildren();

  // збираємо всі ключі, що є у localStorage, і сортуємо за алфавітом
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
  }
  keys.sort();

  for (const key of keys) {
    const dt = document.createElement('dt');
    dt.textContent = key;
    const dd = document.createElement('dd');
    dd.textContent = localStorage.getItem(key);
    list.append(dt, dd);
  }
}


/* ---------- 2. Відгуки з сервера (fetch + async/await) ---------- */

function createReviewCard(comment) {
  const card = document.createElement('article');
  card.className = 'review-card';

  const name = document.createElement('h3');
  name.textContent = comment.name;

  const email = document.createElement('span');
  email.className = 'review-email';
  email.textContent = comment.email;

  const body = document.createElement('p');
  body.textContent = comment.body;

  card.append(name, email, body);
  return card;
}

async function loadReviews() {
  const container = document.getElementById('reviews-list');
  const url = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const comments = await response.json();

    if (comments.length === 0) {
      container.textContent = 'Відгуків немає.';
      return;
    }
    // порядок збережено: масив виводиться так, як прийшов
    container.replaceChildren(...comments.map(createReviewCard));
  } catch (error) {
    console.error('Помилка завантаження відгуків:', error);
    container.textContent = 'Не вдалося завантажити відгуки. Спробуйте пізніше.';
  }
}


/* ---------- 3. Модальне вікно із формою зворотного зв'язку ---------- */

const modal = document.getElementById('modal');
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

// sessionStorage живе до закриття вкладки — модалка не з'явиться знову в цій сесії
const DISMISSED_KEY = 'feedbackModalDismissed';

function openModal() {
  modal.hidden = false;
  document.getElementById('f-name').focus();
}

function closeModal() {
  modal.hidden = true;
  sessionStorage.setItem(DISMISSED_KEY, '1');
}

function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);

  // клік по темному фону (але не по самій формі) теж закриває вікно
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  form.addEventListener('submit', handleSubmit);

  if (!sessionStorage.getItem(DISMISSED_KEY)) {
    setTimeout(openModal, MODAL_DELAY_MS);
  }
}

async function handleSubmit(event) {
  event.preventDefault(); // залишаємося на сторінці, не переходимо на Formspree
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  statusEl.textContent = 'Надсилання…';

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form), // збирає поля за атрибутами name
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    statusEl.textContent = 'Дякуємо! Повідомлення надіслано.';
    form.reset();
    sessionStorage.setItem(DISMISSED_KEY, '1');
    setTimeout(() => { modal.hidden = true; statusEl.textContent = ''; }, 2000);
  } catch (error) {
    console.error('Помилка надсилання форми:', error);
    statusEl.textContent = 'Не вдалося надіслати. Перевірте endpoint Formspree і спробуйте ще раз.';
  } finally {
    submitBtn.disabled = false;
  }
}


/* ---------- 4. Денна / нічна тема ---------- */

const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const MANUAL_KEY = 'themeManual'; // ручний вибір діє до кінця сесії

// Денна: 07:00–20:59, нічна: решта часу
function themeByTime(date = new Date()) {
  const hours = date.getHours(); // 0–23
  return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.textContent = theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема';
}

function initTheme() {
  applyTheme(sessionStorage.getItem(MANUAL_KEY) || themeByTime());

  themeBtn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    sessionStorage.setItem(MANUAL_KEY, next);
    applyTheme(next);
  });

  // якщо користувач не перемикав вручну — раз на хвилину звіряємо з часом доби
  setInterval(() => {
    if (!sessionStorage.getItem(MANUAL_KEY)) applyTheme(themeByTime());
  }, 60000);
}


/* ---------- Запуск ---------- */
initTheme();
saveSystemInfo();
renderLocalStorage();
loadReviews();
initModal();
