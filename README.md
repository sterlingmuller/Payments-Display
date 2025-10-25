# Payments Display

A React application for displaying and navigating payment data.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   npm install
3. Create a `.env` file in the project root with your API credentials:
   VITE_API_TOKEN=your_api_token_here
   VITE_API_BASE_URL=https://your-api-url.com

## Running the Application

Start the development server:
npm run dev

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Building for Production

npm run build

The built files will be in the `dist` directory.

## Environment Variables

- `VITE_API_TOKEN` - Authentication token for the payments API
- `VITE_API_BASE_URL` - Base URL for the payments API endpoint
