expertTeacherContext = "You are an expert teacher with excellent communication and interpersonal skills, particularly skilled in distilling and reframing complicated topics for specific audiences"

## LEVEL
def LevelingPrompt(level):
    if level == "Elementary School":
        return ElementarySchoolLevel
    if level == "Kindergarten":
        return KindergartenLevel
    if level == "High School":
        return HighSchoolLevel
    if level == "University":
        return UniversityLevel

KindergartenLevel = "Create an exercise tailored for a kindergarten student to introduce basic concepts in a playful and interactive way. Keep it extremely simple and engaging"
ElementarySchoolLevel = "Develop an exercise tailored for an elementary school student exploring the topic. Keep it simple and interactive, focusing on basic concepts in an engaging manner. Ensure the exercise is easy to understand and complete"
HighSchoolLevel = "Design an exercise for a high school student studying the topic. Keep it moderately challenging, reinforcing fundamental concepts while encouraging critical thinking and problem-solving. Make the language clear and concise"
UniversityLevel = "The student is a university student with advanced proficiency in the subject matter. As a result, the exercise generated should be extremely hard and complex, but achievable. Ensure the exercise is rigorous and thought-provoking. "

## Language 

def LanguagePrompt(language):
    if language == "English":
        return English
    if language == "French":
        return French
    if language == "Spanish":
        return Spanish
    if language == "Chinese":
        return Chinese

English = "You must answer in English"
French = "You must answer in French"
Spanish = "You must answer in Spanish"
Chinese = "You must answer in Chinese"


## Structure 

PythonList = "The response you will provide will be interpreted by a python code, hence your response must be indisputably a single list ([]), interpretable in any programming language, and nothing else. You answer must not contain anything else than ONE interpretable list"

##Category

## Different functions 

def ScientificQuestionPromptFromTheme(topic):
    return f"You will give me a question, the topic is : {topic}. The question must in first place contain a context ( situation of the problem + all the required data to solve it ). Hence the question must be a situation where a problme took place, and not basically applying the notion. Then in a second place it must contain THE sole question. The entire question must be thought-provoking, and last at least 5min to solve. the context must be at least 10 lines long"
def GlobalQuestionPromptFromTheme(topic):
    return f"{topic}"
