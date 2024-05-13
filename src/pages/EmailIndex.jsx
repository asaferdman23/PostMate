import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import { useLocation, Outlet } from 'react-router-dom'

import EmailList from "../cmps/EmailList";
import AppHeader from "../cmps/AppHeader";
import NavBar from "../cmps/NavBar";
import { emailService } from "../services/mail.service.js";
import '../assets/css/index.css';

function EmailIndex() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  console.log('params =', params);

  const [emailDetails, setEmailDetails] = useState(null)
  const [emails, setEmails] = useState(null)
  const [error, setError] = useState(null)
  const [isToggle, setIsToggle] = useState(null)
 
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(false);
  const [isEmailListExpanded,setIsEmailListExpanded] = useState(false);

  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter(location.pathname))
  
  const toggleNavBar = () => {
    //can you set an if statement that if isNavBarExapnded is true the isEmailListExpanded is false
    setIsEmailListExpanded(!isNavBarExpanded); // This will set the opposite state of isNavBarExpanded
    setIsNavBarExpanded(!isNavBarExpanded);

  };

  useEffect(() => {
    loadEmails()
  }, [filterBy])

useEffect(() => {
  setEmailDetails(null)
}, [emails, isToggle])

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
      console.log('filterBy =', filterBy)
      const emails = await emailService.query({ ...filterBy, mail: params?.mailStatus});      setEmails(emails);
      console.log(JSON.stringify(emails, null, 2), 'emails'); // Stringify the emails before logging
    } catch (err) {
      console.err(err, 'err');      
        setError(err)
    }
}



    function onEmailDetails(email, isToggle, checked) {
      if (isToggle) {
          // const selectedEmailsCopy = [...selectedEmails]
          // const existId = selectedEmails.findIndex(selected => selected.id === email.id)
          // if (existId > -1) {
          //     selectedEmailsCopy.splice(selectedEmailsCopy[existId] + 1, 1)
          // } else {
          //     selectedEmailsCopy.push(email)
          // }
          // setSelectedEmails(selectedEmailsCopy)
          // setIsToggle(isToggle)

      } else {
          setEmailDetails(email)
          navigate(`${location.pathname}/${email.id}`)
      }
    }

    return (
      <section className={`email-index ${isNavBarExpanded ? "nav-expanded" : ""}`}>
      <AppHeader onDrawerToggle={toggleNavBar} onSetFilter={onSetFilter} />
        <NavBar expanded={isNavBarExpanded} />
        <EmailList emails={emails} expanded={isEmailListExpanded} emailDetails={onEmailDetails} />
        <Outlet />
      </section>
    );
}

export default EmailIndex;