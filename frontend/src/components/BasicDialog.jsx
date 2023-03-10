import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';

const BasicDialog = ({ Activator, children}) => {
    const [open, setOpen] = useState(false)
    
    function handleClose(){
        setOpen(false)
    }

    
    return (
        <>
            <Activator handleClick={() => {setOpen(true)}}/>
            <Dialog open={open} onClose={handleClose}>
                {React.cloneElement(children, {handleClose})}
            </Dialog>
        </>
    )
}

export default BasicDialog