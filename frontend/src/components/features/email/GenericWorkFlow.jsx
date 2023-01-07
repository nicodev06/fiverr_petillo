import React, { useState, createContext, useContext } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; 

import BasicInput from '../../BasicInput';

import { Context } from '../../../utils/context';

import EmailIcon from '../../../assets/email.svg';



const GenericWorkflowContext = createContext();

const MainGenericContext = ({ children }) => {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [imapUsername, setImapUsername] = useState("");
    const [imapPassword, setImapPassword] = useState("");
    const [imapHost, setImapHost] = useState("");
    const [imapPort, setImapPort] = useState("");
    const [smtpUsername, setSmtpUsername] = useState("");
    const [smtpPassword, setSmtpPassword] = useState("");
    const [smtpHost, setSmtpHost] = useState("");
    const [smtpPort, setSmtpPort] = useState("");
    const [replyTo, setReplyTo] = useState("");
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    return (
        <GenericWorkflowContext.Provider
        value={{
            firstName,
            lastName,
            email,
            imapUsername,
            imapPassword,
            imapHost,
            imapPort,
            smtpUsername,
            smtpPassword,
            smtpHost,
            smtpPort,
            replyTo,
            showSnackBar,
            severity,
            message,
            setFirstName,
            setLastName,
            setEmail,
            setImapUsername,
            setImapPassword,
            setImapHost,
            setImapPort,
            setSmtpUsername,
            setSmtpPassword,
            setSmtpHost,
            setSmtpPort,
            setReplyTo,
            setShowSnackBar,
            setSeverity,
            setMessage
        }}
        >
            { children }
        </GenericWorkflowContext.Provider>
    )
}

export const Buttons = ({back, next}) => {
    
    return (
        <Box
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, my: 1}}
            >
            <button className='btn-dark' style={{marginRight: '20px'}} onClick={back}>
                <p><span>{'<'}</span> Back</p>
            </button>
            <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={next}>
                <p>+ Next Step</p>
            </button>
        </Box>
    )}


const GenericWorflowFirstStep = ({handleClose, setCurrentStep}) => {

    const {firstName, lastName, email, setFirstName, setLastName, setEmail} = useContext(GenericWorkflowContext)
    
    function nextStep(){
        if (email.length > 0){
            setCurrentStep(2)
        }
    }


    return (
        <Box>
            <Box
            sx={{display: 'flex'}}
            >
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>First Name</Typography>
                    <BasicInput placeholder='First Name' type='text' onChange={(e) => {setFirstName(e.target.value)}} value={firstName}/>
                </Box>
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>Last Name</Typography>
                    <BasicInput placeholder='Last Name' type='text' onChange={(e) => {setLastName(e.target.value)}} value={lastName}/>
                </Box>
            </Box>
            <Box
            sx={{width: '50%'}}
            >
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                        Email
                        <span style={{color: 'red', paddingBottom: '3px'}}>*</span>
                    </Typography>
                    <BasicInput placeholder='Email' type='email' onChange={(e) => {setEmail(e.target.value)}} value={email}/>
                </Box>  
            </Box>
            <Buttons back={handleClose} next={nextStep} />
        </Box>
    )
}

