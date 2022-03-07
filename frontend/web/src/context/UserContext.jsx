import React, {createContext,useEffect,useState} from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [token,setToken] = useState(localStorage.getItem("crmtoken"))

    useEffect(() => {
        const fetchUser = async () => {
            const request = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
            const response = await fetch("/api/users/me",request)
            
            if (!response.ok) {
                setToken(null)
            }
            localStorage.setItem("crmtoken",token)
            for (var i=0;i<=localStorage.length;i++)
            console.log(localStorage.getItem(i))
        }
        fetchUser()
    },[token])

    return (
        <UserContext.Provider value={[token,setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}