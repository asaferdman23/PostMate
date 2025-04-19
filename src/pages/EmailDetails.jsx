import { useEffect, useState } from 'react';
import  Icon from '../cmps/Icon';

import { useNavigate, useParams } from 'react-router';
import { emailServices } from '../services/mail.service.local.js';
import { Link } from 'react-router-dom';

import "../assets/css/index.css"

function EmailDetails({ onBackBtnClick }) {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    console.log(params);

    useEffect(() => {
        console.log('useEffect from EmailDetails');
        loadEmail()
    }, [])

    async function loadEmail() {
        try {
            const email = await emailServices.getById(params.emailId)
            setEmail(email)
            // if (!email.isRead) { }//update mail
        } catch (err) {
            console.error(`Error in load email: ${err}`)
            navigate('/inbox')
        }
    }

    if (!email) return <div>Loading...</div>
    return (
        <div className='email-details' >
            <Link to={`/${params.mailStatus}`}>
                <Icon iconData={{ src: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/arrow_back_baseline_nv700_20dp.png' }} />
            </Link>
            <div className='email-details-header flex space-between align-center'>
                <h2 className='email-details-header-title'>{email.subject}</h2>
            </div>
            <div className='email-details-body'>
                <div className='img-container'>
                    <img src="https://lh3.googleusercontent.com/a/default-user=s40-p" alt="" />
                </div>
                <main>
                    <div className='mail-info'>
                        <p>{email.from}</p>
                        <p className='email-details-header-date'>{email.sentAt}</p>
                    </div>
                    <p>{email.body}</p>
                </main>
            </div>
        </div >
    )
}
export default EmailDetails;