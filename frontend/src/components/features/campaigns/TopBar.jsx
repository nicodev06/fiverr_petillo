import React, { useState, useEffect, useContext } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

import BasicDialog from '../../BasicDialog';
import BasicInput from '../../BasicInput';

import { Context } from '../../../utils/context';



const AddNewActivator = ({ handleClick }) => {
    
    return (
        <Box onClick={handleClick}>
            <button
            style={{backgroundColor: 'var(--light-blue-color)'}}
            >
                <p>+ Add New</p>
            </button>
        </Box>
    )
}

const FilterActivator = ({ handleClick }) => {
    return (
        <Box>
            <button
            style={{backgroundColor: 'var(--light-blue-color)'}}
            onClick={handleClick}
            >
                <p>Filter</p>
            </button>
        </Box>
    )
}

const FilterCampaigns = ({ handleClose, currentStatus, setCurrentStatus  }) => {

    const {campaignsCurrentPage, setCampaigns, fetchFromAPI} = useContext(Context);

    
    function getCampaigns(status){
        if (currentStatus === status){
            setCurrentStatus(null);
            fetchFromAPI(`/api/campaigns/?page=${campaignsCurrentPage}`, setCampaigns);
        } else {
            setCurrentStatus(status);
            fetchFromAPI(`/api/campaigns/?status=${status}&page=1`, setCampaigns);
        }
        handleClose();
    }

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
                    py:1
                },
            }}
            >
                <Box
                sx={{
                    '&:hover':{
                        backgroundColor: 'var(--light-blue-color)'
                    },
                    backgroundColor: currentStatus === 'active' ?  'var(--light-blue-color)' : 'transparent'   
        
                }}
                >
                    <Stack
                    direction='row' spacing={1} onClick={() => {getCampaigns('active')}}>
                        <PlayArrowOutlinedIcon sx={{pl: 1}}/>
                        <Typography variant='subtitle1'>Active</Typography>
                    </Stack>
                </Box>
                <Box
                sx={{
                    '&:hover':{
                        backgroundColor: 'var(--light-blue-color)'
                    },
                    backgroundColor: currentStatus === 'paused' ?  'var(--light-blue-color)' : 'transparent'
                }}
                >
                    <Stack
                    direction='row' spacing={1} onClick={() => {getCampaigns('paused')}}>
                        <PauseOutlinedIcon sx={{pl: 1}}/>
                        <Typography variant='subtitle1'>Paused</Typography>
                    </Stack>
                </Box>
                <Box
                sx={{
                    '&:hover':{
                        backgroundColor: 'var(--light-blue-color)'
                    },
                    backgroundColor: currentStatus === 'draft' ?  'var(--light-blue-color)' : 'transparent'
                }}
                >
                    <Stack
                    direction='row' spacing={1} onClick={() => {getCampaigns('draft')}}>
                        <CreateOutlinedIcon sx={{pl: 1}}/>
                        <Typography variant='subtitle1'>Draft</Typography>
                    </Stack>
                </Box>
                <Box
                sx={{
                    '&:hover':{
                        backgroundColor: 'var(--light-blue-color)'
                    },
                    backgroundColor: currentStatus === 'completed' ?  'var(--light-blue-color)' : 'transparent'
                }}
                >
                    <Stack
                    direction='row' spacing={1} onClick={() => {getCampaigns('completed')}}>
                        <DoneOutlineOutlinedIcon sx={{pl: 1}}/>
                        <Typography variant='subtitle1'>Completed</Typography>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

const AddNew = ({ handleClose }) => {

    const [name, setName] = useState("");

    const {setCampaignsCurrentPage, setCampaigns, fetchFromAPI} = useContext(Context);

    function createNewCampaign(){
        if (name.length > 0){
            fetch(`${process.env.REACT_APP_API_URL}/api/campaigns/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
                },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        name,
                        status: 'draft'
                    }
                )
            })
                .then((response) => {
                    if (response.status === 201){
                        setCampaignsCurrentPage(1);
                        fetchFromAPI(`/api/campaigns/?page=1`, setCampaigns);
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
                <Typography variant='h6'>Let's start a new campaign</Typography>
                <Typography variant='subtitle1'>What name would you choose for it</Typography>
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
                    <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={createNewCampaign}>
                        <p>{`+`} Create</p>
                    </button>
                </Box>
            </Box>
        </Box>
    )
}

const TopBar = () => {

  const [currentStatus, setCurrentStatus] = useState(null);

  return (
    <Box
    sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: '1',
        mt: '6vh',
        mx: '4vw'
    }}
    >
        <Box>
            <Stack direction='row' spacing={2}>
                <Box
                sx={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-color)', borderRadius: '100px'}}
                >
                    <InputBase
                    sx={{flex: 1, ml: 1}}
                    placeholder="Search campaign..."
                    inputProps={{'type' : 'text'}}
                    />
                    <IconButton type='button' sx={{ p: '10px' }}>
                        <SearchIcon style={{color: 'var(--gray-color)'}}/>
                    </IconButton>
                </Box>
                <BasicDialog Activator={FilterActivator}>
                    <FilterCampaigns currentStatus={currentStatus} setCurrentStatus={setCurrentStatus}/>
                </BasicDialog>
            </Stack>
        </Box>
        <Box>
            <Box>
                <BasicDialog Activator={AddNewActivator}>
                    <AddNew/>
                </BasicDialog>
            </Box>
        </Box>
    </Box>
  )
}

export default TopBar