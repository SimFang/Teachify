import json
from dotenv import load_dotenv
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Exercise
from requestFunc import *
from operationFunc import *
from categoriesFunc import *
import os
import random

load_dotenv()

app = Flask(__name__)
app.config.from_object(ApplicationConfig)


bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

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
    try : 
        category = Classify(theme)
        response = operate(category, theme, language)
    except Exception as error:
        return("An error occurred:", error)
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

@app.route('/api/gethelp', methods=['POST'])
def get_helpcourse_data():
    course = request.json["course"]
    question = request.json["question"]
    # Process data on the server side as needed
    # process the response of operate func 
  
    result = jsonify(simpleRequest(f"You must answer in the same language as the course given. You are an expert teacher with excellent communication and interpersonal skills, particularly skilled in distilling and reframing complicated topics for specific audiences. Your task is to explain the concept of the following in simple terms, I have a problem with : {question}. Here is the course : {course}"))
    print(result)
    return (result) 

@app.route('/api/basicexercise', methods=['POST'])
def get_basicexercise_data():
    exerciseType = request.json["exerciseType"]
    language = request.json["language"]
    level = request.json["level"]
    inputType = request.json["inputType"]
    input = request.json["input"]

    # amount of question
    amount = 2
    result = []
    globalEvaluation = [0,0,0]

    if exerciseType == "QCM":
        ##FRAMING THE MCQ GENERATOR function
        

        APIanswer = QCMpart1(input, inputType, language, "Hard", level)
        questions = APIanswer[0]
        for question in questions : 
            result.append({
                "question":question[0],
                "indication":question[2],
                "Hint":question[1][5],
                "answer":(question[1][0] if question[1][4] == "A" else question[1][1] if question[1][4] == "B" else question[1][2] if question[1][4] == "C" else question[1][3] if question[1][4] == "D" else ""),
                "choices":question[1][:4]
            })


        globalEvaluation = APIanswer[1]
        print(f"requests: {globalEvaluation[0]}, errors : {globalEvaluation[1]}, total_tokens : {globalEvaluation[2]}")
        print(result)

    if exerciseType == "Question":
        category = Classify(input)
        if(category == "Mathematics" or category == "Science" or category == "Programming" ):        
            answer = questionouverteapplication(input, inputType, level, language, category)
        else : 
            answer = questionouvertedeveloppement(input, inputType, level, language)
        if(inputType == "Course"): 
            theme = getTheme(input)
        else : 
            theme = input
        illustration = unsplashRequest(theme)
        if illustration :
            illustration = illustration[0]
        print(illustration)
        result = answer
        if(len(result) == 1):
            result = ["",answer, illustration]
        
    print(result)
    return jsonify(result)

@app.route('/api/getcorrection', methods=['POST'])
def get_correction():
    level = request.json["level"]
    question = request.json["question"]
    context = request.json["context"]
    answer = request.json["input"]
    language = request.json["language"]
    print(language)

    question = context + question[0]

    result = correction(question, answer, level, language)
    result[0] = int(result[0][:2])
    return jsonify(result)

### DB SECTION

@app.route("/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")

    if user_id is None or not user_id : 
        return jsonify({"error": "Unauthorized, not logged"}), 401
    print(user_id)
    user = User.query.filter_by(id=user_id).first()
    print("User is connected")
    return jsonify({
        "id":user.id,
        "email":user.email,
        "userID" : user_id,
        "username":user.username,
    })

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    username = request.json["username"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, username = username)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "username":new_user.username,
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        user = User.query.filter_by(username=email).first()
        if user is None : 
            return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id
    stored_id = session.get("user_id")
    print(f"user_id : {stored_id}")
        
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route("/storeexercise", methods=["POST"])
def store_exercise():
    user_id = session.get("user_id")
    if not user_id : 
        return "401"

    input_type = request.json["input_type"]
    input = request.json["input"]

    theme = ""
    print(input_type)
    if input_type == "Course": 
        theme = getTheme(input)
    if input_type == "Theme":
        theme = input
    print(theme)

    given_theme=request.json["theme"]
    print(given_theme)

    exercise_type = request.json["exercise_type"]

    content = json.dumps(request.json["content"])

    correction = request.json["correction"]
    result = request.json["result"]
    language = request.json["language"]
    level = request.json["level"]

    illustrations = unsplashRequest(theme)
    if illustrations : 
        if isinstance(illustrations, list) and illustrations:
            illustration = random.choice(illustrations)
        else:
            illustration = illustrations
    else : 
        illustration = None

    new_exercise = Exercise(
    theme=theme,
    input_type=input_type,
    input=input,
    exercise_type=exercise_type,
    content=content,
    result=(result if exercise_type=='QCM' else correction[0] if exercise_type == "Question" else ""),
    correction=json.dumps(correction),
    language=language,
    level=level,
    user_id=user_id,
    illustration=illustration
    )
    db.session.add(new_exercise)
    db.session.commit()

    # Access and print all the attributes of the new exercise
    print("New Exercise Specs:")
    print(f"Theme: {new_exercise.theme}")
    print(f"Input Type: {new_exercise.input_type}")
    print(f"Input: {new_exercise.input}")
    print(f"Exercise Type: {new_exercise.exercise_type}")
    print(f"Content: {new_exercise.content}")
    print(f"Correction: {new_exercise.correction}")
    print(f"Result: {new_exercise.result}")
    print(f"Language: {new_exercise.language}")
    print(f"Level: {new_exercise.level}")
    print(f"User ID: {new_exercise.user_id}")
    print(f"Illustration: {new_exercise.illustration}")


    return "200"

