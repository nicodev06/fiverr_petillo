import React, {useContext} from 'react'

import { InboxContext } from './InboxPage';

import {Box, Stack, Typography, CircularProgress} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';



const LeadDetails = ({ lead }) => {

    const {currentLead, setCurrentLead} = useContext(InboxContext);

    return (
        <Box
        sx={{
            py: 1,
            px: 2
        }}
        className={currentLead?.id === lead?.id ? 'current-lead' : 'none'}
        onClick={() => {setCurrentLead(lead)}}
        >
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            >
                <Typography variant='subtitle1'>{`${lead?.first_name} ${lead?.last_name}`}</Typography>
            </Box>
        </Box>
    )
}



const Leads = () => {


    const { show, leads } = useContext(InboxContext);

  return (
    <Box
    sx={{
        boxShadow: '0px 0px 1px var(--light-gray-color)',
        height: '73vh',
    }}
    >
        <Stack spacing={2} direction='row' sx={{p:2, alignItems: 'center'}}>
            <Typography variant='h6'>Inbox</Typography>
            <Typography variant='subtitle1' sx={{color: 'var(--light-gray-color)'}}>{`(${leads.length})`}</Typography>
        </Stack>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2
        }}
        >
            <Typography variant='subtitle2'>RECENT MESSAGE</Typography>
            <MoreVertIcon/>
        </Box>
        <Stack>
            {leads.map((lead) => <LeadDetails key={lead} lead={lead}/>)}
        </Stack>
    </Box>
  )
}

export default Leads