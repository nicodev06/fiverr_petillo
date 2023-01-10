import React, { useState, useContext } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; 

import BasicInput from '../../BasicInput';
import { Buttons } from './GenericWorkFlow';

import GmailIcon from '../../../assets/gmail.svg';

import { Context } from '../../../utils/context';


const GmailWorkFlowInfo = ({handleClose, setCurrentStep}) => {
    return (
        <>
            <Box>
                <Stack
                sx={{
                    '&>*': {
                    padding: "10px" 
                    }
                }}
                >
                    <Typography>
                        1. Open your Gmail account.
                    </Typography>
                    <Typography>
                        2. Click the gear icon in the top right corner to <br/> access your settings.
                    </Typography>
                    <Typography>
                        3. Click settings.
                    </Typography>
                    <Typography>
                        4. Click on the Forwarding and POP/IMAP tab
                    </Typography>
                    <Typography>
                        5. In the "IMAP Access" section, select the Enable <br/> IMAP option.
                    </Typography>
                    <Typography>
                        6. Save Changes.
                    </Typography>
                </Stack>
            </Box>
            <Box>
                <Box
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, my: 1}}
                >
                    <Buttons back={handleClose} next={() => {setCurrentStep(2)}}/>
                </Box>
            </Box>
        </>
    )
}

const GmailWorkFlowForm = ({setCurrentStep, handleClose}) => {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("")

    const {fetchFromAPI, setSenders, emailCurrentPage, setEmailSendersCount, emailSendersCount} = useContext(Context);

    function createSender(){
        if (email.length > 0 && password.length > 0){
            setSeverity("info");
            setMessage("Creating sender...");
            setShowSnackBar(true);
            fetch(`${process.env.REACT_APP_API_URL}/api/gmail_sender/`, {
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
                    imap_username: email,
                    imap_password: password,
                    imap_host: 'imap.gmail.com',
                    smtp_username: email,
                    smtp_password: password,
                    smtp_host: 'smtp.gmail.com',
                    daily_campaign: 0,
                    sending_limits: 0
                })
            }).then((response) => {
                if (response.status === 201){
                    setShowSnackBar(true);
                    setMessage("Account created succesfully!");
                    setSeverity("success");
                    setEmailSendersCount({'senders': emailSendersCount.senders - 1});
                    fetchFromAPI(`/api/generic_sender/?page=${emailCurrentPage}`, setSenders);
                    handleClose();
                } else {
                    setShowSnackBar(true);
                    setMessage("Invalid credentials");
                    setSeverity("warning");
                }              
            })
        }
    }

    return (
        <>
            <Box>
                <Box
                sx={{display: 'flex'}}
                >
                    <Box
                    sx={{p: '10px'}}
                    >
                        <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>First Name</Typography>
                        <BasicInput placeholder='First Name' type='text' onChange={(e) => {setFirstName(e.target.value)}}/>
                    </Box>
                    <Box
                    sx={{p: '10px'}}
                    >
                        <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>Last Name</Typography>
                        <BasicInput placeholder='Last Name' type='text' onChange={(e) => {setLastName(e.target.value)}}/>
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
                        <BasicInput placeholder='Email' type='email' onChange={(e) => {setEmail(e.target.value)}}/>
                    </Box>  
                </Box>
                <Box
                sx={{width: '80%'}}
                >
                    <Box
                    sx={{p: '10px'}}
                    >
                        <Typography variant='subtitle1' sx={{py: '10px', fontWeight: '500'}}>
                            Enter your 16 character app password <br/> without any spaces
                            <span style={{color: 'red', paddingBottom: '3px'}}>*</span>
                        </Typography>
                        <BasicInput placeholder='App Password' type='password' onChange={(e) => {setPassword(e.target.value)}}/>
                    </Box>  
                </Box>
                <Box>
                    <Box
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, my: 1}}
                    >
                        <button className='btn-dark' style={{marginRight: '20px'}} onClick={() => {setCurrentStep(1)}}>
                            <p><span>{'<'}</span> Back</p>
                        </button>
                        <button style={{backgroundColor: 'var(--light-green-color)'}} onClick={createSender}>
                            <p>+ Connect</p>
                        </button>
                    </Box>
                </Box>
            </Box>
            <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={() => {setShowSnackBar(false)}}>
                <Alert onClose={() => {setShowSnackBar(false)}} severity={severity} sx={{ width: '100%' }}>
                {message}
                </Alert>
            </Snackbar>
        </>
    )
}


export default ({ handleClose }) => {

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Box
        sx={{width: '30vw'}}
        >
            <Box
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, borderBottom: '1px solid var(--light-gray-color)', mt: 1}}
            >
                <Box
                sx={{display: 'flex'}}
                >
                    <img src={GmailIcon} alt="Gmail icon" width={50} height={50} />
                    <Box
                    sx={{px: "10px"}}
                    >
                        <Typography variant='h6'>Connect Google email</Typography>
                        <Typography variant='subtitle1' sx={{color: 'var(--light-gray-color)'}}>Gmail/Gsuite</Typography>
                    </Box>
                </Box>
                <Box
                sx={{textAlign: 'center'}}
                >
                    Let's start by enabling IMAP access <br/>
                    for your Google account.
                </Box>
            </Box>
            {currentStep === 1 && <GmailWorkFlowInfo handleClose={handleClose} setCurrentStep={setCurrentStep}/>}
            {currentStep === 2 && <GmailWorkFlowForm setCurrentStep={setCurrentStep} handleClose={handleClose}/>}
        </Box>
    )
}