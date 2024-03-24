from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS module
from requestFunc import *
from operationFunc import *
from categoriesFunc import *
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# settings for api
openai_api_key = os.getenv("OPENAI_API_KEY")
url = "https://api.openai.com/v1/chat/completions"
unsplash_access_key = os.getenv("UNSPLASH_API_KEY")

# received data
data = []

@app.route('/api/course', methods=['POST'])
def get_course_data():
    theme = request.json["subject"]
    language = request.json["selectedLanguage"]
    # Process data on the server side as needed
    category = Classify(theme)
    response = operate(category, theme, language)
    # process the response of operate func 
    summary = response[0]
    lessons = response[1]
    summarizedLessons = response[2]
    result = []
    for k in range (len(summary)):
        result.append({
            "type": "lesson",
            "title": summary[k],
            "content": [lessons[k], summarizedLessons[k]],
            "index":k,
        })
    return jsonify(result)

@app.route('/api/courseHeader', methods=['POST'])
def get_courseHeader_data():
    data = request.json
    language = data["selectedLanguage"]
    theme = translateIntoAnyLanguage(data["subject"],language)

    # Process data on the server side as needed
    translatedTheme = translateInEnglish(theme, language)
    smallSummary = summarizeTheme(theme, language)
    imagesUrls = unsplashRequest(translatedTheme)
    quote = getQuote(theme, language)
    result = [imagesUrls, smallSummary, quote]
    return jsonify(result)

@app.route('/api/specificcourse', methods=['POST'])
def get_specificcourse_data():
    data = request.json
    language = data["selectedLanguage"]
    theme = data["subject"]
    # Process data on the server side as needed
    course = simpleRequest(f"{theme}. developp in {language} and developp in more than 6 lines and answer in a paragraph format"),
    result = {
        "course": course,
        "summarized":summarizeLessonPart([course], language)[0]
    }
    return  jsonify(result)

@app.route('/api/exercise', methods=['POST'])
def get_exercise_data():
    # settings 
    data = request.json
    input = data["subject"]
    exerciseType = data["exerciseType"]
    inputForm = data["inputForm"]
    language = data["language"]

    print(language)

    #
    apiAnswer = (questionpart(input, inputForm,language) if exerciseType == "Question" else QCMpart(input, inputForm, language) if exerciseType == "QCM" else "")
    
    #Scope the global subject
    subject = (getTheme(input) if inputForm == "Cours" else input)

    result = {
        "type" : exerciseType,
        "title" : subject,
        "content" : apiAnswer,
      }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

