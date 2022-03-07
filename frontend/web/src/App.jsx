import React, { useState,useEffect,useContext } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Register from './components/Register';
import { UserContext } from './context/UserContext';
import Table from './components/Table';

function App() {
  const [message,setMessage] = useState("")
  const [token] = useContext(UserContext)

  const getMessage = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetch("/api",requestOptions)
    const data = await response.json()
    if (!response.ok) {
      console.log("Something went wrong with the response")
    } else {
      setMessage(data)
    }
  }

  useEffect(() => {
    getMessage()
  },[])

  return (
    <div className="App">
      <Header />      
      <Hero title={message} />
      {
        !token ? (          
          <Register />
        ) : (
          <Table />
        )
      }      
    </div>
  );
}

export default App;
