from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS module
from requestFunc import *
from operationFunc import *

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# settings for api
openai_api_key = "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"  # Replace with your OpenAI API key
url = "https://api.openai.com/v1/chat/completions"

# received data
data = []

@app.route('/api/course', methods=['POST'])
def get_course_data():
    data = request.json
    theme = data["subject"]
    # Process data on the server side as needed
    summary = summaryRequest(theme)
    lessons = lessonpart(theme, summary)

    result = []
    for k in range (len(summary)):
        result.append({
            "type": "lesson",
            "title": summary[k],
            "content": lessons[k]
        })
    return jsonify(result)

@app.route('/api/exercise', methods=['POST'])
def get_exercise_data():
    # settings 
    data = request.json
    input = data["subject"]
    exerciseType = data["exerciseType"]
    inputForm = data["inputForm"]

    #
    apiAnswer = (questionpart(input, inputForm) if exerciseType == "Question" else QCMpart(input, inputForm) if exerciseType == "QCM" else "")
    
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