import React, {useState, useCallback, useContext} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

import DoDisturbRoundedIcon from '@mui/icons-material/DoDisturbRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOutlined from '@mui/icons-material/ThumbDownOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';


import BasicDialog from '../../../../BasicDialog';
import BasicInput from '../../../../BasicInput';

import {useDropzone} from 'react-dropzone'

import { Context } from '../../../../../utils/context';
import { CampaignContext } from '../Layout';


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

const DragAndDropFile = ({handleClose, setDefaultFields, setCustomFields, setSamples, setCurrentStep, setFormData}) => {
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
                setFormData(formData)
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
                <button style={{backgroundColor: '#FD6565'}} onClick={handleClose}>
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

const FieldDetails = ({field, i, defaultFields, customFields, samples}) => {

    const [selected, setSelected] = useState(true);

    function updateSelection(){
        if (selected){
            setSelected(false);
            defaultFields.splice(defaultFields.indexOf(field), 1)
        } else {
            setSelected(true);
            defaultFields.push(field);
        }   
        console.log(defaultFields);
    }

    return (
        <Grid key={field} container spacing={3} sx={{mt:1, p: 0.5}}>
            <Grid item xs={1}>
                <IconButton onClick={updateSelection}>
                    {selected ? <ThumbUpOffAltOutlinedIcon sx={{color: '#77ED91'}}/> : <ThumbDownOutlined sx={{color: '#FD6565'}}/>}
                </IconButton>
            </Grid>
            <Grid item xs={3.5}>
                <Typography>{field}</Typography>
            </Grid>
            <Grid item xs={4}>
                <button style={{color: '#000', backgroundColor: 'var(--light-gray-color)'}}>
                    <span style={{fontWeight: 700}}>Merge Tags</span>
                </button>
            </Grid>
            <Grid item xs={3.5}>
                <Typography>{samples[i]}</Typography>
            </Grid>
        </Grid>
    )
}

const CustomFieldDetails = ({field, i, defaultFields, customFields, samples}) => {
    
    const [selected, setSelected] = useState(true);
    
    function updateSelection(){
        if (selected){
            setSelected(false);
            customFields.splice(customFields.indexOf(field), 1)
        } else {
            setSelected(true);
            customFields.push(field);
        }
        console.log(customFields);
    }

    return (
        <Grid key={field} container spacing={3} sx={{mt:1, p: 0.5}}>
            <Grid item xs={1}>
            <IconButton onClick={updateSelection}>
                {selected ? <ThumbUpOffAltOutlinedIcon sx={{color: '#77ED91'}}/> : <ThumbDownOutlined sx={{color: '#FD6565'}}/>}
            </IconButton>
            </Grid>
            <Grid item xs={3.5}>
                <Typography>{field}</Typography>
            </Grid>
            <Grid item xs={4}>
                <BasicInput placeholder='Field Name' padding='0px'/>
            </Grid>
            <Grid item xs={3.5}>
                <Typography>{samples[i + defaultFields.length]}</Typography>
            </Grid>
        </Grid>
    )
}

const FieldsReview = ({handleClose, defaultFields, customFields, samples, setCurrentStep, formData}) => {
    
    const {setShowSnackBar, setSeverity, setMessage } = useContext(Context);
    const { campaign } = useContext(CampaignContext);

    function createLeadsFromCsv(){
        fetch(`${process.env.REACT_APP_API_URL}/api/leads/create/${campaign.id}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f',
                'Content-disposition': 'attachment; filename=upload.csv'
            },
            body: formData
        })
            .then((response) => {
                setShowSnackBar(true);
                if (response.status === 201){
                    setMessage('Leads added correctly!');
                    setSeverity('success');
                    handleClose();
                } else {
                    setMessage('Something went wrong');
                    setSeverity('danger');
                }
            })
    }
    
    function updateLeadsFields(){
        fetch(`${process.env.REACT_APP_API_URL}/api/update_leads_fields/${campaign.id}/`, {
            method: 'PUT',
            headers: {
                'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                defaultFields,
                customFields
            })
        }).then((response) => {
            if (response.status === 200){
                createLeadsFromCsv();
            }
        })
    }
    
    return (
        <Box
        sx={{
            p:1,
            overflowX: 'hidden'
        }}
        >
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1
            }}
            >
                <Typography variant='subtitle1'>Map Fields</Typography>
                <Stack direction='row' spacing={0.5} sx={{color: '#77ED91'}}>
                    <ThumbUpOffAltOutlinedIcon sx={{color: '#77ED91'}}/>
                    <Typography variant='subtitle1'>File uploaded</Typography>
                </Stack>
            </Box>
            <hr/>
            <Box
            sx={{
                border: '1px solid #000',
                borderRadius: '10px',
                width: '100%',
            }}
            >
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#D9D9D9',
                    borderRadius: '10px',
                    mt: 1,
                    mx: 1
                }}
                >
                    <Grid container>
                        <Grid sx={{p:1}} xs={4.5}>
                            <Typography>Column Name</Typography>
                        </Grid>
                        <Grid sx={{p:1}} xs={3.5}>
                            <Typography>Fields</Typography>
                        </Grid>
                        <Grid sx={{p:1}} xs={4}>
                            <Typography>Samples</Typography>
                        </Grid>
                    </Grid>
                </Box>
                {defaultFields.map((field, i) => <FieldDetails field={field} i={i} key={field} defaultFields={defaultFields} customFields={customFields} samples={samples}/>)}
                {customFields.map((field, i) => <CustomFieldDetails field={field} i={i} key={field} defaultFields={defaultFields} customFields={customFields} samples={samples}/>)}
            </Box>
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1
            }}
            >
                <Box>
                    <button className='btn-dark' onClick={() => {setCurrentStep(1)}}>
                        <p>{'<'} Back</p>
                    </button>
                </Box>
                <Stack direction='row' spacing={1}>
                    <button style={{backgroundColor: '#FD6565' }} onClick={handleClose}>
                        <p>Cancel</p>
                    </button>
                    <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={updateLeadsFields}>
                        <p>+ Next step</p>
                    </button>
                </Stack>
            </Box>
        </Box>
    )
}

const AddCsvWorkFlow = ({ handleClose }) => {
    
    const [currentStep, setCurrentStep] = useState(1);
    const [defaultFields, setDefaultFields] = useState([]);
    const [customFields, setCustomFields] = useState([]);
    const [samples, setSamples] = useState([]);
    const [formData, setFormData] = useState(null);

    return (
        <Box>
            {currentStep === 1 && <DragAndDropFile setDefaultFields={setDefaultFields} setCustomFields={setCustomFields} setSamples={setSamples} setCurrentStep={setCurrentStep} handleClose={handleClose} setFormData={setFormData}/>}
            {currentStep === 2 && <FieldsReview defaultFields={defaultFields} customFields={customFields} samples={samples} handleClose={handleClose} setCurrentStep={setCurrentStep} formData={formData}/>}
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
                <BasicDialog Activator={AddLeadManuallyActivator}>
                    <AddLeadManually/>
                </BasicDialog>    
            </Stack>
        </Box>
    )
}

const AddLeadsChoiceBarActivator = ({handleClick}) => {
    return (
        <IconButton onClick={handleClick}>
            <SaveAltRoundedIcon/>
        </IconButton>
    )
}


const AddLeadManuallyActivator = ({handleClick}) => {
    return (
        <Stack spacing={0.5} direction='row' sx={{'&:hover': {backgroundColor:'var(--gray-color)'}, p:2}} onClick={handleClick}>
            <PeopleAltOutlinedIcon/>
            <Typography variant='subtitle1'>Add manually</Typography>
        </Stack>
    )
}

const AddLeadManually = ({ handleClose }) => {

    const { campaign } = useContext(CampaignContext);
    const [customFields, setCustomFields] = useState([['','']]);
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [company, setCompany] = useState();

    function create(){
        let custom_fields = {}
        for (let field of customFields){
            custom_fields[field[0]] = field[1]
        }
        fetch(`${process.env.REACT_APP_API_URL}/api/leads/create_manually/${campaign.id}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: name,
                last_name: lastName,
                email,
                company,
                custom_fields
            })
        })
            .then((response) => {
                if (response.status === 201){
                    handleClose()
                }
            })
    }

    return (
        <Box sx={{width: '30vw'}}>
            <Stack direction='row' spacing={1} sx={{m:1}}>
                <Person2OutlinedIcon/>
                <Typography variant='h6'>Add Manually</Typography>
            </Stack>
            <hr/>
            <Box sx={{m:1}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1' sx={{py:1}}>First Name</Typography>
                        <BasicInput placeholder='First Name' onChange={(e) => {setName(e.target.value)}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1' sx={{py:1}}>Last Name</Typography>
                        <BasicInput placeholder='Last Name' onChange={(e) => {setLastName(e.target.value)}}/>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{m:1}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1' sx={{py:1}}>Email</Typography>
                        <BasicInput placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1' sx={{py:1}}>Company</Typography>
                        <BasicInput placeholder='Company' onChange={(e) => {setCompany(e.target.value)}}/>
                    </Grid>
                </Grid>
            </Box>
            <hr/>
            <Box sx={{m:1}}>
                {customFields.map((field, i) =>
                    <Box sx={{m:1}}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='subtitle1' sx={{py:1}}>Title</Typography>
                                <BasicInput placeholder='Title' onChange={(e) => {
                                    customFields[i][0] = e.target.value}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='subtitle1' sx={{py:1}}>Custom Field</Typography>
                                <BasicInput placeholder='Custom Field' onChange={(e) => {customFields[i][1] = e.target.value}}/>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Box>
            <Box
            sx={{
                m: 1,
                display: 'flex',
                justifyContent: 'center'
            }}
            >
                <button
                style={{
                    backgroundColor: 'var(--light-blue-color)'
                }}
                onClick={() => {setCustomFields([...customFields, []])}}
                >
                    <p>+ Add Custom</p>
                </button>
            </Box>
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                m: 1
            }}
            >
                <Stack spacing={1} direction='row'>
                    <button className='btn-dark'>
                        <p>{`<`} Back</p>
                    </button>
                    <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={create}>
                        <p>Create</p>
                    </button>
                </Stack>
            </Box>
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
                <IconButton>
                    <DoDisturbRoundedIcon/>
                </IconButton>
                <IconButton>
                    <DeleteOutlineRoundedIcon/>
                </IconButton>
                <BasicDialog Activator={AddLeadsChoiceBarActivator}>
                    <AddLeadsChoice/>
                </BasicDialog>
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