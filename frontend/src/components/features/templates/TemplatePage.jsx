import React, { createContext, useState } from 'react'

import {Box, Typography, Stack} from '@mui/material';

import TemplateEditor from './Editor';

export const Context = createContext();

const TemplateContext = ({ children }) => {

  const [object, setObject] = useState('');
  const [tags, setTags] = useState(['{{First Name}}', '{{Last Name}}', '{{Email}}', '{{Ice-Bracker}}', '{{Personalisation}}', '{{Phone Number}}', '{{Job Title}}', '{{Company}}'])

  return (
    <Context.Provider
    value={{
      object,
      setObject,
      tags,
      setTags
    }}
    >
        { children }
    </Context.Provider>
  )
}

const TemplatePage = () => {
    return (
    <TemplateContext>
      <Box
        sx={{
          mt: '5vh',
          mx: '4vw'
        }}
        >
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
            <Typography variant='subtitle1'>Compose your template</Typography>
            <button style={{backgroundColor: 'var(--light-blue-color)'}}>
              <p>Save</p>
            </button>
          </Box>
          <TemplateEditor/>
        </Box>
    </TemplateContext>  

    )
  }
  
  export default TemplatePage