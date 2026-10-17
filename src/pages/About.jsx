import { Link } from 'react-router-dom'

function About() {
  return <main className="public-page"><section className="public-hero"><span className="eyebrow">ABOUT CLASSROOM</span><h1>School information,<br />in one <span>workspace.</span></h1><p>Classroom is a student management system demonstration for school administrators and teachers. It brings sample student records, staff details, and basic account settings together in one interface.</p></section>
    <section className="container about-grid"><div className="about-mark">C</div><div><span className="eyebrow">HOW IT WORKS</span><h2>Tools for administrators<br />and teachers.</h2><p>Administrators can manage student and teacher records, review school totals, and update their account preferences. Teachers can manage student information and personal settings in a separate dashboard.</p><p>This project uses fictional sample data saved in your browser. It does not provide real authentication or connect to a school database.</p><Link to="/signup" className="text-link">Create a demo account →</Link></div></section>
    <section className="container values-row">{[['01', 'Keep it clear', 'Straightforward tools make important information easier to find.'], ['02', 'Work together', 'One organized place helps school teams stay in sync.'], ['03', 'Put students first', 'Thoughtful systems give educators more time for learners.']].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</section>
  </main>
}

export default About
