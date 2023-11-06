import React from 'react'
import { useEffect, useState } from 'react';
import './Purchases.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Purchases({ loginDetails }) {
   const store_id = loginDetails.store_id;
   const [purchases, setPurchases] = useState([]);
   const navigate = useNavigate()
   useEffect(() => {
      // Use the login details to get store details from the backend
      axios
         .post("http://localhost:8080/purchases", {
            store_id: store_id,
         })
         .then((response) => {
            if (response.data.rows.length > 0) {
               setPurchases(response.data.rows);
               
            } else if (response.data.err) {
               console.log(response.data.err);
            } else {
               console.log("Successfully sent req to server for " + store_id);
            }
         });
   }, [store_id]);

   function formatDatesInPlace(purchases) {
      purchases.forEach((purchase) => {
         const dateObject = new Date(purchase.date);
         const formattedDate = dateObject.toISOString().split('T')[0];
         purchase.date = formattedDate;

      }
      )
   }
   formatDatesInPlace(purchases);
   return (
      <div className='div'>
         <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
         <h2>Purchases</h2>
         <table>
            <thead>
               <tr>
                  <th>Purchase ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Time</th>
               </tr>
            </thead>
            <tbody>
               {purchases.map((purchase, index) => (
                  <tr key={index}>
                     <td>{purchase.purchase_id}</td>
                     <td>{purchase.amount}</td>
                     <td>{purchase.date}</td>
                     <td>{purchase.time}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );

}

export default Purchases