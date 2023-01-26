import React, { createContext, useState, useContext, useEffect } from 'react'

import {Box, Typography, Stack} from '@mui/material';

import TemplateEditor from './Editor';
import TemplateTable from './TemplateTable';

export const Context = createContext();

const TemplateContext = ({ children }) => {

  const [object, setObject] = useState('');
  const [tags, setTags] = useState(['{{First Name}}', '{{Last Name}}', '{{Email}}', '{{Ice-Bracker}}', '{{Personalisation}}', '{{Phone Number}}', '{{Job Title}}', '{{Company}}']);
  const [convertedContent, setConvertedContent] = useState(null);
  const [templates, setTemplates] = useState([]);

  function save(){
    if (object.length > 0){
      fetch(`${process.env.REACT_APP_API_URL}/api/template/`, {
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
      })
        .then((response) => {
          if (response.status === 201){
              fetchTemplates();
          }
        })
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

  useEffect(() => {
    fetchTemplates();
  }, [])

  return (
    <Context.Provider
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
    </Context.Provider>
  )
}

const SaveButton = () => {
  const { save } = useContext(Context);
  return (
    <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={save}>
      <p>Save</p>
    </button>
  )
}

const TemplatePage = () => {

    
    return (
    <>
    <TemplateContext>
      <Box
        sx={{
          mt: '5vh',
          mx: '6vw',
          width: '70vw'
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
            <SaveButton/>
          </Box>
          <TemplateEditor/>
          <TemplateTable/>
        </Box>
    </TemplateContext>  
    </>
    )
  }
  
  export default TemplatePage