📌 Table of Contents

🚀 Features

🖥️ Tech Stack

🎨 Frontend Technologies

⚙️ Backend Technologies

📁 Project Structure

✅ Installation & Setup

🔑 Admin Login

🌐 Frontend & Backend URLs

📜 License

🚀 Features
✅ User Features

User Registration & Login (JWT Authentication)

Browse sports products by category

Add/remove/update items in cart

Checkout with order summary

View personal order history

Mobile-friendly responsive UI

✅ Admin Features

Django Admin Panel to manage:
✔ Products
✔ Categories
✔ Orders
✔ Order Items

Upload product images

Auto-calculated totals in orders

🖥️ Tech Stack
Frontend: React 19, React Router DOM 7, Axios, Bootstrap 5, Styled Components
Backend: Django 5.2.6, Django REST Framework, JWT Auth
Database: SQLite (Easily extendable to PostgreSQL/MySQL)
Tools & Build: Node.js 18+, Python 3.12+, VS Code
🎨 Frontend Technologies

The frontend is built with React 19 using a component-driven structure:

React 19 – Single-page UI

React Router DOM 7 – Routing (Home, Products, Checkout, Orders, About)

Bootstrap 5 – Responsive layout & UI components

Bootstrap Icons – High-quality icons

Styled Components – Scoped CSS & theming

Axios – API communication

Context API – Global state for auth + cart

Testing Tools:

React Testing Library

Jest DOM

User Event

⚙️ Backend Technologies

The backend API is powered by Django 5.2.6 and Django REST Framework (DRF):

Django REST Framework – REST endpoints for products, cart, and orders

Simple JWT – Token-based authentication

CORS Headers – Frontend communication

SQLite – Development database

Media Handling – Product image uploads

✅ Key Django Settings

JWTAuthentication enabled in REST_FRAMEWORK

Access token expiry: 1 day

Refresh token expiry: 7 days

Media served at /media/

📁 Project Structure
online-sports-shop/
│
├── frontend/        # React Application
│   ├── src/
│   └── package.json
│
├── backend/         # Django Backend
│   ├── backend/     # Django settings
│   ├── api/         # DRF apps (Products, Orders, Auth)
│   └── manage.py
│
└── README.md

✅ Installation & Setup

Follow these steps to run the project on your system.

1️⃣ Clone the Repository
git clone https://github.com/littlenewprogrammer123/sports-ecommerce-django.git
cd sports-ecommerce-django

2️⃣ Setup Backend (Django)
Create & activate virtual environment
cd backend
python -m venv venv
venv\Scripts\activate      # Windows

Install dependencies
pip install -r requirements.txt

Run the Django server
cd backend
python manage.py runserver


✅ Backend running at: http://127.0.0.1:8000

3️⃣ Setup Frontend (React)

Open a second terminal:

cd frontend
npm install
npm start


✅ Frontend running at: http://localhost:3000

🔑 Admin Login
Username: admin
Password: sportsshop


Django Admin Panel → http://127.0.0.1:8000/admin

🌐 Frontend & Backend URLs
Service	URL
Frontend	http://localhost:3000

Backend API	http://127.0.0.1:8000

Admin Panel	http://127.0.0.1:8000/admin
