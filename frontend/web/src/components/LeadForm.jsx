import React, { useEffect, useState } from 'react'
import ErrorMessage from './ErrorMessage'

const LeadForm = ({token,leadId,setErrorMessage,getLeads}) => {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [company,setCompany] = useState("")
    const [email,setEmail] = useState("")
    const [note,setNote] = useState("")
    const [errorMessage,] = useState("")

    useEffect(() => {        
      
      const getLead = async () => {
        const request = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
        const response = await fetch(`/api/leads/${leadId}`,request)
        const data = await response.json()

        if (!response.ok) {
          setErrorMessage("Something went wrong when fetching the lead")
        } else {
          setFirstName(data.first_name)
          setLastName(data.last_name)
          setEmail(data.email)
          setCompany(data.company)
          setNote(data.note)
        }
      }

      if (leadId) {getLead()}

    },[leadId,token])

    const cleanFormData = () => {
      setFirstName("")
      setLastName("")
      setEmail("")
      setCompany("")
      setNote("")
    }

    const handleCreateLead = async (e) => {
      e.preventDefault()
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          company: company,
          email: email,
          note: note,
        })
      }

      const response = await fetch("/api/leads",request)
      
      if (!response.ok) {
        setErrorMessage("Something went wrong when creating the lead")
      } else {
        cleanFormData()
        getLeads()
      }
    }

    const handleUpdateLead = async (e) => {
      e.preventDefault()

      const request = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          company: company,
          note: note
        })
      }
      const response = await fetch(`api/leads/${leadId}`,request)

      if (!response.ok) {
        setErrorMessage("something wrong with the request")
      } else {
        cleanFormData()
        getLeads()
      }
    }

  return (    
          <form className="php-email-form">
              <div className="col-md-6 form-group">
                  <input 
                  type="text" 
                  className="form-control" 
                  id="firstname" 
                  placeholder="Lead First Name" 
                  required 
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
                  />
                  <input 
                  type="text" 
                  className="form-control" 
                  id="lastname" 
                  placeholder="Lead Last Name" 
                  required 
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                  />
                  <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="Lead Email" 
                  required 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />
                  <input 
                  type="text" 
                  className="form-control" 
                  id="company" 
                  placeholder="Lead Company" 
                  required 
                  value={company}
                  onChange={(e)=>setCompany(e.target.value)}
                  />
                  <input 
                  type="text" 
                  className="form-control" 
                  id="note" 
                  placeholder="Any notes about this lead" 
                  required 
                  value={note}
                  onChange={(e)=>setNote(e.target.value)}
                  />                            
                  <ErrorMessage message={errorMessage} />
                  { leadId ? (<div className="text-center"><button className='btn btn-info' type="submit" onClick={handleUpdateLead}>Update Lead</button></div>)
                  : (<div className="text-center"><button className='btn btn-success' type="submit" onClick={handleCreateLead}>Create Lead</button></div>)
                }
                  
              </div>                        
          </form> 
  )
}

export default LeadForm