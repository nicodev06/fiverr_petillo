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

  useEffect(() => {
    setSelected(pathname.split('/')[3]);
  }, [pathname])

  useEffect(() => {
    fetchFromAPI(`/api/campaign/${id}/`, setCampaign);
  }, [id])

  return (
    
    <CampaignContext.Provider value={{
        campaign
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
            <Outlet context={[campaign]}/>
        </Box>
    </Box>
    </CampaignContext.Provider>
  )
}

export default Layout