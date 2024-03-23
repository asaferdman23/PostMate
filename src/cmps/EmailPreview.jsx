import "../assets/css/index.css"

function EmailPreview({ email, onOpenMailDetails }) {
  const content = email.content || '';
  const date = new Date(email.sentAt);
  const formattedDate = date.toLocaleDateString();
  return (
    <li className="email-preview">
      <div className="email-preview-sender">{email.from}</div>
      <div className="email-preview-subject">{email.subject}</div>
      <div className="email-preview-content">{content.substring(0, 50)}</div>
      <div className="email-preview-date">{formattedDate}</div>
    </li>
  );
}
export default EmailPreview;
