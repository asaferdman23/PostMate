import EmailPreview from "./EmailPreview";
import "../assets/css/index.css"

function EmailList({ emails, expanded, emailDetails }) {
  if (!emails) return <div>Loading...</div>
  
  const emaiListClass = expanded ? "email-list collapsed" : "email-list expanded";
  console.log("emails = ", emails);
  return (
    <ul className="email-list">
      {emails.map(email => (
        <EmailPreview
          key={email.emailId}
          email={email}
          onOpenMailDetails={emailDetails}
        />
      ))}
    </ul>
  );
}



export default EmailList;