import React from 'react'
import { useOutletContext } from "react-router-dom"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const LeadsPage = () => {

  const [campaign] = useOutletContext();

  return (
    <Box
    sx={{
      mx: '4vw',
      my: '3vh'
    }}
    >
      <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
      >
        <Typography variant='h6' sx={{px: 1}}>{campaign.name}</Typography>
        <button className={campaign.status}>
          <p style={{textTransform: 'capitalize'}}>{campaign.status}</p>
        </button>
      </Box>
    </Box>
  )
}

export default LeadsPage