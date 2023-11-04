import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Customers({ loginDetails }) { // TODO: display customer details that have made purchases from the store
  
  const store_id = loginDetails.store_id;
  
  useEffect(() => {
    // Use the login details to get store details from the backend
    axios
      .post("http://localhost:8080/customers", {
        store_id: store_id,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message) {
          console.log(response.data.message);
        } else if (response.data.err) {
          console.log(response.data.err);
        } else {
          console.log("Successfully sent req to server for " + store_id);
        }
      });
  }, [store_id]);
  
  return (
    <div>Customers</div>
  )
}

export default Customers