const GenericWorflowSecondStep = ({ setCurrentStep }) => {

    const {email, imapUsername, imapPassword, imapHost, imapPort, setImapUsername, setImapPassword, setImapHost, setImapPort} = useContext(GenericWorkflowContext);
    const {setShowSnackBar, setMessage, setSeverity} = useContext(Context);

    function imapAuthentication(){
        if (imapUsername.length > 0 && imapPort.length > 0){
            fetch(`${process.env.REACT_APP_API_URL}/api/imap_auth/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
                },
                body: JSON.stringify({
                    host: imapHost,
                    email: email,
                    password: imapPassword, 
                })
            }).then((response) => {
                if (response.status === 200){
                    setCurrentStep(3);
                    setSeverity("success");
                    setMessage(`Correctly authenticated to ${imapHost}`);
                    setShowSnackBar(true);
                } else {
                    setSeverity("warning");
                    setMessage("Invalid credentials");
                    setShowSnackBar(true);
                }
            })
        }
    }

    return (
        <Box>
            <Box
            sx={{display: 'flex'}}
            >
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                        Username
                        <span style={{color: 'red', paddingBottom: '3px'}}>*</span>    
                    </Typography>
                    <BasicInput placeholder='Username' type='text' onChange={(e) => {setImapUsername(e.target.value)}} value={imapUsername}/>
                </Box>
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                        Password
                        <span style={{color: 'red', paddingBottom: '3px'}}>*</span>
                    </Typography>
                    <BasicInput placeholder='Password' type='password' onChange={(e) => {setImapPassword(e.target.value)}} value={imapPassword}/>
                </Box>
            </Box>
            <Box
            sx={{display: 'flex'}}
            >
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                        IMAP host
                        <span style={{color: 'red', paddingBottom: '3px'}}>*</span>    
                    </Typography>
                    <BasicInput placeholder='imap.website.com' type='text' onChange={(e) => {setImapHost(e.target.value)}} value={imapHost}/>
                </Box>
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                        IMAP port
                        <span style={{color: 'red', paddingBottom: '3px'}}>*</span>
                    </Typography>
                    <BasicInput placeholder='993' type='text' onChange={(e) => {setImapPort(e.target.value)}} value={imapPort}/>
                </Box>
            </Box>
            <Buttons back={() => {setCurrentStep(1)}} next={imapAuthentication}/>    
        </Box>
    )
}

const GenericWorflowThirdStep = ({ setCurrentStep, handleClose }) => {

    const {firstName, lastName, email, imapUsername, imapPassword, imapHost, imapPort, smtpUsername, smtpPassword, smtpHost, smtpPort, replyTo, setSmtpUsername, setSmtpPassword, setSmtpHost, setSmtpPort, setReplyTo} = useContext(GenericWorkflowContext);
    const {setShowSnackBar, setMessage, setSeverity} = useContext(Context);

    function createSender(){
        fetch(`${process.env.REACT_APP_API_URL}/api/generic_sender/`, {
            method: 'POST',
            credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email,
                imap_username: imapUsername,
                imap_password: imapPassword,
                imap_host: imapHost,
                smtp_username: smtpUsername,
                smtp_password: smtpPassword,
                smtp_host: smtpHost,
                reply_to: replyTo
            })
        })
            .then((response) => {
                if (response.status === 201){
                    setSeverity("success");
                    setMessage("Email sender successfully created");
                    setShowSnackBar(true);
                    handleClose()
                } else {
                    setSeverity("warning");
                    setMessage("Something went wrong");
                    setShowSnackBar(true);
                }
            })
    }

    function smtpAuthentication(){
        if (smtpUsername.length > 0 && smtpPort.length > 0){
            fetch(`${process.env.REACT_APP_API_URL}/api/smtp_auth/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
                },
                body: JSON.stringify({
                    host: smtpHost,
                    email: email,
                    password: smtpPassword,
                    port: smtpPort
                })
            }).then((response) => {
                if (response.status === 200){
                    setCurrentStep(3);
                    setSeverity("success");
                    setMessage("Creating email sender...");
                    setShowSnackBar(true);
                    createSender();
                } else {
                    setSeverity("warning");
                    setMessage("Invalid credentials");
                    setShowSnackBar(true);
                }
            })
        }
    }

    return (
        <Box>
            <Box
            sx={{display: 'flex'}}
            >
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                        Username
                        <span style={{color: 'red', paddingBottom: '3px'}}>*</span>    
                    </Typography>
                    <BasicInput placeholder='Username' type='text' onChange={(e) => {setSmtpUsername(e.target.value)}} value={smtpUsername}/>
                </Box>
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                        Password
                        <span style={{color: 'red', paddingBottom: '3px'}}>*</span>
                    </Typography>
                    <BasicInput placeholder='Password' type='password' onChange={(e) => {setSmtpPassword(e.target.value)}} value={smtpPassword}/>
                </Box>
            </Box>
            <Box
            sx={{display: 'flex'}}
            >
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                        SMTP host
                        <span style={{color: 'red', paddingBottom: '3px'}}>*</span>    
                    </Typography>
                    <BasicInput placeholder='smtp.website.com' type='text' onChange={(e) => {setSmtpHost(e.target.value)}} value={smtpHost}/>
                </Box>
                <Box
                sx={{p: '10px'}}
                >
                    <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                        SMTP port
                        <span style={{color: 'red', paddingBottom: '3px'}}>*</span>
                    </Typography>
                    <BasicInput placeholder='587' type='text' onChange={(e) => {setSmtpPort(e.target.value)}} value={smtpPort}/>
                </Box>
            </Box>
            <Box>
                <Box sx={{display: 'flex', alignItems: 'center', p: '10px'}}>
                <FormGroup sx={{fontWeight: '500'}}>
                    <FormControlLabel control={<Checkbox />} label="Set Reply-to" />
                </FormGroup>
                </Box>
                <BasicInput placeholder='reply to email' type='text' onChange={(e) => {setReplyTo(e.target.value)}} value={replyTo}/>
            </Box>
            <Box
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, my: 1}}
            >
                <button className='btn-dark' style={{marginRight: '20px'}} onClick={() => {setCurrentStep(2)}}>
                    <p><span>{'<'}</span> Back</p>
                </button>
                <button style={{backgroundColor: 'var(--light-green-color)'}} onClick={smtpAuthentication}>
                    <p>+ Connect</p>
                </button>
            </Box> 
        </Box>
    )
}

export default ({ handleClose }) => {

    const [currentStep, setCurrentStep] = useState(1);
    const {showSnackBar, severity, message, setShowSnackBar} = useContext(Context);

    return (
        <MainGenericContext>
            <Box
            sx={{width: '30vw'}}
            >
                <Box
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, borderBottom: '1px solid var(--light-gray-color)', mt: 1}}
                >
                    <Box
                    sx={{display: 'flex'}}
                    >
                        <img src={EmailIcon} alt="Gmail icon" width={50} height={50} />
                        <Box
                        sx={{px: "10px"}}
                        >
                            <Typography variant='h6'>Connect any Provider</Typography>
                            <Typography variant='subtitle1' sx={{color: 'var(--light-gray-color)'}}>IMAP/SMTP</Typography>
                        </Box>
                    </Box>
                </Box>
                {currentStep === 1 && <GenericWorflowFirstStep handleClose={handleClose} setCurrentStep={setCurrentStep}/>}
                {currentStep === 2 && <GenericWorflowSecondStep setCurrentStep={setCurrentStep}/>}
                {currentStep === 3 && <GenericWorflowThirdStep handleClose={handleClose} setCurrentStep={setCurrentStep}/>}
            </Box>
            <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={() => {setShowSnackBar(false)}}>
                <Alert onClose={() => {setShowSnackBar(false)}} severity={severity} sx={{ width: '100%' }}>
                {message}
                </Alert>
            </Snackbar>
        </MainGenericContext>
    )
}