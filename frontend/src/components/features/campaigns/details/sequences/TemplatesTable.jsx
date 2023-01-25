import React, {useContext} from 'react';

import { TemplateContext } from './Template';

import { Box, Grid, Typography, Stack, IconButton} from '@mui/material'; 

const TemplateTable = ({ onSave, handleClose }) => {

    const { templates } = useContext(TemplateContext);

    async function saveTemplate(id){
        onSave(id);
        handleClose();
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
                        <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={() => {saveTemplate(template.id)}}>
                            Select
                        </button>
                    </Grid>
                </>
            )}
        </Grid>
    </Box>
    )
}

export default TemplateTable