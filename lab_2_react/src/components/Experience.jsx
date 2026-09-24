
function Job({ title, company, period, tasks }) {
  return (
    <article>
      <h3>{title}</h3>
      <p><em>{company}</em>, {period}</p>
      <ul>
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
    <section>
      <h2>Досвід роботи</h2>
      {jobs.map((job, index) => (
        <Job key={index} {...job} />
      ))}
    </section>
  );
}

export default Experience;