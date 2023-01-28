import React, {useContext, useState, useEffect} from 'react'

import {Box, Stack, Typography, Grid, CircularProgress} from '@mui/material';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, Modifier } from 'draft-js';
import { convertToHTML } from 'draft-convert';

import {InboxContext} from './InboxPage';


const SendButton = () => {

    const {messages, editorContent, currentLead, setMessages} = useContext(InboxContext);

    function sendMail(){
        const mail = {};
        mail.subject = messages[0].subject
        mail.content = editorContent
        mail.status = 'sended';
        if (currentLead){
            fetch(`${process.env.REACT_APP_API_URL}/api/send_mail_to_reply/${currentLead.id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
                },
                credentials: 'include',
                body: JSON.stringify(mail)
            })
                .then((response) => {
                    if (response.status === 200){
                        setMessages([...messages, mail])
                    }
            })
        }
    }

    return (
    <Box
    onClick={sendMail}
    >
        <button style={{backgroundColor:'var(--light-blue-color)'}}>
            Send
        </button>
    </Box>
    )
}


const MessageEditor = () => {

    const {editorContent, setEditorContent} = useContext(InboxContext);

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    useEffect(() => {
        setEditorContent(editorState.getCurrentContent().getPlainText())
    }, [editorState])
    return (
        <Box
        sx={{mt: '3vh'}}
        >
            <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            editorStyle={{backgroundColor: '#F3F3F3', borderRadius: '10px 10px 0px 0px'}}
            wrapperStyle={{display: 'flex', flexDirection: 'column-reverse'}}
            toolbar={{
                options: ['inline', 'emoji', 'history']
            }}
            toolbarCustomButtons={[<SendButton />]}
            />
        </Box>
    )
}

const Messages = () => {


  const { messages, currentLead } = useContext(InboxContext);  

  return (
    <Box
    sx={{
        boxShadow: '0px 0px 1px var(--light-gray-color)',
        borderRadius: '0px 10px 10px 0px'
    }}
    >
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            alignItems: 'center',
            boxShadow: '0px 0px 1px var(--light-gray-color)'
        }}
        >
            <Stack direction='row' spacing={1} sx={{alignItems: 'center'}}>
                <Box className='app__navbar-account'
                sx={{
                    width: '40px',
                    height: '40px'
                }}
                ></Box>
                <Typography variant='subtitle1' sx={{fontWeight: 500}}>{currentLead?.email}</Typography>
            </Stack>
            <SearchRoundedIcon/>
        </Box>
        <Stack
        sx={{
            mt: '3vh',
            height: '50vh',
            overflowY: 'scroll'
        }}
        spacing={2}
        >
            {messages.map((message) => 
            <Grid container key={message}>
                {message.status === 'sended' && (
                    <Grid item xs={3.5}></Grid>
                )}
                <Grid item xs={8}>
                    <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: message.status === 'sended' ? 'flex-end' : 'flex-start',
                        my: 1,
                        mx: 1
                    }}
                    >
                        <Box
                        sx={{
                            backgroundColor: message.status === 'sended' ? '#717579' : '#F3F3F3',
                            color: '#000',
                            borderRadius: message.status === 'sended'? '10px 10px 0px 10px' : '10px 10px 10px 0px'
                        }}
                        >
                            <Typography variant='subtitle2' sx={{p:1}}>{message.content}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            )}
        </Stack>
        <Box>
            <MessageEditor/>
        </Box>
    </Box>
  )
}

export default Messages