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
    # Function to write about Mathematics
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutScience(theme, language):
    # Function to write about Science
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutHistory(theme, language):
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]    

def writeAboutLiterature(theme, language):
    # Function to write about Literature
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutGeography(theme, language):
    # Function to write about Geography
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutArt(theme, language):
    # Function to write about Art
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutTechnology(theme, language):
    # Function to write about Technology
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutSportsFitness(theme, language):
    # Function to write about Sports/Fitness
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutFoodCooking(theme, language):
    summary = [
        translateIntoAnyLanguage("Common points in relation with "+theme, "english", language),
        translateIntoAnyLanguage("How to improve", "english", language),
        translateIntoAnyLanguage("External Ressources", "english", language),
        ]
    lessons = [
        simpleRequest(f"I want to learn about {theme}, however I don't want any text. You'll write all the questions or notions in close relation with {theme}. All that will be answered in {language} and in a python list format. I uniquely want the python list in your answer. NOTHING ELSE. Your answer must be one single python list, don't embed any list in the list you provided"),
        simpleRequest(f"Answer in {language}, I'm trying to improve myself towards this subject : {theme}, How can I get better or have a better understanding of this subject. What are the methods or program I can apply. Write that in paragraph format, don't summarize"),
        simpleRequest(f"I want to learn or practice about this subject : {theme}. Could you give me some useful external ressources such as books, courses, places, historical event. That would help to improve or have a better understanding regarding : {theme}. Answer in {language}. I uniquely want the python list in your answer. NOTHING ELSE. Your answer must be one single python list, don't embed any list in the list you provided"),
    ]
    summarizedLessons = summarizeLessonPart(lessons, language)
    return [summary,lessons,summarizedLessons]

def writeAboutMusic(theme, language):
    # Function to write about Music
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutPolitics(theme, language):
    # Function to write about Politics
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutReligion(theme, language):
    # Function to write about Religion
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutHealth(theme, language):
    # Function to write about Health
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutAnimalsNature(theme, language):
    # Function to write about Animals/Nature
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutLanguageLinguistics(theme, language):
    # Function to write about Language/Linguistics
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutPsychology(theme, language):
    # Function to write about Psychology
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutPhilosophy(theme, language):
    # Function to write about Philosophy
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutBusinessEconomics(theme, language):
    # Function to write about Business/Economics
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutEntertainment(theme, language):
    # Function to write about Entertainment
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutSocialIssues(theme, language):
   # Function to write about Social Issues
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]

def writeAboutProgramming(theme, language):
   # Function to write about Programming
    summary = summaryRequest(theme, language)
    lessons = lessonpart(theme, summary, language)
    summarizedLessons = summarizeLessonPart(lessons, language)
    return[summary, lessons, summarizedLessons]