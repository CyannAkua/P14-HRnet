import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { DepartmentDropdown,StateDropdown } from "../components/dropdowns";
import { useDispatch,useSelector } from "react-redux";
import { store } from "../store";
import Modal from 'react-modal';
import './modal.css'

export default function Index() {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'visible',
    },
  };
  
  function UserModal() {
    const [modalIsOpen, setIsOpen] = useState();
    const [defined,setDefined] = useState(false);
    function setSaveState(){
      let state = store.getState().state
      let department = store.getState().department
      let firstName = store.getState().firstName
      let lastName = store.getState().lastName
      let street = store.getState().street
      let city = store.getState().city
      let zipcode = store.getState().zipcode
      let sDate = startDate.toISOString().split('T')[0] 
      let bDate = birthDate.toISOString().split('T')[0]
      if((firstName && lastName && bDate && sDate && street && city && zipcode && state && department && department && state) !== undefined){ 
        setDefined(true);
        openModal()
        dispatch({type:'setSaveState',payload:{firstName,lastName,dateOfBirth:bDate,startDate:sDate,street,city,zipCode:zipcode,state,department}})   
        document.getElementById('create-employee').reset();
        dispatch({type:'setFirstName',payload:undefined})
        dispatch({type:'setLastName',payload:undefined})
        dispatch({type:'setStreet',payload:undefined})
        dispatch({type:'setCity',payload:undefined})
        dispatch({type:'setZipcode',payload:undefined})
      }
      else{
        setDefined(false);
        openModal()
      } 
             
    }
    function openModal(){
      setIsOpen(true)
    }
    function closeModal() {
      setIsOpen(false);
    }
    
    return (
      <div>
        <button type='button' className='saveButton' onClick={()=>{setSaveState()}}>Save</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <h2>{defined ? 'Employee Created!'  : 'You must fill all the fields' }</h2>
          <svg className='closeIcon' onClick={()=>closeModal()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg> 
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to='employee-list'>View Current Employees</Link>
        <h2>Create Employee</h2>
        <form id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" onChange={(event) =>dispatch({type:'setFirstName',payload:event.target.value})}/>

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" onChange={(event) => dispatch({type:'setLastName',payload:event.target.value})}/>

          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker selected={birthDate} onChange={(date) => setBirthDate(date)} />

          <label htmlFor="start-date">Start Date</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" onChange={(event) => dispatch({type:'setStreet',payload:event.target.value})}/>

            <label htmlFor="city">City</label>
            <input id="city" type="text" onChange={(event) => dispatch({type:'setCity',payload:event.target.value})}/>
            <label htmlFor="state">State</label>
            <StateDropdown/>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" onChange={(event) => dispatch({type:'setZipcode',payload:event.target.value})}/>
          </fieldset>

          <label htmlFor="department">Department</label>
          <DepartmentDropdown/>
        </form>
        <UserModal/>
      </div>
    </div>
  );
}

