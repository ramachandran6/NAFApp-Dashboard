import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import './TicketHistoryTable.css'

const TicketHistoryTable = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`https://localhost:7264/TicketHistory/${props.ticketRefnum}`).then((res) => { console.log(res); setData(res.data)})
    },[])
    
  return (
    <div className="tableCard">
            <table className='thTable'>
                <tr className='thRow'>
                  <th className='thHeader'>ticketRefNum</th>
                  <th className='thHeader'>status</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key} className='thRow'>
                            <td className='thData'>{val.ticketRefNum}</td>
                            <td className='thData'>{val.status}</td>
                        </tr>
                    )
                })}
              <button onClick={()=> props.close()}>
                  close
              </button>
          </table>
        </div>
  )
}

export default TicketHistoryTable