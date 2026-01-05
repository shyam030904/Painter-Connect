# 🎨 Painter Connect - Home Painter Hiring Platform

A modern MERN stack web application that connects homeowners with professional painters, featuring AI-powered wall color preview and comprehensive booking management.

## 🚀 Features

### For Customers
- **Property-Specific Services**: 1BHK, 2BHK, furnished, semi-furnished, and wooden surfaces
- **Service Packages**: Economy, Premium, Luxury, and Super Luxury options
- **AI Color Preview**: Upload room images and preview wall colors using AI
- **Painter Discovery**: Find and hire verified painters in your area
- **Consultancy Booking**: Book online or on-site painting consultations
- **Booking Management**: Track service requests and history

### For Painters
- **Professional Profiles**: Showcase experience, skills, and portfolio
- **Flexible Pricing**: Set rates for different service packages
- **Booking Management**: Accept/reject jobs and manage schedule
- **Service Areas**: Define coverage areas and availability

### For Admins
- **User Management**: Oversee customers and painters
- **Painter Verification**: Approve/reject painter registrations
- **Analytics Dashboard**: Monitor platform performance
- **Service Management**: Manage packages and pricing

## 🛠 Tech Stack

- **Frontend**: React.js, CSS3, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Upload**: Multer
- **AI Integration**: Ready for ML model integration

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd painter-connect
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/painter-connect
   JWT_SECRET=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   AI_API_URL=http://localhost:8000/api/ai-preview
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Start the backend server**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```

### Full Stack Development

Run both backend and frontend simultaneously:
```bash
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/register-painter` - Painter registration
- `POST /api/auth/login` - User/Painter login

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Painters
- `GET /api/painters` - Get all approved painters
- `GET /api/painters/:id` - Get painter details
- `GET /api/painters/my-bookings` - Get painter bookings

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `PUT /api/bookings/:id/status` - Update booking status

### Consultancy
- `POST /api/consultancy` - Book consultancy
- `GET /api/consultancy/my-consultancies` - Get user consultancies

### AI Preview
- `POST /api/ai-preview/preview` - Generate AI color preview
- `GET /api/ai-preview/colors` - Get available color palette

## 🎨 Service Packages

| Package | Features | Warranty |
|---------|----------|----------|
| **Economy** | Basic paint, standard finish | 1 year |
| **Premium** | Premium paint, enhanced finish | 3 years |
| **Luxury** | High-end paint, luxury finish | 5 years |
| **Super Luxury** | Premium brands, premium finish | 7 years |

## 🏠 Property Types

- **1 BHK**: Single bedroom apartments
- **2 BHK**: Two bedroom apartments  
- **Furnished**: Homes with furniture (careful painting)
- **Semi-Furnished**: Partially furnished spaces
- **Wooden Surfaces**: Doors, wardrobes, panels, etc.

## 🤖 AI Integration

The platform includes AI-powered wall color preview functionality:

1. **Image Upload**: Users upload room/wall images
2. **Color Selection**: Choose from curated color palette
3. **AI Processing**: Generate realistic color previews
4. **Preview Display**: Show processed images with selected colors

*Note: Current implementation includes mock AI responses. Integrate with actual ML models for production.*

## 🔐 Authentication Flow

1. **User Registration**: Customers register with basic details
2. **Painter Registration**: Painters register with professional details (requires admin approval)
3. **Login**: JWT-based authentication for both user types
4. **Protected Routes**: Secure access to user-specific features

## 📱 User Journey

### Customer Flow
1. Register/Login → Browse Painters → View Profiles → Book Service → Track Progress
2. Alternative: AI Preview → Color Selection → Find Painters → Book Service

### Painter Flow
1. Register → Wait for Approval → Login → Manage Profile → Accept Bookings → Complete Jobs

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud database
2. Configure environment variables
3. Deploy to Heroku, AWS, or preferred platform

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or preferred platform
3. Update API base URL in production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check documentation for common solutions

---

**Built with ❤️ using the MERN Stack**