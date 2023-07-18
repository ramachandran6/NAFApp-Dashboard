import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import axios from "axios";
import './Dashboard.css'
import Popup from 'reactjs-popup';
import { EditPage } from '../EditPage/EditPage';
import ViewTicket from '../ViewTicket/ViewTicket';

const Dashboard = () => {

  const [data, setData] = useState([]);
  const [destinationdepartment,setDestinationdepartment] = useState("")

  useEffect(() => {
    axios.get("https://localhost:7264/TicketDetails").then((res)=>setData(res.data));
  },[])
  
  const handleEscalate = (id) => {
    axios.get(`https://localhost:7264/Escalate/${id}`).then((res) => {window.location.reload(); console.log(res)}).catch((er) => console.log(er));
  }

const handleDelete = (id,userId) => {
    axios
  .delete(`https://localhost:7264/TicketDetails/${id}&${userId}`)
  .then((res) => {
    window.location.reload();
  })
  .catch((er) => console.log(er));
    // axios.delete(`https://localhost:7264/TicketDetails/${id}`).then((res)=> console.log(res))
}

  // console.log(data)
  
  const handleStatus = (status) => {
    axios.get(`https://localhost:7264/TicketDetailsByStatus/${status}`).then((res) => setData(res.data));
  }

  const handleRefnum = (ticketRefnum) => {
    axios.get(`https://localhost:7264/TicketDetailsByRef/${ticketRefnum}`).then((res) => setData(res.data));
  }

  const handleDepartment = (department) => {
    // console.log(department)
    axios.get(`https://localhost:7264/TicketDetails/${department}`).then((res)=> setData(res.data))
  }
  return (
    <div>
      <div className='topContainer'>
        <div>
          <button className='btn' onClick={()=> handleStatus("all")}>All</button>
          <button className='btn' onClick={()=> handleStatus("assigned")}>Assigned</button>
          <button className='btn' onClick={()=> handleStatus("processing")}>Processing</button>
          <button className='btn' onClick={()=> handleStatus("hold")}>Hold</button>
          <button className='btn' onClick={() => handleStatus("completed")}>Completed</button>
        </div>
        <select
            className="input-cticket"
            id="destdepartment"
          onChange={(e) => {  handleDepartment(e.target.value)}}
          >
            <option value="">--select--</option>
            <option value="wpr">WPR</option>
            <option value="hr">HR</option>
            <option value="engineering">Engineering</option>
            <option value="payroll">Payroll</option>
            <option value="qa">QA</option>
          </select>
        <div class="search-container">
          <form>
            <input type="text" placeholder="Search.." id="search" name="search"  className='searchBar' />
            <button className='searchBtn' onClick={(e) => { e.preventDefault();handleRefnum(document.getElementById("search").value)}} type="submit"><i className="fas fa-search"></i></button>
          </form>
        </div>
      </div>
      <table>
          <tr>
            <th>TicketRefNum</th>
            <th>created by</th>
            <th>assigned to</th>
            <th>Status</th>
            <th>start date</th>
            <th>end date</th>
            <th>priority</th>
            <th>severity</th>
            <th>due by</th>
            <th>view</th>
            <th>edit</th>
            <th>delete</th>
            <th>Escalate</th>
        </tr>

        {
          data.map((val) => {
              return (
                  <tr>
                      <td>{val.ticketRefnum}</td>
                      <td>{val.createdBy}</td>
                      <td>{val.owner}</td>
                      <td>{val.status}</td>
                      <td>{val.startDate}</td>
                  <td>{val.endDate}</td>
                  <td>{val.priority}</td>
                  <td>{ val.severity}</td>
                      <td>{val.age}</td>
                      <td><Popup trigger={<i className="fas fa-sharp fa-solid fa-eye"></i>} modal nested>
                          {close => (
                              <ViewTicket val={val} close={close} />
                          )}
                        </Popup></td>
                        <td><Popup trigger={<i className="fas fa-duotone fa-pen-to-square"></i>} modal nested>
                            {close => (
                                <EditPage val={val} close={close} />
                            )}
                      </Popup></td>
                      <td><i onClick={() => handleDelete(val.id,val.userId)} className="fas fa-solid fa-trash" style={{color: 'red'}}></i></td>
                      <td><button className= "btn-escalate"onClick={()=>{ handleEscalate(val.id)}}>escalate</button></td>
                  </tr>
              )
          })}
        
          
        
        </table>
    </div>
  )
}

export default Dashboard