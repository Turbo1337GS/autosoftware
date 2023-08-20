import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const response = await fetch('http://localhost:8080/list');
    const data = await response.json();
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { message } = req.body;
    const response = await fetch('http://localhost:8080/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).end();  // Method Not Allowed
  }
};

export default handler;
