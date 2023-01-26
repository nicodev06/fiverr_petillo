import React, {useContext} from 'react'

import { InboxContext } from './InboxPage';

import {Box, Stack, Typography, CircularProgress} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';



const LeadDetails = () => {
    return (
        <Box
        sx={{
            py: 1,
            px: 2
        }}
        className='current-lead'
        >
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            >
                <Typography variant='subtitle1'>Rayna Carder</Typography>
                <Typography variant='subtitle2' sx={{color: 'var(--light-gray-color)'}}>2m ago</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle2' sx={{color: 'var(--light-gray-color)'}}>I remember that project due is tomorrow</Typography>
            </Box>
        </Box>
    )
}



const Leads = () => {


    const { show } = useContext(InboxContext);

    if (show){
      return (
          <Box
          sx={{
              boxShadow: '0px 0px 1px var(--light-gray-color)',
              borderRadius: '0px 10px 10px 0px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '73vh'
          }}
          >
              <CircularProgress/>
          </Box>
      )
    }

  return (
    <Box
    sx={{
        boxShadow: '0px 0px 1px var(--light-gray-color)',
        height: '73vh',
    }}
    >
        <Stack spacing={2} direction='row' sx={{p:2, alignItems: 'center'}}>
            <Typography variant='h6'>Inbox</Typography>
            <Typography variant='subtitle1' sx={{color: 'var(--light-gray-color)'}}>(2,456)</Typography>
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
            <LeadDetails/>
        </Stack>
    </Box>
  )
}

export default Leads