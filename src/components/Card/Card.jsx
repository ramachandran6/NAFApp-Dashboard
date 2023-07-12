import React, { useEffect, useState } from 'react'
import './Card.css'
const Card = (props) => {
    // console.log(props.data)
    const [statusColor, setStatusColor] = useState("")
    const [diffLevelColor, setdiffLevelColor] = useState("")
    
    useEffect(() => {
        switch (props.data.status) {
            case "assigned":
                setStatusColor("#8FD3F7")
                break;
            case "pending":
                setStatusColor("#E0C762")
                break;
            case "hold":
                setStatusColor("#F58A51")
                break;
            case "completed":
                setStatusColor("#2fbf71")
                break;
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
    },[statusColor])
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
                  <li>Due by :{props.data.age}</li>
              </ul>
              
          </ul>
      </div>
  )
}

export default Card