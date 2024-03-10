import requests
from operationFunc import *

openai_api_key = "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"  # Replace with your OpenAI API key
url = "https://api.openai.com/v1/chat/completions"

categories = [
    "Mathematics",
    "Science",
    "History",
    "Literature",
    "Geography",
    "Art",
    "Technology",
    "Sports/Fitness",
    "Food/Cooking",
    "Music",
    "Politics",
    "Religion",
    "Health",
    "Animals/Nature",
    "Language/Linguistics",
    "Psychology",
    "Philosophy",
    "Business/Economics",
    "Entertainment",
    "Social Issues",
    "Programming"
]

def simpleRequest(prompt):
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        print(result)
        print(getContent(result, False))
        return getContent(result, False)
    else:
        print(f"Error: {response.status_code}, {response.text}")

simpleRequest("What is an apple ?")