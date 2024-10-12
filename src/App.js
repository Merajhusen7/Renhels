import React, { useState, useEffect } from 'react';

function App() {
  // Initialize bike stock from localStorage or default to 100
  const [stock, setStock] = useState(() => {
    const savedStock = localStorage.getItem('bikeStock');
    return savedStock ? Number(savedStock) : 100;
  });

  const [rentQuantity, setRentQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notification, setNotification] = useState('');

  // Update localStorage whenever the stock changes
  useEffect(() => {
    localStorage.setItem('bikeStock', stock);
  }, [stock]);

  // Rent bike function
  const rentBike = () => {
    if (rentQuantity <= 0) {
      setNotification("Enter a positive value greater than zero");
    } else if (rentQuantity > stock) {
      setNotification("Enter a value less than available stock");
    } else {
      setStock(stock - rentQuantity);
      setTotalPrice(rentQuantity * 100);
      setNotification(`Successfully rented ${rentQuantity} bike(s)!`);
    }
    setRentQuantity(0); // Reset input after action
  };

  // Add bikes to stock function
  const addBikes = (quantity) => {
    if (quantity <= 0) {
      setNotification("Enter a positive value to add bikes");
    } else {
      setStock(stock + quantity);
      setNotification(`Successfully added ${quantity} bike(s) to stock!`);
    }
  };

  // Handle input changes for renting and adding stock
  const handleRentQuantityChange = (e) => {
    setRentQuantity(Number(e.target.value));
  };

  const [addQuantity, setAddQuantity] = useState(0);
  const handleAddQuantityChange = (e) => {
    setAddQuantity(Number(e.target.value));
  };

  // UI with minimal and engaging styling
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Bike Shop</h1>
      <p style={styles.stockInfo}>Total Bikes Available: {stock}</p>

      {/* Rent a bike */}
      <div style={styles.actionContainer}>
        <label style={styles.label}>Rent Quantity: </label>
        <input 
          type="number" 
          value={rentQuantity} 
          onChange={handleRentQuantityChange} 
          style={styles.input} 
          placeholder="Enter bikes to rent"
        />
        <button onClick={rentBike} style={styles.button}>
          Rent a Bike
        </button>
      </div>

      {totalPrice > 0 && (
        <div style={styles.priceInfo}>
          <p>Your Total Price: ${totalPrice}</p>
          <p>Total Bikes Left: {stock}</p>
        </div>
      )}

      {/* Add stock */}
      <div style={styles.actionContainer}>
        <label style={styles.label}>Add to Stock: </label>
        <input 
          type="number" 
          value={addQuantity} 
          onChange={handleAddQuantityChange} 
          style={styles.input} 
          placeholder="Enter quantity to add"
        />
        <button onClick={() => addBikes(addQuantity)} style={styles.button}>
          Add Bikes
        </button>
      </div>

      {/* Notification */}
      {notification && <p style={styles.notification}>{notification}</p>}
    </div>
  );
}

// Minimal but engaging styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: 'auto',
    border: '2px solid #333',
    borderRadius: '8px',
    backgroundColor: '#f7f7f7',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '1.5em',
    color: '#333',
    marginBottom: '10px',
  },
  stockInfo: {
    fontSize: '1.1em',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  label: {
    marginRight: '10px',
  },
  input: {
    width: '80px',
    padding: '5px',
    marginRight: '10px',
    textAlign: 'center',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '8px 15px',
    backgroundColor: '#1E90FF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#007ACC',
  },
  priceInfo: {
    fontSize: '1.1em',
    color: '#555',
    marginBottom: '20px',
  },
  notification: {
    fontSize: '1em',
    color: 'green',
    marginTop: '10px',
  },
};

export default App;
