const express = require('express');
const { db } = require('../config/firebase');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, orderBy } = require('firebase/firestore');
const router = express.Router();

// Create order (Admin, Manager, Member)
router.post('/', authenticateToken, authorizeRole(['admin', 'manager', 'member']), async (req, res) => {
  try {
    const { restaurantId, items, totalAmount } = req.body;
    
    // Verify restaurant exists and user has access
    const restaurantDocRef = doc(db, 'restaurants', restaurantId);
    const restaurantDoc = await getDoc(restaurantDocRef);
    if (!restaurantDoc.exists()) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const restaurantData = restaurantDoc.data();
    if (restaurantData.country !== req.user.country) {
      return res.status(403).json({ error: 'Access restricted to your assigned country' });
    }

    const orderData = {
      userId: req.user.id,
      restaurantId,
      items,
      totalAmount,
      status: 'pending',
      country: req.user.country,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const orderRef = await addDoc(collection(db, 'orders'), orderData);
    
    res.status(201).json({
      id: orderRef.id,
      ...orderData
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef, 
      where('userId', '==', req.user.id),
      where('country', '==', req.user.country),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);

    const orders = [];
    snapshot.forEach(doc => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel order (Admin, Manager only)
router.patch('/:orderId/cancel', authenticateToken, authorizeRole(['admin', 'manager']), async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const orderDocRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderDocRef);
    if (!orderDoc.exists()) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderData = orderDoc.data();
    
    // Check if user has access to this order's country
    if (orderData.country !== req.user.country) {
      return res.status(403).json({ error: 'Access restricted to your assigned country' });
    }

    // Check if order can be cancelled
    if (orderData.status === 'delivered' || orderData.status === 'cancelled') {
      return res.status(400).json({ error: 'Order cannot be cancelled' });
    }

    await updateDoc(orderDocRef, {
      status: 'cancelled',
      updatedAt: new Date().toISOString()
    });

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Checkout order (Admin, Manager only)
router.post('/:orderId/checkout', authenticateToken, authorizeRole(['admin', 'manager']), async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentMethodId } = req.body;
    
    const orderDocRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderDocRef);
    if (!orderDoc.exists()) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderData = orderDoc.data();
    
    // Check if user has access to this order's country
    if (orderData.country !== req.user.country) {
      return res.status(403).json({ error: 'Access restricted to your assigned country' });
    }

    // Verify payment method exists
    const paymentMethodDocRef = doc(db, 'paymentMethods', paymentMethodId);
    const paymentMethodDoc = await getDoc(paymentMethodDocRef);
    if (!paymentMethodDoc.exists()) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    // Simulate payment processing
    await updateDoc(orderDocRef, {
      status: 'paid',
      paymentMethodId,
      paidAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    res.json({ message: 'Order paid successfully' });
  } catch (error) {
    console.error('Checkout order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;