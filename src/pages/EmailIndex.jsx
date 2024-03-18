import { useEffect, useState } from "react";
import EmailList from "../cmps/EmailList";
import AppHeader from "../cmps/AppHeader";
import NavBar from "../cmps/NavBar";
import { emailService } from "../services/mail.service.js";
import { useParams } from "react-router-dom"  
import '../assets/css/index.css';

function EmailIndex() {
  // State to manage filter options (text and isRead)
  const [emails, setEmails] = useState(null)
  const [error, setError] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter(location.pathname))
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(false);

  const toggleNavBar = () => {
    setIsNavBarExpanded(!isNavBarExpanded);
  };
  
  useEffect(() => {
    loadEmails()
  }, [filterBy])

  const params = useParams()
 
  async function loadEmails() {
    console.log(params.mailStatus, 'params.mailStatus');
    console.log(filterBy, 'filterBy');
    try {
        const emails = await emailService.query({ ...filterBy, mail: params.mailStatus })
        setEmails(emails)
        setError(null)
    } catch (err) {
      console.log(err, 'err');      
        setError(err)
    }
}



    return (
      <section className="email-index">
      <AppHeader onDrawerToggle={toggleNavBar} />
          <NavBar expanded={isNavBarExpanded} />
          <div className="email-content">
            <EmailList emails={emails} />
          </div>
      </section>
    );
}

export default EmailIndex;