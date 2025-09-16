import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

// Helpers
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Data 
const genders = ["male", "female"];
const maleNames = ["James", "Red", "Ilon", "Yosef", "William"];
const femaleNames = ["Maria", "Rafaela", "Jennifer", "Linda", "Elizabeth"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
const streets = ["Main St", "Oak Ave", "Maple Rd", "Cedar Ln", "Elm St"];
const cities = ["New York", "London", "Sydney", "Toronto", "Berlin"];
const states = ["NY", "CA", "TX", "FL", "IL"];
const domains = ["example.com", "test.com", "demo.com", "mail.com"];
const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany"];

// Generate one user
function generateUser() {
  const gender = rand(genders);
  const first = gender === "male" ? rand(maleNames) : rand(femaleNames);
  const last = rand(lastNames);

  return {
    gender,
    name: {
      title: gender === "male" ? "Mr" : "Ms",
      first,
      last,
    },
    location: {
      street: { number: randNum(1, 999), name: rand(streets) },
      city: rand(cities),
      state: rand(states),
      country: rand(countries),
      postcode: randNum(10000, 99999),
    },
    email: `${first.toLowerCase()}.${last.toLowerCase()}@${rand(domains)}`,
    phone: `${randNum(100, 999)}-${randNum(100, 999)}-${randNum(1000, 9999)}`,
    picture: {
      large: `https://randomuser.me/api/portraits/${gender === "male" ? "men" : "women"}/${randNum(0, 99)}.jpg`,
      medium: `https://randomuser.me/api/portraits/med/${gender === "male" ? "men" : "women"}/${randNum(0, 99)}.jpg`,
      thumbnail: `https://randomuser.me/api/portraits/thumb/${gender === "male" ? "men" : "women"}/${randNum(0, 99)}.jpg`,
    },
    dob: {
      date: new Date(
        Date.now() - randNum(18, 70) * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      age: randNum(18, 70),
    },
    cell: `${randNum(100, 999)}-${randNum(100, 999)}-${randNum(1000, 9999)}`,
  };
}

// API route
app.get("/api", (req, res) => {
  const results = Math.min(Math.max(parseInt(req.query.results) || 1, 1), 1000);
  const users = Array.from({ length: results }, generateUser);

  res.json({ results: users });
});

// Start server
app.listen(port, () => {
  console.log(`Local Random User API running at http://localhost:${port}/api`);
});
