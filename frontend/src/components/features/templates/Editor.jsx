import React, {useContext} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, Modifier } from 'draft-js';

import { Box } from '@mui/material';

import ObjectLine from './ObjectLine';

import MergeTags, {MergeTagsActivator} from './MergeTags';
import BasicDialog from '../../BasicDialog';



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
    return (
        <Box>
            <Box>
                <ObjectLine/>
            </Box>
            <Box
            sx={{mt: '3vh'}}
            >
                <Editor
                editorStyle={{height: '300px'}}
                wrapperStyle={{display: 'flex', flexDirection: 'column-reverse'}}
                toolbar={{
                    options: ['inline', 'textAlign', 'list', 'link', 'embedded', 'emoji', 'image', 'history']
                }}
                toolbarCustomButtons={[<MergeTagsToolbar />]}
                />
            </Box>
        </Box>
    )
}

export default TemplateEditor