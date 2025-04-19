import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import { useLocation, Outlet } from 'react-router-dom'

import EmailList from "../cmps/EmailList";
import AppHeader from "../cmps/AppHeader";
import NavBar from "../cmps/NavBar";
import { emailService } from "../services/mail.service.js";
import { emailServices } from "../services/mail.service.local.js";
import '../assets/css/index.css';
import EmailCompose from "../cmps/EmailCompose";

function EmailIndex() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  console.log('params =', params);

  const [emailDetails, setEmailDetails] = useState(null)
  const [emails, setEmails] = useState(null)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isToggle, setIsToggle] = useState(null)
  const [search, setSearch] = useState('')
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(false);
  const [isEmailListExpanded,setIsEmailListExpanded] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const [filterBy, setFilterBy] = useState(emailServices.getDefaultFilter(location.pathname))
  
  // please make a funtion that will know what was wrriten on the search bar
  // and will set the search state to the value that was written
  // and will call the loadEmails function
  const onSearchTextChange = (searchText) => {
    setSearch(searchText);
    // loadEmails will be called by useEffect
  }

  const toggleNavBar = () => {
    //can you set an if statement that if isNavBarExapnded is true the isEmailListExpanded is false
    setIsEmailListExpanded(!isNavBarExpanded); // This will set the opposite state of isNavBarExpanded
    setIsNavBarExpanded(!isNavBarExpanded);

  };

  // Handle compose toggle
  const toggleCompose = () => {
    setIsComposeOpen(prev => !prev);
    if (!isComposeOpen) {
      // Only navigate if we're opening the compose
      navigate(`${location.pathname.split('/compose')[0]}/compose`);
    } else {
      // Remove compose from the URL when closing
      navigate(location.pathname.split('/compose')[0]);
    }
  };

  // Listen to URL changes to sync compose state
  useEffect(() => {
    const isComposeInUrl = location.pathname.includes('/compose');
    setIsComposeOpen(isComposeInUrl);
  }, [location]);

  useEffect(() => {
    onSearchTextChange()
    loadEmails()
  }, [filterBy, search])

useEffect(() => {
  setEmailDetails(null)
}, [emails, isToggle])

useEffect(() => {
  onSetFilter(emailServices.getDefaultFilter())
}, [params.mailStatus])

function onSetFilter(fieldsToUpdate) {
    // if (fieldsToUpdate.mail === 'compose') {
    //     navigate(`${location.pathname}/compose`)
    // }
    setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }));
}

  async function loadEmails() {
    try {
      // Replace direct getEmails call with query
      const emails = await emailService.query({ 
        mail: params?.mailStatus,
        searchstr: search ? search : ''
      });
      console.log('filtered emails =', emails);
      setEmails(emails);
    } catch (err) {
      console.error(err, 'err');      
      setError(err);
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

    // const handleAddEmail = async () => {
    //   try {
    //     const newEmail = {
    //       emailId: Date.now().toString(),
    //       sender: 'example@example.com',
    //       receiver: 'receiver@example.com',
    //       subject: 'New Email',
    //       body: 'This is a new test email.',
    //       status: 'sent',
    //       sentAt: new Date().toISOString()
    //     };

    //     await emailService.addEmail(newEmail);
        
    //     // Reload emails to get updated list with filters
    //     loadEmails();
    //   } catch (err) {
    //     console.error('Error adding email:', err);
    //     setError(err);
    //   }
    // };

    const handleCompose = () => {
      setIsOpen(true)
      if(isOpen){
        navigate(`${location.pathname}/compose`);
      }
    };

    return (
      <section className="email-base-container">
        <AppHeader onDrawerToggle={toggleNavBar} onSetFilter={onSetFilter} emailSearchText={search} />
        <div className={`email-index ${!isNavBarExpanded ? "nav-expanded" : ""}`}>
          <NavBar expanded={isNavBarExpanded} />
          <EmailList emails={emails} expanded={isNavBarExpanded} emailDetails={onEmailDetails} />
          {isComposeOpen && <EmailCompose onClose={toggleCompose} />}
          <Outlet />
        </div>
        <button  className="floating-button" onClick={toggleCompose}>
          +
        </button>
      </section>
    );
}

export default EmailIndex;