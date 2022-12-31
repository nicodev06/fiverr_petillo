import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../utils/context';

// Icons
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import StarIcon from '@mui/icons-material/Star';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

// MUI components
import LinearProgress from '@mui/material/LinearProgress';

// Custom components
import BasicDialog from './BasicDialog';
import ManageWorkSpace from './ManageWorkspace';

const ManageWorkSpaceIcon = ({ handleClick }) => {
    return (
        <div style={{textAlign: "center"}}>
                <Person2OutlinedIcon sx={{color: "var(--light-gray-color)"}} onClick={handleClick}/>
        </div>
    )
}

const Navbar = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState(pathname.slice(1,pathname.length));
  const { currentUser } = useContext(Context);

  useEffect(() => {
    setTitle(pathname.slice(1,pathname.length))
  }, [pathname])

  return (
    <div className='app__navbar flex'>
        <div className="app__navbar-header flex">
            <MenuRoundedIcon sx={{pr: "1.2rem", color: "var(--gray-color)"}}/>
            <h3 style={{marginRight: "3.5rem", textTransform: "capitalize"}}>{title.length > 1 ? title : "Dashboard"}</h3>
        </div>
        <div className="app__navbar-stats flex">
            <div>
                <div className='flex' style={{alignItems: "center"}}>
                    <StarIcon sx={{color: "var(--yellow-color)"}}/>
                    <p>Email sent</p>
                    <p style={{fontSize: "0.6rem",color: "var(--gray-color)"}}>1000/5000</p>
                </div>
                <LinearProgress variant="determinate" value="50"/>
            </div>
            <div>
                <div className='flex' style={{alignItems: "center"}}>
                    <StarIcon sx={{color: "var(--yellow-color)"}}/>
                    <p>Total Leads</p>
                    <p style={{fontSize: "0.6rem",color: "var(--gray-color)"}}>1000/5000</p>
                </div>
                <LinearProgress variant="determinate" value="50"/>
            </div>
            <div style={{textAlign: "center"}}>
                <ForumOutlinedIcon sx={{color: "var(--light-gray-color)"}}/>
            </div>
            <BasicDialog Activator={ManageWorkSpaceIcon}>
                <ManageWorkSpace/>
            </BasicDialog>
            <div className="flex" style={{alignItems: "center"}}>
                <div className="app__navbar-account"></div>
                <div style={{marginLeft: "0.6rem"}}>
                    <p>{currentUser?.username}</p>
                    <p style={{fontSize: "0.8rem", color: "var(--gray-color)"}}>{currentUser?.email}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar