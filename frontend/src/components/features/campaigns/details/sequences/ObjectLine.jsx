import React, { useContext } from 'react';

import { Grid, InputBase } from '@mui/material';

import { TemplateContext } from './Template';

import MergeTags, {MergeTagsActivator} from './MergeTags';

import BasicDialog from '../../../../BasicDialog';

const ObjectLine = () => {

    const {object, setObject} = useContext(TemplateContext); 

    return (
        <Grid container spacing={1} sx={{borderBottom: '1px solid var(--light-gray-color)', alignItems: 'center', mt: '3vh'}}>
            <Grid item xs={10}>
                <InputBase placeholder='Object Line' onChange={(e) => {setObject(e.target.value)}} value={object}/>
            </Grid>
            <Grid item xs={2} sx={{py: 2}}>
                <BasicDialog Activator={MergeTagsActivator}>
                    <MergeTags setter={setObject}/>
                </BasicDialog>
            </Grid>
        </Grid>
    )
}

export default ObjectLine