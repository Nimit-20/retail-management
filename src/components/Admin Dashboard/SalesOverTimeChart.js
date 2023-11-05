import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';
import axios from 'axios';
const SalesOverTimeChart = ({loginDetails}) => {
     const store_id = loginDetails.store_id
     const [data, setData] = useState([]);
     useEffect(() => {
       // Use the login details to get store details from the backend
       axios
       .post("http://localhost:8080/salesovertime", {
         store_id: store_id,
       })
       .then((response) => {
         if (response.data.rows.length > 0) {
          console.log(response.data.rows);
           setData(response.data.rows);
         } else if (response.data.err) {
           console.log(response.data.err);
         } else {
           console.log("Successfully sent req to server for " + store_id);
         }
       });
   }, [store_id]);


   function formatDatesInPlace(data) {
     data.forEach((value) => {
        const dateObject = new Date(value.date);
        const formattedDate = dateObject.toISOString().split('T')[0];
        value.date = formattedDate;
     }
     )
  }
     formatDatesInPlace(data);

  return (
     <div style={{ width: '100%', height: '400px' }}> {/* Set a specific height */}
     <h2>Total Sales Over Time</h2>
     <ResponsiveContainer width="100%" height="100%">
       <LineChart data={data}>
         <XAxis dataKey="date" />
         <YAxis />
         <CartesianGrid strokeDasharray="3 3" />
         <Tooltip />
         <Legend />
         <Line type="monotone" dataKey="total_sales" stroke="#8884d8" />
       </LineChart>
     </ResponsiveContainer>
   </div>
  );
};

export default SalesOverTimeChart;
