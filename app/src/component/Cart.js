import React, { useState, useEffect } from 'react';
import './style/Cart.css'; // التنسيق الخاص بالصفحة

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchCartData(token);
    }
  }, []);

  // دالة جلب محتويات السلة
  const fetchCartData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/auth/getCart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.destinations.length > 0) {
        setCart(data);
      } else {
        setCart(null);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // دالة إعادة توجيه المستخدم لتسجيل الدخول
  const handleLoginRedirect = () => {
    window.location.href = '/login'; // قم بتوجيه المستخدم لصفحة تسجيل الدخول
  };

  // دالة حذف وجهة من السلة
  const removeFromCart = async (destinationId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You need to log in to remove an item from your cart');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/auth/removeFromCart/${destinationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.message === "Destination removed from cart") {
        alert('Destination removed from cart!');
        // تحديث السلة بعد الحذف
        setCart(data.cart.destinations.length > 0 ? data.cart : null);
      } else {
        alert('Failed to remove destination.');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
      </header>

      <div className="cart-content">
        {/* إذا لم يكن المستخدم مسجل دخول */}
        {!isLoggedIn ? (
          <div className="login-message">
            <h2>🚨 Please log in to view your cart!</h2>
            <button onClick={handleLoginRedirect} className="login-btn">Log in</button>
          </div>
        ) : cart === null ? (
          // إذا كانت السلة فارغة
          <div className="empty-cart">
            <h2>Your cart is empty!</h2>
            <p>It looks like you haven't added any destinations yet.</p>
            <p>Start exploring and add some to your cart! 🌍</p>
          </div>
        ) : (
          // إذا كانت السلة تحتوي على وجهات
          <div className="cart-items">
            <h2>Your Cart:</h2>
            <div className="items-list">
              {cart.destinations.map((destination, index) => {
                const totalCost = destination.averageCost * 7; // افترض 7 أيام، يمكنك تعديل هذا الرقم بناءً على المدخلات
                return (
                  <div className="cart-item" key={destination.destinationId}>
                    <div className="cart-item-header">
                      <h3>{destination.name}</h3>
                      <button 
                        className="remove-btn" 
                        onClick={() => removeFromCart(destination.destinationId)}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                    <p>Categories: {destination.categories.join(', ')}</p>
                    <p>Average Cost: ${destination.averageCost}</p>
                    <p>Total Cost (7 days): ${totalCost}</p>
                  </div>
                );
              })}
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
