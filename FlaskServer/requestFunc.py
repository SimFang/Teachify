import requests
from operationFunc import *

## build function for each type of utility 

openai_api_key = "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"  # Replace with your OpenAI API key
url = "https://api.openai.com/v1/chat/completions"
unsplash_access_key = "FE8k-ElQfM5vniEe8Rbi38V5Xujm782u2WPUzXFQo80"

### SETTINGS 

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

#### COURSE PART
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
        return getContent(result, False)
    else:
        print(f"Error: {response.status_code}, {response.text}")
# Generate summary ( input : string, output : array )
def summaryRequest(input, language):
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"I want you to write and answer in the following language : {language}, I have to learn about {input} Give me 5 keypoints to learn about {input} Only answer in interpretable code: an array. Only an array."}],
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
def lessonpart(globalTheme, inputarray, language):
    finalResultArray = []
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }
    
    for keypoint in inputarray :
        data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"Answer in {language}, What's the importance of {keypoint} regarding : {globalTheme}. I want you to developp what it is and why it's important. Write that in paragraph format, don't summarize"}],
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

def summarizeLessonPart(inputarray, language):
    finalResultArray = []
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }
    
    for idea in inputarray :
        data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"Write in {language}, Summarize this idea as short as possible : {idea}"}],
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

def summarizeTheme(globalTheme, language): 
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"Write in {language}, What is {globalTheme} ?, I only want an overall summary "}],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        print(result)
        return getContent(result, False)
    else:
        print(f"Error: {response.status_code}, {response.text}")

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

#### EXERCISE PART
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

#### OTHERS 
def getQuote(theme, language):
    return simpleRequest(f"Could you give me an invented famous quote about : {theme}.  I want you to respond in : {language}. Please don't put an author. I only want the quote in your response, NOTHING ELSE")
def Classify(input):
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    categoriesInAString = "- {},".format(", - ".join(categories))
    prompt = f"For all the following categories : {categoriesInAString}. Classify the following subject in one of them :{input}. In your response I only want the category it belongs to. NOTHING ELSE"

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = getContent(response.json(), False)
        print(result)
        return result
    else:
        print(f"Error: {response.status_code}, {response.text}")    
def translateInEnglish(input, language):
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"Give me the english translation for : {input}, The language is : {language}. Only give me the translated word in your response. NOTHING ELSE "}],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        print(result)
        return getContent(result, False)
    else:
        print(f"Error: {response.status_code}, {response.text}")
def translateIntoAnyLanguage(input, initialLanguage, finalLanguage ):
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"Give me the {finalLanguage} translation for : {input}, The language is : {initialLanguage}. Only give me the translated word in your response. NOTHING ELSE "}],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        print(result)
        return getContent(result, False)
    else:
        print(f"Error: {response.status_code}, {response.text}")
def unsplashRequest(input):
    url = "https://api.unsplash.com/search/photos"
    params = {
        "query": input,
        "orientation": "landscape"
    }
    headers = {
        "Authorization": f"Client-ID {unsplash_access_key}"
    }
    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        # Extract URLs of the photos
        photo_urls = [photo["urls"]["regular"] for photo in data["results"]]
        print(photo_urls)
        return photo_urls
    except requests.exceptions.RequestException as e:
        print("Something went wrong:", e)
        return None