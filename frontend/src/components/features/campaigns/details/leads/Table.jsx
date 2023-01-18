import React, {useContext, useState} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import  Checkbox  from '@mui/material/Checkbox';

import {CampaignContext} from '../Layout';

import LeadDetails from './LeadDetails';


const Table = () => {

  const {leads, setLeads, next, setNext, selectedLeads, setSelectedLeads, setSelectAll} = useContext(CampaignContext);

  function loadMore(){
    fetch(next, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            response.json()
                .then((data) => {
                    setLeads([...leads, ...data.results]);
                    setNext(data.next);
                })
        })
  }

  function handleSelectAll(e){
        if (e.target.checked === false){
            setSelectedLeads([]);
        } else {
            setSelectedLeads(leads);
        }
        setSelectAll(e.target.checked);
  }


  return (
    <Box
    sx={{
        my: '1.5vh',
    }}
    >
        <Box
        sx={{
            borderBottom: '1px solid var(--light-gray-color)'
        }}
        >
            <Stack spacing={0.5} direction='row' sx={{alignItems: 'center'}}>
                <Checkbox onChange={(e) => {handleSelectAll(e)}}/>
                <Typography variant='subtitle1' sx={{fontWeight: 600}}>
                    Leads
                </Typography>
            </Stack>
        </Box>
        <Box>
            <Stack
            sx={{
                overflowY: 'scroll',
                height: '35vh',
            }}
            >
                {leads.map((lead) => <LeadDetails lead={lead}/>)}
            </Stack>
        </Box>
        <Box sx={{
            marginTop: '2vh'
        }}>
            <button className='btn-dark' onClick={loadMore}>
                Load More
            </button>
        </Box>
    </Box>
  )
}

export default Table