import React, { useEffect } from "react";
import EmailPreview from "./EmailPreview";
import "../assets/css/index.css"

function EmailList({ emails, expanded, emailDetails }) {
  if (!emails || emails.length === 0) {
    return (
      <div className="email-list empty">
        <p>No emails to display</p>
      </div>
    );
  }
  
  const emaiListClass = expanded ? "email-list collapsed" : "email-list expanded";
  console.log("emails = ", emails);
  return (
    <ul className={emaiListClass}>
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