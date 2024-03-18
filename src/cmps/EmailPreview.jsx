import React from 'react';


function EmailPreview({ email,onOpenMailDetails }) {
    return (
      <li className="email-preview" onClick={() => this.props.onEmailClick(email)}>
        <div className="email-preview-sender">{email.sender}</div>
        <div className="email-preview-subject">{email.subject}</div>
        <div className="email-preview-content">{email.content.substring(0, 50)}</div>
      </li>
    );
  }
  export default EmailPreview;