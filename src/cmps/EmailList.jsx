import EmailPreview from "./EmailPreview";
import "../assets/css/index.css"

function EmailList({ emails,expanded,emailDetails}) {
  const emaiListClass = expanded ? "email-list expanded" : "email-list collapsed";
  
  return (
      <ul className={emaiListClass}>
        {emails?.map((email) => (
          <EmailPreview key={email.id} 
          email={email} 
          onOpenMailDetails={emailDetails}
          />
        ))}
      </ul>
    );
}
export default EmailList;