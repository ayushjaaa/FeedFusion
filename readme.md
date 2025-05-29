# FeedFusion

FeedFusion is a full-stack MERN application designed to deliver personalized news and blog content based on user-selected interests. It uses secure JWT-based authentication with access and refresh tokens and supports role-based access control with three roles: User, Admin, and SuperAdmin.

## Features

- **User Roles:**
  - **User:** Browse, save, and like posts based on interests.
  - **Admin:** Create and manage news posts under specific interests.
  - **SuperAdmin:** Manage nested interest categories and perform system-level configurations.

- **Authentication:**
  - Secure login and registration using JWT access and refresh tokens.
  - Role-based route protection.

- **Personalized Feed:**
  - Users get news and blog articles filtered by their chosen interests.

- **Frontend:**
  - Built with React and Redux Toolkit.
  - Proper modular folder structure for scalable development.
  
- **Backend:**
  - Node.js with Express.js and MongoDB.
  - RESTful API with role-based middleware protection.

## Frontend Folder Structure


frontend/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── features/
│ │ ├── auth/
│ │ ├── posts/
│ │ ├── interests/
│ ├── redux/
│ │ ├── slices/
│ │ └── store.js
│ ├── routes/
│ ├── pages/
│ ├── utils/
│ └── App.jsx
├── .env
└── package.json

markdown
Copy
Edit

## Tech Stack

- **Frontend:** React, Redux Toolkit, React Router DOM
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (Access & Refresh Tokens)
- **Others:** dotenv, bcrypt, cors

## How to Run

### Backend

1. Navigate to the backend folder:
cd backend

markdown
Copy
Edit
2. Install dependencies:
npm install

markdown
Copy
Edit
3. Create `.env` file and add your environment variables (Mongo URI, JWT secret, etc.)
4. Start the server:
npm run dev

markdown
Copy
Edit

### Frontend

1. Navigate to the frontend folder:
cd frontend

markdown
Copy
Edit
2. Install dependencies:
npm install

markdown
Copy
Edit
3. Create `.env` file for any frontend environment variables (e.g., API base URL)
4. Start the development server:
npm start

yaml
Copy
Edit

## Future Improvements

- Add pagination and infinite scrolling to news feed.
- Implement notification system.
- Enhance UI/UX with better designs and animations.
- Add tests for backend and frontend components.

---

Feel free to customize this README based on your project progress!  
If you want, I can help write detailed setup guides, API docs, or anything else. Just say the word!









Tools



ChatGPT can make mistakes. Check important info. See Cookie Preferences.