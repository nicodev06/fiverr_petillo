import React, {useContext} from 'react'

import {Box, Stack, Typography, Grid, CircularProgress} from '@mui/material';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, Modifier } from 'draft-js';
import { convertToHTML } from 'draft-convert';

import {InboxContext} from './InboxPage';


const SendButton = () => {
    return (
    <Box>
        <button style={{backgroundColor:'var(--light-blue-color)'}}>
            Send
        </button>
    </Box>
    )
}


const MessageEditor = () => {
    return (
        <Box
        sx={{mt: '3vh'}}
        >
            <Editor
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

  const { show } = useContext(InboxContext);

  if (show){
    return (
        <Box
        sx={{
            boxShadow: '0px 0px 1px var(--light-gray-color)',
            borderRadius: '0px 10px 10px 0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '73vh'
        }}
        >
            <CircularProgress/>
        </Box>
    )
  }

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
                <Typography variant='subtitle1' sx={{fontWeight: 500}}>Kierracurtis@email.co</Typography>
            </Stack>
            <SearchRoundedIcon/>
        </Box>
        <Stack
        sx={{
            mt: '3vh',
            height: '50vh'
        }}
        spacing={3}
        >
            <Grid container>
                <Grid item xs={8}>
                    <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        my: 1,
                        mx: 1
                    }}
                    >
                        <Box
                        sx={{
                            backgroundColor: '#F3F3F3',
                            color: '#000',
                            borderRadius: '10px 10px 10px 0px'
                        }}
                        >
                            <Typography variant='subtitle2' sx={{p:1}}>Daje Roma sempre!</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={3.5}></Grid>
                <Grid item xs={8}>
                    <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        my: 1,
                        mx: 1
                    }}
                    >
                        <Box
                        sx={{
                            backgroundColor: '#717579',
                            color: '#fff',
                            borderRadius: '10px 10px 0px 10px'
                        }}
                        >
                            <Typography variant='subtitle2' sx={{p:1}}>Daje Roma sempre!</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
        <Box>
            <MessageEditor/>
        </Box>
    </Box>
  )
}

export default Messages