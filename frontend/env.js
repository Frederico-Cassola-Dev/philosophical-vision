// env.js
export default function getBackendUrl() {
  return process.env.VITE_BACKEND_URL || "http://localhost:5000/api"; // Replace with your desired URL
}
