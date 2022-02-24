import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [token,setToken] = useState(localStorage.getItem("crmleadstoken"))

    useEffect(() => {
        const fetchUser = async () => {
            // console.log("Did the token get passed? " + token)
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                Authorization: "Bearer " + token
            }
            const response = await fetch("/api/users/me",requestOptions)

            if (!response.ok) {
                // console.log("Token is null for some reason " + token)
                setToken(null)
            } 
            // console.log("This is the token being stored in localstorage " + token)
            localStorage.setItem("crmleadstoken",token)  
            for (var i = 0; i < localStorage.length; i++){
                console.log("Content of local storage: " + localStorage.getItem(localStorage.key(i))) 
            }                     
        }
        fetchUser()
    },[token])

    return (
        <UserContext.Provider value={[token,setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}