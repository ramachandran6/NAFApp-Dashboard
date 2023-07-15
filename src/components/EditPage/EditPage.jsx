import "./EditPage.css";
import EditPageValidation from "./EditPageValidation";
import { useEffect, useState } from "react";

export function EditPage(props) {
  const [status, setstatus] = useState(props.data.status);
  const [destinationdepartment, setDestinationdepartment] = useState("");
  const [enddatetime, setEnddatetime] = useState(props.data.endDate);
  const [ticketpriority, setTicketpriority] = useState(props.data.priority);
  const [ticketseverity, setTicketseverity] = useState(props.data.severity);
  const [attachments, setAttachments] = useState(props.data.attachments);

    useEffect(() => {
        fetch(`https://localhost:7264/LookUpDetails/${props.data.departmentLookUpId}`, {
           method : 'GET'
        }).then((res) => res.json).then((val) => { setDestinationdepartment(val.value); console.log(val)})
    },[])
  const [errors, setErrors] = useState({});
    console.log(props.data)
  const handleFormSubmit = (event) => {
      event.preventDefault();
      
    const jsonObject = JSON.stringify({
      toDepartment: destinationdepartment,
      endDate: enddatetime,
      priority: ticketpriority,
      severity: ticketseverity,
      attachments: attachments,
      status:status
    });

    console.log(jsonObject);
    // axios.get("https://localhost:7264/TicketDetails",querystring.stringify(jsonObject)).then((res)=> console.log(res));
    // axios.post("https://localhost:7264/TicketDetails/1",jsonObject).then((res)=> console.log(res));

    fetch(`https://localhost:7264/TicketDetails/${props.val.id}&${props.val.userId}`, {
      method: "PUT",
      body: jsonObject,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
      window.location.reload()
  };

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  return (
    <div className="create-container">
      <form className="form-cticket">
        <div className="dest-dept">
          <label className="lbl">
            Destination Department: 
          </label>
          <select
            className="input-cticket"
            id="destdepartment"
            onChange={(event)=> setDestinationdepartment(event.target.value)}
          >
            <option value="">--select--</option>

            <option value="wpr">WPR</option>

            <option value="hr">HR</option>

            <option value="engineering">Engineering</option>

            <option value="payroll">Payroll</option>

            <option value="qa">QA</option>
          </select>
        </div>

        <div className="enddatetime">
          <label className="lbl">End Date Time : </label>
          <input
            className="input-cticket"
            name="enddatetime"
            id="enddatetime"
            onChange={(event) => setEnddatetime(event.target.value)}
            type="date"
          />
        </div>

        <div className="tktpriority">
          <label className="lbl">
            Ticket Priority : <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <select
            className="input-cticket"
            id="tktpriority"
            onChange={(event)=> setTicketpriority(event.target.value)}
          >
            <option value={0}>--Select--</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div className="tktseverity">
          <label className="lbl">
            Ticket Severity : <span style={{ color: "red" }}>*</span>
          </label>
          <select
            className="input-cticket"
            id="tktseverity"
            onChange={(event)=>setTicketseverity(event.target.value)}
          >
            <option value={0}>--select--</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div className="attachments">
          <label className="lbl" for="">
            Attachments :{" "}
          </label>
          <input
            className="input-cticket"
            id="attachments"
            name="attachments"
            type="file"
            onChange={(event) => setAttachments(event.target.value)}
          />
        </div>
        <div className="status">
          <label className="lbl">Status : </label>
          <textarea
            className="input-cticket"
            type="text"
            name="status"
            id="status"
            onChange={(event) => setstatus(event.target.value)}
          />
        </div>
        <button
          className="sub-ct"
          variant="contained"
          onClick={handleFormSubmit}
        >
          Update
              </button>
              <button onClick={()=> props.close()}>
                  close
              </button>
      </form>
    </div>
  );
}