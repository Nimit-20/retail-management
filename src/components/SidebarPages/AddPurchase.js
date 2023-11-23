// made for demo purposes, this won't be there in the actual implementation of a similar system.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPurchase.css'
import { useNavigate } from 'react-router-dom';
function AddPurchase() {
  const navigate = useNavigate()
  const [storeOptions, setStoreOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [selectedStore, setSelectedStore] = useState(0);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch unique store_id values
  useEffect(() => {
    axios.get('http://localhost:8080/store-ids')
      .then((response) => {
        setStoreOptions(response.data.storeIds);
      })
      .catch((error) => {
        console.error('Error fetching store_ids:', error);
      });
  }, []); 

  // Fetch available item_id values based on the selected store
  useEffect(() => {
    if (selectedStore) {
     console.log("selected store is: " + selectedStore);
      axios.get(`http://localhost:8080/items-by-store?store_id=${selectedStore}`)
        .then((response) => {
          console.log('Response from server:', response.data); 
          setItemOptions(response.data.items);
        })
        .catch((error) => {
          console.error('Error fetching item_ids:', error);
        });
    }
  }, [selectedStore]);


  useEffect(() => {
    const calculatedTotalAmount = purchaseItems.reduce((total, item) => {
      if (item.item_id && item.quantity) {
        const selectedItem = itemOptions.find((option) => option.item_id === item.item_id);
        if (selectedItem) {
          const itemTotal = selectedItem.price * item.quantity;
          console.log(`Item: ${selectedItem.item_id}, Price: ${selectedItem.price}, Quantity: ${item.quantity}, Total: ${itemTotal}`);
          total += itemTotal;
        }
      }
      return total;
    }, 0);
    console.log("Total Amount: " + calculatedTotalAmount);
  
    setTotalAmount(100);
  }, [purchaseItems, itemOptions]);
  
const handlePurchaseSubmit = () => {
  // Prepare the data to be sent to the server
  const purchaseData = {
    amount: totalAmount,
    date: new Date().toISOString().split('T')[0], 
    time: new Date().toTimeString().split(' ')[0], 
    customer_id: 1, 
    store_id: selectedStore,
  };

  const purchaseItemsData = purchaseItems.map((item) => ({
    item_id: parseInt(item.item_id),
    quantity: item.quantity,
})
  )
  console.log(purchaseItemsData);

  // Send the POST request to your backend to create the purchase
  axios
    .post('http://localhost:8080/create-purchase', {
      purchase: purchaseData,
      purchaseItems: purchaseItemsData,
    })
    .then((response) => {
      console.log('Purchase created successfully:', response.data);
      setPurchaseItems([]);
    })
    .catch((error) => {
      console.log(error);
      console.error('Error creating purchase:', error);

    });
};

  const addRow = () => {
    setPurchaseItems([...purchaseItems, { item: '', quantity: 1 }]);
  };

  const removeRow = (index) => {
    const updatedItems = [...purchaseItems];
    updatedItems.splice(index, 1);
    setPurchaseItems(updatedItems);
  };

  const updateRow = (index, field, value) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index][field] = value;
    setPurchaseItems(updatedItems);
  };
  return (
     <div className='div'>
      <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
      <h1>Add Purchase</h1>
      <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
        <option value="">Select Store</option>
        {storeOptions.map((store) => (
          <option key={store} value={store}>
            {store}
          </option>
        ))}
      </select>

      {purchaseItems.map((item, index) => (
  <div key={index} className="item-row">
    <label htmlFor={`item-${index}`}>Item {index + 1}:</label>
    <select
      id={`item-${index}`}
      value={item.item_name}
      onChange={(e) => updateRow(index, 'item_id', e.target.value)}
      className="item-select"
    >
      <option value="">Select Item</option>
      {itemOptions.map((option) => (
        <option key={option.item_id} value={option.item_id}>
          {option.item_name}
        </option>
      ))}
    </select>
    <label htmlFor={`quantity-${index}`}>Quantity:</label>
    <input
      type="number"
      id={`quantity-${index}`}
      value={item.quantity}
      onChange={(e) => updateRow(index, 'quantity', parseInt(e.target.value))}
      className="quantity-input"
    />
    <button className="remove-button" onClick={() => removeRow(index)}>
      Remove
    </button>
  </div>
))}
      <button className = 'add-item-button' onClick={addRow}>Add Item</button>
      <div className='total-amount'>Total Amount: {totalAmount}</div>
      <button className='submit-button' onClick={handlePurchaseSubmit}>Submit Purchase</button>
    </div>
   
  );
}

export default AddPurchase;
