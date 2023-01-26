import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';



export default [
    {
        path: "/",
        text: "Dashboard",
        icon: <HomeOutlinedIcon sx={{px: "15px"}}/>
    },
    {
        path: "/email",
        text: "Email Account",
        icon: <FlashOnOutlinedIcon sx={{px: "15px"}}/>
    },
    {
        path: "/campaigns",
        text: "Campaigns",
        icon: <SendOutlinedIcon sx={{px: "15px"}}/>
    },
    {
        path: "/inbox/all",
        text: "Email Inbox",
        icon: <EmailOutlinedIcon sx={{px: "15px"}}/>
    },
    {
        path: "/analytics",
        text: "Analytics",
        icon: <BarChartIcon sx={{px: "15px"}}/>
    },
    {
        path: "/settings",
        text: "Settings",
        icon: <SettingsIcon sx={{px: "15px"}}/>
    },
    {
        path: "/template",
        text: "Template",
        icon: <LibraryBooksOutlinedIcon sx={{px: "15px"}}/>
    }
]