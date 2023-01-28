import React, {useEffect, createContext, useContext, useState} from 'react'

import {Box, Grid} from '@mui/material';

import Senders from './Senders';

import { useParams } from 'react-router-dom';

import {Context} from '../../../utils/context';

import Leads from './Leads';
import Messages from './Messages';


export const InboxContext = createContext();

const MainContext = ({ children }) => {

    const { fetchFromAPI } = useContext(Context);
    const [senders, setSenders] = useState([]);
    const [show, setShow] = useState(true);
    const [leads, setLeads] = useState([]);
    const [currentLead, setCurrentLead] = useState(null);
    const [messages, setMessages] = useState([]);
    const [editorContent, setEditorContent] = useState(null);

    const { email } = useParams();

    useEffect(() => {
        if (email === 'all'){
            fetchFromAPI('/api/leads_who_replied/', setLeads)
        } else {
            fetchFromAPI(`/api/leads_who_replied/?q=${email}`, setLeads)
        }
    }, [email])

    useEffect(() => {
        if (currentLead) {
            fetchFromAPI(`/api/retrieve_replies/${currentLead.id}/`, setMessages);
        }
    }, [currentLead])
    
    useEffect(() => {
        fetchFromAPI('/api/basic_sender/', setSenders)
    }, [])

    return (
        <InboxContext.Provider
        value={{
            senders,
            show,
            leads,
            setLeads,
            currentLead,
            setCurrentLead,
            messages,
            setMessages,
            editorContent,
            setEditorContent
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
            mx: '3vw',
            width: '75vw'
        }}
        >
            <Grid container>
                <Grid item >
                    <Senders/>
                </Grid>
                <Grid item xs={2.5}>
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