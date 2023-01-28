import React from 'react'

import {Box, Typography, Stack, IconButton, InputBase} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';


import Graph from './Graph';
import Performances from './Performances';
import CampaignsTable from './CampaignsTable';

const TopBar = () => {
    return (
        <Stack direction='row' spacing={1} sx={{width: '40vw'}}>
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
            <button style={{backgroundColor: 'var(--light-blue-color)'}}>
                <p>Filter</p>
            </button>
            <button style={{backgroundColor: 'var(--light-blue-color)'}}>
                <p>Date</p>
            </button>
        </Stack>
    )
}

const AnalyticsPage = () => {
  return (
    <Box
    sx={{
        mt: '6vh',
        mx: '4vw'
    }}
    >
        <TopBar/>
        <Box
        sx={{
            width: '70vw',
            height: '45vh',
            ml: '2vw'
        }}
        >
            <Graph/>
            <Performances/>
            <CampaignsTable/>
        </Box>
    </Box>
  )
}

export default AnalyticsPage