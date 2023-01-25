import React, { createContext, useState, useContext, useEffect } from 'react';

import {Box, Typography, Stack} from '@mui/material';

import TemplateEditor from './TemplateEditor';

import TemplateTable from './TemplatesTable';

export const TemplateContext = createContext();

const MainContext = ({ children }) => {

  const [object, setObject] = useState('');
  const [tags, setTags] = useState(['{{First Name}}', '{{Last Name}}', '{{Email}}', '{{Ice-Bracker}}', '{{Personalisation}}', '{{Phone Number}}', '{{Job Title}}', '{{Company}}']);
  const [convertedContent, setConvertedContent] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchTemplates();
  })

  async function save(){
    if (object.length > 0){
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/template/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
        },
        credentials: 'include',
        body: JSON.stringify({
          subject: object,
          content: convertedContent
        })
      });
      if (response.status === 201){
        const data = await response.json()
        return data
      }
    }
  }

  function fetchTemplates(){
    fetch(`${process.env.REACT_APP_API_URL}/api/template/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200){
          response.json()
            .then((data) => {
              setTemplates(data);
            })
        }
    })
  }

  
  return (
    <TemplateContext.Provider
    value={{
      object,
      setObject,
      tags,
      setTags,
      convertedContent,
      setConvertedContent,
      save,
      templates,
      setTemplates,
      fetchTemplates
    }}
    >
        { children }
    </TemplateContext.Provider>
  )
}

const SaveButton = ({ onSave, handleClose }) => {
  const { save } = useContext(TemplateContext);

  async function saveTemplate(){
    const template = await save();
    console.log(template);
    onSave(template.id);
    handleClose();
  }
  
  return (
    <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={saveTemplate}>
      <p>Save</p>
    </button>
  )
}

const TemplatePage = ({ onSave, handleClose }) => {

    
    return (
    <MainContext>
      <Stack spacing={10} sx={{backgroundColor: 'transparent', my: '5vh', mx: '4vw',}}>
        <TemplateTable onSave={onSave} handleClose={handleClose}/>
        <Box>
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
              <Typography variant='subtitle1'>Compose your template</Typography>
              <SaveButton onSave={onSave} handleClose={handleClose}/>
            </Box>
            <TemplateEditor/>
          </Box>
      </Stack>
    </MainContext>  

    )
  }
  
  export default TemplatePage