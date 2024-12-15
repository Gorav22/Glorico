import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/texttoimage',
      headers: {
        'x-rapidapi-key': process.env.AI_AGENT_API_KEY,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        text: prompt,
        width: 1024,
        height: 1024,
      },
    };
    const response = await axios.request(options);
    const image = response.data;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;
