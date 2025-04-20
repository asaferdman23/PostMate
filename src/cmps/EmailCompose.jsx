import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailService } from '../services/mail.service';

function EmailCompose({ onClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState({
    sender: 'asaferdman23@gmail.com',
    receiver: '',
    subject: '',
    body: '',
    status: 'draft'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmail = {
        ...email,
        emailId: Date.now().toString(),
        sentAt: new Date().toISOString(),
        status: 'sent'
      };
      
      await emailService.addEmail(newEmail);
    //   navigate('/sent'); // Navigate to sent folder after sending
    } catch (err) {
      console.error('Error sending email:', err);
    }
  };

  const handleClose = () => {
    onClose(); // This will trigger the parent component to update URL
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="email-compose">
      <div className="email-compose-header">
        <span>New Message</span>
        <div className="email-compose-actions">
          <button onClick={() => {/* minimize */}}>−</button>
          <button onClick={() => {/* maximize */}}>□</button>
          <button onClick={onClose}>×</button>
        </div>
      </div>
      <form className="email-compose-form" onSubmit={handleSubmit}>
        <div className="email-compose-fields">
          <div className="compose-field">
            <input
              type="email"
              name="receiver"
              placeholder="To"
              value={email.receiver}
              onChange={handleChange}
            />
            <div className="field-actions">
              <span>Cc</span>
              <span>Bcc</span>
            </div>
          </div>
          <div className="compose-field">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={email.subject}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="email-compose-body">
          <textarea
            name="body"
            value={email.body}
            onChange={handleChange}
          />
        </div>
        <div className="email-compose-footer">
          <div className="compose-actions-left">
            <button type="submit" className="send-button">Send</button>
          </div>
          <div className="compose-actions-right">
            <button type="button" className="icon-button">A</button>
            <button type="button" className="icon-button">📎</button>
            <button type="button" className="icon-button">🔗</button>
            <button type="button" className="icon-button">😊</button>
            <button type="button" className="icon-button">📷</button>
            <button type="button" className="icon-button">🔒</button>
            <button type="button" className="icon-button">✏️</button>
            <button type="button" className="icon-button">⋮</button>
            <button type="button" className="icon-button">🗑️</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EmailCompose;
