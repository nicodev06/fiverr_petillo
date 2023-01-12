import React, { useContext } from 'react'

import { Context } from '../../../utils/context';

import CampaignDetails from './CampaignDetails';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';


const CustomPagination = ({ count }) => {
  const { campaignsCurrentPage, setCampaignsCurrentPage } = useContext(Context);
  function handleChange(event, value){
      setCampaignsCurrentPage(value);
  }
  const pageNum = Math.ceil(count / 4);
  return (
    <Stack spacing={2}>
      <Pagination count={pageNum} page={campaignsCurrentPage} onChange={handleChange}/>
    </Stack>
  )
}

const CampaignTable = () => {
  const {campaigns: {results, count}} = useContext(Context);
  return (
    <Box
    sx={{
      mt: '6vh',
      mx: '4vw'
    }}
    >
    {results?.map((campaign) => <CampaignDetails campaign={campaign} key={campaign}/>)}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4vh'
      }}
      >
        <Box>
          <Typography sx={{color: 'var(--gray-color)', fontSize: '0.8rem'}}>{`Showing ${results?.length || 0} of ${count} accounts`}</Typography>
        </Box>
        <Box>
          <CustomPagination count={count}/>
        </Box>
      </Box>
    </Box>
  )
}

export default CampaignTable