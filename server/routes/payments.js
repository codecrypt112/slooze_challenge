const express = require('express');
const { db } = require('../config/firebase');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const router = express.Router();

// Get payment methods (Admin only)
router.get('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const paymentMethodsRef = collection(db, 'paymentMethods');
    const q = query(paymentMethodsRef, where('country', '==', req.user.country));
    const snapshot = await getDocs(q);

    const paymentMethods = [];
    snapshot.forEach(doc => {
      paymentMethods.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(paymentMethods);
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add payment method (Admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { type, cardNumber, expiryDate, holderName } = req.body;
    
    const paymentMethodData = {
      type,
      cardNumber: cardNumber.replace(/\d(?=\d{4})/g, '*'), // Mask card number
      expiryDate,
      holderName,
      country: req.user.country,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const paymentMethodRef = await addDoc(collection(db, 'paymentMethods'), paymentMethodData);
    
    res.status(201).json({
      id: paymentMethodRef.id,
      ...paymentMethodData
    });
  } catch (error) {
    console.error('Add payment method error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update payment method (Admin only)
router.put('/:paymentMethodId', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { paymentMethodId } = req.params;
    const { type, cardNumber, expiryDate, holderName } = req.body;
    
    const paymentMethodDocRef = doc(db, 'paymentMethods', paymentMethodId);
    const paymentMethodDoc = await getDoc(paymentMethodDocRef);
    if (!paymentMethodDoc.exists()) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    const paymentMethodData = paymentMethodDoc.data();
    if (paymentMethodData.country !== req.user.country) {
      return res.status(403).json({ error: 'Access restricted to your assigned country' });
    }

    const updateData = {
      type,
      cardNumber: cardNumber.replace(/\d(?=\d{4})/g, '*'),
      expiryDate,
      holderName,
      updatedAt: new Date().toISOString()
    };

    await updateDoc(paymentMethodDocRef, updateData);
    
    res.json({
      id: paymentMethodId,
      ...updateData,
      country: paymentMethodData.country,
      createdAt: paymentMethodData.createdAt
    });
  } catch (error) {
    console.error('Update payment method error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete payment method (Admin only)
router.delete('/:paymentMethodId', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { paymentMethodId } = req.params;
    
    const paymentMethodDocRef = doc(db, 'paymentMethods', paymentMethodId);
    const paymentMethodDoc = await getDoc(paymentMethodDocRef);
    if (!paymentMethodDoc.exists()) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    const paymentMethodData = paymentMethodDoc.data();
    if (paymentMethodData.country !== req.user.country) {
      return res.status(403).json({ error: 'Access restricted to your assigned country' });
    }

    await deleteDoc(paymentMethodDocRef);
    
    res.json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    console.error('Delete payment method error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;