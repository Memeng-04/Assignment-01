import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // make sure to install: npm install node-fetch

const app = express();
const port = 3000;

app.use(cors());

// Store users in memory
let storedUsers = [];

// Fetch from Random User API
async function fetchUsers(count) {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await response.json();
  return data.results;
}

// API route
app.get("/api", async (req, res) => {
  try {
    const results = Math.min(Math.max(parseInt(req.query.results) || 1, 1), 1000);

    // If not enough cached, fetch new users from real API
    if (storedUsers.length < results) {
      const newUsers = await fetchUsers(results);
      storedUsers = storedUsers.concat(newUsers);
    }

    // Slice the amount requested
    res.json({ results: storedUsers.slice(0, results) });

  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Local Random User API running at http://localhost:${port}/api`);
});
