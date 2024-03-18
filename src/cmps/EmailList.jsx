import EmailPreview from "./EmailPreview";

function EmailList({ emails }) {
    return (
      <ul className="email-list">
        {emails?.map((email) => (
          <EmailPreview key={email.id} 
          email={email} />
        ))}
      </ul>
    );
}
export default EmailList;