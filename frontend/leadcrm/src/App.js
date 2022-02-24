import { useState,useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import RegisterUser from './components/RegisterUser';

function App() {
  const [message,setMessage] = useState("")
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
      <RegisterUser />
    </div>
  );
}

export default App;
