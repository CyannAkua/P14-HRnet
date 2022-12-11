import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Table from "cy-s_table_component"

export default function EmployeeList(){
  let data = useSelector((state)=>state.userData)
  if(data.length == 0 || data == undefined){
    return(
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <Link to="/">Home</Link>
    </div> )
  }
  else{
  return(
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <Table data={data} header={tableColumns}></Table>
      <Link to="/">Home</Link>
    </div>  
  )}
}

let tableColumns =[
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Start Date', key: 'startDate' },
  { title: 'Department', key: 'department' },
  { title: 'Date of Birth', key: 'dateOfBirth' },
  { title: 'Street', key: 'street' },
  { title: 'City', key: 'city' },
  { title: 'State', key: 'state' },
  { title: 'Zip Code', key: 'zipCode' },
]