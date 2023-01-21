import React, {useState, useContext} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import BasicDialog from '../../../../BasicDialog';

import { CampaignContext } from '../Layout';

import times from './daytime';
import timezones from './timezones';


const Calendar = ({date, setter}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            value={date}
            onChange={(newValue) => {setter(newValue)}}
            renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
    );
}

const StartDateActivator = ({ handleClick }) => {

    const {startDate} = useContext(CampaignContext)

    return (
        <Box
        sx={{
            borderRadius: '10px',
            border: '1px solid var(--light-gray-color)'
        }}
        onClick={handleClick}
        >
            <Typography variant='subtitle1' sx={{px: 2, py:1}}>{startDate ? startDate.format('YYYY-MM-DD') : 'YYYY-MM-DD'}</Typography>
        </Box>
    )
}

const EndDateActivator = ({ handleClick }) => {

    const {endDate} = useContext(CampaignContext)

    return (
        <Box
        sx={{
            borderRadius: '10px',
            border: '1px solid var(--light-gray-color)',
            backgroundColor: 'var(--light-gray-color)'
        }}
        onClick={handleClick}
        >
            <Typography variant='subtitle1' sx={{px: 2, py:1}}>{endDate ? endDate.format('YYYY-MM-DD') : 'YYYY-MM-DD'}</Typography>
        </Box>
    )
}

const StartTimeActivator = ({ handleClick }) => {
    
    const { startTime } = useContext(CampaignContext);
    
    return (
        <Box
            sx={{
                borderRadius: '10px',
                border: '1px solid var(--light-gray-color)'
            }}
            onClick={handleClick}
            >
            <Typography variant='subtitle1' sx={{px: 2, py:1}}>{startTime}</Typography>
        </Box>
    )
}

const StartDayTimes = ({ handleClose }) => {
    const {startTime, setStartTime} = useContext(CampaignContext);
    return (
        <Box
        sx={{
            backgroundColor: '#D9D9D9',
            height: '30vh',
            overflowX: 'hidden'
        }}
        >
            {times.map((time) => 
                <Box
                key={time}
                sx={{
                    backgroundColor: time === startTime ? 'var(--sky-blue-color)' : 'transparent'
                }}
                onClick={() => {
                    setStartTime(time);
                    handleClose();
                }}
                >
                    <Typography variant='subtitle' sx={{p:1}}>{time}</Typography>
                </Box>
            )}
        </Box>
    )
}

const EndTimeActivator = ({ handleClick }) => {
    
    const { endTime } = useContext(CampaignContext);
    
    return (
        <Box
            sx={{
                borderRadius: '10px',
                border: '1px solid var(--light-gray-color)'
            }}
            onClick={handleClick}
            >
            <Typography variant='subtitle1' sx={{px: 2, py:1}}>{endTime}</Typography>
        </Box>
    )
}

const EndDayTimes = ({ handleClose }) => {
    const {endTime, setEndTime} = useContext(CampaignContext);
    return (
        <Box
        sx={{
            backgroundColor: '#D9D9D9',
            height: '30vh',
            overflowX: 'hidden'
        }}
        >
            {times.map((time) => 
                <Box
                key={time}
                sx={{
                    backgroundColor: time === endTime ? 'var(--sky-blue-color)' : 'transparent'
                }}
                onClick={() => {
                    setEndTime(time);
                    handleClose();
                }}
                >
                    <Typography variant='subtitle' sx={{p:1}}>{time}</Typography>
                </Box>
            )}
        </Box>
    )
}

const TimeZonesActivator = ({ handleClick }) => {
    const { timeZone } = useContext(CampaignContext);

    return (
        <Box
        onClick={handleClick}
        sx={{
            border: '1px solid var(--light-gray-color)',
            borderRadius: '10px'
        }}
        >
            <Typography variant='subtitle1'>{timeZone}</Typography>
        </Box>
    )
}

const TimeZones = ({ handleClose }) => {
    const { timeZone, setTimeZone, offset, setOffset } = useContext(CampaignContext);

    return (
        <Box
        >
            {timezones.map((zone) => 
            <Box key={zone} onClick={() => {
                setTimeZone(zone.text);
                setOffset(zone.offset);
                handleClose();
            }}
            sx={{
                backgroundColor: timeZone === zone.text ? 'var(--sky-blue-color)': 'transparent'
            }}
            >
                <Typography variant='subtitle1' sx={{p: 1}}>
                    {zone.text}
                </Typography>
            </Box>
        )}
        </Box>
    )
}


const SchedulePage = () => {

  const {startDate, setStartDate, endDate, setEndDate, startTime, setStartTime, endTime, setEndTime} = useContext(CampaignContext);

  return (
    <Box
    sx={{
        mt: '3vh'
    }}
    >
        <Typography variant='subtitle1'>Timing and Date</Typography>
        <hr/>
        <Stack spacing={1} direction='row'>
            <Stack spacing={2}>
                <Typography variant='subtitle1'>Start</Typography>
                <BasicDialog Activator={StartTimeActivator}>
                    <StartDayTimes/>
                </BasicDialog>
                <BasicDialog Activator={StartDateActivator}>
                    <Calendar date={startDate} setter={setStartDate}/>
                </BasicDialog>
            </Stack>
            <Stack spacing={2}>
                <Typography variant='subtitle1'>End</Typography>
                <BasicDialog Activator={EndTimeActivator}>
                    <EndDayTimes/>
                </BasicDialog>
                <BasicDialog Activator={EndDateActivator}>
                    <Calendar date={endDate} setter={setEndDate}/>
                </BasicDialog>
            </Stack>
        </Stack>
        <Box
        sx={{
            textAlign: 'center',
            mt: 1,
            width: '325px'
        }}
        >
            <BasicDialog Activator={TimeZonesActivator}>
                <TimeZones/>
            </BasicDialog>
        </Box>
    </Box>
  )
}

export default SchedulePage