import React, { useState, useContext } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';

import SettingsIcon from '@mui/icons-material/Settings';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import BasicDialog from '../../BasicDialog';
import BasicInput from '../../BasicInput';

import { Context } from '../../../utils/context';

import EmailIcon from '../../../assets/email.svg'


const DeleteAccountActivator = ({ handleClick }) => {
  return (
    <Box onClick={handleClick}>
      <DeleteOutlineOutlinedIcon sx={{pr: '5px'}}/>
      <Typography>Delete Account</Typography>
    </Box>
  )
}

const SettingsActivator = ({ handleClick }) => {
  return (
    <Box onClick={handleClick}>
      <SettingsIcon sx={{pr: '5px'}}/>
      <Typography>Settings</Typography>
    </Box>
  )
}

const DeleteVerification = ({sender, handleClose}) => {
  
  const {emailCurrentPage, fetchFromAPI, setSenders, setEmailSendersCount, emailSendersCount} = useContext(Context);
  
  function deleteSender(){
    fetch(`${process.env.REACT_APP_API_URL}/api/toggle_sender/${sender.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
      }
    })
      .then(() => {
        setEmailSendersCount({'senders': emailSendersCount.senders - 1});
        fetchFromAPI(`/api/generic_sender/?page=${emailCurrentPage}`, setSenders);
        handleClose();
      })
  }
  
  return (
    <Box
    sx={{p: 2}}
    >
      <Typography variant='subtitle1' sx={{fontWeight: 600}}>Delete email account</Typography>
      <Typography variant='subtitle2'>Are you sure you want to delete this account?</Typography>
      <Box
      sx={{display: 'flex', justifyContent: 'center', mt: 1}}
      >
        <button
        style={{backgroundColor: '#FD6565'}}
        onClick={deleteSender}
        >
          <p>Delete</p>
        </button>
      </Box>
    </Box>
  )
}


const UpdateSettings = ({sender, handleClose}) => {

  const [firstName, setFirstName] = useState(sender.first_name);
  const [lastName, setLastName] = useState(sender.last_name);
  const [dailyCampaign, setDailyCampaign] = useState(sender.daily_campaign);
  const [sendingLimits, setSendingLimits] = useState(sender.sending_limits);

  function updateSender(){
    fetch(`${process.env.REACT_APP_API_URL}/api/toggle_sender/${sender.id}/`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
      },
      body: JSON.stringify({
        id: sender.id,
        first_name: firstName,
        last_name: lastName,
        email: sender.email,
        imap_username: sender.imap_username,
        imap_password: sender.imap_password,
        imap_host: sender.imap_host,
        smtp_username: sender.smtp_username,
        smtp_password: sender.smtp_password,
        smtp_host: sender.smtp_host,
        reply_to: sender.reply_to,
        daily_campaign: dailyCampaign,
        sending_limits: sendingLimits,
        active: sender.active
      })
    })
      .then((response) => {
        if (response.status === 200){
          handleClose();
        } 
      })
  }


  return (
    <Box>
      <Box
      sx={{display: 'flex', justifyContent: 'space-between', p:1, m:1}}
      >
          <Box
          sx={{display: 'flex', alignItems: 'center'}}
          >
            <img src={EmailIcon} width={50} height={50} alt='email icon'/>
            <Typography variant="subtitle1" sx={{fontWeight: 500, px: 1}}>{sender.email}</Typography>
          </Box>
          <Box>
            <button
            style={{backgroundColor: '#7ABFFF'}}
            onClick={updateSender}
            >
              <p>Save</p>
            </button>
          </Box>
      </Box>
      <hr/>
      <Box
      sx={{m:1}}
      >
        <Typography variant="h6">Email Setting</Typography>
        <Box>
          <Box
          sx={{display: 'flex', alignItems: 'center', m: 1}}
          >
            <Box sx={{pr: 2}}>
              <Typography variant='subtitle2'>Sender Name</Typography>
              <BasicInput placeholder={"First Name"} type={'text'} value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
            </Box>
            <Box>
              <Typography variant='subtitle2'>Last Name</Typography>
              <BasicInput placeholder={"Last Name"} type={'text'} value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
            </Box>
          </Box>
          <Box
          sx={{display: 'flex', alignItems: 'center', m: 1}}
          >
            <Box sx={{pr: 2}}>
              <Typography variant='subtitle2'>Daily Campaign</Typography>
              <Typography variant='subtitle2' sx={{fontSize: '0.8em', color: 'var(--gray-color)', py: '2px'}}>Max emails x Days</Typography>
              <BasicInput placeholder={'40 Email'} type={'text'} value={dailyCampaign} onChange={(e) => {setDailyCampaign(e.target.value)}}/>
            </Box>
            <Box>
              <Typography variant='subtitle2'>Wait Time (Minutes)</Typography>
              <Typography variant='subtitle2' sx={{fontSize: '0.8em', color: 'var(--gray-color)', py: '2px'}}>When used with multiple campaigns</Typography>
              <BasicInput placeholder={'1 Min'} type={'text'} value={sendingLimits} onChange={(e) => {setSendingLimits(e.target.value)}}/>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
      sx={{m: 1}}
      >
        <Typography variant='h6'>Custom Tracking Domain</Typography>
        <Box
        sx={{display: 'flex', alignItems: 'center'}}
        >
          <Checkbox sx={{pr: '10px'}}/>
          <Typography>Use Custom Tracking Domain</Typography>
        </Box>
        <Box>
          <Typography variant='subtitle2' sx={{color: 'var(--gray-color)'}}>
            To set up custom tracking with your domain, you'll need to add DNS CNAME <br/>
            record to your domain's manager
          </Typography>
        </Box>
        <Typography variant='subtitle2'>Type: CNAME</Typography>
        <Box
        sx={{display: 'flex', m:1}}
        >
          <Box sx={{pr:1}}>
            <BasicInput placeholder={'Domain Name'}/>
          </Box>
          <Box>
            <BasicInput placeholder={'track.com'}/>
          </Box>
        </Box>
        <Box
        sx={{display: 'flex', alignItems: 'center', m:1}}
        >
          <Box sx={{pr:1}}>
            <BasicInput placeholder={'Mydomain.com'}/>
          </Box>
          <Box>
            <button
            style={{backgroundColor: 'var(--light-blue-color)'}}
            >
              <p>Check Status</p>
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


const SenderSettings = ({ sender, handleClose }) => {

    const {emailCurrentPage, fetchFromAPI, setSenders} = useContext(Context);    

    function toggleSender(){
      fetch(`${process.env.REACT_APP_API_URL}/api/toggle_sender/${sender.id}/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
        },
        body: JSON.stringify({
          id: sender.id,
          first_name: sender.first_name,
          last_name: sender.last_name,
          email: sender.email,
          imap_username: sender.imap_username,
          imap_password: sender.imap_password,
          imap_host: sender.imap_host,
          smtp_username: sender.smtp_username,
          smtp_password: sender.smtp_password,
          smtp_host: sender.smtp_host,
          reply_to: sender.reply_to,
          daily_campaign: sender.daily_campaign,
          sending_limits: sender.sending_limits,
          active: !sender.active
        })
      })
        .then(() => {
          fetchFromAPI(`/api/generic_sender/?page=${emailCurrentPage}`, setSenders);
          handleClose();
        })
    }
    return (
      <Box>
        <Stack
        sx={{
          '&>*':{
            display: 'flex',
            color: 'var(--gray-color)',
            p: '10px'
          },
          '&>*:hover':{
            backgroundColor: 'var(--sky-blue-color)'
          },
        }}
        >
          <BasicDialog Activator={SettingsActivator}>
            <UpdateSettings sender={sender} handleClose={handleClose}/>
          </BasicDialog>
          <Box onClick={toggleSender}>
            <CreateOutlinedIcon sx={{pr: '5px'}}/>
            <Typography>{sender.active ? "Disconnect account" : "Reconnect Account"}</Typography>
          </Box>
          <BasicDialog Activator={DeleteAccountActivator}>
              <DeleteVerification sender={sender} handleClose={handleClose}/>
          </BasicDialog>
        </Stack>
      </Box>
    )
  }

