import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import { useLocation, Outlet } from 'react-router-dom'

import EmailList from "../cmps/EmailList";
import AppHeader from "../cmps/AppHeader";
import NavBar from "../cmps/NavBar";
import { emailService } from "../services/mail.service.js";
import '../assets/css/index.css';
import EmailCompose from "../cmps/EmailCompose";

function EmailIndex() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const [emailDetails, setEmailDetails] = useState(null)
  const [emails, setEmails] = useState([]) // Initialize as empty array
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isToggle, setIsToggle] = useState(null)
  const [search, setSearch] = useState('')
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(false);
  const [isEmailListExpanded,setIsEmailListExpanded] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  // Initialize filterBy with a default filter
  const [filterBy, setFilterBy] = useState({
    mail: location.pathname.split('/')[1] || 'inbox',
    searchstr: ''
  });

  const onSearchTextChange = (searchText) => {
    setSearch(searchText);
    setFilterBy(prev => ({ ...prev, searchstr: searchText }));
  }

  const toggleNavBar = () => {
    setIsEmailListExpanded(!isNavBarExpanded);
    setIsNavBarExpanded(!isNavBarExpanded);
  };

  const toggleCompose = () => {
    setIsComposeOpen(prev => !prev);
    if (!isComposeOpen) {
      navigate(`${location.pathname.split('/compose')[0]}/compose`);
    } else {
      navigate(location.pathname.split('/compose')[0]);
    }
  };

  useEffect(() => {
    const isComposeInUrl = location.pathname.includes('/compose');
    setIsComposeOpen(isComposeInUrl);
  }, [location]);

  useEffect(() => {
    loadEmails();
  }, [filterBy, search]);

  useEffect(() => {
    setEmailDetails(null);
  }, [emails, isToggle]);

  useEffect(() => {
    if (params.mailStatus) {
      setFilterBy(prev => ({ ...prev, mail: params.mailStatus }));
    }
  }, [params.mailStatus]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(prev => ({ ...prev, ...fieldsToUpdate }));
  }

  async function loadEmails() {
    try {
      const emails = await emailService.query({ 
        mail: params?.mailStatus || 'inbox',
        searchstr: search
      });
      setEmails(emails || []); // Ensure we always set an array
    } catch (err) {
      console.error('Error loading emails:', err);      
      setError(err);
      setEmails([]); // Set empty array on error
    }
  }

  function onEmailDetails(email, isToggle) {
    if (!isToggle) {
      setEmailDetails(email);
      navigate(`${location.pathname}/${email.id}`);
    }
  }

  return (
    <section className="email-base-container">
      <AppHeader 
        onDrawerToggle={toggleNavBar} 
        onSetFilter={onSetFilter} 
        emailSearchText={search} 
      />
      <div className={`email-index ${!isNavBarExpanded ? "nav-expanded" : ""}`}>
        <NavBar expanded={isNavBarExpanded} />
        <EmailList 
          emails={emails} 
          expanded={isNavBarExpanded} 
          emailDetails={onEmailDetails} 
        />
        {isComposeOpen && <EmailCompose onClose={toggleCompose} />}
        <Outlet />
      </div>
      <button className="floating-button" onClick={toggleCompose}>
        +
      </button>
    </section>
  );
}

export default EmailIndex;