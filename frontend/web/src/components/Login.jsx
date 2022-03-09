import React, {useState,useContext} from 'react'
import ErrorMessage from './ErrorMessage'
import {UserContext} from '../context/UserContext'

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [,setToken] = useContext(UserContext)

    const submitLogin = async () => {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify(`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`)                       
        }
        const response = await fetch('/api/token',request)
        const data = await response.json()

        if (!response.ok) {
            setErrorMessage(data.detail)
        } else {
            setToken(data.access_token)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        submitLogin()
    }

  return (
    <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">

            <div className="section-title">
                <h2>Login</h2>
                <p>Welcome back :)</p>
            </div>
        
            <div className="row mt-5">
                <div className="col-lg-4"></div>
                <div className="col-lg-8 mt-5 mt-lg-0">
                    <form className="php-email-form" onSubmit={handleSubmit}>
                        <div className="col-md-6 form-group">
                            <input 
                            type="email" 
                            className="form-control" 
                            id="loginemail" 
                            placeholder="Your best email address" 
                            required 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                            <input 
                            type="password" 
                            className="form-control" 
                            id="loginpassword" 
                            placeholder="Choose a password (has to be 5 or more characters)"  
                            required 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                            <ErrorMessage message={errorMessage} />
                            <div className="text-center"><button type="submit">Login</button></div>
                            <div className='"text-center'>
                            <p>Already have an account?</p>
                            <button className='btn btn-success'>Login</button></div>
                        </div>
                        
                    </form>            
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login