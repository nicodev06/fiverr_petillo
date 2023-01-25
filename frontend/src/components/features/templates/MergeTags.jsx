import React, { useContext, useState } from 'react';

import { Stack, Box, IconButton} from '@mui/material';

import { Context } from './TemplatePage';

import BasicInput from '../../BasicInput';


export const MergeTagsActivator = ({ handleClick }) => {
    return (
        <button style={{backgroundColor: 'var(--light-gray-color)'}} onClick={handleClick}>
            Merge Tags
        </button>
    )
}


const MergeTags = ({setter}) => {
    const {tags, setTags, setObject} = useContext(Context);
    const [newTag, setNewTag] = useState('');

    function updateTags(){
        const updatedTag = `{{` + newTag + `}}`;
        setTags([...tags, updatedTag]);
    }


    
    return (
        <Stack spacing={1}>
            {tags.map((tag) => 
                    <Box  
                    onClick={() => {
                        if (setter === setObject){
                            setter((prev) => prev + tag)
                        } else {
                            setter(tag)
                        }
                    }}
                    key={tag}
                    sx={{textAlign: 'center', p: '10px'}}
                    >{tag}</Box>
            )}
        <Box
        sx={{m:1}}
        >
            <BasicInput onChange={(e) => {setNewTag(e.target.value)}} placeholder='{{City}}'/>
        </Box>
        <button
        style={{
            backgroundColor: 'var(--light-blue-color)',
            margin: '10px'
        }}
        onClick={updateTags}
        >
            <p>+ Add Custom</p>
        </button>
        </Stack>
    )
}

export default MergeTags