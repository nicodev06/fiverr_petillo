import React, {useState, useContext, useEffect} from 'react'

import {Box, Typography, Stack, Grid, Snackbar, Alert, IconButton} from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import BasicInput from '../../BasicInput';
import BasicDialog from '../../BasicDialog';

import { Context } from '../../../utils/context';

const DeleteActivator = ({ handleClick }) => {
    return (
        <IconButton onClick={handleClick}>
            <DeleteIcon/>
        </IconButton>
    )
}

const TeamPage = () => {

  const { showSnackBar, setShowSnackBar, severity, setSeverity, message, setMessage, fetchFromAPI } = useContext(Context);
  const [members, setMembers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchFromAPI('/api/team_members/', setMembers)
    console.log()
  }, [])

  function deleteMember(email){
    const updatedMembers = members.filter((member) => member.email !== email);
    setMembers(updatedMembers);
    fetch(`${process.env.REACT_APP_API_URL}/api/delete_member/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
        },
        credentials: 'include',
        body: JSON.stringify(updatedMembers)
    })
        .then((response) => {
            if (response.status === 200){
                setShowSnackBar(true);
                setMessage('Member Deleted Succesfully');
                setSeverity('success');
            }
        })
  }

  function submit(){
    fetch(`${process.env.REACT_APP_API_URL}/api/update_team/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
        },
        credentials: 'include',
        body: JSON.stringify({
            member: {
                firstName: firstName,
                lastName: lastName,
                role: role,
                email: email
            }
        })
    })
        .then((response) => {
            if (response.status === 200){
                setMembers([...members, {
                    firstName: firstName,
                    lastName: lastName,
                    role: role,
                    email: email
                }])
                setShowSnackBar(true);
                setMessage('Team correctly updated');
                setSeverity('success');
            }
        })
  }
    
  return (
    <>
    <Box
    sx={{
        mt: '3vh',
        mx: '4vw',
        width: '33vw'
    }}
    >
        <Stack spacing={1}>
            <Stack spacing={1} sx={{borderBottom: '1px solid var(--light-gray-color)'}}>
                <Typography variant='subtitle1'>Add Members</Typography>
                <Typography variant='subtitle2'>Add Members to your team</Typography>
            </Stack>
            <Stack spacing={1}>
                <Grid container>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <Typography variant='subtitle1'>First Name</Typography>
                            <BasicInput placeholder='First Name' onChange={(e) => {setFirstName(e.target.value)}}/>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <Typography variant='subtitle1'>Last Name</Typography>
                            <BasicInput placeholder='Last Name' onChange={(e) => {setLastName(e.target.value)}}/>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <Typography variant='subtitle1'>Email <span style={{color: 'red', paddingBottom: '10px'}}>*</span></Typography>
                            <BasicInput placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <Typography variant='subtitle1'>Role</Typography>
                            <BasicInput placeholder='Role' onChange={(e) => {setRole(e.target.value)}}/>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={submit}>
                            <p>Sumbit</p>
                        </button>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    </Box>
    <Box
    sx={{
        mt: '3vh',
        mx: '4vw'
    }}
    >
        <Grid container sx={{p:1, backgroundColor: 'var(--light-gray-color)', borderRadius: '10px'}}>
            <Grid item xs={3}>Name</Grid>
            <Grid item xs={3}>Email</Grid>
            <Grid item xs={3}>Role</Grid>
            <Grid item xs={3}></Grid>
        </Grid>
        {members?.map((member) => 
        <Grid container key={member} sx={{mt: '10px'}}>
            <Grid item xs={3}>
                <Stack direction='row' spacing={0.5}>
                    <Box
                    className='app__navbar-account'
                    sx={{
                        width: '40px',
                        height: '40px'
                    }}
                    ></Box>
                    <Stack spacing={0.5}>
                        <Typography variant='subtitle1'>{`${member.firstName} ${member.lastName}`}</Typography>
                        <Typography variant='subtitle2' sx={{color: 'var(--light-gray-color)'}}>{member.email}</Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='subtitle1'>
                    {member.email}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='subtitle1'>
                    {member.role}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Stack direction='row' spacing={1}>
                    <IconButton>
                        <ContentCopyIcon/>
                    </IconButton>
                    <BasicDialog Activator={DeleteActivator}>
                        <Box>
                            <Stack spacing={1} sx={{p:1}}>
                                <Typography variant='subtitle1'>Delete team account</Typography>
                                <Typography variant='subtitle2'>Are you sure you want to delete this account?</Typography>
                                <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                                >
                                    <button style={{backgroundColor: '#FD6565'}} onClick={() => {deleteMember(member.email)}}>
                                        <p>Delete</p>
                                    </button>
                                </Box>
                            </Stack>  
                        </Box>
                    </BasicDialog>
                </Stack>
            </Grid>
        </Grid>)}
    </Box>
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

export default TeamPage