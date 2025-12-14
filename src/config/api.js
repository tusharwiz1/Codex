// API Configuration
// Set to 'http://localhost:3001' for local development (requires API to be running)
// Set to 'https://api.codex.jaagrav.in' for production/remote API
// You can override this with REACT_APP_API_URL environment variable

// Check if local API is available, otherwise fallback to remote
const getApiUrl = () => {
  // If environment variable is set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Default to local API for development
  // Change this to 'https://api.codex.jaagrav.in' if you want to use remote API
  return 'http://localhost:3001';
};

const API_BASE_URL = getApiUrl();

export default API_BASE_URL;

