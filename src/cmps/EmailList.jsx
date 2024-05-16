import EmailPreview from "./EmailPreview";
import "../assets/css/index.css"

function EmailList({ emails,expanded,emailDetails}) {
  const emaiListClass = expanded ? "email-list collapsed" : "email-list expanded";
  console.log("emails = ", emails);
  return (
      <ul className={emaiListClass}>
        {emails?.map((email) => (
          <EmailPreview 
          key={email.id} 
          email={email} 
          onOpenMailDetails={emailDetails}
          />
        ))}
      </ul>
    );
}
export default EmailList;