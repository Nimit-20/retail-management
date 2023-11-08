import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import './Orders.css'
import { useNavigate } from 'react-router-dom';
function Orders({loginDetails}) {
  const store_id = loginDetails.store_id;
  const [ItemID, setItemID] = useState(0);
  const [Quantity, setQuantity] = useState(1);
  const [Items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    if (store_id) {
     console.log("selected store is: " + store_id);
      axios.get(`http://localhost:8080/items-by-store?store_id=${store_id}`)
        .then((response) => {
          console.log('Response from server:', response.data); 
          setItems(response.data.items);
        })
        .catch((error) => {
          console.error('Error fetching item_ids:', error);
        });
    }
  }, [store_id]);
  const handleOrderSubmit = () => {
    axios
      .post("http://localhost:8080/order-create", {
        store_id: store_id,
        item_id: ItemID,
        quantity: Quantity,
      })
      .then((response) => {
        console.log(response);
      });
  };
  useEffect(() => {
    // Fetch order information for the current store
    axios
      .get(`http://localhost:8080/orders?store_id=${store_id}`) // Assuming you have an endpoint to fetch orders
      .then((response) => {
        setOrders(response.data);
      });
  }, [store_id]);

  function formatDatesInPlace(orders) {
    orders.forEach((order) => {
       const dateObject = new Date(order.date);
       const formattedDate = dateObject.toISOString().split('T')[0];
       order.date = formattedDate;
    }
    )
 }
  formatDatesInPlace(orders);

  return (
    <div className='div'>
       <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
      <h2>Orders</h2>
      <div>
        <label htmlFor="item-select">Select an item:</label>
        <select
          id="item-select"
          value={ItemID}
          onChange={(e) => setItemID(e.target.value)}
        >
          <option value={0}>Select an item</option>
          {Items.map((item) => (
            <option key={item.item_id} value={item.item_id}>
              {`${item.item_name}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity-input">Quantity:</label>
        <input
          type="number"
          id="quantity-input"
          value={Quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button onClick={handleOrderSubmit}>Submit Order</button>

      <h2>Previous Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.item_id}</td>
              <td>{order.name} - {order.brand}</td>
              <td>{order.quantity}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders