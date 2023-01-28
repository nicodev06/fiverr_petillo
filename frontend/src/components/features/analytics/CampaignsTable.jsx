import React, {useContext, useState, useEffect} from 'react'

import {Box, Stack, Typography, Grid} from '@mui/material';

import { Context } from '../../../utils/context';


const CampaignsTable = () => {

  const [campaigns, setCampaigns] = useState([]);
  const { fetchFromAPI } = useContext(Context);

  useEffect(() => {
    fetchFromAPI('/api/campaigns/', setCampaigns)
  }, [])

  return (
    <Box
    sx={{
        mt: '5vh',
        backgroundColor: '#F6FBFF',
        border: '1px solid var(--light-gray-color)',
        borderRadius: '10px',
    }}
    >
        <Stack spacing={1}>
            <Grid container spacing={1} sx={{backgroundColor: '#7ABFFF', borderRadius: '10px', pl: '10px'}}>
                <Grid item xs={3}>
                    Campaign
                </Grid>
                <Grid item xs={3}>
                    Sent
                </Grid>
                <Grid item xs={3}>
                    Opened
                </Grid>
                <Grid item xs={3}>
                    Replied
                </Grid>
            </Grid>
        {campaigns?.results?.map((campaign) => 
        <Grid container key={campaign} sx={{pl: '10px'}}>
            <Grid item xs={3}>
                {campaign.name}
            </Grid>
            <Grid item xs={3}>
                {campaign.total_sent}
            </Grid>
            <Grid item xs={3}>
                {campaign.total_opens}
            </Grid>
            <Grid item xs={3}>
                {campaign.total_replies}
            </Grid>
        </Grid>
        )}
        </Stack>
    </Box>
  )
}

export default CampaignsTable