import React, { useState, useContext } from 'react'

import {Box, Typography, Stack, TextField, Alert, Snackbar} from '@mui/material'

import { Context } from '../../../utils/context';


const BlackList = () => {

    const { showSnackBar, setShowSnackBar, severity, setSeverity, message, setMessage } = useContext(Context);
  const [content, setContent] = useState('');

  function update(){
    const blacklist = content.split(',');
    fetch(`${process.env.REACT_APP_API_URL}/api/update_black_list/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
        },
        credentials: 'include',
        body: JSON.stringify({
            blacklist
        })
    })
        .then((response) => {
            if (response.status === 200){
                setShowSnackBar(true);
                setMessage('Blacklist correctly updated');
                setSeverity('success');
            }
        })
  }
    
  return (
    <>
    <Stack
    spacing={1}
    sx={{
        mt: '5vh',
        mx: '4vw',
        width: '40vw'
    }}
    >
        <Stack spacing={1}>
            <Typography variant='subtitle1'>Blacklist</Typography>
            <Typography variant='subtitle2'>Prevent email from being sent to the following email addresses</Typography>
        </Stack>
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
        >
            <TextField sx={{width: '100%'}} onChange={(e) => {setContent(e.target.value)}}/>
            <button
            style={{
                backgroundColor: 'var(--light-blue-color)',
                marginTop: '1vh'
            }}
            onClick={update}
            >
                <p>Save</p>
            </button>
        </Box>
    </Stack>
    <Snackbar
    open={showSnackBar}
    autoHideDuration={6000}
    onClose={() => {setShowSnackBar(false)}}
    >
        <Alert severity={severity} sx={{width: '100%'}}>
            {message}
        </Alert>
    </Snackbar>
    </>
  )
}

export default BlackList