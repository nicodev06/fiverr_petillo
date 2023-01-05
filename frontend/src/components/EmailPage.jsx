import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';  
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; 


import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { InputBase } from '@mui/material';

import BasicDialog from './BasicDialog';
import BasicInput from './BasicInput';

import EmailIcon from '../assets/email.svg';
import GmailIcon from '../assets/gmail.svg';

const AddEmailActivator = ({ handleClick }) => {
    return (
        <button style={{backgroundColor: "var(--light-blue-color)"}} onClick={handleClick}>
            <p>+ Add Email</p>
        </button>
    )
}

const GmailWorkFlowActivator = ({ handleClick }) => {
    return (
        <Box onClick={handleClick}>
            <Box
            sx={{
                display: 'flex', 
                alignItems: 'center',
                '&:hover': {
                    backgroundColor: 'var(--sky-blue-color)'
                }
            }}
            >
            <img src={GmailIcon} alt="Email icon" width={50} height={50} style={{padding: '10px'}} />
                <Box
                sx={{ml: 1}}
                >
                    <Typography variant='subtitle1' sx={{textAlign: 'left', fontWeight: 800}}>
                        Google
                    </Typography>
                    <Typography variant='subtitle2' sx={{textAlign: 'left', color: 'var(--light-gray-color)'}}>
                        Gmail/Gsuite
                    </Typography>
                </Box>
            </Box>    
        </Box>
    )
}

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
                    <button className='btn-dark' style={{marginRight: '20px'}} onClick={handleClose}>
                        <p><span>{'<'}</span> Back</p>
                    </button>
                    <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={() => {setCurrentStep(2)}}>
                        <p>+ Next Step</p>
                    </button>
                </Box>
            </Box>
        </>
    )
}

const GmailWorkFlowForm = ({setCurrentStep}) => {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("")

    function createSender(){
        if (email.length > 0 && password.length > 0){
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
                    password,
                    daily_campaign: 0,
                    sending_limits: 0
                })
            }).then((response) => {
                if (response.status === 201){
                    setShowSnackBar(true);
                    setMessage("Account created succesfully!");
                    setSeverity("success");
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
                            <p>Connect</p>
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

const GmailWorkFlow = ({ handleClose }) => {

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
            {currentStep === 2 && <GmailWorkFlowForm setCurrentStep={setCurrentStep}/>}
        </Box>
    )
}

const ChoiceProvider = () => {
    return (
        <Box
        sx={{
            mt: 1,
            width: '20vw',
            textAlign: 'center'
        }}
        >
            <Box
            sx={{
                pb: '5px', 
                borderBottom: '2px solid var(--light-gray-color)'
            }}
            >
                <Typography variant='h6'>
                    Connect A New Email
                </Typography>
            </Box>
            <Stack
            sx={{
                '&:nth-child(1)': {
                    borderBottom: '2px solid var(--gray-color)',
                    textAlign: 'start'
                }
            }}
            >
                <BasicDialog Activator={GmailWorkFlowActivator}>
                    <GmailWorkFlow/>
                </BasicDialog>
                <Box>
                    <Box
                    sx={{display: 'flex', 
                         alignItems: 'center',
                         '&:hover': {
                            backgroundColor: 'var(--sky-blue-color)'
                        }
                        }}
                    >
                    <img src={EmailIcon} alt="Email icon" width={50} height={50} style={{padding: '10px'}} />
                        <Box
                        sx={{ml: 1}}
                        >
                            <Typography variant='subtitle1' sx={{textAlign: 'left', fontWeight: 800}}>
                                IMAP/SMTP
                            </Typography>
                            <Typography variant='subtitle2' sx={{textAlign: 'left', color: 'var(--light-gray-color)'}}>
                                Any Provider
                            </Typography>
                        </Box>
                    </Box>    
                </Box>
            </Stack>
        </Box>
    )
}

const TopBar = () => {
    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: '1',
            mt: '6vh',
            mx: '4vw'
        }}
        >
            <Box
            sx={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-color)', borderRadius: '100px'}}
            >
                <InputBase
                sx={{flex: 1, ml: 1}}
                placeholder="Search email..."
                inputProps={{'type' : 'text'}}
                />
                <IconButton type='button' sx={{ p: '10px' }}>
                    <SearchIcon style={{color: 'var(--gray-color)'}}/>
                </IconButton>
            </Box>
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
            >
                <GridViewRoundedIcon sx={{color: "var(--light-gray-color)", px: '7px'}}/>
                <BasicDialog Activator={AddEmailActivator}>
                    <ChoiceProvider/>
                </BasicDialog>
            </Box>
        </Box>
    )
}

const EmailPage = () => {
  return (
    <>
        <TopBar/>
    </>
  )
}

export default EmailPage