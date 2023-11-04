import React from 'react'
import { useEffect, useState } from 'react';
import './Employees.css'
import axios from 'axios';

function Employees({loginDetails}) {
  const store_id = loginDetails.store_id;
  const [employees, setEmployees] = useState([]);
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

  return (
    <div className='div'>
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
            {employees.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.employee_id}</td>
                <td>{purchase.name}</td>
                <td>{purchase.salary}</td>
                <td>{purchase.date_of_joining}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Employees