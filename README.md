# React Frontend – Secure Task Management Dashboard

This frontend is built using **React + Vite** and implements a **secure, modern task and project management dashboard**. It provides authentication, CRUD functionality, and real-time UI updates — all with a strong emphasis on **security and maintainability**.

---

## Features

- **Authentication System:** Secure login/register with JWT-based token storage  
- **Projects & Tasks Management:** Create, edit, delete, and view tasks within projects  
- **Context API State Management:** Centralized handling of user, auth, and project data  
- **Input Sanitization:** Uses `DOMPurify` to prevent XSS attacks from user-generated input  
- **API Client with Token Handling:** Centralized Axios client attaches tokens automatically  
- **Error Handling:** Consistent and user-friendly feedback for all async operations  
- **Responsive UI Components:** Built with reusable `Input` and `Button` components  

---

## Security Highlights

This frontend has undergone a **complete security sweep** including:

- **DOMPurify sanitization** for all user-displayed fields (titles, descriptions, etc.)
- **Controlled components** for every form input
- **Axios interceptor** to attach JWT securely from `localStorage`
- **Graceful API error handling** to prevent sensitive data leaks
- **Frontend validation** with trimmed and sanitized form submissions

These measures complement backend safeguards such as CSP headers, rate-limiting, and data validation.

---

## Tech Stack

- **React 18 + Vite**
- **Axios** for API communication
- **React Router DOM** for navigation
- **DOMPurify** for sanitization
- **Context API + Hooks** for state management

---

## Setup & Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/your-frontend-repo.git
   cd your-frontend-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file:
   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```
4. Run the app locally:
   ```bash
   npm run dev
   ```
The app should now be running at http://localhost:5173