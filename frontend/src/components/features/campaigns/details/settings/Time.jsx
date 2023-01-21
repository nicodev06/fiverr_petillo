import React from 'react'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import BasicInput from '../../../../BasicInput';


const Time = ({dailyCampaign, waitingTime, trackOpenings, setDailyCampaign, setWaitingTime, setTrackOpenings}) => {
  return (
    <Box>
       <Stack
        sx={{
            p: 1,
            borderBottom: '1px solid var(--light-gray-color)',
            my: 1
        }}
        >
            <Typography variant='subtitle1' sx={{fontWeight: 700}}>Sending Limit</Typography>
            <Typography variant='subtitle2' sx={{fontWeight: 400, color: 'var(--light-gray-color)'}}>Maximum number of emails to send per day</Typography>
        </Stack> 
        <Grid container spacing={2} sx={{my:1}}>
            <Stack
            sx={{
                p: 1,
                m: 1.1
            }}
            >
                <Typography variant='subtitle1' sx={{fontWeight: 700}}>Daily campaign</Typography>
                <Typography variant='subtitle2' sx={{fontWeight: 400, color: 'var(--light-gray-color)'}}>Max emails x Days</Typography>
                <BasicInput placeholder='40 Email' value={dailyCampaign} onChange={(e) => {setDailyCampaign(e.target.value)}}/>
            </Stack>
            <Stack
            sx={{
                p: 1,
                my: 1
            }}
            >
                <Typography variant='subtitle1' sx={{fontWeight: 700}}>Wait Time (Minutes)</Typography>
                <Typography variant='subtitle2' sx={{fontWeight: 400, color: 'var(--light-gray-color)'}}>Wait time</Typography>
                <BasicInput placeholder='1 Min' value={waitingTime} onChange={(e) => {setWaitingTime(e.target.value)}}/>
            </Stack>
        </Grid>
        <Box>
            <Stack>
                <Typography variant='subtitle1' sx={{fontWeight: 700}}>Open tracking</Typography>
                <Typography variant='subtitle2' sx={{fontWeight: 400, color: 'var(--light-gray-color)'}}>Track email open</Typography>
            </Stack>
        </Box>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center'
        }}
        >
            <button style={{
                backgroundColor: trackOpenings ? '#77ED91' :  'var(--light-gray-color)',
                position: 'relative',
                left: '25px',
                zIndex: trackOpenings ? 1 : 0
            }}
            onClick={() => {setTrackOpenings(true)}}
            >Track</button>
            <button style={{
                backgroundColor: trackOpenings ? 'var(--light-gray-color)' : '#77ED91',
                zIndex: !trackOpenings ? 1 : 0
            }}
            onClick={() => {setTrackOpenings(false)}}
            >No track</button>
        </Box>
    </Box>
  )
}

export default Time