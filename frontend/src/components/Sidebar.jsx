import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


// MUI components
import Stack from '@mui/material/Stack';

import categories from '../utils/categories';


const Sidebar = () => {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(pathname);

  useEffect(() => {
    setSelected(pathname)
  }, [pathname]) 

  return (
    <div className="app__sidebar">
        <div style={{marginTop: "15vh"}}>
            <p style={{paddingLeft: "1.2rem", color: "var(--gray-color)", fontSize: "0.8rem"}}> Main Menu</p>
            <Stack>
                {categories.map((category) => 
                    <Link to={category.path}>
                        <div className={`flex app__sidebar-link ${selected === category.path ? "current" : ""}`}>
                            {category.icon}
                            <p>{category.text}</p>
                        </div>
                    </Link>
                )}
            </Stack>
        </div>
    </div>
  )
}

export default Sidebar