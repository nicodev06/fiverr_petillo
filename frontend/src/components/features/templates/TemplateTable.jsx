import React, {useContext} from 'react';

import { Context } from './TemplatePage';

import { Box, Grid, Typography, Stack, IconButton} from '@mui/material'; 

import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TemplateTable = () => {

    const { templates, fetchTemplates } = useContext(Context);

    function deleteTemplate(id){
        console.log(`${process.env.REACT_APP_API_URL}/api/update_template/${id}/`);
        fetch(`${process.env.REACT_APP_API_URL}/api/update_template/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
              },
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 204){
                    fetchTemplates();
                }
            })
    }

    return (
        <Box
        sx={{
            mt: '6vh',
        }}
        >
        <Box
        sx={{
            borderRadius: '100px',
            backgroundColor: 'var(--light-gray-color)'
        }}
        >
            <Grid container>
                <Grid item xs={3}>
                    <Typography variant='subtitle1' sx={{pl: '10px'}}>Object Line</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant='subtitle1'>Email Sent</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant='subtitle1'>Email Replied</Typography>
                </Grid>
                <Grid item xs={3}>   
                </Grid>
            </Grid>
        </Box>
        <Grid container spacing={1} sx={{mt: '0.5vh'}}>
            {templates.map((template) => 
                <>
                    <Grid item xs={3}>
                        <Typography variant='subtitle1' sx={{pl: '10px'}}>{template.subject}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='subtitle1'>{template.total_sent}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='subtitle1'>{template.total_replied}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack spacing={3} direction='row'>
                            <IconButton onClick={() => {deleteTemplate(template.id)}}>
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton>
                                <BorderColorIcon/>
                            </IconButton>
                            <IconButton>
                                <ContentCopyIcon/>
                            </IconButton>
                        </Stack>
                    </Grid>
                </>
            )}
        </Grid>
    </Box>
    )
}

export default TemplateTable