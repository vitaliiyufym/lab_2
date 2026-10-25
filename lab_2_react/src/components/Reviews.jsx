import { useEffect, useState } from 'react';

const VARIANT = 26
const URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;

function Reviews() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController скасує запит, якщо компонент зникне до відповіді
    const controller = new AbortController();

    async function loadComments() {
      try {
        const response = await fetch(URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setComments(data); // порядок зберігається таким, як прийшов
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Не вдалося завантажити відгуки. Спробуйте пізніше.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadComments();
    return () => controller.abort();
  }, []);

  return (
    <section className="rounded-2xl border border-emerald-400/30 bg-slate-900/70 p-6 shadow-lg shadow-emerald-500/10">
      <h2 className="mb-4 font-mono text-xl font-bold tracking-wide text-white">
        <span className="text-emerald-400">&gt; </span>Відгуки попередніх роботодавців
      </h2>

      {loading && <p className="font-mono text-sm text-slate-500">Завантаження відгуків…</p>}
      {error && <p className="font-mono text-sm text-rose-400">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4 transition duration-200 hover:scale-[1.02] hover:border-cyan-400"
          >
            <h3 className="font-mono text-sm font-bold capitalize text-cyan-300">{comment.name}</h3>
            <p className="mb-2 font-mono text-xs text-slate-500">{comment.email}</p>
            <p className="text-sm">{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
