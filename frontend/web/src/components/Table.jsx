import React, {useContext,useState,useEffect} from 'react'
import moment from 'moment'
import ErrorMessage from './ErrorMessage'
import { UserContext } from '../context/UserContext'
import LeadForm from './LeadForm'

const Table = () => {
  const [token] = useContext(UserContext)
  const [leads,setLeads] = useState(null)
  const [errorMessage,setErrorMessage] = useState("")
  const [loaded,setLoaded] = useState(false)
  const [leadId,setLeadId] = useState(null)

  const toggleUpdateLead = async (leadId) => {
    setLeadId(leadId)
  }

  const handleDeleteLead = async (leadId) => {
    const request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
    await fetch(`/api/leads/${leadId}`,request)

    getLeads()
  }

  const getLeads = async () => {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
    const response = await fetch("/api/leads",request)    

    if (!response.ok) {
      setErrorMessage("Something went wrong, can't get the leads")
    } else {
      const data = await response.json()
      setLeads(data)
      setLoaded(true)
    }
  }

  useEffect( () => {
    getLeads()
  },[])

  return (
    <section id="hero" className="d-flex align-items-center">
    <div className="container position-relative" data-aos="fade-up" data-aos-delay="100">      
      
      <div className="row justify-content-center">
      <div className="col-xl-7 col-lg-9 text-center">
          {loaded && leads ? (
            <div>
            <h2>Table</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Lead ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Company</th>
                  <th scope="col">Note</th>
                  <th scope="col">Last Updated</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.id}</td>
                    <td>{lead.first_name}</td>
                    <td>{lead.last_name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.company}</td>
                    <td>{lead.note}</td>
                    <td>{moment(lead.date_updated).format("MMM Do YY")}</td>
                    <td>
                      <div className='d-flex'>
                      <button className='btn btn-info' onClick={()=>toggleUpdateLead(lead.id)} >Update</button>
                      <button className='btn btn-danger' onClick={()=>handleDeleteLead(lead.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>))}                        
              </tbody>
            </table>
            </div>
          ) : <p>loading..</p>}          
        </div>
      </div>  

      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-9 text-center">
          <LeadForm 
            leadId={leadId}
            token={token} 
            setErrorMessage={setErrorMessage}
            getLeads={getLeads}
            />
          <ErrorMessage message={errorMessage} />
        </div>
      </div>

    </div>
    </section>
  )
}

export default Table