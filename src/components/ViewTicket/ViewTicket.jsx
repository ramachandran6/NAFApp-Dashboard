import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import './ViewTicket.css'
import TicketHistoryTable from '../TicketHistoryTable/TicketHistoryTable';
import Popup from 'reactjs-popup';
const ViewTicket = (props) => {
    const [data, setData] = useState([]) 
    const [department,setDepartment] = useState("")
    useEffect(() => {
        // axios.get(`https://localhost:7264/TicketDetails/${props.data.id}`).then((res) => { console.log(res); setData(res.data) });
        // axios.get(`https://localhost:7264/LookUpDetails/${data.departmentLookUpId}`).then((res)=> {  console.log(res);setDepartment(res.value)})
    },[])
  return (
      <div className='viewTicket'>
          <div className='ticket'>
            <h2>{props.val.title}</h2>
            <p>Description : {props.val.description}</p>
            <p>Assigned to : {props.val.owner}</p>
            <p>Assigned Department : {props.department}</p>
            <p>Start Date : {props.val.startDate}</p>
            <p>End Date : {props.val.endDate}</p>
            <p>Status : {props.val.status}</p>
            <p>Priority : {props.val.priority}</p>
            <p>Severity : {props.val.severity}</p>
            <p>Due by : {props.val.age} days</p>
            <p>Attachment : {props.val.attachment}</p>
                  <Popup trigger={<button>show history</button>} modal nested>
                      {close => (
                          <TicketHistoryTable ticketRefnum={props.val.ticketRefnum} close={close} />
                      )}
                  </Popup>
              <button onClick={()=> props.close()}>
                  close
              </button>
          </div>
          
      </div>
      
  )
}

export default ViewTicket