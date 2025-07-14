# QuickChat 💬

A real-time full-stack chat application built using the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO for real-time communication, Cloudinary for image uploads, and JWT for authentication.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 🗨️ Real-time messaging using Socket.IO
- 🧑‍🤝‍🧑 Online user sidebar with unseen message count
- 🖼️ Image sharing support
- 📝 Profile update with bio and avatar
- 📡 Backend API with Express and MongoDB
- ☁️ Cloudinary integration for media
- 🌐 Deployed using Vercel (client) & Render (server)

---

## 🌐 Live Demo

- 🔗 **Frontend (Vercel):** [https://quick-chat-one-flax.vercel.app](https://quick-chat-one-flax.vercel.app)
- 🔗 **Backend (Render):** [https://quick-chat-backend-31z1.onrender.com](https://quick-chat-backend-31z1.onrender.com)

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Socket.IO
- Cloudinary

---

## 📁 Folder Structure

\`\`\`
client/
├── src/
├── public/
├── .env
└── README.md

server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── .env
└── server.js
\`\`\`

---

## ⚙️ Environment Variables

Create `.env` files in both `client/` and `server/` directories.

**Client:**

\`\`\`env
VITE_BACKEND_URL=https://quick-chat-backend-31z1.onrender.com
\`\`\`

**Server:**

\`\`\`env
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
\`\`\`

> Do **not** push real `.env` files. Use `.env.example` for GitHub.

---

## 🧪 How to Run Locally

### 1. Clone the repo

\`\`\`bash
git clone https://github.com/iamvivekanand01/quick-chat.git
cd quick-chat

\`\`\`

### 2. Setup server

\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

### 3. Setup client

\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

---

## 🌍 Deployment
- Frontend hosted on **Vercel**
- Backend hosted on **Render**

---

## 🙌 Author

Made with 💜 by **Vivekanand**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://linkedin.com/in/iamvivekanand01)

---


## ⚠️ Known Issue

> 💡 You might see this warning in the browser console:
WebSocket connection to 'wss://https/socket.io/?...' failed


✅ This doesn't break functionality — messages, login, and all major features work. This is due to an internal Socket.IO connection formatting issue and will be patched soon.



## 📄 License

This project is open source and free to use.
