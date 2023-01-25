import React, {useContext, useState} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import VariantDetails from './VariantDetails';

import { CampaignContext } from '../Layout'

import BasicDialog from '../../../../BasicDialog';

import Template from './Template';

const AddVariantActivator = ({ handleClick }) => {
  return (
    <Box>
      <button style={{backgroundColor: '#77ed91'}} onClick={handleClick}>+ Add variant</button>
    </Box>
  )
}

const AddSequenceActivator = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className='add-variant'>+ Add Step</button>
  )
}

const SequenceDetails = ({ sequence, i }) => {

  const {campaign, sequences, fetchSteps, addSequence } = useContext(CampaignContext);
  const [waitingTime, setWaitingTime] = useState(sequence.waiting_time);

  function addVariant(template){
    fetch(`${process.env.REACT_APP_API_URL}/api/variants/${sequence.id}/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
      },
      credentials: 'include',
      body: JSON.stringify({
        template
      })
    })
      .then((response) => {
        if (response.status === 201){
          fetchSteps(campaign);
        }
      })
  }

  function updateWaitingTime(e){
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_URL}/api/update_waiting_time/${sequence.id}/?q=${waitingTime}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
      },
    })
      .then((response) => {
        if (response.status === 200){
          fetchSteps(campaign);
        }
      })
  }

  return (
    <Box
    sx={{
        my: '5vh',
        mx: '1vw',
        borderRadius: '10px',
        backgroundColor: '#F6FBFF',
        boxShadow: '2px 2px var(--light-gray-color)'
    }}>
        {sequence?.variants?.map((variant) => <VariantDetails key={variant} variant={variant} sequence={sequence}/>)}
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: '1vh',
          my: '2vh'
        }}
        >
              <BasicDialog Activator={AddVariantActivator}>
                  <Template onSave={addVariant}/>
              </BasicDialog>
          <Box>
          <Stack spacing={2} direction='row'>
            <Box className={sequences.length - 1 === i ? 'last-one': 'not-last'}>
              <BasicDialog Activator={AddSequenceActivator}>
                <Template onSave={addSequence}/>
              </BasicDialog>
            </Box>
            <Stack spacing={0.5} direction='row' sx={{alignItems: 'center'}}>
              <Typography variant='subtitle2'>Wait</Typography>
              <form onSubmit={(e) => {updateWaitingTime(e)}}>
                <input type='number' value={waitingTime} style={{width: '40px', height: '30px', borderRadius: '10px', border: 'none'}} onChange={(e) => {
                  setWaitingTime(e.target.value)
                }
                }
                  />
              </form>
              <Typography variant='subtitle2'>Days, then</Typography>
            </Stack> 
          </Stack>
          </Box>
       </Box>
    </Box>
  )
}

export default SequenceDetails;