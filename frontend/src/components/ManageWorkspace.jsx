import React, { useContext } from 'react';
import { Context } from '../utils/context';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


const ManageWorkSpace = () => {
  
  const { workspaces, currentWorkspace } = useContext(Context);
  
  return (
    <Box
    style={{
      backgroundColor: "#fff"
    }}
    >
      <Stack>
        {workspaces.map((workspace) => (
          <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "7px",
            color: "var(--gray-color)",
            backgroundColor: workspace.is_active ? "var(--sky-blue-color)" : "#fff",
            "&:hover": {
              backgroundColor: "var(--sky-blue-color)"
            }
          }}
          >
            <Person2OutlinedIcon sx={{pr: "7px"}}/>
            <p
            style={{
              textTransform: "uppercase",
            }}
            >{workspace.name}</p>
          </Box>
        ))}
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: "10px",
          color: "var(--gray-color)",
          "&:hover": {
            backgroundColor: "var(--sky-blue-color)"
          }
        }}
        >
          <AddOutlinedIcon sx={{pr: "7px"}}/>
          <p>Add workspace</p>
        </Box>
      </Stack>
    </Box>  
  )
}

export default ManageWorkSpace