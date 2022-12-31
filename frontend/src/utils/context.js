import { useState, useEffect, createContext } from 'react';

export const Context = createContext()

export const MainContext = ({ children }) => {

    function getCurrentWorkspace(workspaces){
      if (window.localStorage.getItem("currentWorkspace") === null){
        window.localStorage.setItem("currentWorkspace", String(workspaces[0].id))
        console.log(window.localStorage.getItem("currentWorkspace"))
        return workspaces[0].id
      } else {
        return workspaces.find((item) => item.id === +window.localStorage.getItem("currentWorkspace")).id
      }
    }
    
    const [currentUser, setCurrentUser] = useState(null);
    const [workspaces, setWorkspaces] = useState(null);

    function fetchFromAPI(path, setter){
      fetch(`${process.env.REACT_APP_API_URL}${path}`, {
        method: "GET",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
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
    },[])

    return (
        <Context.Provider value={{
          currentUser,
          workspaces,
        }}>
            { children }
        </Context.Provider>
    )
}