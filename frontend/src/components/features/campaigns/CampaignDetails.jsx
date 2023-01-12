import React, { useContext } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import { Context } from '../../../utils/context';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';


const CampaignDetails = ({ campaign }) => {
  return (
    <Box
    sx={{
        py: '10px',
        my: '15px',
        borderRadius: '0 0 5px 5px',
        boxShadow: '1px 1px var(--light-gray-color)',
        backgroundColor: '#F6FBFF'
    }}
    >
        <Grid container spacing={6} sx={{alignItems: 'center'}}>
            <Grid item xs={3}>
                <Stack
                spacing={0.5} 
                sx={{textAlign: 'left'}}
                >
                    <Typography variant='subtitle1' sx={{fontWeight: 500}}>{campaign.name}</Typography>
                    <Typography variant='subtitle2' sx={{color: 'var(--light-gray-color)', fontSize: '0.8rem'}}>{campaign.days_since_creation != 0 ? `${campaign.days_since_creation} days ago` : 'Today'}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Box>
                    <button className={campaign.status}>
                        <p style={{textTransform: 'capitalize'}}>{campaign.status}</p>
                    </button>
                </Box>
            </Grid>
            <Grid item xs={1.3}>
                <Stack direction='row' spacing={1}>
                    <SendRoundedIcon sx={{transform: 'rotate(300deg)'}}/>
                    <Typography variant='subtitle2' sx={{fontSize: '0.8rem', color: 'var(--sky-blue-color)'}}>133</Typography>
                </Stack>
            </Grid>
            <Grid item xs={1.3}>
                <Stack direction='row' spacing={1}>
                    <RemoveRedEyeOutlinedIcon/>
                    <Typography variant='subtitle2' sx={{fontSize: '0.8rem', color: 'var(--sky-blue-color)'}}>133</Typography>
                </Stack>
            </Grid>
            <Grid item xs={1.3}>
                <Stack direction='row' spacing={1}>
                    <ReplyRoundedIcon/>
                    <Typography variant='subtitle2' sx={{fontSize: '0.8rem', color: 'var(--sky-blue-color)'}}>133</Typography>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack direction='row' spacing={1}>
                    <PlayArrowOutlinedIcon/>
                    <PauseOutlinedIcon/>
                    <CreateOutlinedIcon/>
                    <MoreVertOutlinedIcon/>
                </Stack>
            </Grid>
        </Grid>
    </Box>
  )
}

export default CampaignDetails