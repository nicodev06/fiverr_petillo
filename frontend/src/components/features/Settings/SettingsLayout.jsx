import React, { useState, useEffect } from 'react'

import {Box, Stack, Grid, Typography} from '@mui/material'

import { Link, Outlet, useLocation } from 'react-router-dom';

import sections from './sections'

const SettingsLayout = () => {

  const { pathname } = useLocation();
  const [selected, setSelected] = useState(pathname.split('/')[2]);

  useEffect(() => {
    setSelected(pathname.split('/')[2]);
  }, [pathname]);    

  return (
    <Box
    sx={{
        mt: '6vh',
        mx: '4vw'
    }}
    >
        <Grid container spacing={2}>
            {sections?.map((section) => 
            <Grid item xs={2.4} key={section}>
                <Link to={`/settings/${section.path}/`}>
                    <Box
                    sx={{
                        backgroundColor: 'var(--sky-blue-color)',
                        color: selected === section.path ? '#fff' : '#000',
                        border: '1px solid ' + (selected === section.path ? '#fff' : 'transparent'),
                        borderRadius: '100px',
                        textAlign: 'center',
                        py: '0.5em'
                    }}
                    >
                        <Typography sx={{fontWeight: 500}}>{section.display}</Typography>
                    </Box>
                </Link>
            </Grid>
            )}
        </Grid>
        <Box>
            <Outlet/>
        </Box>
    </Box>
  )
}

export default SettingsLayout