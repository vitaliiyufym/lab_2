function Skills() {
  const skills = ["HTML5, CSS3", "JavaScript", "React", "Git / GitHub", "Python"];

  return (
    <section>
      <h2>Навички</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;