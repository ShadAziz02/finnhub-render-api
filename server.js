const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const FINNHUB_SECRET = process.env.FINNHUB_SECRET;

app.use(express.json());

app.post("/webhook", (req, res) => {
  const receivedSecret = req.headers["x-finnhub-secret"];
  if (receivedSecret !== FINNHUB_SECRET) {
    return res.status(403).send("Forbidden: Invalid Secret");
  }
  console.log("✅ Webhook received:", req.body);
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Finnhub Webhook Server is live!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
