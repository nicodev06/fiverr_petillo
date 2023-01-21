import React, {useState, useContext} from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Senders from './Senders';
import Time from './Time';

import { CampaignContext } from '../Layout';

import { Context } from '../../../../../utils/context';

const SettingsPage = () => {

  const { campaign, dailyCampaign, setDailyCampaign, waitingTime, setWaitingTime, setTrackOpenings, trackOpenings, unsubscribe, setUnsubscribe } = useContext(CampaignContext);
  const {setShowSnackBar, setMessage, setSeverity, showSnackBar, message, severity} = useContext(Context);

  function save(){
    fetch(`${process.env.REACT_APP_API_URL}/api/campaign/${campaign.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
        },
        credentials: 'include',
        body: JSON.stringify({
            name: campaign.name,
            daily_campaign: dailyCampaign,
            waiting_time: waitingTime,
            track_openings: trackOpenings,
            unsubscribe: unsubscribe
        })
    })
        .then((response) => {
            setShowSnackBar(true);
            if (response.status === 200){
                setSeverity("success")
                setMessage("Campaign correctly updated");
            } else {
                setSeverity("warning");
                setMessage("Something went wrong");
            }
        })
  }

  return (
    <Box
    sx={{
        mx: '3vw',
    }}
    >
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'flex-end'
        }}
        >
            <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={save}>
                <p>Save</p>
            </button>
        </Box>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Senders unsubscribe={unsubscribe} setUnsubscribe={setUnsubscribe}/>
            </Grid>
            <Grid item xs={6}>
                <Time dailyCampaign={dailyCampaign} setDailyCampaign={setDailyCampaign} waitingTime={waitingTime} setWaitingTime={setWaitingTime} trackOpenings={trackOpenings} setTrackOpenings={setTrackOpenings} />
            </Grid>
        </Grid>
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

export default SettingsPage