import React from 'react'
import { useEffect, useState } from 'react';
import './Employees.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Employees({loginDetails}) {
  const store_id = loginDetails.store_id;
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    // Use the login details to get store details from the backend
    axios
    .post("http://localhost:8080/employees", {
      store_id: store_id,
    })
    .then((response) => {
      if (response.data.rows.length > 0) {
        setEmployees(response.data.rows);
      } else if (response.data.err) {
        console.log(response.data.err);
      } else {
        console.log("Successfully sent req to server for " + store_id);
      }
    });
}, [store_id]);

function formatDatesInPlace(employees) {
  employees.forEach((employee) => {
     const dateObject = new Date(employee.date_of_joining);
     const formattedDate = dateObject.toISOString().split('T')[0];
     employee.date_of_joining = formattedDate;
  }
  )
}
formatDatesInPlace(employees);

  return (
    <div className='div'>
         <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
      <h2>Employees</h2>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Date of Joining</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.employee_id}</td>
                <td>{employee.name}</td>
                <td>{employee.salary}</td>
                <td>{employee.date_of_joining}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Employees