const bcrypt = require('bcryptjs');
const { db } = require('../config/firebase');
const { collection, addDoc } = require('firebase/firestore');

const initializeData = async () => {
  try {
    console.log('Initializing database with sample data...');

    // Sample users
    const users = [
      {
        name: 'Nick Fury',
        email: 'nick.fury@shield.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        country: 'America'
      },
      {
        name: 'Captain Marvel',
        email: 'captain.marvel@shield.com',
        password: await bcrypt.hash('manager123', 10),
        role: 'manager',
        country: 'India'
      },
      {
        name: 'Captain America',
        email: 'captain.america@shield.com',
        password: await bcrypt.hash('manager123', 10),
        role: 'manager',
        country: 'America'
      },
      {
        name: 'Thanos',
        email: 'thanos@shield.com',
        password: await bcrypt.hash('member123', 10),
        role: 'member',
        country: 'India'
      },
      {
        name: 'Thor',
        email: 'thor@shield.com',
        password: await bcrypt.hash('member123', 10),
        role: 'member',
        country: 'India'
      },
      {
        name: 'Travis',
        email: 'travis@shield.com',
        password: await bcrypt.hash('member123', 10),
        role: 'member',
        country: 'America'
      }
    ];

    // Add users to Firestore
    for (const user of users) {
      await addDoc(collection(db, 'users'), user);
    }
    console.log('Users added successfully');

    // Sample restaurants
    const restaurants = [
      {
        name: 'Spice Garden',
        cuisine: 'Indian',
        country: 'India',
        rating: 4.5,
        deliveryTime: '30-45 min',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400'
      },
      {
        name: 'Mumbai Express',
        cuisine: 'Indian',
        country: 'India',
        rating: 4.2,
        deliveryTime: '25-40 min',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
      },
      {
        name: 'American Diner',
        cuisine: 'American',
        country: 'America',
        rating: 4.3,
        deliveryTime: '20-35 min',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400'
      },
      {
        name: 'Burger Palace',
        cuisine: 'Fast Food',
        country: 'America',
        rating: 4.1,
        deliveryTime: '15-25 min',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'
      }
    ];

    const restaurantIds = [];
    for (const restaurant of restaurants) {
      const docRef = await addDoc(collection(db, 'restaurants'), restaurant);
      restaurantIds.push({ id: docRef.id, ...restaurant });
    }
    console.log('Restaurants added successfully');

    // Sample menu items
    const menuItems = [
      // Spice Garden (India)
      {
        restaurantId: restaurantIds[0].id,
        name: 'Butter Chicken',
        description: 'Creamy tomato-based curry with tender chicken',
        price: 12.99,
        category: 'Main Course'
      },
      {
        restaurantId: restaurantIds[0].id,
        name: 'Biryani',
        description: 'Fragrant basmati rice with spices and meat',
        price: 14.99,
        category: 'Main Course'
      },
      {
        restaurantId: restaurantIds[0].id,
        name: 'Naan Bread',
        description: 'Fresh baked Indian bread',
        price: 3.99,
        category: 'Sides'
      },
      // Mumbai Express (India)
      {
        restaurantId: restaurantIds[1].id,
        name: 'Tandoori Chicken',
        description: 'Marinated chicken cooked in tandoor oven',
        price: 13.99,
        category: 'Main Course'
      },
      {
        restaurantId: restaurantIds[1].id,
        name: 'Dal Makhani',
        description: 'Rich and creamy black lentil curry',
        price: 9.99,
        category: 'Main Course'
      },
      // American Diner (America)
      {
        restaurantId: restaurantIds[2].id,
        name: 'Classic Cheeseburger',
        description: 'Beef patty with cheese, lettuce, tomato',
        price: 11.99,
        category: 'Main Course'
      },
      {
        restaurantId: restaurantIds[2].id,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing',
        price: 8.99,
        category: 'Salads'
      },
      {
        restaurantId: restaurantIds[2].id,
        name: 'French Fries',
        description: 'Crispy golden french fries',
        price: 4.99,
        category: 'Sides'
      },
      // Burger Palace (America)
      {
        restaurantId: restaurantIds[3].id,
        name: 'Double Bacon Burger',
        description: 'Two beef patties with bacon and cheese',
        price: 15.99,
        category: 'Main Course'
      },
      {
        restaurantId: restaurantIds[3].id,
        name: 'Chicken Wings',
        description: 'Spicy buffalo chicken wings',
        price: 9.99,
        category: 'Appetizers'
      }
    ];

    for (const item of menuItems) {
      await addDoc(collection(db, 'menuItems'), item);
    }
    console.log('Menu items added successfully');

    // Sample payment methods
    const paymentMethods = [
      {
        type: 'Credit Card',
        cardNumber: '**** **** **** 1234',
        expiryDate: '12/25',
        holderName: 'Nick Fury',
        country: 'America',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        type: 'Debit Card',
        cardNumber: '**** **** **** 5678',
        expiryDate: '06/26',
        holderName: 'SHIELD Organization',
        country: 'America',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        type: 'Credit Card',
        cardNumber: '**** **** **** 9012',
        expiryDate: '03/27',
        holderName: 'Captain Marvel',
        country: 'India',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    for (const method of paymentMethods) {
      await addDoc(collection(db, 'paymentMethods'), method);
    }
    console.log('Payment methods added successfully');

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Run the initialization
initializeData();