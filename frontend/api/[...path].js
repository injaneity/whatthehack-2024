// frontend/pages/api/proxy/[...path].js

import axios from 'axios';

export default async function handler(req, res) {
  const { path } = req.query; // This captures the dynamic path segments
  const method = req.method;

  const backendUrl = process.env.BACKEND_URL; // Ensure this is set in Vercel env variables

  if (!backendUrl) {
    return res.status(500).json({ error: 'Backend URL not configured.' });
  }

  const apiPath = Array.isArray(path) ? path.join('/') : path;

  const url = `${backendUrl}/${apiPath}`;

  try {
    const response = await axios({
      method,
      url,
      headers: {
        // Forward necessary headers; be cautious with sensitive headers
        'Content-Type': 'application/json',
        // Add more headers if needed
      },
      data: req.body, // Forward the request body for POST/PUT/PATCH
      params: req.query, // Forward query parameters
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
