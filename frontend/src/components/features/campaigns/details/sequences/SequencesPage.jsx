import React, {useContext} from 'react'

import Box from '@mui/material/Box';

import { CampaignContext } from '../Layout'

import SequenceDetails  from './SequenceDetails';

import BasicDialog from '../../../../BasicDialog';

import TemplatePage from './Template';

const AddStepActivator = ({ handleClick }) => {
  return (
    <button style={{backgroundColor: '#77ed91'}} onClick={handleClick}>
        + Add Step
    </button>
  )
}

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
      <BasicDialog Activator={AddStepActivator}>
          <TemplatePage onSave={addSequence}/>
      </BasicDialog>
      }

      {sequences.map((sequence, i) => <SequenceDetails sequence={sequence} i={i} key={sequence}/>)}
    </Box>
  )
}

export default SequencesPage