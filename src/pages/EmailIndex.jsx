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
  const [isEmailListExpanded,setIsEmailListExpanded] = useState(false);

  const toggleNavBar = () => {
    //can you set an if statement that if isNavBarExapnded is true the isEmailListExpanded is false
    setIsEmailListExpanded(!isNavBarExpanded); // This will set the opposite state of isNavBarExpanded
    setIsNavBarExpanded(!isNavBarExpanded);

  };

  const params = useParams()
  useEffect(() => {
    loadEmails()
  }, [filterBy])

  useEffect(() => {
    onSetFilter(emailService.getDefaultFilter())
}, [params.mailStatus])

function onSetFilter(fieldsToUpdate) {
    // if (fieldsToUpdate.mail === 'compose') {
    //     navigate(`${location.pathname}/compose`)
    // }
    setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }));
}

  async function loadEmails() {
    try {
      const emails = await emailService.query({ ...filterBy, mail: params.mailStatus});
      setEmails(emails);
      console.log(emails, 'emails');
    } catch (err) {
      console.err(err, 'err');      
        setError(err)
    }
}

    return (
      <section className={`email-index ${isNavBarExpanded ? "nav-expanded" : ""}`}>
      <AppHeader onDrawerToggle={toggleNavBar} onSetFilter={onSetFilter} />
        <NavBar expanded={isNavBarExpanded} />
        <EmailList emails={emails} expanded={isEmailListExpanded} />
      </section>
    );
}

export default EmailIndex;