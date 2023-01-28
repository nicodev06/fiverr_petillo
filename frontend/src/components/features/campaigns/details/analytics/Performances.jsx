import React, {useState, useContext, useEffect} from 'react'

import {Box, Grid, Stack, Typography} from '@mui/material';

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';


import { Context } from '../../../../../utils/context';
import { CampaignContext } from '../Layout';

const Performances = () => {

  const [data, setData] = useState({})

  const { fetchFromAPI } = useContext(Context);

  const { campaign } = useContext(CampaignContext);


  useEffect(() => {
    fetchFromAPI(`/api/full_report/?q=${campaign?.id}`, setData)
  }, [campaign])

  return (
    <Box
    sx={{
        mt: '5vh',
        backgroundColor: '#F6FBFF',
        border: '1px solid var(--light-gray-color)',
        borderRadius: '10px',
    }}
    >
        <Stack 
        spacing={1} 
        sx={{
            mx:3,
            '&<*': {
                width: '100%'
            }    
        }}>
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                borderBottom: '1px solid var(--gray-color)',
                py: 4
            }}
            >
                <Grid container spacing={10}>
                    <Grid item xs={3.3}>
                        <Stack spacing={2} direction='row' sx={{alignItems: 'center'}}>
                            <PeopleAltRoundedIcon/>
                            <Typography variant='subtitle1'>Total Leads</Typography>
                            <Typography variant='subtitle2' sx={{fontWeight: 600}}>{data.leads}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={2.8}>
                        <Stack spacing={2} direction='row' sx={{alignItems: 'center'}}>
                            <WarningRoundedIcon/>
                            <Typography variant='subtitle1'>Bounced</Typography>
                            <Typography variant='subtitle2' sx={{fontWeight: 600}}>{data.bounced}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={2.8}>
                        <Stack spacing={2} direction='row' sx={{alignItems: 'center'}}>
                            <ThumbDownOffAltRoundedIcon/>
                            <Typography variant='subtitle1'>Unsubscribed</Typography>
                            <Typography variant='subtitle2' sx={{fontWeight: 600}}>{data.unsubscribe}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={2.8}>
                        <Stack spacing={2} direction='row' sx={{alignItems: 'center'}}>
                            <AddTaskRoundedIcon/>
                            <Typography variant='subtitle1'>Completed</Typography>
                            <Typography variant='subtitle2' sx={{fontWeight: 600}}>{data.completed}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Box
            sx={{
                py: 4
            }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={5} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Stack spacing={0.5} direction='row'>
                            <ReplyRoundedIcon/>
                            <Stack spacing={0.5}>
                                <Typography variant='subtitle1'>Completed</Typography>
                                <Typography variant='subtitle2' sx={{fontWeight: 600}}>{campaign?.total_sent}</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={1.5}>
                        <Stack spacing={0.5} direction='row'>
                            <RemoveRedEyeRoundedIcon/>
                            <Stack spacing={0.5}>
                                <Typography variant='subtitle1'>Opened</Typography>
                                <Typography variant='subtitle2' sx={{fontWeight: 600}}>{campaign?.total_opens}</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={5} sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <Stack spacing={0.5} direction='row'>
                            <ReplyRoundedIcon/>
                            <Stack spacing={0.5}>
                                <Typography variant='subtitle1'>Replied</Typography>
                                <Typography variant='subtitle2' sx={{fontWeight: 600}}>{campaign?.total_replies}</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    </Box>
  )
}

export default Performances