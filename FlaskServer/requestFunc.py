import requests
from operationFunc import *

## build function for each type of utility 

openai_api_key = "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"  # Replace with your OpenAI API key
url = "https://api.openai.com/v1/chat/completions"

def simpleRequest():
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "capital of France ?"}],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        print(result)
        return result
    else:
        print(f"Error: {response.status_code}, {response.text}")
# Generate summary ( input : string, output : array )
def summaryRequest(input):
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"I have to learn about {input} Give me 5 keypoints to learn about {input} Only answer in interpretable code: an array. Only an array."}],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        print(result)
        return getContent(result, True)
    else:
        print(f"Error: {response.status_code}, {response.text}")
# Generate lesson ( input : array & globalTheme, output : array )
def lessonpart(globalTheme, inputarray):
    finalResultArray = []
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }
    
    for keypoint in inputarray :
        data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"What's the importance of {keypoint} regarding : {globalTheme}. I want you to developp what it is and why it's important. Write that in paragraph format"}],
        "temperature": 0.7
        }
        response = requests.post(url, json=data, headers=headers)

        if response.status_code == 200:
            result = response.json()
            print(result)
            finalResultArray.append(getContent(result, False))
        else:
            print(f"Error: {response.status_code}, {response.text}")
    return finalResultArray

# Generate exercise : questions ( input : string, output : array)
def questionpart(input, inputForm ):
    prompt = ""
    if inputForm == "Theme":
        prompt = f"I have to exercise myself about {input}. Generate 5 questions about {input}. I also want the answer to these questions as well as 5 hints for the questions. Your response must be interpretable code: [[Question1, Answer1, Hint1]... ]. Only answer in interpretable code: an array. Only an array. I only want an array interpretable in any programming language. No python variable. Only an interpretable array"
    elif inputForm == "Cours":
        prompt = f"I have to exercise myself about this course: {input}. Generate 5 questions about this course. I also want the answer to these questions as well as 5 hints for the questions. Your response must be interpretable code: [[Question1, Answer1, Hint1]... ]. Only answer in interpretable code: an array. Only an array. I only want an array interpretable in any programming language. No python variable. Only an interpretable array"

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
        return extract_and_convert_array(getContent(result, False))
    else:
        print(f"Error: {response.status_code}, {response.text}")

def QCMpart(input, inputForm):
    pass

def getTheme(input):
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"Could you give me a global theme for this course : {input}. I only want the global theme in your response "}],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        print(result)
        return extract_values_between_quotes(getContent(result, False))
    else:
        print(f"Error: {response.status_code}, {response.text}")

