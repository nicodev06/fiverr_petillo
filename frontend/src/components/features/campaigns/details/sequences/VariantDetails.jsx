import React, {useContext} from 'react'

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton  from '@mui/material/IconButton';


import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import { CampaignContext } from '../Layout';

const VariantDetails = ({ sequence, variant }) => {

  const { campaign, fetchSteps } = useContext(CampaignContext);

  function deleteVariant(){
      fetch(`${process.env.REACT_APP_API_URL}/api/delete_variant/${variant.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
        },
        credentials: 'include', 
      })
        .then((response) => {
            if (response.status === 202){
                fetchSteps(campaign);
            }
        })
      }

  return (
    <>
        <Grid container spacing={3} sx={{py: '2vh', alignItems: 'center'}}>
            <Grid item xs={4} sx={{ml: '1vw'}}>
                <Typography variant='subtitle1' sx={{fontWeight: 700}}>{`${sequence.name}${variant.name}`}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Stack direction='row' spacing={1} sx={{alignItems:'center'}}>
                    <SendRoundedIcon sx={{transform: 'rotate(310deg)'}}/>
                    <Typography variant='subtitle2' sx={{color: '#ACD6FD', fontWeight: 500}}>
                        1200
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack direction='row' spacing={1} sx={{alignItems:'center'}}>
                    <RemoveRedEyeOutlinedIcon/>
                    <Typography variant='subtitle2' sx={{color: '#ACD6FD', fontWeight: 500}}>
                        1200
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack direction='row' spacing={1} sx={{alignItems:'center'}}>
                    <ReplyRoundedIcon/>
                    <Typography variant='subtitle2' sx={{color: '#ACD6FD', fontWeight: 500}}>
                        1200
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={0.4}>
                <IconButton onClick={deleteVariant}>
                    <DeleteOutlineIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={0.4}>
                <IconButton>
                    <CreateRoundedIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={0.4}>
                <IconButton>
                    <MoreVertRoundedIcon/>
                </IconButton>
            </Grid>
        </Grid>
    </>
  )
}

export default VariantDetails