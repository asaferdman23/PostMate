import { useState } from "react";
import "../assets/css/index.css"

function EmailPreview({ email, onOpenMailDetails }) {
  const content = email.body || '';
  const date = new Date(email.sentAt);
  const formattedDate = date.toLocaleDateString();
  const [isHovered, setIsHovered] = useState(false)
  const [isSelectet, setIsSelected] = useState(false)

  function onHandleOpenMailDetails(ev, selected) {
    // ev.stopPropagation()
     onOpenMailDetails(email, '')
     console.log(selected);
 }

//  function handleHoveToggle() {
//   setIsHovered(!isHovered)
// }

  return (
    <li className="email-preview" >
      <div onClick={(ev) => onHandleOpenMailDetails(ev, email)}>
        
        <p>{email.from}</p>
        
        {/* Other email preview details */}
          <p>{formattedDate}</p>
      </div>
      <div> 
          <input type="checkbox" onClick={(ev) => onToggleSelectEmail(ev, email)} />
      </div>
      <div className="email-preview-sender">{email.from}</div>
      <div className="email-preview-subject"><h3>{email.subject}</h3></div>
      <div className="email-preview-content">{content.substring(0, 50)}</div>
      <div className="email-preview-date">{formattedDate}</div>
    </li>
  );
}
export default EmailPreview;
