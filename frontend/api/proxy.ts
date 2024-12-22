export default async function handler(req:any, res:any) {
    const response = await fetch(`http://54.151.179.131${req.url}`, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined, // Remove host header to avoid issues
      },
      body: req.method !== 'GET' ? req.body : undefined,
    });
  
    const data = await response.json();
    res.status(response.status).json(data);
  }
  