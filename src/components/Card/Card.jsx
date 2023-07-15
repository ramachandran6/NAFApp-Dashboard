import React, { useEffect, useState } from 'react'
import './Card.css'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { EditPage } from '../EditPage/EditPage'
import ViewTicket from '../ViewTicket/ViewTicket'

const Card = (props) => {
    // console.log(props.data)
    const [statusColor, setStatusColor] = useState("")
    const [diffLevelColor, setdiffLevelColor] = useState("")
    const [due, setDue] = useState("")
    useEffect(() => {
        switch (props.data.status) {
            case "assigned":
                setStatusColor("#8FD3F7")
                break;
            case "processing":
                setStatusColor("#E0C762")
                break;
            case "hold":
                setStatusColor("#F58A51")
                break;
            case "completed":
                setStatusColor("#2fbf71")
                break;
        }

        if (props.data.age > 0) {
            setDue("Due by : " + props.data.age);
        }
        else {
            setDue("Over due")
        }

        // switch (props.data.difficultyLevel) {
        //     case "high":
        //         setdiffLevelColor("#d64045")
        //         break;
        //     case "medium":
        //         setdiffLevelColor("#467599")
        //         break;
        //     case "low":
        //         setdiffLevelColor("#2fbf71")
        //         break;
        // }
        // console.log(statusColor)
    })
    
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
    const handleUpdate = (data) => {
        // useNavigate('/editPage',{data:data})
    }
  return (
      <div className='card'>
          <ul className='list1'>
              <li>{props.data.ticketRefnum}</li>
              <ul className='list2'>
                <li>{props.data.title}</li>
                <li>{props.data.startDate}</li>
                <li>{props.data.endDate}</li>
              </ul>
              <li>{props.data.createdBy}</li>
              <li>{props.data.owner}</li>
              <li className='status' style={{backgroundColor : statusColor}}>{props.data.status}</li>
              <ul className='list2'>
                  <li>P{props.data.priotity}</li>
                  <li>S{props.data.severity}</li>
                  <li>{ due }</li>
              </ul>
              <ul className='list2'>
                  <Popup trigger={<li><i className="fas fa-duotone fa-pen-to-square"></i></li>} modal nested>
                      {close => (
                          <EditPage data={props.data} close={close} />
                      )}
                  </Popup>
                  <li onClick={() => handleDelete(props.data.id,props.data.userId)}><i className="fas fa-solid fa-trash" style={{color: 'red'}}></i></li>
                  <button className= "btn-escalate"onClick={()=>{ handleEscalate(props.data.id)}}>escalate</button>
                  {/* <li><i className="fas fa-solid fa-escalator"></i></li> */}
              </ul>
              <ul className='list2'>
                    <Popup trigger={<li><i className="fas fa-sharp fa-solid fa-eye"></i></li>} modal nested>
                      {close => (
                          <ViewTicket data={props.data} close={close} />
                      )}
                    </Popup>
                  {props.data.age == 0 && <li><i className="fas fa-solid fa-envelope-open-text"></i></li>}
              </ul>

          </ul>
      </div>
  )
}

export default Card