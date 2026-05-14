import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Paystack Initialize Transaction
  app.post("/api/paystack/initialize", async (req, res) => {
    try {
      const { email, amount, metadata } = req.body;
      
      console.log("Initializing Paystack payment for:", email, "Amount:", amount);

      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Email is required" });
      }

      if (!amount || isNaN(Number(amount))) {
        return res.status(400).json({ error: "Valid amount is required" });
      }

      const trimmedEmail = email.trim().toLowerCase();
      
      if (!process.env.PAYSTACK_SECRET_KEY) {
        console.error("PAYSTACK_SECRET_KEY is missing in environment variables");
        return res.status(500).json({ error: "PAYSTACK_SECRET_KEY is not configured" });
      }

      const baseUrl = process.env.APP_URL || req.headers.origin;
      
      const paystackPayload: any = {
        email: trimmedEmail,
        amount: Math.round(Number(amount) * 100), // convert to kobo
        metadata,
        callback_url: `${baseUrl}/payment-callback`,
      };

      // Extract first/last name from metadata if possible for better display on Paystack side
      if (metadata && metadata.name) {
        const nameParts = metadata.name.trim().split(' ');
        paystackPayload.first_name = nameParts[0] || metadata.name.trim();
        paystackPayload.last_name = nameParts.slice(1).join(' ') || '';
      }

      console.log("Sending to Paystack:", JSON.stringify(paystackPayload, null, 2));

      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        paystackPayload,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Paystack Initialize Success:", response.data.status);
      res.json(response.data);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Paystack Init Error Response:", error.response?.data);
      console.error("Paystack Init Error Message:", error.message);
      res.status(500).json({ 
        error: "Failed to initialize payment", 
        details: errorMsg 
      });
    }
  });

  // Paystack Verify Transaction
  app.get("/api/paystack/verify/:reference", async (req, res) => {
    try {
      const { reference } = req.params;

      if (!process.env.PAYSTACK_SECRET_KEY) {
        return res.status(500).json({ error: "PAYSTACK_SECRET_KEY is not configured" });
      }

      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      res.json(response.data);
    } catch (error: any) {
      console.error("Paystack Verify Error:", error.response?.data || error.message);
      res.status(500).json({ 
        error: "Failed to verify payment", 
        details: error.response?.data?.message || error.message 
      });
    }
  });

  // Paystack Webhook
  app.post("/api/paystack/webhook", async (req, res) => {
    // Paystack sends a signature in the header to verify the request
    const crypto = await import("crypto");
    const secret = process.env.PAYSTACK_SECRET_KEY;
    
    if (!secret) {
      console.error("Webhook Error: PAYSTACK_SECRET_KEY not set");
      return res.sendStatus(500);
    }

    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash === req.headers["x-paystack-signature"]) {
      const event = req.body;
      console.log("Paystack Webhook Received:", event.event);

      if (event.event === "charge.success") {
        // Here you would typically update your database to mark the order as paid
        // reference: event.data.reference
        // amount: event.data.amount
        console.log("Payment Successful for Reference:", event.data.reference);
      }
    }

    // Always return 200 OK to Paystack
    res.sendStatus(200);
  });

  // API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
