import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BasicInput from '../../BasicInput';

import EmailIcon from '../../../assets/email.svg';


export const Buttons = ({back, next}) => {
    
    return (<Box
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

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState("");


    return (
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
            <Buttons back={handleClose} next={() => {setCurrentStep(2)}} disableNext={email.length !== 0}/>
        </Box>
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
                    <img src={EmailIcon} alt="Gmail icon" width={50} height={50} />
                    <Box
                    sx={{px: "10px"}}
                    >
                        <Typography variant='h6'>Connect any Provider</Typography>
                        <Typography variant='subtitle1' sx={{color: 'var(--light-gray-color)'}}>Gmail/Gsuite</Typography>
                    </Box>
                </Box>
            </Box>
            {currentStep === 1 && <GenericWorflowFirstStep/>}
        </Box>
    )
}