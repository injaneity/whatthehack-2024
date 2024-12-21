from openai import OpenAI
import os
from dotenv import load_dotenv
import json

def get_tags(file_url):
    load_dotenv()

    client = OpenAI()
    client.api_key = os.getenv("OPENAI_API_KEY")

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "ONLY return the top 3 keywords associated with this image, that is relevant to a student secondhand marketplace setting. ONLY return the three tags in json format."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": file_url,
                        },
                    },
                ],
            }
        ],
        max_tokens=300,
    )

    tags_str = response.choices[0].message.content.strip().split("\n")
    print("tags_str: ",tags_str)
    return json.loads(tags_str[1])