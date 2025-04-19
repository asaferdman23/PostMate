import { useState } from "react";
import "../assets/css/index.css"

function EmailPreview({ email, onOpenMailDetails }) {
  const content = email.body || '';
  const date = new Date(email.sentAt);
  const formattedDate = date.toLocaleDateString();
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  function onHandleOpenMailDetails(ev, selected) {
    // ev.stopPropagation()
     onOpenMailDetails(email, '')
     console.log(selected);
 }

//  function handleHoveToggle() {
//   setIsHovered(!isHovered)
// }

  function onToggleSelectEmail(ev) {
    ev.stopPropagation(); // Prevent triggering the row click
    setIsSelected(!isSelected);
  }

  return (
    <li 
      className={`email-preview ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(ev) => onHandleOpenMailDetails(ev, email)}
    >
      <div className="email-preview-left">
        <div className="email-preview-checkbox">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={onToggleSelectEmail}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="email-preview-star">
          {/* Star icon */}
          <span>☆</span>
        </div>
      </div>

      <div className="email-preview-content">
        <div className="email-preview-sender">{email.sender}</div>
        <div className="email-preview-main">
          <span className="email-preview-subject">{email.subject}</span>
          <span className="email-preview-separator">-</span>
          <span className="email-preview-body">{content.substring(0, 100)}</span>
        </div>
      </div>

      <div className="email-preview-date">{formattedDate}</div>
    </li>
  );
}
export default EmailPreview;
