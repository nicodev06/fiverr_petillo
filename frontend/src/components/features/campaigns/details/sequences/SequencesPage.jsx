import React, {useContext} from 'react'

import Box from '@mui/material/Box';

import { CampaignContext } from '../Layout'

import SequenceDetails  from './SequenceDetails';

const SequencesPage = () => {
  
  const {sequences, setSequence, addSequence} = useContext(CampaignContext);

  return (
    <Box
    sx={{
        mt: '3vh',
        height: '60vh',
        overflowY: sequences.length >= 3 ? 'scroll' : 'visible'
    }}
    >
       
      {sequences.length === 0 && 
      <button style={{backgroundColor: '#77ed91'}} onClick={addSequence}>
        + Add Step
      </button>}
      {sequences.map((sequence, i) => <SequenceDetails sequence={sequence} i={i} key={sequence}/>)}
    </Box>
  )
}

export default SequencesPage