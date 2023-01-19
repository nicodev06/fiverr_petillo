import React, {useState, useEffect, useContext, createContext} from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import sections from './sections';

import { Context } from '../../../../utils/context';

export const CampaignContext = createContext();

const Layout = () => {
  
  const { id } = useParams();
  const { pathname } = useLocation();
  const { fetchFromAPI } = useContext(Context);
  const [selected, setSelected] = useState(pathname.split('/')[3]);
  const [campaign, setCampaign] = useState(null);
  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [next, setNext] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [sequences, setSequences] = useState([]);

  function addSequence(){
    fetch(`${process.env.REACT_APP_API_URL}/api/sequences/${campaign.id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
      }
    })
      .then((response) => {
        if (response.status === 201){
          response.json()
            .then((data) => {
              fetch(`${process.env.REACT_APP_API_URL}/api/variants/${data.id}/`, {
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
            })
        }
      })
  }


  function fetchSteps(campaign){
    fetch(`${process.env.REACT_APP_API_URL}/api/sequences/${campaign?.id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
        .then((response) => {
          response.json()
            .then((data) => {
              setSequences(data);
            })
    })
  }

  useEffect(() => {
    setSelected(pathname.split('/')[3]);
  }, [pathname])

  useEffect(() => {
    fetchFromAPI(`/api/campaign/${id}/`, setCampaign);
    fetchFromAPI(`/api/sequences/${id}/`, setSequences);
  }, [id])

  useEffect(() => {
    fetchSteps(campaign);
  }, [campaign])

  return (
    
    <CampaignContext.Provider value={{
        campaign,
        leads,
        setLeads,
        next,
        setNext,
        selectedLeads,
        setSelectedLeads,
        selectAll,
        setSelectAll,
        sequences,
        setSequences,
        fetchSteps,
        addSequence
    }}>
        <Box
    sx={{
        mx: '4vw',
        my: '6vh'
    }}
    >
        <Grid container spacing={2}>
            {sections.map((section) => 
                <Grid item xs={2.4} key={section}>
                    <Link to={`/campaigns/${id}/${section}`}>
                        <Box
                        sx={{
                            backgroundColor: 'var(--sky-blue-color)',
                            color: section === selected ? '#FFF' : '#000',
                            border: `1px solid ${section === selected ? '7ABFFF' : 'transparent'}`,
                            borderRadius: '100px',
                            textAlign: 'center',
                            py: '0.5em'
                        }}
                        >
                            <Typography sx={{textTransform: 'capitalize', fontWeight: 500,}}>{section}</Typography>
                        </Box>
                    </Link>
                </Grid>
            )}
        </Grid>
        <Box>
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mr: '5vw',
                my: '2vh'
            }}
            >
                <Typography variant='subtitle1' sx={{px: 1}}>{campaign?.name}</Typography>
                <button className={campaign?.status}>
                <p style={{textTransform: 'capitalize'}}>{campaign?.status}</p>
                </button>
            </Box>
            <Outlet context={[campaign]}/>
        </Box>
    </Box>
    </CampaignContext.Provider>
  )
}

export default Layout