import { Link } from 'react-router-dom'

const helpItems = [
  ['How do I add a student?', 'Open Students from the workspace menu and choose Add student. Fill in the student’s name, email, grade and class, then save.'],
  ['Can I find a specific record quickly?', 'Use the search field above the directory to look up a name, email address or ID. On the student list, you can also filter by grade.'],
  ['How do I update or remove a record?', 'Choose the pencil icon to edit a record, or open the profile to review its details. The delete button asks you to confirm before removing anything.'],
  ['Where is my information saved?', 'This demonstration stores records and your signed-in profile in this browser’s local storage. It does not send information to a server.'],
]

function Help({ role }) {
  return <div className="help-page">
    <div className="page-heading"><div><span className="eyebrow">HELP CENTER</span><h1>Using your<br />workspace</h1><p>Instructions for managing records and account settings.</p></div><div className="help-illustration">?</div></div>
    <section className="help-card"><span className="eyebrow">QUICK ANSWERS</span><h2>Frequently asked questions</h2><div className="faq-list">{helpItems.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="help-contact"><div><span className="eyebrow">QUICK LINK</span><h2>Open the student directory</h2><p>Search, filter, and update student records from the dashboard.</p></div><Link className="btn btn-primary" to={`/${role}/students`}>Go to students <span>→</span></Link></section>
  </div>
}

export default Help
