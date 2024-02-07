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

@app.route('/api/data', methods=['POST'])
def get_data():
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


if __name__ == '__main__':
    app.run(debug=True)