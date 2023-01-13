import React, { useState, useContext } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Context } from '../../../utils/context';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';


import BasicDialog from '../../BasicDialog';
import BasicInput from '../../BasicInput';


const CampaignSettingsActivator = ({ handleClick }) => {
    return (
        <MoreVertOutlinedIcon onClick={handleClick}/>
    )
}


const RenameCampaignActivator = ({ handleClick }) => {
    return (
        <Stack 
            sx={{
                '&:hover':{
                    backgroundColor: 'var(--light-blue-color)'
                }
            }}
            direction='row' spacing={1} onClick={handleClick}>
                <CreateOutlinedIcon sx={{pl: 1}}/>
                <Typography variant='subtitle1'>Rename</Typography>
        </Stack>
    )
}

const RenameCampaignSecondActivator = ({ handleClick }) => {
    return (
        <CreateOutlinedIcon onClick={handleClick}/>
    )
}

const DeleteCampaignActivator = ({ handleClick }) => {
    return (
        <Stack 
            sx={{
                '&:hover':{
                    backgroundColor: 'var(--light-blue-color)'
                }
            }}
            direction='row' spacing={1} onClick={handleClick}>
                <DeleteOutlineRoundedIcon sx={{pl: 1}}/>
                <Typography variant='subtitle1'>Delete</Typography>
        </Stack>
    )
}


const RenameCampaign = ({ campaign, handleClose }) => {

    const [name, setName] = useState('');
    const {campaignsCurrentPage, setCampaigns, fetchFromAPI} = useContext(Context);

    function rename(){
        if (name.length > 0){
            fetch(`${process.env.REACT_APP_API_URL}/api/campaign/${campaign.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
                },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        id: campaign.id,
                        name,
                        status: campaign.status
                    }
                )
        })
            .then((response) => {
                if (response.status === 200){
                    fetchFromAPI(`/api/campaigns/?page=${campaignsCurrentPage}`, setCampaigns);
                    handleClose();
                }
            })
    }
}

    return (
        <Box
        sx={{p: 2}}
        >
            <Box>
                <Stack direction='row' spacing={1} sx={{alignItems: 'center'}}>
                    <CreateOutlinedIcon/>
                    <Typography variant='h6'>Rename campaign</Typography>
                </Stack>
            </Box>
            <Box sx={{mt: 2}}>
                <BasicInput placeholder='Insert Campaign Name' onChange={(e) => {setName(e.target.value)}}/>
            </Box>
            <Box
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1}}
            >
                <Box>
                    <button className='btn-dark' onClick={handleClose}>
                        <p>{`<`} Back</p>
                    </button>
                </Box>
                <Box sx={{pl: 1}}>
                    <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={rename}>
                        <p>{`+`} Rename</p>
                    </button>
                </Box>
            </Box>
        </Box>
    )
}

const DeleteCampaign = ({campaign, handleClose}) => {

    const {campaignsCurrentPage, setCampaigns, fetchFromAPI} = useContext(Context);
    
    function deleteCampaign(){
        fetch(`${process.env.REACT_APP_API_URL}/api/campaign/${campaign.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
            },
            credentials: 'include',
    })
        .then((response) => {
            if (response.status === 204){
                fetchFromAPI(`/api/campaigns/?page=${campaignsCurrentPage}`, setCampaigns);
                handleClose();
            }
        })
    }

    return (
        <Box
        sx={{p: 2}}
        >
            <Typography variant='subtitle1' sx={{fontWeight: 600}}>Delete Campaign</Typography>
            <Typography variant='subtitle2'>Are you sure you want to delete this campaign?</Typography>
            <Box
            sx={{display: 'flex', justifyContent: 'center', mt: 1}}
            >
                <button
                style={{backgroundColor: '#FD6565'}}
                onClick={deleteCampaign}
                >
                <p>Delete</p>
                </button>
            </Box>
        </Box>
  )
}

const CampaignSettings = ({ campaign, handleClose }) => {

    
    return (
        <Box
        sx={{
            width: '15vw',
            backgroundColor: '#F6FBFF'
        }}
        >
            <Stack
            sx={{
                '&>*': {
                    py:1.5
                },
            }}
            >
                <Box
                >
                    <Stack
                    sx={{
                        '&:hover':{
                            backgroundColor: 'var(--light-blue-color)'
                        }
                    }}
                    direction='row' spacing={1}>
                        <OutboundRoundedIcon sx={{pl: 1}}/>
                        <Typography variant='subtitle1'>Open</Typography>
                    </Stack>
                    <BasicDialog Activator={RenameCampaignActivator}>
                        <RenameCampaign handleClose={handleClose} campaign={campaign}/>
                    </BasicDialog>
                    <Stack
                    sx={{
                        '&:hover':{
                            backgroundColor: 'var(--light-blue-color)'
                        }
                    }}
                    direction='row' spacing={1}>
                        <ContentCopyRoundedIcon sx={{pl: 1}}/>
                        <Typography variant='subtitle1'>Duplicate</Typography>
                    </Stack>
                    <BasicDialog Activator={DeleteCampaignActivator}>
                        <DeleteCampaign campaign={campaign} handleClose={handleClose}/>
                    </BasicDialog>
                </Box>
            </Stack>
        </Box>
    )
}


const CampaignDetails = ({ campaign }) => {

  const {campaignsCurrentPage, setCampaigns, fetchFromAPI} = useContext(Context); 

  function toggleCampaignStatus(status){
    fetch(`${process.env.REACT_APP_API_URL}/api/campaign/${campaign.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
        },
        credentials: 'include',
        body: JSON.stringify(
            {
                id: campaign.id,
                name: campaign.name,
                status
            }
        )
    })
        .then((response) => {
            if (response.status === 200){
                fetchFromAPI(`/api/campaigns/?page=${campaignsCurrentPage}`, setCampaigns);
            }
        })
  }
    
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
            <Grid item xs={0.5}>
                <Stack direction='row' spacing={1}>
                    {campaign.status === 'paused' && 
                    <Button onClick={() => {toggleCampaignStatus('active')}}>
                        <PlayArrowOutlinedIcon/>
                    </Button>
                    }
                    {campaign.status === 'active' && 
                    <Button onClick={() => {toggleCampaignStatus('paused')}}>
                        <PauseOutlinedIcon/>
                    </Button>
                    } 
                </Stack>
            </Grid>
            <Grid item xs={1.5}>
                <Stack direction='row' spacing={1}>
                    <BasicDialog Activator={RenameCampaignSecondActivator}>
                        <RenameCampaign campaign={campaign}/>
                    </BasicDialog>
                    <BasicDialog Activator={CampaignSettingsActivator}>
                        <CampaignSettings campaign={campaign}/>
                    </BasicDialog>
                </Stack>
            </Grid>
        </Grid>
    </Box>
  )
}

export default CampaignDetails