import requests
from operationFunc import *
import os
from dotenv import load_dotenv
from itertools import repeat 
import prompts

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
        return result
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
        "temperature": 1.2
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        rawanswer = getContent(result, False)
        print("the raw answer is : ",rawanswer)
        print("raw answer type is : ", type(rawanswer))
        return getListFromExtraction(rawanswer)
        

    else:
        print(f"Error: {response.status_code}, {response.text}")

def parse_list_string(list_string):
    # Remove the brackets and split the string by comma
    items = list_string.strip('[]').split(', ')
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


def giveTopics(theme, language):
    firstLesson = parse_list_string(simpleRequest(f"Answer in {language}, I want to learn about {theme}, however I don't want any text. You'll write all the questions or notions in close relation with {theme}. All that will be answered in {language} and in a python list format. I uniquely want the python list in your answer. NOTHING ELSE. Your answer must be one single python list, don't embed any list in the list you provided"))
    if(len(firstLesson[0]) >= 200):
        firstLesson = firstLesson[0].split(",")
    return firstLesson

#### EXERCISE PART

##Questions

def QuestionFromCourse(language, level, input):
    pass
def QuestionFromTheme(language, level, input):
    languageprompt = prompts.LanguagePrompt(language) 
    levelprompt = prompts.LevelingPrompt(level)
    questionprompt = ""
    category = Classify(input)
    if(category == "Mathematics" or category == "Science"):
            questionprompt = prompts.ScientificQuestionPromptFromTheme(input)


    FinalPrompt = f"{languageprompt}. {prompts.expertTeacherContext}. {questionprompt}. {levelprompt}. {prompts.PythonList}. The first element of the list will be the context, and the second elemnet of the list will be the question. Thereby, your answer is a list containing two elements"
    
    rawAPIanswer = simpleRequest(FinalPrompt)
    APIanswer = (getContent(rawAPIanswer, False))
    print(APIanswer)
    convertAPIanswer = (convertList(APIanswer))
    print(len(convertList(APIanswer)))
    ## return [convertAPIanswer[0], convertAPIanswer[1]]
    ## TEST
    return ["Bonjour","Cite moi une pomme"]



## QCMpart
evaluation = [0,0,0]
def spaces(result) :
    result = list(result)
    for k in range(len(result) - 1, -1, -1) :
            if result[k] == "\n" :
                result.pop(k)
    result = "".join(result)
    return result

