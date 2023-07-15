const EditPageValidation = (values) => {
  let errors = {};
  if (!values.titleCt) {
    errors.titleCt = "*Title is required.";
  }
  // if(! destinationdepartment==='select'){
  //     errors.destinationdepartment="*Destination Department is required.";
  // }
  // if(/select/.test( destinationdepartment)){
  //     errors.destinationdepartment="*Destination Department is required.";
  //    }
  if (values.destinationdepartment === "") {
    errors.destinationdepartment = "Please select a value.";
  } else {
    errors.email = "";
  }
  if (!values.ticketpriority === "") {
    errors.ticketpriority = "*Ticket Priority is required.";
  } else {
    errors.email = "";
  }
  if (!values.ticketseverity === "") {
    errors.ticketseverity = "*Ticket Severity is required.";
  } else {
    errors.email = "";
  }
  return errors;
};
export default EditPageValidation;