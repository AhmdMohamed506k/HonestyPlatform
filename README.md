# 🚀 Honesty Platform - Full-Stack Real-time Feedback System

[![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com/)
[![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)

**Honesty Platform** is a sophisticated full-stack web application designed for secure, anonymous user feedback. It features a modern, immersive UI with interactive 3D elements and a robust backend architecture capable of handling real-time data flow.

---

## ✨ Features

- 🎨 **Immersive 3D UI:** Interactive Landing, Login, and Register pages integrated with **Spline 3D** objects for a modern UX.
- ⚡ **Real-time Notifications:** Instant alerts for new messages powered by **Socket.io**.
- 🚀 **High Performance:** Optimized session management and caching using **Redis (Upstash)**.
- 🖼️ **Cloud Media Storage:** Profile image uploads handled by **Multer** and stored on **Cloudinary**.
- 🛡️ **Advanced Security:** Server-side validation with **Joi**, password hashing with **Bcrypt**, and secure session handling.
- 📧 **Automated Emails:** Instant email notifications via **Nodemailer**.
- 💬 **Flash Messaging:** Dynamic user feedback using **Connect-flash**.

---

## 🛠️ Technical Stack

### **Frontend**
- **Templating Engine:** EJS (Embedded JavaScript)
- **Styling:** Bootstrap 5, CSS3, Animate.css
- **Interactivity:** Spline 3D, JavaScript (ES6+)

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Real-time:** Socket.io

### **Database & Infrastructure**
- **Primary Database:** MongoDB (Mongoose ODM)
- **Cache/Session:** Redis (Upstash)
- **Cloud Assets:** Cloudinary
- **Deployment:** Railway (Containerized Hosting)

---

## 💻 Local Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/AhmdMohamed506k/HonestyPlatform.git
2. **Install dependencies::**
npm install



3. **Configure Environment Variables:::**  
DBPassword="Your_mongodb_atlas_DataBase_Password"
REDIS_URL="your_upstash_redis_url"
PORT =3000



4. **Run the application::::** 
``bash

# For development
npm run dev

# For production
npm start




🚀**Deployment:**

The application is deployed on Railway to support persistent WebSocket connections, ensuring a seamless real-time experience.




👨‍💻 'Auther'

Ahmed Mohamed - GitHub: [AhmedMohamed](https://github.com/AhmdMohamed506k)

LinkedIn: [Ahmed Mohamed](https://www.linkedin.com/in/ahmed-mohamed-1710392a5/)