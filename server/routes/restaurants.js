const express = require('express');
const { db } = require('../config/firebase');
const { authenticateToken, authorizeCountry } = require('../middleware/auth');
const { collection, query, where, getDocs, doc, getDoc } = require('firebase/firestore');
const router = express.Router();

// Get restaurants by country
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userCountry = req.user.country;
    
    const restaurantsRef = collection(db, 'restaurants');
    const q = query(restaurantsRef, where('country', '==', userCountry));
    const snapshot = await getDocs(q);

    const restaurants = [];
    snapshot.forEach(doc => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(restaurants);
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get restaurant menu items
router.get('/:restaurantId/menu', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    // First check if restaurant exists and user has access
    const restaurantDocRef = doc(db, 'restaurants', restaurantId);
    const restaurantDoc = await getDoc(restaurantDocRef);
    if (!restaurantDoc.exists()) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const restaurantData = restaurantDoc.data();
    if (restaurantData.country !== req.user.country) {
      return res.status(403).json({ error: 'Access restricted to your assigned country' });
    }

    const menuRef = collection(db, 'menuItems');
    const q = query(menuRef, where('restaurantId', '==', restaurantId));
    const snapshot = await getDocs(q);

    const menuItems = [];
    snapshot.forEach(doc => {
      menuItems.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(menuItems);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;