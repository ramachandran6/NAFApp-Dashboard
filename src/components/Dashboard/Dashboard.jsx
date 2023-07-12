import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import axios from "axios";
const Dashboard = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7264/TicketDetails").then((res)=>setData(res.data));
  },[])
  

  // console.log(data)
  
  return (
    <div>
      {data.map((d) => {
        console.log(d)
        return <Card key={d.id} data={d} />
      })}
    </div>
  )
}

export default Dashboard