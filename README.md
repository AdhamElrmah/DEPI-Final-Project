# 🚗 ByDrive - Car Rental Management System

<div align="center">

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://depi-final-project-frontend.netlify.app/)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

A full-stack car rental platform that enables users to browse, book, and manage car rentals online. Built with modern technologies for a seamless experience for both customers and administrators.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Reference](#-api-reference) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
  - [Authentication](#authentication)
  - [Cars (Items)](#cars-items)
  - [Rentals](#rentals)
  - [Reviews](#reviews)
  - [Users](#users)
- [Database Design](#-database-design)
- [Authentication & Authorization](#-authentication--authorization)
- [Deployment](#-deployment)
- [Usage Instructions](#-usage-instructions)
- [Contributing](#-contributing)
- [Authors & Credits](#-authors--credits)
- [License](#-license)

---

## 🧩 Project Overview

The **ByDrive Car Rental Management System** is a comprehensive platform that enables users to browse, book, and manage car rentals online. The system addresses the challenges of traditional car rental processes by providing a digital-first approach with real-time availability, secure payments, and intuitive user interfaces.

### Key Benefits

| For Customers | For Administrators | For Business |
|---------------|-------------------|--------------|
| Easy car discovery | Complete inventory control | Increased operational efficiency |
| Transparent pricing | User management | Reduced administrative overhead |
| Secure booking | Rental oversight | Scalable growth |
| Rental history management | Business analytics | Data-driven decisions |

### Target Users

- **Individual Renters**: Travelers, business professionals, and locals needing short-term vehicle access
- **Car Rental Companies**: Businesses managing fleet operations and customer bookings
- **System Administrators**: Staff responsible for platform maintenance and customer support

---

## ✨ Features

### Customer Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Authentication** | User registration and login with JWT tokens |
| 🚗 **Car Browsing** | Advanced search and filtering by category, price, and features |
| 📅 **Online Booking** | Real-time availability checking and reservation system |
| 💳 **Secure Checkout** | Comprehensive booking flow with payment integration |
| 👤 **Profile Management** | Account settings and rental history tracking |
| ⭐ **Reviews & Ratings** | Rate and review cars after completing rentals |
| 📱 **Responsive Design** | Mobile-first approach for all devices |
| 🤖 **AI Chatbot** | Instant customer support powered by Chatling.ai |

### Administrator Features

| Feature | Description |
|---------|-------------|
| 👥 **User Management** | Complete control over user accounts and permissions |
| 🚙 **Fleet Management** | Add, edit, and remove vehicles from inventory |
| 📊 **Rental Oversight** | View, modify, and cancel rental bookings |
| ⭐ **Review Management** | Monitor and moderate user reviews |
| ⚙️ **System Administration** | Platform configuration and maintenance |

### Advanced Features

- 🔍 **Smart Search** - Multi-criteria filtering and sorting
- 🛡️ **Data Security** - Encrypted passwords and secure API endpoints
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- ⚡ **Performance Optimized** - Fast loading times and efficient data handling
- 🗄️ **MongoDB Integration** - Scalable NoSQL database with automatic migration
- 🔄 **Dual Database Support** - Seamless switching between MongoDB and JSON storage
- 📊 **Data Validation** - Mongoose schemas ensure data integrity
- 🎬 **Smooth Animations** - Framer Motion powered transitions and effects

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | Modern JavaScript library for building user interfaces |
| **React Router** | 7.9.4 | Declarative routing for React applications |
| **Tailwind CSS** | 4.x | Utility-first CSS framework for styling |
| **Framer Motion** | 12.x | Library for smooth and interactive animations |
| **Headless UI** | 2.2.9 | Accessible UI components for React |
| **Radix UI** | Latest | Primitive UI components (Select, Label, Separator) |
| **Axios** | 1.12.2 | HTTP client for API communication |
| **Lucide React** | 0.545.0 | Beautiful icon library |
| **Heroicons** | 2.2.0 | Icon components from Tailwind Labs |
| **Swiper** | 12.0.3 | Modern touch slider library |
| **Embla Carousel** | 8.6.0 | Lightweight carousel library |
| **React Day Picker** | 9.11.1 | Date picking component |
| **Date-fns** | 4.1.0 | Date utility library |
| **Vite** | 7.1.7 | Next generation frontend build tool |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.x | JavaScript runtime for server-side development |
| **Express.js** | 4.21.2 | Fast, unopinionated web framework |
| **JWT** | 9.0.2 | Secure authentication tokens |
| **bcryptjs** | 2.4.3 | Password hashing library |
| **Mongoose** | 8.0.3 | MongoDB Object Data Modeling |
| **MongoDB Driver** | 7.0.0 | Official MongoDB driver |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing middleware |
| **dotenv** | 16.3.1 | Environment variables management |
| **Nodemon** | 3.0.2 | Development auto-reload |

### Database

| Technology | Purpose |
|------------|---------|
| **MongoDB Atlas** | Cloud-hosted NoSQL database for production |
| **Mongoose ODM** | Object Data Modeling for MongoDB |
| **JSON File Fallback** | Local file storage for development/testing |

---

## 📁 Project Structure

```
ByDrive/
├── src/                        # React Frontend Application
│   ├── assets/                     # Static assets (images, icons)
│   ├── components/                 # Reusable UI components
│   │   ├── Admin/                      # Admin dashboard components
│   │   ├── CarPageComp/                # Car detail page components
│   │   ├── CarsRentalPageComp/         # Car listing components
│   │   ├── Checkout/                   # Checkout flow components
│   │   ├── ContactUsPageComp/          # Contact page components
│   │   ├── FAQPageComp/                # FAQ page components
│   │   ├── HomePageComp/               # Homepage components
│   │   ├── ProfilePage/                # User profile components
│   │   ├── ServicesPageComp/           # Services page components
│   │   └── UI/                         # Core UI elements
│   │       ├── button.jsx                  # Button component
│   │       ├── ConfirmDialog.jsx           # Confirmation dialog
│   │       ├── StarRating.jsx              # Star rating component
│   │       ├── SuccessDialog.jsx           # Success dialog
│   │       ├── UserDropdown.jsx            # User dropdown menu
│   │       └── ...                         # Other UI components
│   ├── contexts/                   # React contexts
│   │   └── AuthContext.jsx             # Authentication context
│   ├── layouts/                    # Layout components
│   │   ├── Navbar.jsx                  # Navigation bar
│   │   └── Footer.jsx                  # Footer component
│   ├── lib/                        # API functions and utilities
│   ├── pages/                      # Page components
│   │   ├── HomePage.jsx                # Homepage
│   │   ├── CarsRentalPage.jsx          # Car listing page
│   │   ├── CarPage.jsx                 # Car detail page
│   │   ├── CheckoutPage.jsx            # Checkout page
│   │   ├── PaymentPage.jsx             # Payment processing
│   │   ├── ProfilePage.jsx             # User profile
│   │   ├── AdminDashboard.jsx          # Admin dashboard
│   │   ├── ContactUsPage.jsx           # Contact page
│   │   ├── ServicesPage.jsx            # Services page
│   │   ├── FAQPage.jsx                 # FAQ page
│   │   ├── Error404.jsx                # 404 error page
│   │   └── auth/                       # Authentication pages
│   ├── routes/                     # Routing configuration
│   ├── utils/                      # Helper functions
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
├── api/                        # Node.js Backend API
│   ├── controllers/                # Request handlers / Business logic
│   │   ├── authController.js           # Authentication (signup/signin)
│   │   ├── itemController.js           # Car CRUD operations
│   │   ├── rentalsController.js        # Rental management
│   │   ├── reviewController.js         # Review & rating system
│   │   └── usersController.js          # User management
│   ├── models/                     # Mongoose schemas
│   │   ├── Car.js                      # Car model
│   │   ├── Rental.js                   # Rental model
│   │   ├── Review.js                   # Review model
│   │   └── User.js                     # User model
│   ├── routes/                     # API route definitions
│   │   ├── auth.js                     # /auth routes
│   │   ├── items.js                    # /items routes
│   │   ├── rentals.js                  # /rentals routes
│   │   ├── reviews.js                  # /reviews routes
│   │   └── users.js                    # /users routes
│   ├── middleware/                 # Express middleware
│   │   └── authMiddleware.js           # JWT verification & role checks
│   ├── lib/                        # Utility libraries
│   │   └── database.js                 # Database connection
│   ├── scripts/                    # Database utilities
│   │   ├── migrate.js                  # Data migration script
│   │   └── seed.js                     # Database seeding
│   ├── docs/                       # Documentation
│   ├── utils/                      # Helper functions
│   ├── server.js                   # Application entry point
│   ├── vercel.json                 # Vercel deployment config
│   └── package.json                # Backend dependencies
├── public/                     # Public static files
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Frontend dependencies
├── .env.development            # Development environment config
└── README.md                   # This file
```

---

## 🚀 Installation

### Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Git** for version control
- **MongoDB Atlas** account (for production) or local MongoDB (optional)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bydrive.git
   cd bydrive
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd api
   npm install
   cd ..
   ```

4. **Configure Environment Variables**
   
   Create `.env` file in the `api` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   USE_MONGODB=true
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bydrive?retryWrites=true&w=majority

   # JWT Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=7d

   # Optional: Seed database on startup
   SEED_ON_STARTUP=false
   ```

   Create `.env.development` in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/
   ```

5. **Start the Development Servers**
   
   In one terminal (Backend):
   ```bash
   cd api
   npm run dev
   ```
   
   In another terminal (Frontend):
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## ⚙ Configuration

### Environment Variables

#### Backend (api/.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `USE_MONGODB` | Use MongoDB (`true`) or JSON files (`false`) | `false` |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | Secret key for JWT signing | `fallback_secret_key` |
| `JWT_EXPIRES_IN` | JWT token expiration | `7d` |
| `SEED_ON_STARTUP` | Auto-seed database on start | `false` |

#### Frontend (.env.development)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/` |

### CORS Configuration

The API is pre-configured to accept requests from:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)
- `http://localhost:3001` (Alternative)
- Production Netlify URLs

Modify `corsOptions` in `server.js` to add additional origins.

---

## 📚 API Reference

Base URL: `http://localhost:5000`

### Health Check

```http
GET /health
```

Returns server status, environment, database type, and timestamp.

---

### Authentication

#### Register a new user

```http
POST /auth/signup
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phoneNumber": "+1234567890"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "64abc123...",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login

```http
POST /auth/signin
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

> **Note:** You can use either email or username in the `email` field.

---

### Cars (Items)

#### Get all cars

```http
GET /items/allItems
```

**Response:** Array of all cars
```json
[
  {
    "id": "2019-fiat-500",
    "make": "Fiat",
    "model": "500",
    "year": 2019,
    "body_type": "Hatchback",
    "seats": 4,
    "transmission": "automatic",
    "fuel_type": "Gasoline",
    "price_per_day": 19,
    "images": { "main": "url" },
    "rental_class": "Economy"
  }
]
```

#### Get car by ID

```http
GET /items/:id
```

#### Add a new car (Admin only)

```http
POST /items
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "id": "car-001",
  "make": "Toyota",
  "model": "Camry",
  "year": 2024,
  "body_type": "Sedan",
  "seats": 5,
  "transmission": "automatic",
  "fuel_type": "Gasoline",
  "price_per_day": 75,
  "images": {
    "main": "https://example.com/car.jpg"
  }
}
```

#### Update a car (Admin only)

```http
PUT /items/:id
Authorization: Bearer <token>
```

#### Delete a car (Admin only)

```http
DELETE /items/:id
Authorization: Bearer <token>
```

---

### Rentals

#### Check car availability

```http
POST /rentals/:carId/availability
```

**Request Body:**
```json
{
  "startDate": "2024-01-15",
  "endDate": "2024-01-20"
}
```

#### Get bookings for a car

```http
GET /rentals/:carId/bookings
```

Returns active bookings for availability calendar display.

#### Create a rental

```http
POST /rentals/:carId
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "startDate": "2024-01-15",
  "endDate": "2024-01-20",
  "pickupLocation": "Airport Terminal",
  "dropoffLocation": "Downtown Office",
  "specialRequests": "Child seat needed",
  "paymentInfo": {
    "method": "credit_card",
    "cardNumber": "****4242"
  }
}
```

#### Get user's rentals

```http
GET /rentals/user
Authorization: Bearer <token>
```

#### Cancel a rental

```http
DELETE /rentals/:rentalId
Authorization: Bearer <token>
```

#### Get all rentals (Admin only)

```http
GET /rentals/all
Authorization: Bearer <token>
```

#### Update rental status (Admin only)

```http
PUT /rentals/:rentalId
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "completed"
}
```

---

### Reviews

#### Get reviews for a car

```http
GET /reviews/car/:carId
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "reviews": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  },
  "stats": {
    "average": 4.5,
    "count": 25
  }
}
```

#### Check review eligibility

```http
GET /reviews/eligibility/:carId
Authorization: Bearer <token>
```

Returns whether user can review (must have completed rental).

#### Create a review

```http
POST /reviews
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "carId": "car-001",
  "rating": 5,
  "comment": "Excellent car, very smooth ride!"
}
```

> **Note:** User must have a completed rental for the car to leave a review.

#### Get user's reviews

```http
GET /reviews/user
Authorization: Bearer <token>
```

#### Update a review

```http
PUT /reviews/:reviewId
Authorization: Bearer <token>
```

#### Delete a review

```http
DELETE /reviews/:reviewId
Authorization: Bearer <token>
```

#### Get all reviews (Admin only)

```http
GET /reviews/all
Authorization: Bearer <token>
```

---

### Users

#### Get all users (Admin only)

```http
GET /users
Authorization: Bearer <token>
```

#### Get user by ID

```http
GET /users/:userId
Authorization: Bearer <token>
```

#### Create a user

```http
POST /users
```

#### Update user profile

```http
PUT /users/:userId
Authorization: Bearer <token>
```

#### Delete user (Admin only)

```http
DELETE /users/:userId
Authorization: Bearer <token>
```

---

## 📊 Database Design

The application uses MongoDB with Mongoose schemas for data validation and structure.

### Car Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique car identifier |
| `make` | String | Car manufacturer (e.g., Toyota) |
| `model` | String | Car model (e.g., Camry) |
| `year` | Number | Manufacturing year |
| `body_type` | String | Body type (Sedan, SUV, etc.) |
| `seats` | Number | Number of seats |
| `transmission` | String | Transmission type |
| `fuel_type` | String | Fuel type |
| `engine` | Object | Engine specifications |
| `colors` | Object | Exterior/interior colors |
| `primary_features` | Array | Key features |
| `additional_features` | Array | Extra features |
| `images` | Object | Car images (main, sub1-4) |
| `price_per_day` | Number | Daily rental price |
| `available` | Boolean | Availability status |

### User Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | User ID |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `username` | String | Unique username |
| `email` | String | Unique email address |
| `phoneNumber` | String | Contact number |
| `passwordHash` | String | Hashed password (hidden) |
| `role` | String | `user` or `admin` |
| `createdAt` | Date | Registration date |

### Rental Model

| Field | Type | Description |
|-------|------|-------------|
| `carId` | Mixed | Reference to car |
| `userId` | Mixed | Reference to user |
| `startDate` | String | Rental start date |
| `endDate` | String | Rental end date |
| `pickupLocation` | String | Pickup location |
| `dropoffLocation` | String | Drop-off location |
| `totalDays` | Number | Number of rental days |
| `pricePerDay` | Number | Daily price |
| `totalPrice` | Number | Total rental cost |
| `status` | String | `active`, `completed`, `cancelled` |
| `paymentInfo` | Object | Payment details |

### Review Model

| Field | Type | Description |
|-------|------|-------------|
| `carId` | Mixed | Reference to car |
| `userId` | Mixed | Reference to user |
| `rentalId` | Mixed | Reference to rental |
| `rating` | Number | 1-5 star rating |
| `comment` | String | Review comment (max 500 chars) |
| `username` | String | Reviewer's username |
| `createdAt` | Date | Review date |

### Entity Relationships

```mermaid
erDiagram
    USERS ||--o{ RENTALS : "makes"
    USERS ||--o{ REVIEWS : "writes"
    CARS ||--o{ RENTALS : "has"
    CARS ||--o{ REVIEWS : "receives"
    RENTALS ||--o| REVIEWS : "enables"
```

---

## 🔐 Authentication & Authorization

### JWT Authentication

All protected routes require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **User** | View cars, make/cancel own rentals, write reviews for rented cars, manage own profile |
| **Admin** | All user permissions + manage cars, view all users/rentals/reviews, update rental status, delete users/reviews |

### Protected Routes

| Route | Access Level |
|-------|--------------|
| `POST /items` | Admin |
| `PUT /items/:id` | Admin |
| `DELETE /items/:id` | Admin |
| `GET /users` | Admin |
| `DELETE /users/:id` | Admin |
| `GET /rentals/all` | Admin |
| `PUT /rentals/:id` | Admin |
| `POST /rentals/:id` | User (authenticated) |
| `POST /reviews` | User (authenticated + completed rental) |

---

## ⚠ Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message description"
}
```

### Common Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Invalid/missing token |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found |
| `409` | Conflict - Duplicate resource |
| `500` | Server Error |

---

## 🌐 Deployment

### Frontend Deployment (Netlify)

1. **Build the production bundle**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
   - OR connect your GitHub repository to Netlify for automatic deployments

3. **Configure environment variables in Netlify dashboard**
   ```
   VITE_API_URL=https://your-api-domain.vercel.app/
   ```

### Backend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy the API**
   ```bash
   cd api
   vercel
   ```

3. **Set environment variables in Vercel dashboard:**
   - `USE_MONGODB=true`
   - `MONGODB_URI=your-mongodb-uri`
   - `JWT_SECRET=your-secret`
   - `JWT_EXPIRES_IN=7d`
   - `NODE_ENV=production`

### Production Checklist

- [ ] Use strong, unique `JWT_SECRET`
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Set `NODE_ENV=production`
- [ ] Update CORS origins for production domains
- [ ] Enable MongoDB connection pooling
- [ ] Set up monitoring and logging
- [ ] Configure SSL/HTTPS
- [ ] Set `SEED_ON_STARTUP=false`

---

## 🔄 Database Migration

The application includes comprehensive migration tools:

### Migration Scripts

#### Migrate existing JSON data to MongoDB
```bash
cd api
node scripts/migrate.js
```

#### Seed database with initial data
```bash
node scripts/seed.js
```

### Migration Features

- **Data Preservation**: Maintains all existing relationships
- **ID Compatibility**: Supports both legacy IDs and MongoDB ObjectIds
- **Rollback Support**: Can revert to JSON storage if needed
- **Validation**: Ensures data integrity during migration

---

## 💡 Usage Instructions

### For Customers

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Browse Cars**: Use filters to find suitable vehicles by category, price, or features
3. **Book Rental**: Select dates, choose pickup/dropoff locations, and complete booking
4. **Leave Reviews**: Rate and review cars after completing your rental
5. **Manage Account**: View booking history and manage profile settings

### For Administrators

1. **Access Dashboard**: Login with admin credentials and navigate to Admin Dashboard
2. **Manage Users**: View, edit, or deactivate user accounts
3. **Manage Fleet**: Add new cars, update pricing, or remove vehicles
4. **Oversee Rentals**: View all bookings, modify dates, or cancel reservations
5. **Moderate Reviews**: Monitor and delete inappropriate reviews

---

## 📜 Scripts

### Frontend Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Dev** | `npm run dev` | Start Vite development server |
| **Build** | `npm run build` | Build production bundle |
| **Lint** | `npm run lint` | Run ESLint |
| **Preview** | `npm run preview` | Preview production build |

### Backend Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Start** | `npm start` | Start production server |
| **Dev** | `npm run dev` | Start with auto-reload (nodemon) |
| **Migrate** | `npm run migrate` | Run database migrations |
| **Seed** | `npm run seed` | Seed database with sample data |

---

## 🤝 Contributing

We welcome contributions to improve the ByDrive Car Rental Management System!

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
- Ensure responsive design for all UI changes

### Code Standards

- Use functional components with React Hooks
- Follow Tailwind CSS utility-first approach
- Implement proper error handling
- Use descriptive variable and function names

---

## 👤 Authors & Credits

### Development Team

| Name | Role |
|------|------|
| **Adham Ahmed** | Team Leader & Frontend Developer |
| **Salma Medhat** | Frontend Developer |
| **Mahitab Hesham** | Frontend Developer |
| **Ahmed Ashraf** | Frontend Developer |

---

## 📄 License

This project is licensed under the ISC License.

---

<div align="center">

**Last Updated**: December 2025
**Version**: 1.0.0

[⬆ Back to Top](#-bydrive---car-rental-management-system)

</div>
