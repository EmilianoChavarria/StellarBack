import express from 'express';
import { helloWorldService } from '../services/stellarService.js';

const router = express.Router();

// Endpoint para invocar hello
router.post('/hello', async (req, res) => {
  try {
    const { to, secret } = req.body;
    const result = await helloWorldService.invokeHello(to, secret);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint para obtener greeting
router.get('/greeting/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const { secret } = req.query;
    const result = await helloWorldService.getGreeting(name, secret);
    res.json({ success: true, greeting: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;