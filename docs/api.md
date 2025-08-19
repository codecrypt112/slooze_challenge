# 📱 API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <jwt_token>
```

## Response Format

### Success Response

```json
{
  "data": { /* response data */ },
  "message": "Success message"
}
```

### Error Response

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { /* additional error details */ }
}
```

## Authentication Endpoints

### POST /auth/login

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "member",
    "country": "America"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid credentials
- `400` - Missing required fields

### GET /auth/me

Get current user information.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "member",
    "country": "America"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid or missing token

## Restaurant Endpoints

### GET /restaurants

Get restaurants available in user's country.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "rest123",
    "name": "Spice Garden",
    "cuisine": "Indian",
    "country": "India",
    "rating": 4.5,
    "deliveryTime": "30-45 min",
    "image": "https://example.com/image.jpg"
  }
]
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `500` - Server error

### GET /restaurants/:restaurantId/menu

Get menu items for a specific restaurant.

**Parameters:**
- `restaurantId` (string) - Restaurant ID

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "item123",
    "restaurantId": "rest123",
    "name": "Butter Chicken",
    "description": "Creamy tomato-based curry with tender chicken",
    "price": 12.99,
    "category": "Main Course"
  }
]
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Access restricted (wrong country)
- `404` - Restaurant not found

## Order Endpoints

### POST /orders

Create a new order.

