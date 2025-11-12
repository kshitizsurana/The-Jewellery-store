# The Jewellery Store - Full Stack Authentication & E-commerce PlatformA professional full-stack web application featuring JWT authentication and jewelry collection display, built with React, Node.js, Express, Prisma, and MySQL.## 🚀 Features### Authentication System- **Professional Login/Sign Up Interface** - Clean, modern design without emojis- **JWT Token Authentication** - Secure token-based authentication- **Password Hashing** - bcrypt encryption for user security- **Form Validation** - Client and server-side validation- **Remember Me Functionality** - User session persistence- **Responsive Design** - Works on all devices### Jewelry Store Dashboard- **User Profile Display** - Shows name, email, and member since date- **Jewelry Collection** - Displays exclusive jewelry items with details- **Professional Product Cards** - Clean product presentation- **Store Statistics** - Dynamic stats showing collection info- **Professional UI** - No emojis, clean business design### Backend API- **RESTful API** - Clean, organized endpoints- **MySQL Database** - Reliable data storage with Prisma ORM- **Seeded Data** - 12 pre-loaded jewelry items- **Protected Routes** - JWT middleware protection- **Error Handling** - Comprehensive error responses## 🛠️ Technology Stack### Frontend- **React 18+** - Modern React with hooks- **Axios** - HTTP client for API calls- **CSS3** - Custom responsive styling- **Modern JavaScript** - ES6+ features### Backend- **Node.js** - JavaScript runtime- **Express.js** - Web application framework- **Prisma ORM** - Database toolkit- **MySQL** - Relational database- **JWT** - JSON Web Tokens for authentication- **bcrypt** - Password hashing## 📁 Project Structure```my-fullstack-app/├── frontend/                 # React application│   ├── src/│   │   ├── components/│   │   │   ├── AuthPage.js   # Login/Register component│   │   │   ├── AuthPage.css  # Authentication styling│   │   │   ├── Dashboard.js  # Jewelry store dashboard│   │   │   └── Dashboard.css # Dashboard styling│   │   ├── App.js           # Main React component│   │   └── App.css          # Global styles│   └── package.json│├── backend/                 # Express server│   ├── prisma/│   │   ├── schema.prisma    # Database schema│   │   └── migrations/      # Database migrations│   ├── index.js            # Express server setup│   ├── seed.js             # Database seeding script│   ├── .env                # Environment variables│   └── package.json│└── README.md               # This documentation```## 🗄️ Database Schema### User Model```sqlUser {  id        Int      @id @default(autoincrement())  email     String   @unique  password  String  name      String?  createdAt DateTime @default(now())  updatedAt DateTime @updatedAt}```### Jewelry Model```sqlJewelry {  id          Int      @id @default(autoincrement())  name        String  description String  type        String   # ring, necklace, bracelet, etc.  material    String   # gold, silver, platinum, etc.  price       Float  inStock     Boolean  @default(true)  createdAt   DateTime @default(now())  updatedAt   DateTime @updatedAt}```## 🚦 Getting Started### Prerequisites- Node.js (v16 or higher)- MySQL server- npm or yarn### Installation1. **Clone and setup the project**```bash# Navigate to your workspacecd /Users/kshitiz./my-fullstack-app```2. **Setup Backend**```bashcd backendnpm install```3. **Configure Environment**Create `.env` file in backend directory:```envDATABASE_URL="mysql://username:password@localhost:3306/capstone"JWT_SECRET="your-super-secret-jwt-key"```4. **Setup Database**```bash# Run Prisma migrationsnpx prisma migrate deploy# Seed the database with jewelry datanode seed.js```5. **Setup Frontend**```bashcd ../frontendnpm install```### Running the Application1. **Start Backend Server**```bashcd backendnode index.js# Server runs on http://localhost:5000```2. **Start Frontend Development Server**```bashcd frontendnpm start# React app runs on http://localhost:3000 (or next available port)```## 📚 API Endpoints### Authentication Endpoints- `POST /auth/register` - User registration- `POST /auth/login` - User login- `GET /auth/profile` - Get user profile (protected)### Jewelry Endpoints- `GET /api/jewelry` - Get jewelry collection (protected)### Example API Usage**Register a new user:**```bashcurl -X POST http://localhost:5000/auth/register \  -H "Content-Type: application/json" \  -d '{    "name": "John Doe",    "email": "john@example.com",    "password": "password123"  }'```**Login:**```bashcurl -X POST http://localhost:5000/auth/login \  -H "Content-Type: application/json" \  -d '{    "email": "john@example.com",    "password": "password123"  }'```**Get jewelry collection:**```bashcurl -X GET http://localhost:5000/api/jewelry \  -H "Authorization: Bearer YOUR_JWT_TOKEN"```## 💎 Jewelry Collection DataThe application comes pre-seeded with 12 exclusive jewelry items:1. **Diamond Solitaire Ring** - $2,999.992. **Pearl Necklace Classic** - $899.993. **Rose Gold Tennis Bracelet** - $449.994. **Sapphire Stud Earrings** - $299.995. **Luxury Swiss Watch** - $1,599.996. **Emerald Pendant** - $1,299.997. **Diamond Wedding Band** - $1,899.998. **Silver Charm Bracelet** - $199.999. **Ruby Drop Earrings** - $799.9910. **Vintage Art Deco Ring** - $2,499.9911. **Gold Chain Necklace** - $649.9912. **Designer Sports Watch** - $899.99## 🔐 Security Features- **Password Hashing** - bcrypt with salt rounds- **JWT Tokens** - Secure token-based authentication- **Protected Routes** - Middleware authentication- **Input Validation** - Server-side validation- **CORS Configuration** - Cross-origin resource sharing- **Environment Variables** - Sensitive data protection## 🎨 Design Features- **Professional UI** - Clean, modern interface without emojis- **Responsive Design** - Mobile-first approach- **Glassmorphism Effects** - Modern visual aesthetics- **Gradient Backgrounds** - Professional color schemes- **Smooth Animations** - Enhanced user experience- **Card-based Layout** - Organized information display## 📱 Responsive Breakpoints- **Desktop**: 1200px and above- **Tablet**: 768px - 1199px- **Mobile**: Below 768px## 🧪 Testing the Application1. **Register a new account** using the sign-up form2. **Login with credentials** to access the dashboard3. **View jewelry collection** - 12 items should be displayed4. **Check user profile** information in the account card5. **Test responsive design** by resizing the browser6. **Verify JWT tokens** work correctly with API calls## 🔧 Maintenance### Adding New Jewelry Items```bash
# Run seed script to add more items
node seed.js

# Or add manually through Prisma
npx prisma studio
```

### Database Migrations
```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy
```

## 🌟 Key Accomplishments

✅ **Emoji-free Professional Design** - Clean business interface  
✅ **Complete Authentication Flow** - Register, login, dashboard  
✅ **JWT Token Implementation** - Secure authentication system  
✅ **MySQL Database Integration** - Reliable data persistence  
✅ **Seeded Jewelry Data** - 12 pre-loaded products  
✅ **Responsive Design** - Works on all devices  
✅ **Professional UI/UX** - Modern, clean interface  
✅ **Error Handling** - Comprehensive error management  
✅ **API Documentation** - Clear endpoint documentation  
✅ **Security Best Practices** - Password hashing, JWT tokens  

## 🎯 Next Steps (Future Enhancements)

- Add shopping cart functionality
- Implement payment processing
- Add product search and filtering
- Create admin panel for inventory management
- Add product images and image upload
- Implement user reviews and ratings
- Add email verification
- Create order history and tracking

---

**The Jewellery Store** - A complete, professional full-stack authentication and e-commerce platform ready for production use! 🚀
