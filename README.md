# 🚗 Car Rental Management System

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue.svg)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-black.svg)](https://jwt.io/)

A full-stack web application for managing car rentals, built with modern technologies to provide a seamless experience for both customers and administrators.

## 🧩 Project Overview

The Car Rental Management System is a comprehensive platform that enables users to browse, book, and manage car rentals online. The system addresses the challenges of traditional car rental processes by providing a digital-first approach with real-time availability, secure payments, and intuitive user interfaces.

### Key Benefits

- **For Customers**: Easy car discovery, transparent pricing, secure booking, and rental history management
- **For Administrators**: Complete inventory control, user management, rental oversight, and business analytics
- **For Business**: Increased operational efficiency, reduced administrative overhead, and scalable growth

### Target Users

- **Individual Renters**: Travelers, business professionals, and locals needing short-term vehicle access
- **Car Rental Companies**: Businesses managing fleet operations and customer bookings
- **System Administrators**: Staff responsible for platform maintenance and customer support

## ⚙️ Tech Stack

### Frontend

- **React 18** - Modern JavaScript library for building user interfaces
- **React Router** - Declarative routing for React applications
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Library for smooth and interactive animations in React
- **Headless UI** - Accessible UI components for React
- **Axios** - HTTP client for API communication
- **Lucide React** - Beautiful icon library
- **Heroicons** - Icon components from Tailwind Labs

### Backend

- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework for Node.js
- **JWT (JSON Web Tokens)** - Secure authentication mechanism
- **bcrypt** - Password hashing library for security
- **CORS** - Cross-origin resource sharing middleware

### Database

- **JSON File Storage** - Lightweight file-based database for development
- **Migration-ready** for SQL databases (PostgreSQL/MySQL)

### Development Tools

- **ESLint** - Code linting and formatting
- **Vite** - Fast build tool for React applications
- **Nodemon** - Automatic server restart during development

## 🚀 Features

### Customer Features

- 🔐 **Secure Authentication** - User registration and login with JWT tokens
- 🚗 **Car Browsing** - Advanced search and filtering by category, price, and features
- 📅 **Online Booking** - Real-time availability checking and reservation system
- 💳 **Secure Checkout** - Comprehensive booking flow with payment integration
- 👤 **Profile Management** - Account settings and rental history tracking
- 📱 **Responsive Design** - Mobile-first approach for all devices

### Administrator Features

- 👥 **User Management** - Complete control over user accounts and permissions
- 🚙 **Fleet Management** - Add, edit, and remove vehicles from inventory
- 📊 **Rental Oversight** - View, modify, and cancel rental bookings
- ⚙️ **System Administration** - Platform configuration and maintenance

### Advanced Features

- 🔍 **Smart Search** - Multi-criteria filtering and sorting
- 🛡️ **Data Security** - Encrypted passwords and secure API endpoints
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- ⚡ **Performance Optimized** - Fast loading times and efficient data handling
- 📧 **Email Notifications** - Automated booking confirmations

## 🗂️ Project Structure

```
car-rental-app/
├── frontend/             # React application
│ ├── src/
│ │ ├── components/         # Reusable UI components
│ │ │ ├── ui/                   # Core UI elements (Button, Input, etc.)
│ │ │ ├── auth/                 # Authentication components
│ │ │ └── admin/                # Admin-specific components
│ │ ├── contexts/         # React contexts
│ │ ├── layouts/          # Layout components (Navbar, Footer)
│ │ ├── lib/              # API functions and utilities
│ │ ├── pages/            # Page components
│ │ ├── routes/           # Routing configuration
│ │ └── utils/            # Helper functions
│ ├── assets/             # Static assets
│ └── package.json
├── api/                  # Node.js API server
│ ├── controllers/        # API controllers
│ ├── routes/             # API route definitions
│ ├── data/               # JSON database files
│ ├── utils/              # Server utilities
│ ├── server.js           # Server startup file
│ └── package.json
└── README.md
```

## 🔌 API Documentation

### Authentication Endpoints

#### POST `/auth/signup`

Register a new user account.

```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

#### POST `/auth/signin`

Authenticate and login user.

```json
// Request
{
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

### Car Management Endpoints

#### GET `/items/allItems`

Retrieve all available cars.

```json
// Response
[
  {
    "id": "2019-fiat-500",
    "make": "Fiat",
    "model": "500",
    "year": 2019,
    "price_per_day": 19,
    "rental_class": "Economy",
    "images": { "main": "url" }
    // ... other car details
  }
]
```

#### GET `/items/:id`

Get detailed information about a specific car.

#### POST `/items`

Add a new car to inventory (Admin only).

#### PUT `/items/:id`

Update car information (Admin only).

#### DELETE `/items/:id`

Remove a car from inventory (Admin only).

### Rental Management Endpoints

#### POST `/items/:carId/rent`

Create a new rental booking.

```json
// Request
{
  "startDate": "2024-01-15",
  "endDate": "2024-01-20",
  "pickupLocation": "Airport Terminal",
  "dropoffLocation": "Downtown",
  "specialRequests": "GPS navigation required"
}

// Response
{
  "success": true,
  "message": "Car rented successfully",
  "rental": {
    "id": "rental_123",
    "userId": 1,
    "carId": "2019-fiat-500",
    "totalPrice": 95,
    // ... rental details
  }
}
```

#### GET `/items/rentals/user`

Get all rentals for the authenticated user.

#### GET `/items/rentals/all`

Get all rentals in the system (Admin only).

#### PUT `/items/rentals/:id`

Update rental details (Admin only).

#### DELETE `/items/rentals/:id`

Cancel a rental booking.

### Authentication Requirements

- **Bearer Token**: Include `Authorization: Bearer <jwt_token>` header for protected endpoints
- **Admin Routes**: Require `role: "admin"` in user token
- **Rate Limiting**: Implemented to prevent API abuse

## 🗄️ Database Design

The application uses a JSON file-based database system optimized for development and easy migration to relational databases.

### Core Entities

#### Users Collection

```json
{
  "id": "integer (auto-increment)",
  "name": "string (required)",
  "email": "string (unique)",
  "passwordHash": "string (bcrypt)",
  "role": "enum: user|admin",
  "avatar": "string (URL)",
  "createdAt": "ISO date"
}
```

#### Cars Collection

```json
{
  "id": "string (unique)",
  "make": "string",
  "model": "string",
  "year": "integer",
  "price_per_day": "number",
  "rental_class": "enum: Economy|Luxury|Sport|SUV|Exotic",
  "body_type": "string",
  "seats": "integer",
  "transmission": "string",
  "images": "object",
  "features": "array",
  "availability": "boolean"
}
```

#### Rentals Collection

```json
{
  "id": "string (unique)",
  "userId": "integer (foreign key)",
  "carId": "string (foreign key)",
  "startDate": "ISO date",
  "endDate": "ISO date",
  "totalPrice": "number",
  "status": "enum: active|completed|cancelled",
  "pickupLocation": "string",
  "dropoffLocation": "string",
  "createdAt": "ISO date"
}
```

### Relationships

- **Users → Rentals**: One-to-many (user can have multiple rentals)
- **Cars → Rentals**: One-to-many (car can have multiple rental bookings)
- **Data Integrity**: Enforced through application-level validation

## ⚡ Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Backend Setup

```bash
# Clone the repository
git clone <repository-url>
cd car-rental-app

# Navigate to backend directory
cd api

# Install dependencies
npm install

# Start development server
npm start
```

### Frontend Setup

```bash
# Open new terminal and navigate to frontend
cd /

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Create `.env` file in the backend directory:

```env
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
VITE_API_URL=http://localhost:3000/api/
```

### Database Initialization

The application uses JSON files for data storage. Initial data is automatically created on first run:

- `backend/data/users.json`
- `backend/data/cars.json`
- `backend/data/rentItem.json`

## 💡 Usage Instructions

### For Customers

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Browse Cars**: Use filters to find suitable vehicles by category, price, or features
3. **Book Rental**: Select dates, choose pickup/dropoff locations, and complete booking
4. **Manage Account**: View booking history and manage profile settings

### For Administrators

1. **Access Dashboard**: Login with admin credentials
2. **Manage Users**: View, edit, or deactivate user accounts
3. **Manage Fleet**: Add new cars, update pricing, or remove vehicles
4. **Oversee Rentals**: View all bookings, modify dates, or cancel reservations

### Key Features Demo

- **Search & Filter**: Use the search bar and filters on the cars page
- **Booking Flow**: Select a car → Choose dates → Enter details → Confirm booking
- **Admin Controls**: Access admin dashboard to manage system data

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run backend tests
cd api
npm test

# Run frontend tests
cd /
npm test

# Run end-to-end tests (if configured)
npm run test:e2e
```

### Test Coverage

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint testing
- **UI Tests**: User interface interaction testing

## 🌐 Deployment

### Frontend Deployment

```bash
# Build for production
cd /
npm run build

# Deploy to Vercel/Netlify
# Upload the 'dist' folder to your hosting provider
```

### Backend Deployment

```bash
# Build for production
cd api
npm run build

# Deploy to Railway/Heroku
# Set environment variables in hosting platform
```

### Environment Variables for Production

```env
NODE_ENV=production
JWT_SECRET=your_production_secret_key
API_URL=https://your-api-domain.com
DATABASE_URL=your_database_connection_string
```

## 🤝 Contributing

We welcome contributions to improve the Car Rental Management System!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint configuration for code style
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design for all changes

### Code Standards

- Use functional components with React Hooks
- Follow Tailwind CSS utility-first approach
- Implement proper error handling
- Use TypeScript for type safety (future enhancement)

## 👤 Authors & Credits

### Development Team

- **Adham Ahmed** - Team Leader & Frontend Developer
- **Salma Medhat** - Frontend Developer
- **Mahitab Hesham** - Frontend Developer
- **Ahmed Ashraf** - Frontend Developer

---

**Last Updated**: November 2025
**Version**: 1.0.0
