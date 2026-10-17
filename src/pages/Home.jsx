import { Link } from 'react-router-dom'

function Home() {
  return <main>
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy"><span className="hero-badge">SCHOOL ADMINISTRATION</span>
          <h1>School records,<br />without the<br /><span>spreadsheet shuffle.</span></h1>
          <p>Keep student and staff information organized, and give your school team one clear place to start each day.</p>
          <div className="hero-actions"><Link to="/signup" className="btn btn-primary btn-lg">Get started <span>→</span></Link><Link to="/about" className="btn btn-light btn-lg">How it works</Link></div>
          <div className="hero-proof">Student records <span>·</span> Staff directory <span>·</span> School overview</div>
        </div>
        <div className="hero-art" aria-label="Illustration of a school dashboard">
          <div className="preview-card"><div className="preview-top"><div><div className="preview-logo"><b>School overview</b></div><small>THIS TERM</small></div><div className="preview-profile">AM</div></div>
            <h3>Welcome back, Alex</h3><p>A quick look at your school directory.</p>
            <div className="preview-stats"><div><span>Students</span><strong>12</strong><i>Across 5 grade levels</i></div><div><span>Teachers</span><strong>5</strong><i>Across 5 subjects</i></div></div>
            <div className="preview-list-head"><strong>Recently added students</strong><span>View directory →</span></div>
            {[['AO', 'Amara Okafor', 'Grade 10'], ['NW', 'Noah Williams', 'Grade 9'], ['ZM', 'Zara Mensah', 'Grade 11']].map(([initials, name, grade]) => <div className="preview-student" key={name}><span className="mini-avatar">{initials}</span><strong>{name}</strong><small>{grade}</small><span className="mini-dot" /></div>)}
          </div>
        </div>
      </div>
    </section>
    <section className="home-features"><div className="container"><div className="section-intro"><span className="eyebrow">ONE SHARED WORKSPACE</span><h2>The everyday tools your<br />school team needs.</h2><p>Find records, update details and check in on your school from one place.</p></div>
      <div className="row g-4 feature-grid">
        {[['♧', 'Student records', 'Find student details, classes and attendance in a few clicks.'], ['♙', 'Your teaching team', 'Keep teacher profiles and classroom assignments organized.'], ['▦', 'A clearer overview', 'Get a quick picture of your school and what needs attention.']].map(([icon, title, copy]) => <div className="col-md-4" key={title}><article className="feature-card"><span className="feature-icon">{icon}</span><h3>{title}</h3><p>{copy}</p><span className="feature-arrow">↗</span></article></div>)}
      </div>
    </div></section>
    <section className="home-bottom"><div className="container bottom-banner"><div><span className="eyebrow">GET STARTED</span><h2>Bring your school records<br />into one place.</h2></div><Link to="/signup" className="btn btn-light btn-lg">Create an account <span>→</span></Link></div></section>
  </main>
}

export default Home
