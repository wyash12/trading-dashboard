# Trading Economic Calendar Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack MERN application for tracking high-impact economic events and their market implications.
![image](https://github.com/user-attachments/assets/59bf6e6f-2e63-4962-a56f-0335d55a6a70)


## Features

- 📅 View economic calendar events for current week
- 🔍 Filter events by country, impact level
- 📊 Real-time market sentiment analysis (Bullish 🟢/Bearish 🔴)
- 📱 Responsive table layout 
- 📈 Historical data comparison (Actual vs Forecast vs Previous)
- ⚡ MongoDB-powered backend with REST API

## Tech Stack

**Frontend:**
- React
- React Table
- Axios
- React Icons
- Tailwind CSS

**Backend:**
- Node.js
- Express
- MongoDB/Mongoose
- REST API
- JSON Web Tokens (JWT)

## Installation

### Prerequisites
- Node.js v16+
- MongoDB Atlas account or local MongoDB instance
- npm/yarn

### Backend Setup
```bash
git clone https://github.com/yourusername/economic-calendar.git
cd economic-calendar/backend

# Install dependencies
npm install

# Set up environment variables (create .env file)
cp .env.example .env



