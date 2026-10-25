function Skills() {
  const skills = ["HTML5, CSS3", "JavaScript", "React", "Git / GitHub", "Python"];

  return (
    // від md: 3-я колонка, починається з 1-го рядка й займає всі 3 рядки
    <section className="md:col-start-3 md:row-start-1 md:row-span-3 group rounded-2xl border border-emerald-400/30 bg-slate-900/70 p-6 shadow-lg shadow-emerald-500/10 transition duration-300 hover:scale-[1.02] hover:border-emerald-400 hover:shadow-emerald-500/30">
      <h2 className="mb-4 font-mono text-xl font-bold tracking-wide text-white">
        <span className="text-emerald-400">&gt; </span>Навички
      </h2>
      <ul className="flex flex-wrap gap-2 md:flex-col md:items-start">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 font-mono text-sm text-cyan-300 transition duration-200 hover:scale-110 hover:bg-cyan-300 hover:text-slate-950 hover:shadow-lg hover:shadow-cyan-400/40"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
