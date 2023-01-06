import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';  



import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { InputBase } from '@mui/material';

import BasicDialog from '../../BasicDialog';


import EmailIcon from '../../../assets/email.svg';
import GmailIcon from '../../../assets/gmail.svg';

import GmailWorkFlow from './GmailWorkFlow';
import GenericWorkFlow from './GenericWorkFlow';

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


const GenericWorkFlowActivator = ({handleClick}) => {
    return (
        <Box onClick={handleClick}>
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
                <BasicDialog Activator={GenericWorkFlowActivator}>
                    <GenericWorkFlow/>
                </BasicDialog>
            </Stack>
        </Box>
    )
}

export default () => {
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