def qcmpart(input, inputForm, language, difficulty, level) :
    global evaluation
    ABCD = ["A","B","C","D"]
    def removefirstletter(input, k) :
        if input[0] == k :
            return input[2:]
        else :
            return input
    valideresponse = False
    error = 0 
    while not(valideresponse) and error < 6:
        prompt = ""
        if inputForm == "Theme":
            prompt = f'You must answer in {language}. Generate a multiple question quiz for a {level} student in {language} on {input} consisting of five {difficulty} questions with four possible answers for each question. Each questions have four options, with only one correct answer.  For each questions I want a helpful hint. Your response must be in interpretable code: ["Question1", "A)OptionsA", "B)OptionsB", "C)OptionsC", "D)OptionsD", "Answer1", "Hint1", "Question2",  "A)OptionsA", "B)OptionsB", "C)OptionsC", "D)OptionsD", "Answer2", "Hint2"...]. Only answer in interpretable code:  AN ARRAY. NOTHING ELSE, I Never want you to write "Question1". For example for the subject paris you could write : ["Which iconic Parisian monument is also known as the Iron Lady?", "A)Eiffel Tower", "B)Arc de Triomphe", "C)Notre Dame Cathedral", "D)Sacre Coeur Basilica", "A", "Hint: It was designed by Gustave Eiffel.",...].'
        elif inputForm == "Cours":
            prompt = f'I have to exercise myself about this course: "{input}". Generate a multiple question quiz in {language} about this course, consisting of five questions with FOUR possible answers (I really need 5 questions with 4 possible answers by question, with the 5 answers). I also want the answer to these questions. All the answers has to be in the text. Only answer in interpretable code: ["Question1", "A)OptionsA", "B)OptionsB", "C)OptionsC", "D)OptionsD", "Answer1", "Hint1", "question2", "A)OptionA"...]. Only answer in interpretable code:  AN ARRAY. NOTHING ELSE. For example for subject paris you can write : ["Which iconic Parisian monument is also known as the Iron Lady?", "A)Eiffel Tower", "B)Arc de Triomphe", "C)Notre Dame Cathedral", "D)Sacre Coeur Basilica", "A", "Hint: It was designed by Gustave Eiffel.",...].'

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
            evaluation[2] += getTotalTokens(result)
            result = getContent(result, False)
            result = spaces(result)
            print(result)
            result = eval(result)
        else:
            print(f"Error: {response.status_code}, {response.text}")
            evaluation[1] += 1
        evaluation[0] += 1
        inter = len(result)
        for k in range(inter//7) :
            inter = result[k*2 + 1 : k * 2 + 7]
            del result[k*2 + 1 : k * 2 + 6]
            result[k*2 + 1] = inter
        finalanswer = [[""] * 2 for k in range(len(result) // 2)]
        for k in range(len(result) // 2) :
            finalanswer[k][1] = [""] * 6
        for k in range(len(result)//2) :
            for j in range(2) :
                finalanswer[k][j] = result[k * 2 + j]
        for k in range(len(finalanswer)) :
            for j in range(4) :
                finalanswer[k][1][j] = removefirstletter(finalanswer[k][1][j], ABCD[j])
        print(finalanswer)
        if finalanswer[0][0].upper() != "QUESTION1" :
            valideresponse = True
            listecomment = [0] * len(finalanswer)
            for k in range(len(finalanswer)) :
                commentPrompt = f"You are an expert {level} teacher with excellent communication and interpersonal skills, particularly skilled in distilling and reframing complicated topics for specific audiences. Could you explain me why : '{finalanswer[k][1][ABCD.index(finalanswer[k][1][4])]}' is the answer of this question : '{finalanswer[k][0]}' Could you developp a little bit in 4 lines an simple explanation. You must answer in the same language as the question and the answer. "
                element = simpleRequest(commentPrompt)
                print(element)
                finalanswer[k].append(getContent(element, False))
                evaluation[2] += getTotalTokens(element)
        else :
            error += 1
            evaluation[1] += 1
    return finalanswer
error = True
nberror = 0
def QCMpart1(input, inputForm, language, difficulty, level) :
    global error
    global nberror
    while error and nberror < 4 :
        try : 
            element = qcmpart(input, inputForm, language, difficulty, level)
            return [element, evaluation]
        except : 
            error = True
            nberror = nberror + 1
            evaluation[1] += 1

### Questionpart (MA)
def splitlastsentence(input) :
    for k in range(len(input) - 3, -1, -1) :
        if input[k] == "." or input[k] == "?" or input[k] == "!":
            if input[k + 1].isupper()  :
                return [input[0: k + 1], input[k + 1 ::]]
            if input[k + 2].isupper() :
                return [input[0: k + 1], input[k + 2 ::]]
    return [input]
def questionouvertedeveloppement(input, inputform, level, language) :
    global evaluation
    if inputform == "Cours" :
        prompt = f"first you are a university teacher. You must answer in {language}. Your task is now to ask me a question regarding the following course which invloves a development. I must not be able to realize this under less than 10 minutes. The question muste tackle mu understanding og the matter. Here is the course : {input}"
    if inputform == "Theme" :
        prompt = f"firste ou are a {level} teacher. You must answer in {language}. Your task is now to ask me a question about {input} which involves a development. I must not be able to realise it in less than 10 minutes. The question must tackle my understanding of {input}."
    result = simpleRequest(prompt)
    evaluation[0] += 1
    evaluation[2] += getTotalTokens(result)
    return splitlastsentence(getContent(result, False))

def questionouverteapplication(input, inputform, level, language, catégorie) :
    global evaluation
    if inputform == "Theme" :
        prompt = f"You are a {level} {catégorie} professor, and you have to make a creative {catégorie} problem that takes about 5 minutes involving {input} in {language} for a examen without giving the solution !"
    if inputform == "Course" : 
        prompt = f"You are a {level} {catégorie} progessor, and you have to make a {catégorie} problem that takes about 5 minutes involving the different notion that are used in the folowing course : \"{input}\", answer in {language}"
    element = simpleRequest(prompt)
    evaluation[2] += getTotalTokens(element)
    evaluation[0] += 1
    return splitlastsentence(getContent(element, False))

### Correction 

def removedebut(mot, element) :
    if element[0: len(mot)].upper() == mot :
        return element[len(mot) + 2::]
    else :
        return element
        
def correction(question, answer, level, language) :
    prompt = f'You must answer in {language}.you gave ask this question : \"{question}\" to one of your {level} student and he answered you {answer} could you please answer him the good and the bad points about his answer as well as a grade out of twenty with a very short global remark. Answer in an array in that form : ["good aspects","bad aspects","grade", "global remark"]'
    element = simpleRequest(prompt)
    evaluation[2] += getTotalTokens(element)
    sous_categories = ["GOOD ASPECTS", "BAD ASPECTS", "GRADE", "GLOBAL REMARK"]
    element = getContent(element, False)
    print(element)
    element = eval(element)
    element = list(map(removedebut, sous_categories, element))
    finalanswer = [""] * 4
    finalanswer[0] = element[2]
    finalanswer[1] = element[3]
    finalanswer[2] = element[0]
    finalanswer[3] = element[1]
    return finalanswer

##MCQs
def MCQQuestionFromCourse(language, level, input):
    answer = []
    evaluation = [0, 0, 0]

    ## QUESTION PROMPT
    # Generate a question
    questionPrompt = f"You must write it in {language}. You are an expert {level} teacher with excellent communication and interpersonal skills, particularly skilled in distilling and reframing complicated topics for specific audiences. Your task is to formulate ONE SINGLE question for a {level} student about the following course : {input}"
    questionDict = simpleRequest(questionPrompt)
    evaluation[0] += 1
    evaluation[2] += getTotalTokens(questionDict)
    answer.append(getContent(questionDict, False))
    ## GENERATE the choices, answer & hint 
    prompt = f"You must answer in the same language as the given question, otherwise the student you're adressing to won't be able to understand you. You're a professional teacher skilled in distilling and teaching complex topics for students. You task is to provide 4 choices for the following questions, three of them are false and one of them is the real answer for the following question : '{answer[0]}', You must understand that there can't be two true answers but only one. The answer that you'll give will be interpreted by a python code, hence your answer must be a list ([]), interpretable in python. Each possibilities must be an element of the list. Furthermore, the fifth element of the list must be the ANSWER to the question, pls don't be wrong ( it must be one of the choices you provided before, don't reformulate the answer, you must give the same answer element). And the sixth element must be a hint for the student who will perform this MCQ. Don't forget that your answer must ABSOLUTELY be an interpretable list. "
    while True :
        try : 
            rest = simpleRequest(prompt)
            evaluation[0] += 1
            evaluation[2] += getTotalTokens(rest)

            rest = getContent(rest, False)
            rest = convertList(rest)
            print(rest)
            choices = rest[:4]
            if(rest[5] and rest[4] in choices ):
                answer.append(rest)
                break
            else : 
                evaluation[1] += 1
                print("Syntax error, hint not existent or answer isn't corresponding. Repassing the request")
        except Exception as e : 
            evaluation[1] += 1
            print("An error occured, the rest variable is NOT A LIST :", e)

    #Generate a comment
    commentPrompt = f"You are an expert {level} teacher with excellent communication and interpersonal skills, particularly skilled in distilling and reframing complicated topics for specific audiences. Could you explain me why : '{answer[1][4]}' is the answer of this question : '{answer[0]}' Could you developp a little bit in 4 lines an simple explanation. You must answer in the same language as the question and the answer. "
    commentDict = simpleRequest(commentPrompt)
    evaluation[0] += 1
    evaluation[2] += getTotalTokens(commentDict)

    answer.append(getContent(commentDict, False))

    return [answer, evaluation]

def MCQQuestionFromTheme(language, level, input):
    answer = []
    evaluation = [0, 0, 0]

    ## QUESTION PROMPT
    # Generate a question
    questionPrompt = f"You are an expert {level} teacher with excellent communication and interpersonal skills, particularly skilled in distilling and reframing complicated topics for specific audiences. Your task is to formulate ONE SINGLE question regarding this topic, your question shouldn’t be two questions concatenated in the same or separated by a comma, here’s the theme : {input}, for a {level} student, hence the difficulty must follow. You must write it in {language}."
    questionDict = simpleRequest(questionPrompt)
    evaluation[0] += 1
    evaluation[2] += getTotalTokens(questionDict)
    answer.append(getContent(questionDict, False))
    ## GENERATE the choices, answer & hint 
    prompt = f"You must answer in the same language as the given question, otherwise the student you're adressing to won't be able to understand you. You're a professional teacher skilled in distilling and teaching complex topics for students. You task is to provide 4 choices for the following questions, three of them are false and one of them is the real answer for the following question : '{answer[0]}', You must understand that there can't be two true answers but only one. The answer that you'll give will be interpreted by a python code, hence your answer must be a list ([]), interpretable in python. Each possibilities must be an element of the list. Furthermore, the fifth element of the list must be the ANSWER to the question, pls don't be wrong ( it must be one of the choices you provided before, don't reformulate the answer, you must give the same answer element). And the sixth element must be a hint for the student who will perform this MCQ. Don't forget that your answer must ABSOLUTELY be an interpretable list. "
    while True :
        try : 
            rest = simpleRequest(prompt)
            evaluation[0] += 1
            evaluation[2] += getTotalTokens(rest)

            rest = getContent(rest, False)
            rest = convertList(rest)
            print(rest)
            print(len(rest))
            choices = rest[:4]
            if(rest[5] and rest[4] in choices ):
                answer.append(rest)
                break
            else : 
                evaluation[1] += 1
                print("Syntax error, hint not existent or answer isn't corresponding. Repassing the request")
        except Exception as e : 
            evaluation[1] += 1
            print("An error occured, the rest variable is NOT A LIST :", e)

    #Generate a comment
    commentPrompt = f"You are an expert {level} teacher with excellent communication and interpersonal skills, particularly skilled in distilling and reframing complicated topics for specific audiences. Could you explain me why : '{answer[1][4]}' is the answer of this question : '{answer[0]}' Could you developp a little bit in 4 lines an simple explanation. You must answer in the same language as the question and the answer. "
    commentDict = simpleRequest(commentPrompt)
    evaluation[0] += 1
    evaluation[2] += getTotalTokens(commentDict)

    answer.append(getContent(commentDict, False))

    return [answer, evaluation]

def getTheme(input):
    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"I want you answer to be in the same language as the provided course. I will provide you a course I received from a student, your task is to give me the title/main theme of that course, give it a title, so that I can store it in my database. I only want you to give me the title/main theme in your response. Don't put anything else in your answer. I only want the title/main theme. Here is the course : '{input}'"}],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        return getContent(result, False)
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
    prompt = f"For all the following categories : {categoriesInAString}. Classify the following subject/course in one of them :{input}. In your response I only want the category it belongs to. NOTHING ELSE"

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
        "messages": [{"role": "user", "content": f'translate this "{input}" into {finalLanguage} .Only give me the translated word in your response. NOTHING ELSE. If the two language are the same or that you have to translate a proper noun, write the EXACT same thing. If its a question DO NOT ANSWER'}],
        "temperature": 0.3
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
    
def spaces(result) :
    result = list(result)
    for k in range(len(result) - 1, -1, -1) :
            if result[k] == "\n" :
                result.pop(k)
    result = "".join(result)
    return result

