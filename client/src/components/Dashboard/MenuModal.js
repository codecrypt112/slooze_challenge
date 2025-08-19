import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

const MenuModal = ({ restaurant, onClose }) => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, [restaurant.id]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/restaurants/${restaurant.id}/menu`);
      setMenuItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch menu items');
      console.error('Fetch menu items error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCreateOrder = async () => {
    if (cart.length === 0) {
      toast.error('Please add items to cart');
      return;
    }

    setOrderLoading(true);
    try {
      const orderData = {
        restaurantId: restaurant.id,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotalAmount()
      };

      await axios.post('http://localhost:5000/api/orders', orderData);
      toast.success('Order created successfully!');
      setCart([]);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create order');
      console.error('Create order error:', error);
    } finally {
      setOrderLoading(false);
    }
  };

  const canCreateOrder = ['admin', 'manager', 'member'].includes(user?.role);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{restaurant.name}</h2>
            <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Menu Items */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Menu Items</h3>
            
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : menuItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No menu items available</p>
            ) : (
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <p className="text-lg font-semibold text-primary-600 mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    {canCreateOrder && (
                      <div className="flex items-center space-x-2 ml-4">
                        {getItemQuantity(item.id) > 0 && (
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                        
                        {getItemQuantity(item.id) > 0 && (
                          <span className="w-8 text-center font-medium">
                            {getItemQuantity(item.id)}
                          </span>
                        )}
                        
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 rounded-full bg-primary-100 hover:bg-primary-200 text-primary-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          {canCreateOrder && (
            <div className="w-80 border-l bg-gray-50 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </h3>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>${getTotalAmount().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCreateOrder}
                    disabled={orderLoading}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {orderLoading ? 'Creating Order...' : 'Create Order'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;