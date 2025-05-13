# Trading Economic Calendar Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack MERN application for tracking high-impact economic events and their market implications.

![Dashboard Preview](https://via.placeholder.com/800x400.png?text=Dashboard+Preview) *Add actual screenshot later*

## Features

- 📅 View economic calendar events for current week
- 🔍 Filter events by country, impact level, and date range
- 🔎 Search events by name/keyword
- 📊 Real-time market sentiment analysis (Bullish 🟢/Bearish 🔴)
- 📱 Responsive table layout with sorting capabilities
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



