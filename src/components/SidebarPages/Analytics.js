import { useEffect, useState } from 'react';
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Analytics({ loginDetails }) {
  const store_id = loginDetails.store_id
  // const [customers, setCustomers] = useState([]);
  // const [items, setItems] = useState([]);
  const navigate = useNavigate()
  const [topCustomersData, setTopCustomersData] = useState([]);
    const [topSellingItemsData, setTopSellingItemsData] = useState([]);
    const [employeeOfTheMonthData, setEmployeeOfTheMonthData] = useState([]);
    const [leastSellingItemsData, setLeastSellingItemsData] = useState([]);

    useEffect(() => {
        axios
            .post("http://localhost:8080/analytics_data", {
                store_id: store_id,
            })
            .then((response) => {
                if (response.data) {
                    const {
                        topCustomers,
                        topSellingItems,
                        employeeOfTheMonth,
                        leastSellingItems,
                    } = response.data;

                    // Update state with retrieved data
                    setTopCustomersData(topCustomers);
                    setTopSellingItemsData(topSellingItems);
                    setEmployeeOfTheMonthData(employeeOfTheMonth);
                    setLeastSellingItemsData(leastSellingItems);
                } else {
                    console.log("Error in fetching analytics data");
                }
            })
            .catch((error) => {
                console.error("Request error:", error);
                // Handle the error as needed
            });
    }, [store_id]);
    console.log(topCustomersData);
    console.log(topSellingItemsData);
    console.log(employeeOfTheMonthData);
    console.log(leastSellingItemsData);
  // // top recurring customers with most purchases
  // employee of the month
  // top selling items
  // items sold last year that weren't sold this year ( purchases table )
  return (
    <div className='div'>
      <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
      <br />
      <h2>Top 5 Customers with Most Purchases in the last 6 months</h2>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Number of Purchases made</th>
              <th>Total Amount Spent</th>
            </tr>
          </thead>
          <tbody>
            {topCustomersData.map((customer, index) => (
              <tr key={index}>
                <td>{customer.customer_name}</td>
                <td>{customer.number_of_purchases}</td>
                <td>{customer.total_amount_spent}</td>
              </tr>
            ))}
          </tbody>
        </table>

   <br />
      <h2>Top 5 Items Sold in the past Month</h2>
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
            {topSellingItemsData.map((item, index) => (
              <tr key={index}>
                <td>{item.item_name}</td>
                <td>{item.brand}</td>
                <td>{item.type}</td>
                <td>{item.total_quantity_sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      <h2>Items sold that sold well last year, but have not been bought this year</h2>
      <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Brand</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {leastSellingItemsData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Analytics