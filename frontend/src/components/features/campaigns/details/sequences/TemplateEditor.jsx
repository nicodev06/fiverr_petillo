import React, {useContext, useState, useEffect} from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, Modifier } from 'draft-js';
import { convertToHTML } from 'draft-convert';

import { Box, Typography, Stack } from '@mui/material';

import ObjectLine from './ObjectLine';

import MergeTags, {MergeTagsActivator} from './MergeTags';
import BasicDialog from '../../../../BasicDialog';
import BasicInput from '../../../../BasicInput';

import {TemplateContext} from './Template';




const SendTestMail = () => {

    const [emails, setEmails] = useState('');
    const {object, convertedContent} = useContext(TemplateContext);

    function test(){
        if (emails.length > 0){
            fetch(`${process.env.REACT_APP_API_URL}/api/test_template/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                    subject: object,
                    content: convertedContent,
                    emails
                  })
            })
        }
    }

    return (
        <Box
        sx={{mt: '3vh'}}
        >
            <Stack spacing={1}>
                <Typography variant='subtitle1'>Send Test Email</Typography>
                <Typography variant='subtitle2' sx={{color: 'var(--light-gray-color)'}}>This email address will receive a preview of your message, and you can attach multiple address by separating them with commas.</Typography>
            </Stack>
            <Stack direction='row' sx={{width: '200px', mt: 1}} spacing={1}>
                <BasicInput placeholder='Email' onChange={(e) => {setEmails(e.target.value)}}/>
                <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={test}>
                    <p>Send</p>
                </button>
            </Stack>
        </Box>
    )
}

const MergeTagsToolbar = ({editorState, onChange}) => {


    function addTag(tag){
        const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        tag,
        editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState));
    }

    return (
        <BasicDialog Activator={MergeTagsActivator}>
            <MergeTags setter={addTag}/>
        </BasicDialog>
    )
}

const TemplateEditor = () => {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const {setConvertedContent} = useContext(TemplateContext);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    return (
        <Box>
            <Box>
                <ObjectLine/>
            </Box>
            <Box
            sx={{mt: '3vh'}}
            >
                <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                editorStyle={{height: '300px'}}
                wrapperStyle={{display: 'flex', flexDirection: 'column-reverse'}}
                toolbar={{
                    options: ['inline', 'textAlign', 'list', 'link', 'embedded', 'emoji', 'image', 'history']
                }}
                toolbarCustomButtons={[<MergeTagsToolbar />]}
                />
            </Box>
            <SendTestMail/>
        </Box>
    )
}

export default TemplateEditor