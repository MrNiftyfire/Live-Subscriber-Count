import os
import requests
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        channel_id = "YOUR_CHANNEL_ID"  # replace with your channel ID
        api_key = os.getenv("YOUTUBE_API_KEY")

        url = f"https://www.googleapis.com/youtube/v3/channels?part=statistics&id={channel_id}&key={api_key}"
        response = requests.get(url)
        data = response.json()

        count = data["items"][0]["statistics"]["subscriberCount"]

        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(count.encode())
