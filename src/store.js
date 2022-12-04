import { createStore } from "@reduxjs/toolkit";

export const store = createStore(reducer);

function reducer(state = { save:false, state:undefined, department:undefined,userData:[]}, action) {
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
  if (action.type === "setSaveState"){
    let oldUserData = state.userData
    return{
      ...state,
      userData:[...oldUserData,action.payload]
    }
  }
  return state
}