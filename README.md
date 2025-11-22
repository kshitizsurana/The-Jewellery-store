# The Jewellery Store 💎

A full-stack jewelry store application built with React, Node.js, and MySQL.

## ✨ Features

- **Professional Authentication System**: JWT-based login and registration
- **Beautiful Dashboard**: Modern UI with jewelry collection display
- **Responsive Design**: Mobile-first design with beautiful animations
- **Product Management**: Browse jewelry with detailed information
- **User Management**: Profile management and authentication states
- **Modern Tech Stack**: React, Node.js, Express, Prisma, MySQL
- **Razorpay Payment Integration**: Secure payment gateway with mock dev mode
- **Advanced Search**: Centered search bar with autocomplete functionality
- **Shopping Cart**: Add items, manage quantities, checkout seamlessly
- **Wishlist**: Save favorite items for later
- **Premium Navbar**: Logo left, search centered, utilities right

## 🚀 Tech Stack

### Frontend
- **React** - User Interface
- **Axios** - HTTP Client
- **CSS3** - Modern styling with gradients and animations
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime Environment
- **Express** - Web Framework
- **Prisma** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password Hashing

## 📦 Project Structure

```
my-fullstack-app/
├── backend/                 # Node.js backend
│   ├── prisma/             # Database schema and migrations
│   ├── index.js            # Main server file
│   ├── seed.js             # Database seeding
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── AuthPage.js # Authentication component
│   │   │   ├── Dashboard.js# Main dashboard
│   │   │   └── *.css       # Component styles
│   │   ├── App.js          # Main app component
│   │   └── App.css         # Global styles
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL
- Git

### Clone the Repository
```bash
git clone https://github.com/kshitizsurana/The-Jewellery-store.git
cd The-Jewellery-store
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
DATABASE_URL="mysql://username:password@localhost:3306/jewelry_store"
JWT_SECRET="your-secret-key"
PORT=8000
```

Run database migrations and seed:
```bash
npx prisma migrate dev
npm run seed
```

Start the backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000
```

Start the frontend development server:
```bash
npm start
```

## 🎯 Usage

1. **Access the Application**: Open `http://localhost:3001` in your browser
2. **Create Account**: Sign up with your email and password
3. **Browse Jewelry**: Explore the seeded jewelry collection
4. **Manage Profile**: View and manage your account information

## 📱 Screenshots

### Authentication Page
- Professional login/signup interface
- Gradient backgrounds and modern animations
- Form validation and error handling

### Dashboard
- Welcome message with user information
- Jewelry collection grid with product cards
- Store statistics and user profile section
- Responsive design for all screen sizes

## 🔐 Authentication Flow

1. User registers with email, name, and password
2. Password is hashed using bcrypt
3. JWT token is generated upon login
4. Token is stored in localStorage
5. Protected routes require valid JWT token
6. Automatic logout on token expiration

## 💎 Database Schema

### User Model
- id (Primary Key)
- email (Unique)
- name
- password (Hashed)
- createdAt
- updatedAt

### Jewelry Model
- id (Primary Key)
- name
- description
- type (ring, necklace, bracelet, earrings)
- material (gold, silver, platinum)
- price
- inStock
- createdAt
- updatedAt

## 🎨 Design Features

- **Glassmorphism**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Modern purple/blue color scheme
- **Hover Animations**: Interactive elements with smooth transitions
- **Typography**: Professional font combinations
- **Responsive Grid**: CSS Grid and Flexbox for layouts
- **Mobile-First**: Optimized for all device sizes

## 🚀 Deployment

### Backend Deployment
1. Set up MySQL database on your hosting provider
2. Update DATABASE_URL in environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Seed the database: `npm run seed`
5. Deploy to your preferred hosting service

### Frontend Deployment
1. Update REACT_APP_API_URL to your backend URL
2. Build the project: `npm run build`
3. Deploy the build folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kshitiz Surana**
- GitHub: [@kshitizsurana](https://github.com/kshitizsurana)

## 🙏 Acknowledgments

- Modern UI/UX design patterns
- JWT authentication best practices
- Responsive web design principles
- React and Node.js communities

---

**Built with ❤️ for jewelry enthusiasts**
