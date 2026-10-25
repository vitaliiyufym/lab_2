function Education() {
  return (
    <section className="md:col-span-2 group rounded-2xl border border-emerald-400/30 bg-slate-900/70 p-6 shadow-lg shadow-emerald-500/10 transition duration-300 hover:scale-[1.02] hover:border-emerald-400 hover:shadow-emerald-500/30">
      <h2 className="mb-4 font-mono text-xl font-bold tracking-wide text-white">
        <span className="text-emerald-400">&gt; </span>Освіта
      </h2>
      <article className="border-l-2 border-cyan-400/60 pl-4">
        <h3 className="text-lg font-semibold text-white">Національний університет "Львівська політехніка"</h3>
        <p className="text-slate-300">Кібербезпека</p>
        <p className="font-mono text-sm text-cyan-300">2025 — дотепер</p>
      </article>
    </section>
  );
}

export default Education;
