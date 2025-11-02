// api/subs.js
export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC0KdIoPfAh_aKEOcBlexMMw&key=${process.env.YT_API_KEY}`
    );

    const data = await response.json();
    console.log(data); // <-- temporary, to see what the API returns

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
