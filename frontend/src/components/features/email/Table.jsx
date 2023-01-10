import React, { useState, useContext } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import { Context } from '../../../utils/context';

import SenderDetails from './SenderDetails';

const CustomPagination = () => {
  const { emailPages, emailCurrentPage, setEmailCurrentPage } = useContext(Context);
  function handleChange(event, value){
      setEmailCurrentPage(value);
  }
  return (
    <Stack spacing={2}>
      <Pagination count={emailPages.pages} page={emailCurrentPage} onChange={handleChange}/>
    </Stack>
  )
}


const Table = () => {

  const { senders: {results}, emailSendersCount: {senders}, emailCurrentPage } = useContext(Context);

  function displayedAccounts(){
    return (emailCurrentPage - 1) * 4 + results?.length
  }

  return (
    <Box
    sx={{
        mt: '6vh',
        mx: '4vw'
    }}
    >
        <Stack>
            {results?.map((sender) => <SenderDetails key={sender} sender={sender}/>)}
        </Stack>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '4vh'
        }}
        >
          <Box>
            <Typography sx={{color: 'var(--gray-color)', fontSize: '0.8rem'}}>{`Showing ${displayedAccounts() || 0} of ${senders} accounts`}</Typography>
          </Box>
          <Box>
            <CustomPagination/>
          </Box>
        </Box>
    </Box>
  )
}

export default Table