import React, {useContext, useState, useEffect} from 'react'

import { useParams } from 'react-router-dom';

import {Box, Stack, Typography, Grid, Switch} from '@mui/material';

import { Context } from '../../../../../utils/context';


const CampaignsTable = () => {

  const [sequences, setSequences] = useState([]);
  const { fetchFromAPI } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`/api/sequences/${id}/`, setSequences)
  }, [])

  return (
    <Box
    sx={{
        mt: '5vh',
        backgroundColor: '#F6FBFF',
        border: '1px solid var(--light-gray-color)',
        borderRadius: '10px',
        mb: 2
    }}
    >
        <Stack spacing={1}>
            <Grid container spacing={1} sx={{backgroundColor: '#7ABFFF', borderRadius: '10px', pl: '10px'}}>
                <Grid item xs={3}>
                    Sequence
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
        {sequences?.map((sequence) => 
        <Grid container key={sequence} sx={{pl: '10px'}}>
            <Grid item xs={3}>
                <Stack direction='row' spacing={0.5} sx={{alignItems: 'center'}}>
                    <Switch/>
                    {sequence.name}
                </Stack>
            </Grid>
            <Grid item xs={3}>
                {sequence.total_sent}
            </Grid>
            <Grid item xs={3}>
                {sequence.total_opens}
            </Grid>
            <Grid item xs={3}>
                {sequence.total_replies}
            </Grid>
        </Grid>
        )}
        </Stack>
    </Box>
  )
}

export default CampaignsTable