import React, {useContext} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Snackbar  from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckBox from '@mui/material/Checkbox';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import BasicDialog from '../../../../BasicDialog';

import { CampaignContext } from '../Layout';
import { Context } from '../../../../../utils/context';

import times from './daytime';
import timezones from './timezones';
import allowed_days from './dayweek';


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
                border: '1px solid var(--light-gray-color)',
                backgroundColor: 'var(--light-gray-color)'
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


const SetDays = () => {

    const { allowedDays, setAllowedDays } = useContext(CampaignContext);

    return (
        <Box>
            {allowed_days.map((day) => 
                <Stack key={day} spacing={1} direction='row'>
                    <CheckBox checked={allowedDays.includes(day.num)} onChange={(e) => {
                        if (e.target.checked){
                            setAllowedDays([...allowedDays, day.num])
                        } else {
                            setAllowedDays(allowedDays.filter((item) => item !== day.num))
                        }
                        console.log(allowedDays);
                    }}/>
                    <Typography>{day.day}</Typography>
                </Stack>
            )}
        </Box>
    )
}


const SchedulePage = () => {

  const {campaign, setCampaign, startDate, setStartDate, endDate, setEndDate, startTime, setStartTime, endTime, setEndTime, timeZone, allowedDays, setAllowedDays} = useContext(CampaignContext);
  const {setShowSnackBar, setMessage, setSeverity, showSnackBar, message, severity} = useContext(Context);

  function save(){
    const start = startDate ? `${startDate.format('YYYY-MM-DD')}T${startTime}${timeZone[4] === ')' ? '+00Z' : timeZone.substring(4,10)}` : null;
    const end = endDate ? `${endDate.format('YYYY-MM-DD')}T${endTime}${timeZone[4] === ')' ? '+00Z' : timeZone.substring(4,10)}`: null;
    if (startDate){
        fetch(`${process.env.REACT_APP_API_URL}/api/campaign/${campaign.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': 'hQBH9g5qKNjm75igWxv1kEFTZ2XkPJcy'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: campaign.name,
                start_date: start,
                end_date: end,
                status: 'active',
                allowed_days: allowedDays
            })
        })
            .then((response) => {
                setShowSnackBar(true);
                if (response.status === 200){
                    setMessage(`Your campaign will start at ${startDate.format('YYYY-MM-DD')}`);
                    setSeverity('success');
                    response.json()
                        .then((data) => {
                            setCampaign(data);
                        })
                } else {
                    setMessage('Something went wrong');
                    setSeverity('danger');
                }
        })
    }
  }

  return (
    <Box
    sx={{
        mt: '3vh'
    }}
    >
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            my: 1
        }}
        >
            <button style={{backgroundColor: 'var(--light-blue-color)'}} onClick={save}>
                <p>Save</p>
            </button>
        </Box>
        <Stack direction='row' spacing={5}>
            <Box>
                <Box
                sx={{
                    borderBottom: '1px solid var(--light-gray-color)',
                    my: 1
                }}
                >
                    <Typography variant='subtitle1'>Days</Typography>
                </Box>
                <SetDays/>
            </Box>
            <Box>
                <Box
                sx={{
                    borderBottom: '1px solid var(--light-gray-color)',
                    my: 1
                }}
                >
                    <Typography variant='subtitle1'>Timing and Date</Typography>
                </Box>
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
        </Stack>
        <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={() => {setShowSnackBar(false)}}
        >
            <Alert severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    </Box>
  )
}

export default SchedulePage