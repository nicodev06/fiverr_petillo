import React from 'react'

import {Box} from '@mui/material';

import Graph from './Graph';
import Performances from './Performances';
import SequencesTable from './SequencesTable';



const AnalyticsPage = () => {
  return (
    <Box
    sx={{
        mt: '6vh',
        mx: '4vw'
    }}
    >
        <Box
        sx={{
            width: '60vw',
            height: '45vh',
            ml: '2vw'
        }}
        >
            <Graph/>
            <Performances/>
            <SequencesTable/>
        </Box>
    </Box>
  )
}

export default AnalyticsPage