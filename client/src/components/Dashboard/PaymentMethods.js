import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CreditCard, Plus, Edit, Trash2, X } from 'lucide-react';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Credit Card',
    cardNumber: '',
    expiryDate: '',
    holderName: ''
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payments');
      setPaymentMethods(response.data);
    } catch (error) {
      toast.error('Failed to fetch payment methods');
      console.error('Fetch payment methods error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingMethod) {
        await axios.put(`http://localhost:5000/api/payments/${editingMethod.id}`, formData);
        toast.success('Payment method updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/payments', formData);
        toast.success('Payment method added successfully');
      }
      
      setShowModal(false);
      setEditingMethod(null);
      setFormData({
        type: 'Credit Card',
        cardNumber: '',
        expiryDate: '',
        holderName: ''
      });
      fetchPaymentMethods();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save payment method');
      console.error('Save payment method error:', error);
    }
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setFormData({
      type: method.type,
      cardNumber: method.cardNumber.replace(/\*/g, ''), // Remove masking for editing
      expiryDate: method.expiryDate,
      holderName: method.holderName
    });
    setShowModal(true);
  };

  const handleDelete = async (methodId) => {
    if (!window.confirm('Are you sure you want to delete this payment method?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/payments/${methodId}`);
      toast.success('Payment method deleted successfully');
      fetchPaymentMethods();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete payment method');
      console.error('Delete payment method error:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMethod(null);
    setFormData({
      type: 'Credit Card',
      cardNumber: '',
      expiryDate: '',
      holderName: ''
    });
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage payment methods for your organization
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="text-center py-12">
          <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new payment method.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {method.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEdit(method)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Card:</span> {method.cardNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Expires:</span> {method.expiryDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Holder:</span> {method.holderName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  placeholder="MM/YY"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={formData.holderName}
                  onChange={(e) => setFormData({ ...formData, holderName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  {editingMethod ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;