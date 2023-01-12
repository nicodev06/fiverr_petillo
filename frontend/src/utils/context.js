import { useState, useEffect, createContext } from 'react';

export const Context = createContext()

export const MainContext = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [workspaces, setWorkspaces] = useState(null);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [senders, setSenders] = useState([]);
    const [emailPages, setEmailPages] = useState(1);
    const [emailSendersCount, setEmailSendersCount] = useState(0);
    const [emailCurrentPage, setEmailCurrentPage] = useState(1);
    const [campaigns, setCampaigns] = useState([]);
    const [campaignsCurrentPage, setCampaignsCurrentPage] = useState(1);

    function fetchFromAPI(path, setter){
      fetch(`${process.env.REACT_APP_API_URL}${path}`, {
        method: "GET",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          response.json()
            .then(async (data) => await setter(data))
      })
    }

    useEffect(() => {
      fetchFromAPI('/api/current_user/', setCurrentUser);
      fetchFromAPI('/api/workspaces/', setWorkspaces);
      fetchFromAPI('/api/email_pages/', setEmailPages);
      fetchFromAPI('/api/email_senders/', setEmailSendersCount);
    },[])

    useEffect(() => {
      fetchFromAPI(`/api/generic_sender/?page=${emailCurrentPage}`, setSenders);
    }, [emailCurrentPage]);

    useEffect(() => {
      fetchFromAPI(`/api/campaigns/?page=${campaignsCurrentPage}`, setCampaigns)
    }, [campaignsCurrentPage]);


    return (
        <Context.Provider value={{
          currentUser,
          workspaces,
          setWorkspaces,
          showSnackBar,
          severity,
          message,
          setShowSnackBar,
          setSeverity,
          setMessage,
          senders,
          setSenders,
          fetchFromAPI,
          emailPages,
          emailSendersCount,
          emailCurrentPage,
          setEmailCurrentPage,
          setEmailSendersCount,
          campaigns,
          setCampaigns,
          campaignsCurrentPage,
          setCampaignsCurrentPage
        }}>
            { children }
        </Context.Provider>
    )
}