import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Star, Clock, MapPin, Search, Filter, Heart } from 'lucide-react';
import { API_BASE_URL, COUNTRY_FLAGS } from '../../config/constants';
import MenuModal from './MenuModal';
import Card from '../UI/Card';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurants`);
      setRestaurants(response.data);
    } catch (error) {
      toast.error('Failed to fetch restaurants');
      console.error('Fetch restaurants error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (restaurantId, e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(restaurantId)) {
      newFavorites.delete(restaurantId);
      toast.success('Removed from favorites');
    } else {
      newFavorites.add(restaurantId);
      toast.success('Added to favorites');
    }
    setFavorites(newFavorites);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const cuisines = ['all', ...new Set(restaurants.map(r => r.cuisine))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Available Restaurants</h2>
          <p className="mt-1 text-gray-600">
            Discover amazing food from {filteredRestaurants.length} restaurants
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="animate-slide-up">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine === 'all' ? 'All Cuisines' : cuisine}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Restaurant Grid */}
      {filteredRestaurants.length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedCuisine !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'No restaurants available in your area'
            }
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <Card
              key={restaurant.id}
              hover
              padding="none"
              className="overflow-hidden cursor-pointer animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              {/* Restaurant Image */}
              <div className="relative overflow-hidden">
                <img
                  src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(restaurant.id, e)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.has(restaurant.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-600'
                    }`} 
                  />
                </button>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium text-gray-900">
                    {restaurant.rating || '4.5'}
                  </span>
                </div>
              </div>
              
              {/* Restaurant Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {restaurant.cuisine}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <span>{COUNTRY_FLAGS[restaurant.country]}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.deliveryTime || '30-45 min'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{restaurant.country}</span>
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  className="w-full group-hover:shadow-lg transition-shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRestaurant(restaurant);
                  }}
                >
                  View Menu
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Menu Modal */}
      {selectedRestaurant && (
        <MenuModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
};

export default RestaurantList;