import requests
from operationFunc import *
import os
from dotenv import load_dotenv

load_dotenv()

## build function for each type of utility 

openai_api_key = os.getenv("OPENAI_API_KEY")
url = "https://api.openai.com/v1/chat/completions"
unsplash_access_key = os.getenv("UNSPLASH_API_KEY")

print(openai_api_key)
print(unsplash_access_key)
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

def interpretedRequest(prompt):
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

def parse_list_string(list_string):
    # Remove the brackets and split the string by comma
    items = list_string.strip('[]').split(', ')
    # Remove any leading or trailing whitespace from each item
    items = [item.strip() for item in items]
    return items
def interpret_string(input_string):
    try:
        interpreted_data = ast.literal_eval(input_string)
        # Remove unnecessary escape characters
        interpreted_data = [item.replace("\\", "") for item in interpreted_data]
        return interpreted_data
    except (SyntaxError, ValueError) as e:
        items = input_string.strip('[]').split(', ')
        # Remove any leading or trailing whitespace from each item
        items = [item.strip() for item in items]
        return items
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

def questionpart(input, inputForm, language):
    prompt = ""
    if inputForm == "Theme":
        prompt = f'I have to exercise myself about {input}. Generate 5 questions about {input} (I really need 5 questions with 5 answers and 5 hints). I also want the 5 answers to these questions as well as 5 helpful hints that does not make the answer too obvious. Your response must be in interpretable code: ["Question1", "Answer1", "Hint1", "Question2", "Answer2", "Hint2"...]. Only answer in interpretable code:  AN ARRAY. NOTHING ELSE'
    elif inputForm == "Cours":
        prompt = f'I have to exercise myself about this course: "{input}". Generate 5 questions about this course (I really need 5 questions with 5 answers and 5 hints). I also want the answer to these questions as well as 5 hints for the questions. All the answers has to be in the text. Your response must be interpretable code: ["Question1", "Answer1", "Hint1", "Question2", "Answer2", "Hint2"...]. Only answer in interpretable code:  AN ARRAY. NOTHING ELSE'

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
    finalanswer = [[""] * 3 for k in range(5)]
    if response.status_code == 200:
        result = response.json()
        print(result)
        result = extract_and_convert_array(getContent(result, False))
    else:
        print(f"Error: {response.status_code}, {response.text}")
    for k in range(5) :
        for j in range(3) :
            finalanswer[k][j] = translateIntoAnyLanguage(result[k*3 + j], language)
    return finalanswer


def giveTopics(theme, language):
    firstLesson = parse_list_string(simpleRequest(f"Answer in {language}, I want to learn about {theme}, however I don't want any text. You'll write all the questions or notions in close relation with {theme}. All that will be answered in {language} and in a python list format. I uniquely want the python list in your answer. NOTHING ELSE. Your answer must be one single python list, don't embed any list in the list you provided"))
    if(len(firstLesson[0]) >= 200):
        firstLesson = firstLesson[0].split(",")
    return firstLesson

#### EXERCISE PART
def QCMpart(input, inputForm, language):
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
def translateIntoAnyLanguage(input, finalLanguage ):
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f'translate this "{input}". Into {finalLanguage} .Only give me the translated word in your response. NOTHING ELSE. If the two language are the same rewrite exactly the same thing.'}],
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