**Permissions:** Admin, Manager, Member

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "restaurantId": "rest123",
  "items": [
    {
      "id": "item123",
      "name": "Butter Chicken",
      "price": 12.99,
      "quantity": 2
    }
  ],
  "totalAmount": 25.98
}
```

**Response:**
```json
{
  "id": "order123",
  "userId": "user123",
  "restaurantId": "rest123",
  "items": [...],
  "totalAmount": 25.98,
  "status": "pending",
  "country": "India",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `201` - Created
- `400` - Invalid request data
- `401` - Unauthorized
- `403` - Access restricted
- `404` - Restaurant not found

### GET /orders

Get user's orders.

**Headers:**
```http
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (number, optional) - Number of orders to return (default: 20)
- `offset` (number, optional) - Number of orders to skip (default: 0)

**Response:**
```json
[
  {
    "id": "order123",
    "userId": "user123",
    "restaurantId": "rest123",
    "items": [...],
    "totalAmount": 25.98,
    "status": "pending",
    "country": "India",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

### PATCH /orders/:orderId/cancel

Cancel an order.

**Permissions:** Admin, Manager only

**Parameters:**
- `orderId` (string) - Order ID

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Order cancelled successfully"
}
```

**Status Codes:**
- `200` - Success
- `400` - Order cannot be cancelled
- `401` - Unauthorized
- `403` - Insufficient permissions
- `404` - Order not found

### POST /orders/:orderId/checkout

Process payment for an order.

**Permissions:** Admin, Manager only

**Parameters:**
- `orderId` (string) - Order ID

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "paymentMethodId": "payment123"
}
```

**Response:**
```json
{
  "message": "Order paid successfully"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid payment method
- `401` - Unauthorized
- `403` - Insufficient permissions
- `404` - Order or payment method not found

## Payment Method Endpoints

### GET /payments

Get payment methods for admin's country.

**Permissions:** Admin only

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "payment123",
    "type": "Credit Card",
    "cardNumber": "**** **** **** 1234",
    "expiryDate": "12/25",
    "holderName": "John Doe",
    "country": "America",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Insufficient permissions (Admin only)

### POST /payments

Add a new payment method.

**Permissions:** Admin only

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "Credit Card",
  "cardNumber": "1234567890123456",
  "expiryDate": "12/25",
  "holderName": "John Doe"
}
```

**Response:**
```json
{
  "id": "payment123",
  "type": "Credit Card",
  "cardNumber": "**** **** **** 1234",
  "expiryDate": "12/25",
  "holderName": "John Doe",
  "country": "America",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `201` - Created
- `400` - Invalid request data
- `401` - Unauthorized
- `403` - Insufficient permissions

### PUT /payments/:paymentMethodId

Update a payment method.

**Permissions:** Admin only

**Parameters:**
- `paymentMethodId` (string) - Payment method ID

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "Debit Card",
  "cardNumber": "1234567890123456",
  "expiryDate": "06/26",
  "holderName": "John Doe"
}
```

**Response:**
```json
{
  "id": "payment123",
  "type": "Debit Card",
  "cardNumber": "**** **** **** 1234",
  "expiryDate": "06/26",
  "holderName": "John Doe",
  "country": "America",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request data
- `401` - Unauthorized
- `403` - Insufficient permissions or access restricted
- `404` - Payment method not found

### DELETE /payments/:paymentMethodId

Delete a payment method.

**Permissions:** Admin only

**Parameters:**
- `paymentMethodId` (string) - Payment method ID

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Payment method deleted successfully"
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Insufficient permissions or access restricted
- `404` - Payment method not found

## Health Check

### GET /health

Check API health status.

**Response:**
```json
{
  "status": "OK",
  "message": "Food Ordering API is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `200` - Success

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_CREDENTIALS` | Email or password is incorrect |
| `TOKEN_EXPIRED` | JWT token has expired |
| `TOKEN_INVALID` | JWT token is malformed or invalid |
| `INSUFFICIENT_PERMISSIONS` | User role doesn't have required permissions |
| `ACCESS_RESTRICTED` | User cannot access resources from different country |
| `RESOURCE_NOT_FOUND` | Requested resource doesn't exist |
| `VALIDATION_ERROR` | Request data validation failed |
| `DUPLICATE_RESOURCE` | Resource already exists |
| `OPERATION_FAILED` | Database operation failed |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute per IP
- **General endpoints**: 100 requests per minute per user
- **Admin endpoints**: 200 requests per minute per admin

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
```

## Pagination

Endpoints that return lists support pagination:

**Query Parameters:**
- `limit` (number) - Items per page (max 100, default 20)
- `offset` (number) - Items to skip (default 0)

**Response Headers:**
```http
X-Total-Count: 150
X-Page-Count: 8
Link: <http://api.example.com/orders?limit=20&offset=20>; rel="next"
```

## Filtering and Sorting

### Orders Endpoint

**Query Parameters:**
- `status` - Filter by order status (`pending`, `paid`, `cancelled`)
- `sort` - Sort field (`createdAt`, `updatedAt`, `totalAmount`)
- `order` - Sort direction (`asc`, `desc`)

**Example:**
```http
GET /orders?status=pending&sort=createdAt&order=desc
```

### Restaurants Endpoint

**Query Parameters:**
- `cuisine` - Filter by cuisine type
- `rating` - Minimum rating (0-5)
- `search` - Search in name and cuisine

**Example:**
```http
GET /restaurants?cuisine=Indian&rating=4&search=spice
```

## WebSocket Events (Future Enhancement)

Real-time updates for order status changes:

```javascript
// Connect to WebSocket
const socket = io('ws://localhost:5000');

// Listen for order updates
socket.on('order_updated', (data) => {
  console.log('Order status changed:', data);
});

// Join user-specific room
socket.emit('join_user_room', { userId: 'user123' });
```

## SDK Examples

### JavaScript/Node.js

```javascript
const API_BASE = 'http://localhost:5000/api';

class FoodieHubAPI {
  constructor(token) {
    this.token = token;
    this.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async getRestaurants() {
    const response = await fetch(`${API_BASE}/restaurants`, {
      headers: this.headers
    });
    return response.json();
  }

  async createOrder(orderData) {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(orderData)
    });
    return response.json();
  }
}

// Usage
const api = new FoodieHubAPI('your-jwt-token');
const restaurants = await api.getRestaurants();
```

### cURL Examples

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get restaurants
curl -X GET http://localhost:5000/api/restaurants \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"restaurantId":"rest123","items":[...],"totalAmount":25.98}'
```

---

This API provides a comprehensive interface for managing the food ordering system with proper authentication, authorization, and data isolation based on user roles and countries.