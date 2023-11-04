import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
function Purchases({loginDetails}) {
  const store_id = loginDetails.store_id;
  useEffect(() => {
    // Use the login details to get store details from the backend
    axios
      .post("http://localhost:8080/analytics", {
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

     //TODO: send a request to the server to retrieve the purchase data
  return (
    <div>Purchases</div>
  )
}

export default Purchases