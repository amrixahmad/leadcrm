import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import ErrorMessage from './ErrorMessage'

const Register = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confpass,setConfpass] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [,setToken] = useContext(UserContext)

    const submitRegistration = async () => {
        const request = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email: email,password: password})
        }
        const response = await fetch("/api/users",request)
        const data = await response.json()
        if (!response.ok) {
            setErrorMessage(data.detail)
        } else {
            setToken(data.access_token)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password === confpass && password.length > 5) {
            submitRegistration()
            console.log("Your details have been submitted")
        } else {
            setErrorMessage("Make sure your passwords match and have more than 5 characters")
        }
    }

  return (
    <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">

            <div className="section-title">
                <h2>Register</h2>
                <p>You know you want to.</p>
            </div>
        
            <div className="row mt-5">
                <div className="col-lg-4"></div>
                <div className="col-lg-8 mt-5 mt-lg-0">
                    <form className="php-email-form" onSubmit={handleSubmit}>
                        <div className="col-md-6 form-group">
                            <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Your best email address" 
                            required 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                            <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Choose a password (has to be 5 or more characters)"  
                            required 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                            <input 
                            type="password" 
                            className="form-control" 
                            id="conf_password" 
                            placeholder="Confirm your password" 
                            required 
                            value={confpass}
                            onChange={(e)=>setConfpass(e.target.value)}
                            />
                            <ErrorMessage message={errorMessage} />
                            <div className="text-center"><button type="submit">Register</button></div>
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

export default Register