// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // npm install node-fetch

const app = express();
const port = 3001;

app.use(cors());

// Helper function to fetch users from Random User API
async function fetchUsers(count) {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await response.json();
  return data.results;
}

// API route: /api?results=NUMBER
app.get("/api", async (req, res) => {
  try {
    // Parse the requested number of users
    const results = Math.min(Math.max(parseInt(req.query.results) || 1, 1), 1000);

    // Fetch fresh users
    const users = await fetchUsers(results);

    res.json({ results: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Local Random User API running at http://localhost:${port}/api`);
});
