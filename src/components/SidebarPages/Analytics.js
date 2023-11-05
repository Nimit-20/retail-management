import { useEffect } from 'react';
import React from 'react'
import axios from 'axios';
function Analytics({ loginDetails }) {
  const store_id = loginDetails.store_id
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
          console.log("Successfully logged in as " + store_id);
        }
      });
  }, [store_id]);

  return (
    <div>Analytics</div>
  )
}

export default Analytics