const SenderSettingsActivator = ({handleClick}) => {
    return (
        <MoreVertIcon onClick={handleClick}/>
    )
}
  

const SenderDetails = ({ sender }) => {
  return (
    <Box
    sx={{
        py: '10px',
        my: '15px',
        borderRadius: '0 0 5px 5px',
        boxShadow: '1px 1px var(--light-gray-color)'
    }}
    >
        <Grid container spacing={6}>
            <Grid item xs={3}>
                <Typography variant='subtitle1' sx={{fontWeight: 500}}>{sender.email}</Typography>
            </Grid>
            <Grid item xs={2}>
                {!sender.active && <Typography variant='subtitle2' sx={{color: '#FD6565', fontSize: '0.8rem'}}>Account disconnected</Typography>}
            </Grid>
            <Grid item xs={1.5}>
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
                >
                    <SendOutlinedIcon sx={{pr: '5px', transform: 'rotate(300deg)'}}/>
                    <Typography sx={{fontSize: '0.8rem', color: 'var(--sky-blue-color)'}}>1200/1499</Typography>
                </Box>
            </Grid>
            <Grid item xs={1.3}>
                <Box
                sx={{
                    backgroundColor: sender.spf ? '#77ED91' : '#FD6565',
                    p: 1,
                    borderRadius: '100px',
                    fontWeight: 500
                }}
                >
                    SPF
                </Box>
            </Grid>
            <Grid item xs={1.3}>
                <Box
                    sx={{
                        backgroundColor: sender.dkim ? '#77ED91' : '#FD6565',
                        p: 1,
                        borderRadius: '100px',
                        fontWeight: 500
                    }}
                    >
                        DKIM
                </Box>
            </Grid>
            <Grid item xs={1.3}>
                <Box
                    sx={{
                        backgroundColor: sender.dmarc ? '#77ED91' : '#FD6565',
                        p: 1,
                        borderRadius: '100px',
                        fontWeight: 500
                    }}
                    >
                        DMARC
                </Box>
            </Grid>
            <Grid item xs={1}>
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
                >
                    <Box
                    sx={{
                        backgroundColor: sender.active ? '#77ED91' : '#FEDF3E',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                    }}
                    ></Box>
                <BasicDialog Activator={SenderSettingsActivator}>
                   <SenderSettings sender={sender}/> 
                </BasicDialog>
                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}

export default SenderDetails