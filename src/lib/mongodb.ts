// MongoDB connection (not used in static deployment)
// This file is kept for compatibility but not required for the portfolio

async function dbConnect() {
  throw new Error(
    'MongoDB not configured. This portfolio uses static JSON data.'
  );
}

export default dbConnect;
