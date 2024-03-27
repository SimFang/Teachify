import requests
from operationFunc import *
from requestFunc import *

def operate(category, theme, language):
    if category == "Mathematics":
        return writeAboutMath(theme, language)
    elif category == "Science":
        return writeAboutScience(theme, language)
    elif category == "History":
        return writeAboutHistory(theme, language)
    elif category == "Literature":
        return writeAboutLiterature(theme, language)
    elif category == "Geography":
        return writeAboutGeography(theme, language)
    elif category == "Art":
        return writeAboutArt(theme, language)
    elif category == "Technology":
        return writeAboutTechnology(theme, language)
    elif category == "Sports/Fitness":
        return writeAboutSportsFitness(theme, language)
    elif category == "Food/Cooking":
        return writeAboutFoodCooking(theme, language)
    elif category == "Music":
        return writeAboutMusic(theme, language)
    elif category == "Politics":
        return writeAboutPolitics(theme, language)
    elif category == "Religion":
        return writeAboutReligion(theme, language)
    elif category == "Health":
        return writeAboutHealth(theme, language)
    elif category == "Animals/Nature":
        return writeAboutAnimalsNature(theme, language)
    elif category == "Language/Linguistics":
        return writeAboutLanguageLinguistics(theme, language)
    elif category == "Psychology":
        return writeAboutPsychology(theme, language)
    elif category == "Philosophy":
        return writeAboutPhilosophy(theme, language)
    elif category == "Business/Economics":
        return writeAboutBusinessEconomics(theme, language)
    elif category == "Entertainment":
        return writeAboutEntertainment(theme, language)
    elif category == "Social Issues":
        return writeAboutSocialIssues(theme, language)
    elif category == "Programming":
        return writeAboutProgramming(theme, language)
    else:
        return [["Sorry we didn't find your subject","Sorry we didn't find your subject","Sorry we didn't find your subject","Sorry we didn't find your subject","Sorry we didn't find your subject"],["...","...","...","...","..."],["...","...","...","...","..."]]



def writeAboutMath(theme, language):
    return standardCourse(theme,language)


def writeAboutScience(theme, language):
    return standardCourse(theme,language)


def writeAboutHistory(theme, language):
    return standardCourse(theme,language)
  

def writeAboutLiterature(theme, language):
    # Function to write about Literature
    return standardCourse(theme,language)


def writeAboutGeography(theme, language):
    # Function to write about Geography
    return standardCourse(theme,language)


def writeAboutArt(theme, language):
    # Function to write about Art
    return standardCourse(theme,language)


def writeAboutTechnology(theme, language):
    return standardCourse(theme,language)


def writeAboutSportsFitness(theme, language):
    return standardCourse(theme,language)


def writeAboutFoodCooking(theme, language):
    return standardCourse(theme,language)

def writeAboutMusic(theme, language):
    # Function to write about Music
    return standardCourse(theme,language)


def writeAboutPolitics(theme, language):
    # Function to write about Politics
    return standardCourse(theme,language)


def writeAboutReligion(theme, language):
    # Function to write about Religion
    return standardCourse(theme,language)


def writeAboutHealth(theme, language):
    # Function to write about Health
    return standardCourse(theme,language)


def writeAboutAnimalsNature(theme, language):
    # Function to write about Animals/Nature
    return standardCourse(theme,language)


def writeAboutLanguageLinguistics(theme, language):
    # Function to write about Language/Linguistics
    return standardCourse(theme,language)


def writeAboutPsychology(theme, language):
    # Function to write about Psychology
    return standardCourse(theme,language)


def writeAboutPhilosophy(theme, language):
    # Function to write about Philosophy
    return standardCourse(theme,language)


def writeAboutBusinessEconomics(theme, language):
    # Function to write about Business/Economics
    return standardCourse(theme,language)


def writeAboutEntertainment(theme, language):
    # Function to write about Entertainment
    return standardCourse(theme,language)


def writeAboutSocialIssues(theme, language):
   # Function to write about Social Issues
    return standardCourse(theme,language)


def writeAboutProgramming(theme, language):
   # Function to write about Programming
    return standardCourse(theme,language)


def standardCourse(theme,language):
    theme = translateIntoAnyLanguage(theme,language)
    print(theme)
    summary = [
        translateIntoAnyLanguage(theme, language),
        translateIntoAnyLanguage("how to learn more", language),
        translateIntoAnyLanguage("External Ressources", language),
        ]
    firstLesson = giveTopics(theme, language)
    lessons = [
        firstLesson,
        simpleRequest(f"Answer in {language}, I'm trying to improve myself towards this subject : {theme}, How can I get better or have a better understanding of this subject. What are the methods or program I can apply. Write that in paragraph format, don't summarize"),
        parse_list_string(simpleRequest(f"Answer in {language}, I want to learn or practice about this subject : {theme}. Could you give me some useful external ressources. That would help to improve or have a better understanding regarding : {theme}. Answer in {language}. I uniquely want the python list in your answer. NOTHING ELSE. Your answer must be one single python list, don't embed any list in the list you provided"))
    ]    
    summarizedLessons = summarizeLessonPart(lessons, language)
    return [summary,lessons,summarizedLessons]