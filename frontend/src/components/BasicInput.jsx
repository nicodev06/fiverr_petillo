import React from 'react'

import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';

const BasicInput = ({ placeholder, type, onChange, value, required, padding }) => {
  return (
    <Box
    sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1'}}
    >
        <InputBase
        sx={{border: '1px solid var(--light-blue-color)', borderRadius: '100px', p: padding || '10px' }}
        placeholder={placeholder}
        inputProps={{ 'type': type }}
        onChange={onChange}
        value={value}
        required={required}
        />
    </Box>
  )
}

export default BasicInput