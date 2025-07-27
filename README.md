# 🩸 Blood Donation Support System – Frontend

This is the **Frontend** of the **Blood Donation Support System**, built with **React**, **Vite**, and **Material-UI (MUI)**. 
It provides a responsive and user-friendly interface for donors, administrators, and organizers to manage blood donation activities.

> 🔗 Backend repo: [BloodDonationSupportSystem_BE](https://github.com/overcode250204/BloodDonationSupportSystem_BE)

## 📌 Features

- 🔐 JWT-based authentication and role-based authorization
- 🧑 User profile viewing and updating
- 📅 Donation schedule registration
- 📊 Donation history & chart reports (line chart & pie chart)
- 📜 Certificate PDF generation
- 📞 Contact and location display
  
## Technologies

- React
- Vite
- Material-UI (MUI)
- Axios
- React Router
- Day.js

## 📂 Project Structure

```bash
src/
├── api/            # API service functions
├── components/     # Reusable UI components
├── config/         # Environment/config files (e.g., axios config)
├── context/        # React context (e.g., AuthContext)
├── hook/           # Custom React hooks
├── layouts/        # Layout components (Header, Sidebar, etc.)
├── pages/          # Page-level components (Home, Login, Profile, etc.)
├── routes/         # Routing and ProtectedRoute logic
├── utils/          # Utility functions/helpers
├── App.jsx         # Root component
├── main.jsx        # Entry point for the app
```

### 🔐 Authentication & Roles
- Stores access token in localStorage
- Axios interceptor auto-attaches JWT to each request
- Role-based access (GUEST, MEMBER, STAFF, ADMIN)
- Protected routes based on authentication and role

### 📌 Notes
- The frontend requires the backend to be running for full functionality.
- Axios is pre-configured with interceptors to auto-attach JWT tokens.
