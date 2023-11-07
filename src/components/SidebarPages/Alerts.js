import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Alerts({loginDetails}) {
  const [alerts, setAlerts] = useState([]);
  const store_id = loginDetails.store_id;
   const navigate = useNavigate()
   useEffect(() => {
      axios
         .post("http://localhost:8080/alerts", {
            store_id: store_id,
         })
         .then((response) => {
            if (response.data.rows.length > 0) {
               setAlerts(response.data.rows);
               
            } else if (response.data.err) {
               console.log(response.data.err);
            } else {
               console.log("Successfully sent req to server for " + store_id);
            }
         });
   }, [store_id]);

   function formatDatesInPlace(alerts) {
      alerts.forEach((alert) => {
         const dateObject = new Date(alert.alert_date);
         const formattedDate = dateObject.toISOString().split('T')[0];
         alert.date = formattedDate;
      }
      )
   }
   formatDatesInPlace(alerts);
   return (
      <div className='div'>
         <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
         <h2>Alerts</h2>
         <table>
            <thead>
               <tr>
                  <th>Alert ID</th>
                  <th>Date</th>
                  <th>Item ID</th>
                  <th>Item Name</th>
               </tr>
            </thead>
            <tbody>
               {alerts.map((alert, index) => (
                  <tr key={index}>
                     <td>{alert.alert_id}</td>
                     <td>{alert.date}</td>
                     <td>{alert.item_id}</td>
                     <td>{`${alert.brand} - ${alert.name}`}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );

}

export default Alerts;
