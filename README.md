# Chatify - Real-Time Chat Application 💬

<div align="center">


**A modern, full-stack real-time chat application with secure authentication and instant messaging**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-demo-link.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Quick Start](#-quick-start) • [API Documentation](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT Authentication** with HTTP-only cookies for enhanced security
- **Secure Session Management** with middleware protection
- **Password Hashing** using bcryptjs for data protection
- **Rate Limiting & Bot Protection** powered by Arcjet

### 💬 Real-Time Messaging
- **Instant Message Delivery** using Socket.IO WebSocket technology
- **Online/Offline Status** tracking for all users
- **Image Sharing** with Cloudinary CDN integration
- **Message History** persisted in MongoDB database

### 🎨 User Experience
- **Beautiful Dark Theme** designed with Tailwind CSS and DaisyUI
- **Fully Responsive Design** optimized for all devices
- **Audio Feedback** with keyboard sounds and notification alerts
- **Optimistic UI Updates** for instant user feedback
- **Profile Management** with avatar uploads

### 🔧 Technical Excellence
- **Modular Architecture** with clean, maintainable code structure
- **Real-time Synchronization** across multiple clients
- **Comprehensive Error Handling** with user-friendly notifications
- **Production Ready** with proper environment configuration

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with latest features |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS + DaisyUI** | Utility-first styling framework |
| **Zustand** | Lightweight state management |
| **Socket.io Client** | Real-time bidirectional communication |
| **Axios** | Promise-based HTTP client |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js & Express** | Server runtime and web framework |
| **MongoDB & Mongoose** | NoSQL database and ODM |
| **Socket.IO** | WebSocket server implementation |
| **JWT** | Secure token-based authentication |
| **Cloudinary** | Cloud-based image storage |
| **Resend** | Transactional email service |

---

## 📸 Screenshots

<div align="center">

| SignUp Screen |
|:------------:|
| ![SignUp](/frontend/public/signup_for_frontend.png) |

| Login Screen |
|:------------:|
| ![Login](/frontend/public/login_for_frontend.png) |

| Chat Interface |
|:--------------:|
| ![Chat](/frontend/public/chat_for_frontend.png) |

</div>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 20.0.0) - [Download](https://nodejs.org/)
- **MongoDB** - [Installation Guide](https://docs.mongodb.com/manual/installation/)
- **Cloudinary Account** - [Sign Up](https://cloudinary.com/)
- **Resend Account** - [Sign Up](https://resend.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubhadip2005/chatify-app.git
   cd chatify-app
   ```

2. **Install dependencies and build**
   ```bash
   npm run build
   ```

3. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   RESEND_API_KEY=your_resend_api_key
   NODE_ENV=development
   PORT=3000
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
chatify-app/
├── backend/
│   ├── controllers/         # Route handlers and business logic
│   ├── models/             # MongoDB schemas and models
│   ├── routes/             # Express route definitions
│   ├── middleware/         # Authentication and security middleware
│   ├── lib/                # Configuration and utilities
│   └── server.js           # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page-level components
│   │   ├── store/         # Zustand state stores
│   │   ├── hooks/         # Custom React hooks
│   │   └── App.jsx        # Root component
│   └── public/            # Static assets
├── package.json           # Root package configuration
└── README.md             # Project documentation
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/signup` | Register new user | ✅ |
| `POST` | `/api/auth/login` | User login | ✅ |
| `POST` | `/api/auth/logout` | User logout | ✅ |
| `GET` | `/api/auth/check` | Verify authentication | ✅ |

### Messages
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/messages/contacts` | Get all users | ✅ |
| `GET` | `/api/messages/:id` | Get message history | ✅ |
| `POST` | `/api/messages/send/:id` | Send message to user | ✅ |

### User Profile
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `PUT` | `/api/profile/update` | Update user profile | ✅ |
| `POST` | `/api/profile/avatar` | Upload profile picture | ✅ |

---

## 🎯 Key Features in Detail

### Real-Time Communication

The application uses Socket.IO for instant, bidirectional communication between clients and server.

```javascript
// Client-side socket implementation
socket.on('newMessage', (message) => {
  setMessages(prev => [...prev, message]);
});

socket.emit('sendMessage', { recipientId, text });
```

### Secure Authentication

JWT tokens are stored in HTTP-only cookies to prevent XSS attacks.

```javascript
// Secure cookie configuration
res.cookie('jwt', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

### Optimistic UI Updates

Immediate feedback improves user experience by showing messages instantly.

```javascript
// Optimistic message rendering
const optimisticMessage = {
  _id: `temp-${Date.now()}`,
  text: messageText,
  isOptimistic: true,
  senderId: currentUser._id
};
setMessages(prev => [...prev, optimisticMessage]);
```

---

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables

Ensure all environment variables are properly configured for production:

- Set `NODE_ENV=production`
- Use secure `JWT_SECRET`
- Configure proper CORS settings
- Enable HTTPS for secure cookies

### Recommended Platforms

- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Heroku
- **Database**: MongoDB Atlas

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Your Name**
- GitHub: [Shubhadip2005](https://github.com/Shubhadip2005)
- LinkedIn: [Shubhadip Das](https://linkedin.com/in/shubhadip-das-6040052a7)

---

## 🙏 Acknowledgments

Special thanks to the following projects and services:

- [Socket.IO](https://socket.io/) for real-time capabilities
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [MongoDB](https://www.mongodb.com/) for reliable data storage
- [Cloudinary](https://cloudinary.com/) for image management
- [Resend](https://resend.com/) for email delivery

---

## 📞 Contact

For questions, support, or feedback:

- **Email**: shubhadipdas733@gmail.com
- **LinkedIn**: [Shubhadip Das](https://linkedin.com/in/shubhadip-das-6040052a7)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Built with ❤️ using modern web technologies

[Report Bug](https://github.com/Shubhadip2005/chatify-app/issues) • [Request Feature](https://github.com/Shubhadip2005/chatify-app/issues)

</div>