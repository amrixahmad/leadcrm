import React, {useContext,useState} from 'react'
import { UserContext } from '../context/UserContext'
import ErrorMessage from "./ErrorMessage"

const RegisterUser = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [conf_password,setConfPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [,setToken] = useContext(UserContext)

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email,password: password})
        }

        const response = await fetch("/api/users",requestOptions)
        const data = await response.json()

        if (!response.ok) {
            setErrorMessage(data.detail)
        } else {
            // console.log("Access token is: " + data.access_token)
            setToken(data.access_token)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === conf_password && password.length > 5) {
            submitRegistration()
        } else {
            setErrorMessage("Make sure your passwords match")
        }        
    }

  return (
    <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">

            <div className="section-title">
                <h2>Register</h2>
                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
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
                            placeholder="Email Address" 
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
                            value={conf_password}
                            onChange={(e)=>setConfPassword(e.target.value)}
                            />
                            <ErrorMessage message={errorMessage} />
                            <div className="text-center"><button type="submit">Register</button></div>                            
                        </div>
                        
                    </form>            
                </div>
            </div>
        </div>
    </section>
  )
}

export default RegisterUser