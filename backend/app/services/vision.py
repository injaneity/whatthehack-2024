from openai import OpenAI
import os
from dotenv import load_dotenv

def get_tags():
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
                            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                        },
                    },
                ],
            }
        ],
        max_tokens=300,
    )

    tags_str = response.choices[0].message.content.strip().split("\n")

    return tags_str[1]