function About() {
  return (
    <section className="md:col-span-2 group rounded-2xl border border-emerald-400/30 bg-slate-900/70 p-6 shadow-lg shadow-emerald-500/10 transition duration-300 hover:scale-[1.02] hover:border-emerald-400 hover:shadow-emerald-500/30">
      <h2 className="mb-4 font-mono text-xl font-bold tracking-wide text-white">
        <span className="text-emerald-400">&gt; </span>Про мене
      </h2>
      <p className="text-slate-300">
        Студент спеціальності "Кібербезпека" у Національному університеті "Львівська політехніка".
        Цікавлюся веброзробкою, вивчаю HTML, CSS, JavaScript та React.
        Прагну розвиватися як фронтенд-розробник.
      </p>
    </section>
  );
}

export default About;
