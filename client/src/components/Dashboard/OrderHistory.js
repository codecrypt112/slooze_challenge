import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Clock, CheckCircle, XCircle, CreditCard, X } from 'lucide-react';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    fetchOrders();
    if (user?.role === 'admin' || user?.role === 'manager') {
      fetchPaymentMethods();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error('Fetch orders error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payments');
      setPaymentMethods(response.data);
    } catch (error) {
      console.error('Fetch payment methods error:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/cancel`);
      toast.success('Order cancelled successfully');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to cancel order');
      console.error('Cancel order error:', error);
    }
  };

  const handleCheckout = async () => {
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/orders/${selectedOrder.id}/checkout`, {
        paymentMethodId: selectedPaymentMethod
      });
      toast.success('Order paid successfully');
      setShowCheckoutModal(false);
      setSelectedOrder(null);
      setSelectedPaymentMethod('');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to process payment');
      console.error('Checkout error:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canCancelOrder = (order) => {
    return ['admin', 'manager'].includes(user?.role) && 
           order.status === 'pending';
  };

  const canCheckoutOrder = (order) => {
    return ['admin', 'manager'].includes(user?.role) && 
           order.status === 'pending';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Order History</h2>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your food orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Order #{order.id.slice(-8)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Items:</h4>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {canCheckoutOrder(order) && (
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowCheckoutModal(true);
                    }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <CreditCard className="h-4 w-4 mr-1" />
                    Checkout
                  </button>
                )}
                
                {canCancelOrder(order) && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Checkout Order</h3>
              <button
                onClick={() => {
                  setShowCheckoutModal(false);
                  setSelectedOrder(null);
                  setSelectedPaymentMethod('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Order Total: <span className="font-semibold">${selectedOrder.totalAmount.toFixed(2)}</span>
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Payment Method
              </label>
              {paymentMethods.length === 0 ? (
                <p className="text-sm text-gray-500">No payment methods available</p>
              ) : (
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Choose a payment method</option>
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.type} - {method.cardNumber} ({method.holderName})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowCheckoutModal(false);
                  setSelectedOrder(null);
                  setSelectedPaymentMethod('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={!selectedPaymentMethod}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;