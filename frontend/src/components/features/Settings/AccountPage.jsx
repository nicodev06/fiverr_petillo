import React, { useContext, useState, useEffect } from 'react'

import {Box, Stack, Grid, Typography, Alert, Snackbar} from '@mui/material';

import BasicInput from '../../BasicInput';

import { Context } from '../../../utils/context';

const AccountPage = () => {

  const { currentUser, setCurrentUser, showSnackBar, setShowSnackBar, severity, setSeverity, message, setMessage } = useContext(Context);
  const [firstName, setFirstName] = useState(currentUser?.first_name);
  const [lastName, setLastName] = useState(currentUser?.last_name);
  const [email, setEmail] = useState(currentUser?.email);

  function save(){
    fetch(`${process.env.REACT_APP_API_URL}/api/update_current_user/${currentUser.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
        },
        credentials: 'include',
        body: JSON.stringify({
            id: currentUser.id,
            first_name: firstName,
            last_name: lastName,
            email
        })
    })
        .then((response) => {
            if (response.status === 200){
                setShowSnackBar(true);
                setMessage('User correctly update');
                setSeverity('success');
                response.json()
                    .then((data) => {
                        setCurrentUser(data);
                    })
            }
        })
  }

  useEffect(() => {
    setFirstName(currentUser?.first_name);
    setLastName(currentUser?.last_name);
    setEmail(currentUser?.email);
  }, [currentUser])
    
  return (
    <Box
    sx={{
        mt: '3vh',
        mx: '4vw',
        width: '30vw'
    }}
    >
        <Stack spacing={1}>
            <Stack spacing={1} sx={{fontWeight: 600, borderBottom: '1px solid var(--light-gray-color)'}}>
                <Typography variant='h6'>My Profile</Typography>
                <Typography variant='subtitle1'>Update your name, profile photo, and other information</Typography>
            </Stack>
            <Stack spacing={0.5} direction='row'>
                <Box
                className='app__navbar-account'
                sx={{
                    width: '40px',
                    height: '40px'
                }}
                ></Box>
                <Stack spacing={0.5}>
                    <Typography variant='subtitle1'>Giulio Petillo</Typography>
                    <Typography variant='subtitle2'>leviregar@gmail.com</Typography>
                </Stack>
            </Stack>
                <Box>
                    <Grid container spacing={1} sx={{my: '2vh'}}>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <Typography variant='subtitle1'>First Name</Typography>
                                <BasicInput placeholder='First Name' value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <Typography variant='subtitle1'>Last Name</Typography>
                                <BasicInput placeholder='Last Name' value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <Typography variant='subtitle1'>Email <span style={{color: 'red', pb: '10px'}}>*</span></Typography>
                                <BasicInput placeholder='Email' required value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container sx={{mt: '2vh'}}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={save}>
                                <p>Save</p>
                            </button>
                        </Grid>
                    </Grid>
                </Box>
                <Stack spacing={1}>
                    <Stack spacing={1} sx={{justifyContent: 'flex-start'}}>
                        <Typography variant='subtitle1'>Change Password</Typography>
                        <Typography variant='subtitle2'>Enter your current password <span style={{color: 'red'}}>*</span></Typography>
                        <BasicInput placeholder='Password'/>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <Typography>New Password</Typography>
                                <BasicInput placeholder='password'/>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <Typography>Confirm Password</Typography>
                                <BasicInput placeholder='password'/>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sx={{textAlign:'center', mt: '2vh'}}>
                            <button
                            style={{
                                backgroundColor: 'var(--light-blue-color)'
                            }}
                            >
                                <p>Update</p>
                            </button>
                        </Grid>
                    </Grid>
                </Stack> 
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
    </Box>
  )
}

export default AccountPage