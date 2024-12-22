// pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_URL; // Use server-side env variable without NEXT_PUBLIC_

  try {
    const response = await axios({
      method: req.method,
      url: `${backendUrl}${req.url}`, // Adjust as needed
      headers: {
        // Forward necessary headers
        'Content-Type': 'application/json',
        // Include authentication headers if necessary
      },
      data: req.body,
      params: req.query,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(error.response?.status || 500).json({ message: 'Internal Server Error' });
  }
}
