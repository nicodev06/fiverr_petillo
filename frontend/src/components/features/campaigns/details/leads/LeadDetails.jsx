import React, {useContext, useState} from 'react'

import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'; 
import Typography from '@mui/material/Typography';
import Checkbox  from '@mui/material/Checkbox';

import { CampaignContext } from '../Layout';

const LeadDetails = ({ lead }) => {

  const {selectAll, selectedLeads, setSelectedLeads} = useContext(CampaignContext);
  const [selected, setSelected] = useState(false);


  function updateSelected(e){
        if (e.target.checked){
            setSelectedLeads([...selectedLeads, lead]);
        } else {
            setSelectedLeads(selectedLeads.filter((item) => item.id !== lead.id))
        }
        setSelected(e.target.checked);
        console.log(selectedLeads);
  }
    
  return (
    <Box
    sx={{
        borderBottom: '1px solid var(--light-gray-color)'
    }}
    >
        <Grid container spacing={6} sx={{py: 1}}>
            <Grid item xs={3}>
                <Box
                >
                    <Stack spacing={0.5} direction='row'>
                        <Checkbox checked={selected || selectAll} onChange={(e) => {updateSelected(e)}}/>
                        <Stack spacing={0.5}>
                            <Typography variant='subtitle1' sx={{fontWeight: 600}}>{`${lead.first_name} ${lead.last_name}`}</Typography>
                            <Typography variant='subtitle2' sx={{fontWeight: 400, color: 'var(--light-gray-color)'}}>{lead.email}</Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={2.5} sx={{flexWrap: 'wrap'}}>
                <Stack spacing={0.5} sx={{alignItems: 'center'}}>
                    {(lead.email_opened && lead.replied) && <button style={{backgroundColor: '#77ED91'}}>Completed</button> }
                    <button
                    style={{
                        backgroundColor: lead.email_opened ? '#D461F1' : '#ACAEAD',
                        margin: '5px'
                    }}
                    >{lead.email_opened ? 'Email Opened' : 'Email not opened'}</button>
                    {lead.bounced && <button style={{backgroundColor: '#FD6565'}}>Bounced</button>}
                    {(lead.contacted && !lead.email_opened) && <button style={{backgroundColor: '#ACD6FD'}}>Contacted</button>}
                </Stack>
            </Grid>
            <Grid item xs={3.7}></Grid>
            <Grid item xs={2.3}>
                <button
                    style={{
                        backgroundColor: lead.replied ? '#77ED91' : '#ACAEAD',
                        margin: '5px'
                    }}
                >{lead.email_opened ? 'Lead Replied' : 'Lead no Replied'}</button> 
            </Grid>
        </Grid>
    </Box>
  )
}

export default LeadDetails