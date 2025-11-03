// api/subs.js
export default async function handler(req, res) {
  // ✅ Allow requests from any origin (CORS fix)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight (OPTIONS) requests quickly
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC0KdIoPfAh_aKEOcBlexMMw&key=${process.env.YT_API_KEY}`
    );

    const data = await response.json();
    console.log(data); // Optional: logs in Vercel

    if (!data.items || data.items.length === 0) {
      throw new Error("Channel not found or API error");
    }

    const subs = data.items[0].statistics.subscriberCount;
    res.status(200).json({ subscribers: subs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ subscribers: "Unknown" });
  }
}
