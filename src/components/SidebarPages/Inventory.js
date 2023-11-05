import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Inventory.css"
function Inventory({loginDetails}) { //TODO: retrieve all products and their quantities from the database
  
     const store_id = loginDetails.store_id;
     const [inventory, setInventory] = useState([]);

     useEffect(() => {
       // Use the login details to get store details from the backend
       axios
         .post("http://localhost:8080/inventory", {
           store_id: store_id,
         })
         .then((response) => {
           console.log(response.data);
           if (response.data.rows.length > 0) {
            setInventory(response.data.rows);
           } else if (response.data.err) {
             console.log(response.data.err);
           } else {
             console.log("Successfully sent req to server for " + store_id);
           }
         });
     }, [store_id]);
  
     return (
<div className='div'>
      <h2>Inventory</h2>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Name</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index}>
                <td>{item.item_id}</td>
                <td>{item.name}</td>
                <td>{item.total_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>  )
}

export default Inventory