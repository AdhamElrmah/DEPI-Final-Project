# 🚗 Car Rental Management System (ByDrive)

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://depi-final-project-frontend.netlify.app/)

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green.svg)](https://mongodb.com/)
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
- **Chatling.ai** - AI Chatbot integration

### Backend

- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework for Node.js
- **JWT (JSON Web Tokens)** - Secure authentication mechanism
- **bcrypt** - Password hashing library for security
- **CORS** - Cross-origin resource sharing middleware

### Database

- **MongoDB Atlas** - Cloud-hosted NoSQL database for production
- **Mongoose ODM** - Object Data Modeling for MongoDB
- **JSON File Fallback** - Local file storage for development/testing

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
- ⭐ **Reviews & Ratings** - Rate and review cars after completing rentals
- 📱 **Responsive Design** - Mobile-first approach for all devices

### Administrator Features

- 👥 **User Management** - Complete control over user accounts and permissions
- 🚙 **Fleet Management** - Add, edit, and remove vehicles from inventory
- 📊 **Rental Oversight** - View, modify, and cancel rental bookings
- ⭐ **Review Management** - Monitor and moderate user reviews
- ⚙️ **System Administration** - Platform configuration and maintenance

### Advanced Features

- 🔍 **Smart Search** - Multi-criteria filtering and sorting
- 🛡️ **Data Security** - Encrypted passwords and secure API endpoints
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- ⚡ **Performance Optimized** - Fast loading times and efficient data handling
- 📧 **Email Notifications** - Automated booking confirmations
- 🗄️ **MongoDB Integration** - Scalable NoSQL database with automatic migration
- 🤖 **AI Chatbot** - Instant customer support powered by Chatling.ai
- 🔄 **Dual Database Support** - Seamless switching between MongoDB and JSON storage
- 📊 **Data Validation** - Mongoose schemas ensure data integrity

## 🗂️ Project Structure

```
car-rental-app/
├── frontend/             # React application
│ ├── src/
│ │ ├── components/       # Reusable UI components
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
├── api/                    # Node.js API server
│ ├── controllers/        # API controllers
│ ├── models/             # MongoDB/Mongoose schemas
│ ├── routes/             # API route definitions
│ ├── scripts/            # Migration and seeding scripts
│ ├── lib/                # Database utilities
│ ├── utils/              # Shared utility functions
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

#### POST `/rentals/:id`

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

#### GET `/rentals/user`

Get all rentals for the authenticated user.

#### GET `/rentals/all`

Get all rentals in the system (Admin only).

#### PUT `/rentals/:id`

Update rental details (Admin only).

#### DELETE `/rentals/:id`

Cancel a rental booking.

### Review Management Endpoints

#### GET `/reviews/car/:carId`

Get all reviews for a specific car.

#### POST `/reviews`

Create a new review (Requires completed rental).

#### PUT `/reviews/:id`

Update an existing review.

#### DELETE `/reviews/:id`

Delete a review (User can delete own, Admin can delete any).

#### GET `/reviews/all`

Get all reviews in the system (Admin only).

### Authentication Requirements

- **Bearer Token**: Include `Authorization: Bearer <jwt_token>` header for protected endpoints
- **Admin Routes**: Require `role: "admin"` in user token
- **Database Flexibility**: Supports both MongoDB and JSON storage modes
- **Rate Limiting**: Implemented to prevent API abuse

# 🔄 Database Migration

The application includes comprehensive migration tools:

## Migration Scripts

### Migrate existing JSON data to MongoDB

```bash
cd api
node scripts/migrate.js
```

### Seed database with initial data

```bash
node scripts/seed.js
```

### Migration Features

- **Data Preservation**: Maintains all existing relationships
- **ID Compatibility**: Supports both legacy IDs and MongoDB ObjectIds
- **Rollback Support**: Can revert to JSON storage if needed
- **Validation**: Ensures data integrity during migration

## 🗄️ Database Design

The application uses MongoDB with Mongoose schemas for data validation and structure.

### Core Entities

#### Users Collection

```json
{
  "id": "number (optional - for legacy support)",
  "_id": "ObjectId (MongoDB auto-generated)",
  "name": "string (required)",
  "email": "string (unique, required)",
  "passwordHash": "string (bcrypt, select: false)",
  "role": "enum: user|admin (default: user)",
  "createdAt": "Date (auto-generated)"
}
```

#### Cars Collection

```json
{
  "id": "string (required, unique)",
  "make": "string (required)",
  "model": "string (required)",
  "year": "number (required)",
  "price_per_day": "number (required)",
  "transmission": "string (enum with validation)",
  "body_type": "string",
  "seats": "number",
  "engine": "object",
  "images": "object",
  "features": "array",
  "available": "boolean (default: true)"
}
```

#### Rentals Collection

```json
{
  "id": "string (optional - for legacy support)",
  "carId": "Mixed (string/ObjectId)",
  "userId": "Mixed (string/ObjectId)",
  "userEmail": "string",
  "userName": "string",
  "startDate": "string",
  "endDate": "string",
  "totalPrice": "number",
  "status": "enum: active|completed|cancelled",
  "paymentInfo": "object",
  "createdAt": "Date (auto-generated)"
}
```

#### Reviews Collection

```json
{
  "carId": "Mixed (string/ObjectId)",
  "userId": "Mixed (string/ObjectId)",
  "rentalId": "Mixed (string/ObjectId)",
  "username": "string",
  "rating": "number (1-5)",
  "comment": "string",
  "createdAt": "Date (auto-generated)"
}
```

### Relationships

- **Users → Rentals**: One-to-many (user can have multiple rentals)
- **Cars → Rentals**: One-to-many (car can have multiple rental bookings)
- **Rentals → Reviews**: One-to-one (a completed rental can have one review)
- **Cars → Reviews**: One-to-many (a car can have multiple reviews)
- **Users → Reviews**: One-to-many (a user can write multiple reviews)
- **Data Integrity**: Enforced through application-level validation and Mongoose schemas.

## ⚡ Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git
- MongoDB Atlas account (for production) or local MongoDB (optional)

### Database Setup

#### Option 1: MongoDB Atlas (Recommended)

##### 1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)

##### 2. Create a new cluster

##### 3. Set up database user and whitelist IP

##### 4. Get connection string from Atlas dashboard

#### Option 2: Local MongoDB

##### 1. Install MongoDB locally

##### 2. Start MongoDB service

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
npm run dev
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
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car_rental
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
USE_MONGODB=true
SEED_ON_STARTUP=true
VITE_API_URL=http://localhost:3000/
```

### Database Initialization

The application supports dual database modes:

#### MongoDB Mode (Production)

- Automatic seeding on first run if `SEED_ON_STARTUP=true`
- Data migration scripts available in `api/scripts/`
- Uses Mongoose schemas for data validation

#### JSON Mode (Development)

- Fallback to JSON files if MongoDB unavailable
- Files: `api/cars.json`, `api/users.json`, `api/rentItem.json`

## 💡 Usage Instructions

### For Customers

- **Register/Login**: Create an account or sign in with existing credentials
- **Browse Cars**: Use filters to find suitable vehicles by category, price, or features
- **Book Rental**: Select dates, choose pickup/dropoff locations, and complete booking
- **Manage Account**: View booking history and manage profile settings

### For Administrators

- **Access Dashboard**: Login with admin credentials
- **Manage Users**: View, edit, or deactivate user accounts
- **Manage Fleet**: Add new cars, update pricing, or remove vehicles
- **Oversee Rentals**: View all bookings, modify dates, or cancel reservations

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

### Frontend Deployment (Netlify)

```bash
# Build for production
cd /
npm run build

# Deploy to Netlify
# Drag and drop the 'dist' folder to Netlify Drop
# OR connect your GitHub repository to Netlify
```

### Backend Deployment (Vercel)

```bash
# Build for production
cd api
npm run build

# Deploy to Vercel
# Import the 'api' directory as a project in Vercel
# Set environment variables in Vercel dashboard
```

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car_rental
JWT_SECRET=your_production_secret_key
API_URL=https://your-api-domain.com
USE_MONGODB=true
SEED_ON_STARTUP=false
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
