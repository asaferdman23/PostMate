import EmailPreview from "./EmailPreview";
import "../assets/css/index.css"

function EmailList({ emails,emailDetails }) {
    return (
      <ul className="email-content">
        {emails?.map((email) => (
          <EmailPreview key={email.id} 
          email={email} 
          onOpenMailDetails={emailDetails}/>
        ))}
      </ul>
    );
}
export default EmailList;