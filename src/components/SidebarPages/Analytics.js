import { useEffect, useState } from 'react';
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Analytics({ loginDetails }) {
  const store_id = loginDetails.store_id
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
      // Use the login details to get store details from the backend
      axios
         .post("http://localhost:8080/analytics-customer", {
            store_id: store_id,
         })
         .then((response) => {
            if (response.data.rows.length > 0) {
               setCustomers(response.data.rows);
            } else if (response.data.err) {
               console.log(response.data.err);
            } else {
               console.log("Successfully sent req to server for " + store_id);
            }
         });
   }, [store_id]);

   useEffect(() => {
    axios
       .post("http://localhost:8080/analytics-items", {
          store_id: store_id,
       })
       .then((response) => {
          if (response.data.rows.length > 0) {
             setItems(response.data.rows);
          } else if (response.data.err) {
             console.log(response.data.err);
          } else {
             console.log("Successfully sent req to server for " + store_id);
          }
       });
 }, [store_id]);

  // // top recurring customers with most purchases
  // employee of the month
  // top selling items
  // items sold last year that weren't sold this year ( purchases table )
  return (
    <div className='div'>
      <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
      <h2>Top 10 Customers with most Purchases in the past month</h2>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Number of Purchases made</th>
              <th>Total Amount Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.customer_name}</td>
                <td>{customer.number_of_purchases}</td>
                <td>{customer.total_amount_spent}</td>
              </tr>
            ))}
          </tbody>
        </table>

      <h2>Employee of the Month</h2>
      <h2>Top Selling Items</h2>
      <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Brand</th>
              <th>Type of Item</th>
              <th>Total Quantity Sold</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.item_name}</td>
                <td>{item.brand}</td>
                <td>{item.type}</td>
                <td>{item.total_quantity_sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      <h2>poorly selling items</h2>

    </div>
  )
}

export default Analytics