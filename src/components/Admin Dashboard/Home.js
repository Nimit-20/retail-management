import React, { useState, useEffect } from 'react';
import SalesOverTimeChart from './SalesOverTimeChart';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import axios from 'axios'; // Import Axios

function Home({ loginDetails }) {
  const [productCount, setProductCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [alertCount, setAlertCount] = useState(0);

  const store_id = loginDetails.store_id;
 
  useEffect(() => {
    
    axios
      .get(`http://localhost:8080/alerts/count?store_id=${store_id}`)
      .then((response) => {
        setAlertCount(response.data[0].count); // Set alertCount to the count value
      });
}, [store_id]);

  useEffect(() => {
    // Fetch order information for the current store
    axios
      .get(`http://localhost:8080/employees/count?store_id=${store_id}`) // Assuming you have an endpoint to fetch orders
      .then((response) => {
        setEmployeeCount(response.data[0].count);
      });
  }, [store_id]);

  useEffect(() => {
    // Fetch order information for the current store
    axios
      .get(`http://localhost:8080/products/count?store_id=${store_id}`) // Assuming you have an endpoint to fetch orders
      .then((response) => {
        setProductCount(response.data[0].count);
      });
  }, [store_id]);
  
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h2>Welcome, {loginDetails.name}!</h2>
            <h3>Store ID: {loginDetails.store_id}</h3>
            <h3>Location: {loginDetails.city}, {loginDetails.state}, {loginDetails.country}</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS AVAILABLE</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{productCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>EMPLOYEES </h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{employeeCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>{alertCount}</h1>
            </div>
        </div>

        <SalesOverTimeChart loginDetails={loginDetails}/>
    </main>
);
}

export default Home;
