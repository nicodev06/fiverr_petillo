import React, {useState, useCallback, useContext} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import DoDisturbRoundedIcon from '@mui/icons-material/DoDisturbRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

import BasicDialog from '../../../../BasicDialog';

import {useDropzone} from 'react-dropzone'

import { Context } from '../../../../../utils/context';


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

const DragAndDropFile = ({setDefaultFields, setCustomFields, setSamples, setCurrentStep}) => {
    const {setShowSnackBar, setSeverity} = useContext(Context);
    const onDrop = useCallback(acceptedFiles => {
        let formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        upload(formData);
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    function upload(formData){
        setShowSnackBar(true);
        setSeverity('info');
        fetch(`${process.env.REACT_APP_API_URL}/api/leads/columns/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f',
                'Content-disposition': 'attachment; filename=upload.csv'
            },
            body: formData
        }).then((response) => {
            if (response.status === 200){
                response.json()
                    .then((data) => {
                        setShowSnackBar(false);
                        setCurrentStep(2);
                        setDefaultFields(data.default_fields);
                        setCustomFields(data.custom_fields);
                        setSamples(data.samples);
                    })
            }
        })
    }

    return (
    <Box
    sx={{
        width: '30vw'
    }}
    >
        <Box sx={{p:1}}>
            <Typography>Import Leads</Typography>
        </Box>
        <hr/>
        <Box 
        sx={{
            textAlign: 'center',
            backgroundColor: 'var(--light-gray-color)',
            border: '1px solid #000',
            borderRadius: '10px',
            p: 1,
            m: 1
        }}
        {...getRootProps()}>
            <input {...getInputProps()} />
            {
            <Box>
                <SaveAltRoundedIcon sx={{width: '100px', height: '100px', mb: 1, color: 'var(--gray-color)'}}/>
                <Typography sx={{mb: 1, fontWeight: 400}}>Drag & Drop your CSV leads list <br/> or</Typography>
                <button style={{backgroundColor: '#fff'}}>
                    Choose file
                </button>
            </Box>
            }
        </Box>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1,
            m: 1
        }}
        >
            <Stack direction='row' spacing={1}>
                <button style={{backgroundColor: '#FD6565'}}>
                    <p>Cancel</p>
                </button>
                <button style={{backgroundColor: '#7ABFFF'}}>
                    <p>+ Next </p>
                </button>
            </Stack>
        </Box>
    </Box>
    )
}

const FieldsReview = ({defaultFields, customFields, samples}) => {
    return (
        <Box
        sx={{p:1, width: '30vw'}}
        >
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1
            }}
            >
                <Typography variant='subtitle1'>Map Fields</Typography>
                <Stack direction='row' spacing={0.5} sx={{color: '#77ED91'}}>
                    <ThumbUpOffAltOutlinedIcon/>
                    <Typography variant='subtitle1'>File uploaded</Typography>
                </Stack>
            </Box>
            <hr/>
            <Box
            sx={{
                border: '1px solid #000',
                borderRadius: '10px',
                backgroundColor: 'var(--light-gray-color)'
            }}
            >
                <Stack>
                    {defaultFields.map((field) => <Typography>{field}</Typography>)}
                    {customFields.map((field) => <Typography>{field}</Typography>)}
                    {samples.map((field) => <Typography>{field}</Typography>)}
                </Stack>
            </Box>
        </Box>
    )
}

const AddCsvWorkFlow = () => {
    
    const [currentStep, setCurrentStep] = useState(1);
    const [defaultFields, setDefaultFields] = useState([]);
    const [customFields, setCustomFields] = useState([]);
    const [samples, setSamples] = useState([]);

    return (
        <Box>
            {currentStep === 1 && <DragAndDropFile setDefaultFields={setDefaultFields} setCustomFields={setCustomFields} setSamples={setSamples} setCurrentStep={setCurrentStep}/>}
            {currentStep === 2 && <FieldsReview defaultFields={defaultFields} customFields={customFields} samples={samples}/>}
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
  const {showSnackBar, severity, setShowSnackBar} = useContext(Context);  
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
        <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={() => {setShowSnackBar(false)}}
        >
            <Alert severity={severity} sx={{width: '100%'}}>
                Uploading file...
            </Alert>
        </Snackbar>
    </Box>
  )
}

export default TopBar