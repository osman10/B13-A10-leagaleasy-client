# LegalEase - Client

![LegalEase Banner](https://b13-a10-leagaleasy-client.vercel.app)

## 📌 Project Overview

**LegalEase** is a modern online lawyer hiring platform that connects clients with verified legal professionals. Users can browse lawyers, hire legal experts, make secure payments, leave reviews, and manage their hiring history through a role-based dashboard system.

## 🌐 Live Website

**Live URL:** https://b13-a10-leagaleasy-client.vercel.app/

## 🎯 Project Purpose

Traditional legal consultations are often limited by geography and accessibility. LegalEase simplifies the process by providing a digital marketplace where:

* Clients can discover and hire lawyers.
* Lawyers can publish and manage legal services.
* Admins can monitor users, services, transactions, and platform analytics.

The project demonstrates advanced MERN concepts including authentication, authorization, payment integration, CRUD operations, role-based dashboards, and interactive user experiences.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* Email & Password Registration/Login
* Google Authentication using Better Auth
* JWT-based secure API communication
* Role-based access control (User, Lawyer, Admin)
* Protected dashboard routes

### 👨‍⚖️ Lawyer Marketplace

* Browse all lawyers
* Search lawyers by name
* Filter lawyers by specialization
* Filter by fee range
* Availability status filtering
* Pagination support
* Responsive lawyer grid layout

### 📄 Lawyer Details

* Complete lawyer profile information
* Professional image hosting via ImgBB
* Hire request system
* Comment system (only hired users can comment)
* Dynamic availability status


### 📊 Dashboard System

#### User Dashboard

* Hiring History
* Payment Management
* Comment Management
* Profile Update

#### Lawyer Dashboard

* Hiring Request Management
* Accept/Reject Requests
* Service Management
* Profile Management

#### Admin Dashboard

* User Management
* Role Management
* Transaction Monitoring
* Analytics Dashboard

### 🎨 UI/UX Features

* Responsive Design
* Mobile Friendly Navigation
* Hero Carousel
* Framer Motion Animations
* Skeleton Loading States
* Toast Notifications
* Custom Error Pages
* Dark Mode Support (Optional Feature)

---

## 🛠️ Technologies Used

### Frontend Framework

* Next.js 16
* React 19

### UI & Styling

* Tailwind CSS v4
* HeroUI
* Gravity UI Icons

### Authentication

* Better Auth

### Animations

* Framer Motion

### Components

* Swiper.js

### Notifications

* React Toastify

### Image Upload

* ImgBB API

---

## 📦 NPM Packages

```json
{
  "@gravity-ui/icons": "^2.18.0",
  "@heroui/react": "^3.2.1",
  "@heroui/styles": "^3.2.1",
  "better-auth": "^1.6.19",
  "framer-motion": "^12.40.0",
  "mongodb": "^7.3.0",
  "next": "16.2.9",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "react-toastify": "^11.1.0",
  "swiper": "^12.2.0"
}
```

---

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone <client-repository-url>
cd legalease-client
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_server_url

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key

NEXT_PUBLIC_BETTER_AUTH_URL=your_auth_url

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 📂 Project Structure

```bash
src/
├── app/
├── components/
├── hooks/
├── providers/
├── services/
├── utils/
├── context/
├── middleware/
└── assets/
```

---

## 🔒 Security

* JWT Token Verification
* Protected Routes
* Environment Variable Protection
* Secure API Communication
* Role-based Authorization

---

## 📈 Future Improvements

* Real-time Notifications
* Lawyer Availability Calendar
* Video Consultation
* Email Notifications
* AI Legal Assistant

---

## 👨‍💻 Developer

Developed as Assignment-10 Project for Programming Hero.

© 2026 LegalEase. All Rights Reserved.
