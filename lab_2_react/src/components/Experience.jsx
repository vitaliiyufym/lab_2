function Job({ title, company, period, tasks }) {
  return (
    <article className="border-l-2 border-cyan-400/60 pl-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p>
        <em className="text-slate-300">{company}</em>,{' '}
        <span className="font-mono text-sm text-cyan-300">{period}</span>
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300 marker:text-emerald-400">
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </article>
  );
}

function Experience() {
  const jobs = [
    {
      title: "Веброзробник",
      company: "VseGood",
      period: "2024 — 2025",
      tasks: [
        "Створення десятків сайтів",
        "Неодноразова участь в міжнародних змаганнях",
      ],
    },
  ];

  return (
    <section className="md:col-span-2 group rounded-2xl border border-emerald-400/30 bg-slate-900/70 p-6 shadow-lg shadow-emerald-500/10 transition duration-300 hover:scale-[1.02] hover:border-emerald-400 hover:shadow-emerald-500/30">
      <h2 className="mb-4 font-mono text-xl font-bold tracking-wide text-white">
        <span className="text-emerald-400">&gt; </span>Досвід роботи
      </h2>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <Job key={index} {...job} />
        ))}
      </div>
    </section>
  );
}

export default Experience;
