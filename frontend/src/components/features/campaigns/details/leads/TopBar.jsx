import React, {useState, useCallback} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import DoDisturbRoundedIcon from '@mui/icons-material/DoDisturbRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import BasicDialog from '../../../../BasicDialog';

import {useDropzone} from 'react-dropzone'


const AddLeadsActivator = ({ handleClick }) => {
    return (
        <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={ handleClick }>
                <p>+ Add leads</p>
        </button>
    )
}

const ImportCsvActivator = ({ handleClick }) => {
    return (
        <Box onClick={handleClick}>
            <Stack spacing={0.5} direction='row' sx={{borderBottom: '1px solid var(--gray-color)', '&:hover': {backgroundColor:'var(--gray-color)'}, p:2}}>
                <SaveAltRoundedIcon/>
                <Typography variant='subtitle1'>Import csv</Typography>
            </Stack>
        </Box>
    )
}

const DragAndDropFile = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
    <Box {...getRootProps()}>
        <input {...getInputProps()} />
        {
        isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
    </Box>
    )
}

const AddCsvWorkFlow = () => {
    
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Box>
            {currentStep === 1 && <DragAndDropFile/>}
        </Box>
    )
}

const AddLeadsChoice = () => {
    return (
        <Box>
            <Stack>
                <BasicDialog Activator={ImportCsvActivator}>
                    <AddCsvWorkFlow/>
                </BasicDialog>
                    <Stack spacing={0.5} direction='row' sx={{'&:hover': {backgroundColor:'var(--gray-color)'}, p:2}}>
                        <PeopleAltOutlinedIcon/>
                        <Typography variant='subtitle1'>Add manually</Typography>
                    </Stack>
            </Stack>
        </Box>
    )
}

const TopBar = () => {
  return (
    <Box
    sx={{
        display: 'flex',
        justifyContent: 'space-between',
        my: '3vh'
    }}
    >
        <Stack direction='row' spacing={1.5} sx={{alignItems: 'center'}}>
            <Box
                sx={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-color)', borderRadius: '100px'}}
                >
                    <InputBase
                    sx={{flex: 1, ml: 1}}
                    placeholder="Search campaign..."
                    inputProps={{'type' : 'text'}}
                    />
                    <IconButton type='button' sx={{ p: '10px' }}>
                        <SearchIcon style={{color: 'var(--gray-color)'}}/>
                    </IconButton>
            </Box>
            <Box>
                <button style={{backgroundColor: 'transparent'}}>
                    <p>Filter</p>
                </button>
            </Box>
            <Stack direction='row' spacing={1}>
                <DoDisturbRoundedIcon/>
                <DeleteOutlineRoundedIcon/>
                <SaveAltRoundedIcon/>
            </Stack>
        </Stack>
        <Box>
            <BasicDialog Activator={AddLeadsActivator}>
                <AddLeadsChoice/>
            </BasicDialog>
        </Box>
    </Box>
  )
}

export default TopBar