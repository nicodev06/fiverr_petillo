import React from 'react'
import { useOutletContext } from "react-router-dom"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TopBar from './TopBar';
import Table from './Table'; 


const LeadsPage = () => {

  const [campaign] = useOutletContext();

  return (
    <Box>
      <TopBar/>
      <Table/>
    </Box>
  )
}

export default LeadsPage