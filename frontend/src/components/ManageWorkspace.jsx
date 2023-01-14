import React, { useState, useContext } from 'react';
import { Context } from '../utils/context';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import BasicDialog from './BasicDialog';
import BasicInput from './BasicInput';



const ToggleAddWorkspace = ({ handleClick }) => {
  return (
    <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: "10px",
          color: "var(--gray-color)",
          "&:hover": {
            backgroundColor: "var(--sky-blue-color)",
            cursor: "pointer"
          },
        }}
        onClick = {() => {handleClick()}}
        >
          <AddOutlinedIcon sx={{pr: "7px"}}/>
          <p>Add workspace</p>
    </Box>
  )
}

const AddWorkspace = ({ handleClose }) => {
  const [company, setCompany] = useState(null);
  const { workspaces, setWorkspaces } = useContext(Context); 

  function createWorkspace(){
    if (company !== null && company !== ""){
      fetch(`${process.env.REACT_APP_API_URL}/api/workspaces/`, {
        method: "POST",
        credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
          },
        body: JSON.stringify({name: company, is_active:false})
      })
      .then((response) => {
          response.json()
          .then((data) => {
            setWorkspaces([...workspaces, {...data}]);
            handleClose();
          })
      })
    }
  }

  return (
    <Box
    sx={{
      width: "20vw",
      textAlign: "center",
      marginBottom: "15px"
    }}
    >
      <Box
      sx={{
        p: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Person2OutlinedIcon sx={{color: 'var(--gray-color)', px: '2px'}}/>
        <Typography variant='h6'>
          Add New Workspace
        </Typography>
      </Box>
      <hr/>
      <Box>
        <Typography variant='subtitle2' sx={{py: "3px"}}>
          Company Name
        </Typography>
        <Box sx={{
          width: "75%",
          margin: "auto"
        }}>   
        <BasicInput placeholder='Company' type='text' onChange={(e) => {setCompany(e.target.value)}}/>
        </Box>
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px"
        }}
        >
          <button className="btn-dark" onClick={handleClose}>
            <p><span>{`<`}</span> Back</p>
          </button>
          <button style={{backgroundColor: "var(--sky-blue-color)", marginLeft: "20px"}} onClick={createWorkspace}>
            <p>+ Create</p>
          </button>
        </Box>
      </Box>
    </Box>
  )
}

const ManageWorkSpace = () => {
  
  const { workspaces, setWorkspaces, setSenders, setEmailCurrentPage, fetchFromAPI, setCampaigns, setCampaignsCurrentPage} = useContext(Context);

  function toggleWorkspace(workspace){
    if (!workspace.is_active){
      fetch(`${process.env.REACT_APP_API_URL}/api/toggle_workspace/${workspace.id}/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'RcrvEBwq0vTqIzeemLziaRdIs1tnpu4f'
        },
        body: JSON.stringify({...workspace, is_active:true})
      }).then((response) => {
        response.json()
          .then((data) => {
            setWorkspaces(data);
            setEmailCurrentPage(1);
            setCampaignsCurrentPage(1);
            fetchFromAPI('/api/generic_sender/?page=1', setSenders);
            fetchFromAPI('/api/campaigns/?page=1', setCampaigns);
          })
      })
    }
  }
  
  return (
    <Box
    style={{
      backgroundColor: "#fff"
    }}
    >
      <Stack>
        {workspaces.map((workspace, index) => (
          <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "7px",
            color: "var(--gray-color)",
            backgroundColor: workspace.is_active ? "var(--sky-blue-color)" : "#fff",
            "&:hover": {
              backgroundColor: "var(--sky-blue-color)",
              cursor: "pointer"
            }
          }}
          key={index}
          onClick={() => {toggleWorkspace(workspace)}}
          >
            <Person2OutlinedIcon sx={{pr: "7px"}}/>
            <p
            style={{
              textTransform: "uppercase",
            }}
            >{workspace.name}</p>
          </Box>
        ))}
        <BasicDialog Activator={ToggleAddWorkspace}>
            <AddWorkspace/>
        </BasicDialog>
      </Stack>
    </Box>  
  )
}

export default ManageWorkSpace