// api/subs.js
export default async function handler(req, res) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=YOUR_CHANNEL_ID&key=${process.env.YT_API_KEY}`
  );
  const data = await response.json();
  const subs = data.items?.[0]?.statistics?.subscriberCount || "Unknown";
  res.status(200).json({ subscribers: subs });
}
