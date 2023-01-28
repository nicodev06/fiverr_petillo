import React, {useContext, useState,useEffect} from 'react'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';


import { CampaignContext } from '../Layout';
import { Context } from '../../../../../utils/context';


import BasicDialog from '../../../../BasicDialog';
import BasicInput from '../../../../BasicInput';


const AddSenderActivator = ({ handleClick }) => {
  return (
    <button style={{backgroundColor: 'var(--light-blue-color)', marginTop: '10px'}} onClick={handleClick}>
      <p>+ Add Sender</p>
    </button>
  )
}

const AddSender = ({ handleClose }) => {
  
  const [senders, setSenders] = useState([]);
  const { campaign, setCampaign } = useContext(CampaignContext);
  const { fetchFromAPI } = useContext(Context);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/basic_sender/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 200){
          response.json()
            .then((data) => {
              setSenders(data.filter((i) => 
                campaign.senders.filter((j) => j.email === i.email).length === 0
              ))
            })
        }
      })
  }, [])

  function addSender(pk){
    fetch(`${process.env.REACT_APP_API_URL}/api/add_sender_to_campaign/${campaign.id}/?q=${pk}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
      },
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 200){
          fetchFromAPI(`/api/campaign/${campaign.id}/`, setCampaign);
          handleClose();
        }
      })
  }
  
  return (
    <Box
    sx={{
      backgroundColor: '#F6FBFF'
    }}
    >
      <Stack spacing={1}>
        {senders.map((sender) => 
        <Box 
        sx={{
          '&:hover': {
            backgroundColor: 'var(--light-blue-color)'
          }
        }}
        key={sender}
        onClick={() => {addSender(sender.id)}}
        >
          <Typography variant='subtitle1' sx={{p:1}}>{sender.email}</Typography>
        </Box>)}
      </Stack>
    </Box>
  )
}

const Unsubscribe = ({unsubscribe, setUnsubscribe}) => {
  
  const { campaign, customMessage, setCustomMessage } = useContext(CampaignContext);
  const {setShowSnackBar, setMessage, setSeverity} = useContext(Context);

  function updateCustomMessage(){
    fetch(`${process.env.REACT_APP_API_URL}/api/campaign/${campaign.id}/`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
      },
      credentials: 'include',
      body: JSON.stringify({
          name: campaign.name,
          unsubscribe_message: customMessage,
          unsubscribe: true
      })
  })
      .then((response) => {
          setShowSnackBar(true);
          if (response.status === 200){
              setSeverity("success")
              setMessage("Custom message correctly updated");
          } else {
              setSeverity("warning");
              setMessage("Something went wrong");
          }
      })
  }

  return (
    <Stack spacing={0.5} sx={{mt: 1}}>
      <Typography variant='subtitle1'>Unsubscribe</Typography>
      <Stack spacing={0.5} direction='row'>
        <Switch inputProps={{ 'aria-label': 'controlled' }} checked={unsubscribe} onChange={(e) => {setUnsubscribe(e.target.checked)}}/>
        <Typography variant='subtitle1'>Link to Opt-out from list</Typography>
      </Stack>
      <Stack spacing={0.5} direction='row'>
        <Checkbox checked={customMessage?.length === 0}/>
        <Typography variant='subtitle1'>
          If you don't want to receive such email in future, Unsubscribe here
        </Typography>
      </Stack>
      <Stack spacing={0.5} direction='row'>
        <BasicInput placeholder='Custom message' onChange={(e) => {setCustomMessage(e.target.value)}} value={customMessage}/>
        <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={updateCustomMessage}>
          Add Custom Message
        </button>
      </Stack>
    </Stack>
  )
}

const Senders = ({unsubscribe, setUnsubscribe}) => {

  const { campaign } = useContext(CampaignContext);

  return (
    <Box>
        <Stack spacing={2}>
          <Box>
            <Stack
            sx={{
                p: 1,
                borderBottom: '1px solid var(--light-gray-color)',
                my: 1
            }}
            >
                <Typography variant='subtitle1' sx={{fontWeight: 700}}>Senders</Typography>
                <Typography variant='subtitle2' sx={{fontWeight: 400, color: 'var(--light-gray-color)'}}>Select one or more email accounts that will be used</Typography>
            </Stack>
            <Grid container spacing={1}>
              {campaign?.senders?.map((sender) => <Box key={sender}>
                <Grid
                item
                xs={12}
                sx={{
                  backgroundColor: 'var(--light-gray-color)',
                  borderRadius: '10px',
                  p: 1,
                  mt: 2,
                  mx: 1
                }}
                >
                  <Typography variant='subtitle1'>{sender.email}</Typography>
                </Grid>
              </Box>)}
            </Grid>
            <Box
            sx={{
              mt: 1
            }}
            >
            </Box>
            <BasicDialog Activator={AddSenderActivator}>
                <AddSender/>
            </BasicDialog>
          </Box>
          <Box>
            <Unsubscribe unsubscribe={unsubscribe} setUnsubscribe={setUnsubscribe}/> 
          </Box>
        </Stack>
    </Box>
  )
}

export default Senders