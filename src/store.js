import { createStore } from "@reduxjs/toolkit";

export const store = createStore(reducer);

function reducer(state = { save:false,firstName:undefined,lastName:undefined,street:undefined,city:undefined,zipcode:undefined, state:undefined, department:undefined,userData:[]}, action) {
  if (action.type === "setState"){
    return{
    ...state,
    state:action.payload
    }
  }
  if (action.type === "setDepartment"){
    return{
      ...state,
      department:action.payload
    }
  }
  if(action.type === 'setFirstName'){
    return{
      ...state,
      firstName:action.payload
    }
  }
  if(action.type === 'setLastName'){
    return{
      ...state,
      lastName:action.payload
    }
  }
  if(action.type === 'setStreet'){
    return{
      ...state,
      street:action.payload
    }
  }
  if(action.type === 'setCity'){
    return{
      ...state,
      city:action.payload
    }
  }
  if(action.type === 'setZipcode'){
    return{
      ...state,
      zipcode:action.payload
    }
  }
  if (action.type === "setSaveState"){
    let oldUserData = state.userData
    return{
      ...state,
      userData:[...oldUserData,action.payload]
    }
  }
  return state
}