import React, {useEffect, createContext, useContext, useState} from 'react'

import {Box, Grid} from '@mui/material';

import Senders from './Senders';

import {Context} from '../../../utils/context';

import Leads from './Leads';
import Messages from './Messages';


export const InboxContext = createContext();

const MainContext = ({ children }) => {

    const { fetchFromAPI } = useContext(Context);
    const [senders, setSenders] = useState([]);
    const [show, setShow] = useState(true);
    
    useEffect(() => {
        fetchFromAPI('/api/basic_sender/', setSenders)
    }, [])

    return (
        <InboxContext.Provider
        value={{
            senders,
            show
        }}
        >
            { children }
        </InboxContext.Provider>
    )
}

const InboxPage = () => {
  return (
    <MainContext>
        <Box
        sx={{
            my: '6vh',
            mx: '3vw'
        }}
        >
            <Grid container>
                <Grid item >
                    <Senders/>
                </Grid>
                <Grid item xs={3}>
                    <Leads/>
                </Grid>
                <Grid item xs={6}>
                    <Messages/>
                </Grid>
            </Grid>
        </Box>
    </MainContext>
  )
}

export default InboxPage