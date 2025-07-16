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

quick-chat/
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── .env # Frontend env variables
├── server/ # Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── .env # Backend env variables
└── README.md

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

git clone https://github.com/iamvivekanand01/quick-chat.git
cd quick-chat

### 2. Setup server

cd server
npm install
npm run dev

### 3. Setup client

cd client
npm install
npm run dev

---

## 🌍 Deployment
- Frontend hosted on **Vercel**
- Backend hosted on **Render**

---

## 🙌 Author

Made with 💜 by **Vivekanand**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://linkedin.com/in/iamvivekanand01)

---


## 📄 License

This project is open source and free to use.