@app.route("/loadexercise",methods=["POST"])
def load_exercise(): 
    id = request.json["exercise_id"]
    exercise = Exercise.query.filter_by(id=id).first()
    content = json.loads(exercise.content)
    return jsonify({
            "id":exercise.id,
            "theme":exercise.theme,
            "type" : exercise.exercise_type,
            "content":content,
        })

@app.route("/getuserexercises", methods=["POST"])
def get_user_exercises():
    user_id = session.get("user_id")

    if user_id is None or not user_id : 
        return jsonify({"error": "Unauthorized, not logged"}), 401

    exercises = Exercise.query.filter_by(user_id=user_id).all()
    if not exercises:
        jsonify({"error": "Unauthorized, not logged"}), 401
    # creating the new list
    input_list = []
    for k in range (len(exercises)):
        input_list.append({
            "id":exercises[k].id,
            "theme":exercises[k].theme,
            "illustration":exercises[k].illustration
        })
    
    theme_info_dict = {}
    for obj in input_list:
        theme = obj['theme']
        if theme not in theme_info_dict:
            theme_info_dict[theme] = {'ids': [obj['id']], 'illustration': obj['illustration']}
        else:
            theme_info_dict[theme]['ids'].append(obj['id'])

    output_list = [{'theme': theme, 'ids': info['ids'], 'illustration': info['illustration']} for theme, info in theme_info_dict.items()]
    
    return jsonify(output_list)


@app.route("/getthemeexercises", methods=["POST"])
def get_theme_exercises():
    user_id = session.get("user_id")

    if user_id is None or not user_id : 
        return jsonify({"error": "Unauthorized, not logged"}), 401

    theme = request.json["theme"]  
    exercises = Exercise.query.filter_by(theme=theme, user_id=user_id).all()

    if not exercises:
        jsonify({"error": "Unauthorized, not logged"}), 401
   
    answer = []
    for k in range (len(exercises)):
        answer.append({
            "type": exercises[k].exercise_type,
            "language":exercises[k].language,
            "level":exercises[k].level,
            "content": exercises[k].content,
            "illustration": exercises[k].illustration,
            "correction": exercises[k].correction,
            "result": exercises[k].result,
            "input_type": exercises[k].input_type,  # Include the input_type property
            "input": exercises[k].input             # Include the input property
        })
    return jsonify(answer)

@app.route("/deletetheme",methods=["POST"])
def delete_theme():
    user_id = session.get("user_id")

    if user_id is None or not user_id : 
        return jsonify({"error": "Unauthorized, not logged"}), 401

    theme = request.json["theme"]  
    exercises_to_delete = Exercise.query.filter_by(theme=theme, user_id=user_id).all()

    for exercise in exercises_to_delete:
        db.session.delete(exercise)
    db.session.commit()
    return "200"

@app.route("/newCatMarwan",methods=["POST"])
def newCatMarwan():
    user_id = session.get("user_id")
    if not user_id : 
        return "401"

    input_type = "Theme"
    input = "Marwan Bouzoubaa"

    theme = "Marwan Bouzoubaa"

    exercise_type = "QCM"

    content = json.dumps([{
        "indication": "Il est salement frais",
        "choices": ["bo", "intelligent", "puissant", "nul"],
        "question": "Qu'est ce que Marwan n'est pas ?",
        "Hint": "Tout est bien chez lui",
        "answer":"nul"
    }])


    correction = ""
    result = 20
    language = "French"
    level = "High School"

    
    illustration = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlJTIwZ3ltfGVufDB8fDB8fHww"

    new_exercise = Exercise(
    theme=theme,
    input_type=input_type,
    input=input,
    exercise_type=exercise_type,
    content=content,
    correction=correction,
    result=result,
    language=language,
    level=level,
    user_id=user_id,
    illustration=illustration
    )
    db.session.add(new_exercise)
    db.session.commit()

    return "204"

@app.route("/test",methods=["POST"])
def test():
    print(    QCMpart1("Molière", "Theme", "French", "Hard", "University"))

if __name__ == '__main__':
    app.run(debug=True)