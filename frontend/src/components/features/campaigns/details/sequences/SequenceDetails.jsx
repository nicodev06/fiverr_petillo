import React, {useContext} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import VariantDetails from './VariantDetails';

import { CampaignContext } from '../Layout'

const SequenceDetails = ({ sequence, i }) => {

  const {campaign, sequences, setSequences, fetchSteps, addSequence } = useContext(CampaignContext);

  function addVariant(){
    fetch(`${process.env.REACT_APP_API_URL}/api/variants/${sequence.id}/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
      }
    })
      .then((response) => {
        if (response.status === 201){
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
          <Box>
            <button style={{backgroundColor: '#77ed91'}} onClick={addVariant}>+ Add variant</button>
          </Box>
          <Box>
          <Stack spacing={2} direction='row'>
            <button style={{backgroundColor: sequences.length - 1 === i ? '#77ed91': 'var(--light-gray-color)'}} disabled={sequences.length - 1 !== i} onClick={addSequence}>+ Add Step</button>
            <Stack spacing={0.5} direction='row' sx={{alignItems: 'center'}}>
              <Typography variant='subtitle2'>Wait</Typography>
              <TextField sx={{width: '40px'}}  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              <Typography variant='subtitle2'>Days, then</Typography>
            </Stack> 
          </Stack>
          </Box>
       </Box>
    </Box>
  )
}

export default SequenceDetails;