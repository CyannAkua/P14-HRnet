import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/index';
import EmployeeList from './pages/employeeList';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='employee-list' element={<EmployeeList/>}/>
        </Routes>
      </Router> 
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
