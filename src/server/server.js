import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const app = express();
app.use(cors());

let cached = { token: null, expires: 0 };
async function getAppToken() {
  if (cached.token && Date.now() < cached.expires) {
    return cached.token;
  }
  const creds = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const { access_token, expires_in } = await res.json();
  cached = {
    token: access_token,
    expires: Date.now() + (expires_in - 60) * 1000,
  };
  return access_token;
}

app.get("/api/spotify-token", async (_, res) => {
  try {
    const token = await getAppToken();
    res.json({ access_token: token });
  } catch (e) {
    res.status(500).json({ error: "token_error", detail: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Token proxy listening on ${PORT}`));
