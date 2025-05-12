import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express(); // ✅ Initialize the app first
const port = process.env.PORT || 3000;

app.use(cors()); // ✅ Now it's safe to use

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Khipu API Key from environment variables
const KHIPU_API_KEY = process.env.KHIPU_API_KEY;

// POST route for creating the payment
app.post('/create-payment', async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0 || amount > 5000) {
    return res.status(400).json({ error: 'Invalid amount. Must be between 1 and 5000 CLP.' });
  }

  const paymentRequest = {
    amount,
    currency: 'CLP',
    subject: 'Cobro de prueba',
    return_url: 'https://nueva-integracion-khipu.onrender.com/create-payment',
    cancel_url: 'https://micomercio.com/order/cancel_url',
    notify_url: 'https://micomercio.com/webhook/notify_url',
  };

  try {
    const response = await fetch('https://payment-api.khipu.com/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': KHIPU_API_KEY,
      },
      body: JSON.stringify(paymentRequest),
    });

    const data = await response.json();

    if (response.ok) {
      res.json({
        payment_url: data.payment_url,
        simplified_transfer_url: data.simplified_transfer_url,
        transfer_url: data.transfer_url,
        app_url: data.app_url,
        payment_id: data.payment_id,
      });
    } else {
      res.status(500).json({ error: data.error || 'Error creating payment' });
    }
  } catch (err) {
    console.error('Error connecting to Khipu API:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



