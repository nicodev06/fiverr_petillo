import React, {useContext} from 'react';

import { Link, useParams } from 'react-router-dom';

import { InboxContext } from './InboxPage';

import {Box, Stack, Typography} from '@mui/material';

const Senders = () => {

  const { senders } = useContext(InboxContext);


  const { email } = useParams();


  return (
    <Box
    sx={{
        backgroundColor: '#F3F3F3',
        pr: 1,
        py: 2,
        borderRadius: '15px 0px 0px 15px',
        height: '73vh'
    }}
    >
        <Box
        sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            my: 2
        }}
        >
            <Link to='/inbox/all'>
                <button style={{backgroundColor: 'var(--light-blue-color)'}}>
                    <p>All Inbox</p>
                </button>
            </Link>
        </Box>
        <Typography sx={{p:1, color: 'var(--light-gray-color)'}}>INBOX</Typography>
        <Stack spacing={1}>
            {senders.map((sender) => 
                <Box
                sx={email == sender.id ? {
                    backgroundColor: '#ACD6FD',
                    borderRadius: '0px 0px 12px 0px',
                    boxShadow: 'inset 0.2rem 0em black'
                } : {
                }}
                >
                    <Link to={`/inbox/${sender.id}`}>
                        <Typography sx={{pl: 1}}>{sender.email}</Typography>
                    </Link>
                </Box>
            )}
        </Stack>
    </Box>
  )
}

export default Senders