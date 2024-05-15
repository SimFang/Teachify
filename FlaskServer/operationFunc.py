import json
import ast 
import re

# Given string representation (with double quotes for content)
result = '{"id": "chatcmpl-8mIsXq9opiJa3sO1qDTpgWY8nllnQ", "object": "chat.completion", "created": 1706523005, "model": "gpt-3.5-turbo-0613", "choices": [{"index": 0, "message": {"role": "assistant", "content": "[\\"Capital\\", \\"France\\", \\"Eiffel Tower\\", \\"Louvre Museum\\", \\"Seine River\\"]"}, "logprobs": null, "finish_reason": "stop"}], "usage": {"prompt_tokens": 37, "completion_tokens": 22, "total_tokens": 59}, "system_fingerprint": null}'
jsonified_string = json.loads(result)

## The second parameter of the getContent function determines whether the string should be interpreted or not.
def getContent(openaiJSONResponse, bolean):
    contentString = openaiJSONResponse['choices'][0]['message']['content']
    content = ( contentString if not bolean else json.loads(contentString))
    return content

def getTotalTokens(data):
    if 'usage' in data:
        return data['usage']['total_tokens']

def update_global_evaluation(globalEvaluation, answer):
        globalEvaluation[0] += answer[0]
        globalEvaluation[1] += answer[1]
        globalEvaluation[2] += answer[2]
        return globalEvaluation

def interpret(input_string):
    try:
        interpreted_data = json.loads(input_string)
        return interpreted_data
    except json.JSONDecodeError as e:
        # Handle JSON decoding errors
        print("Error:", e)
        return None

# Example usage:



def createCombinedList(summary, lessons):
    # Check if both lists have the same length
    if len(summary) != len(lessons):
        raise ValueError("Both lists must have the same length")

    # Create a new list with sub-lists for every corresponding pair of elements
    combined_list = [[s, l] for s, l in zip(summary, lessons)]

    return combined_list

def extract_list(string):
    start_index = string.find("['")  # Find the starting index of the list
    end_index = string.find("']")    # Find the ending index of the list
    if start_index != -1 and end_index != -1:  # Check if both delimiters are found
        list_str = string[start_index + 2 : end_index]  # Extract the substring containing the list
        return list_str
    else:
        start_index = string.find('["')  # Find the starting index of the list
        end_index = string.find('"]')    # Find the ending index of the list
        if start_index != -1 and end_index != -1:  # Check if both delimiters are found
            list_str = string[start_index + 2 : end_index]  # Extract the substring containing the list
            return list_str
        else:
            return None  # Return None if the delimiters are not found
        
def convertList(txt):
    # ca enlève tout le bordel avant le premier crochet et le dernier crochet 
    #(ca marche meme si il y a des crochets dans les élèments, mais pas si il y en a avant ou après la liste...)
    # on part du principe qu'il n'y a pas d'espaces entre le premier le début de la liste et le premier élément [*'elt1', ...] genre la ou il y a l'étoile
    between_brackets = "".join((re.findall("\[.*\]", txt)))[2:-2]
    
    answer = re.split("""','|","|", "|', '""",between_brackets)
    #print(*answer, sep="\n") c'est pour tester si ca marche
    return answer

def getListFromExtraction(string):
    delimited = extract_list(string)
    print("Extracting... the delimited list : ",delimited)
    if("'" in delimited ):
        stringified = f"['{delimited}']"
        print("Extracting... the stringified list : ",stringified)
        try : 
            interpretedDelimitedList = eval(stringified)
            print("Extracting... the interpretedDelimitedList list : ",interpretedDelimitedList)
            return interpretedDelimitedList

        except Exception as e :
            print("Extracting... BUT PROBLEM EVALUATING")
            interpretedDelimitedList = ""
            return interpretedDelimitedList
    if('"' in delimited ):
        stringified = f'["{delimited}"]'
        print("Extracting... the stringified list : ",stringified)
        try : 
            interpretedDelimitedList = eval(stringified)
            print("Extracting... the interpretedDelimitedList list : ",interpretedDelimitedList)
            return interpretedDelimitedList

        except Exception as e :
            print("Extracting... BUT PROBLEM EVALUATING")
            interpretedDelimitedList = ""
            return interpretedDelimitedList




def extract_values_between_quotes(input_string):
    return re.findall(r'"([^"]*)"', input_string)

def extract_and_convert_array(input_string):
    start_index = input_string.find("[")
    end_index = input_string.rfind("]")

    if start_index != -1 and end_index != -1:
        array_string = input_string[start_index:end_index+1]
        try:
            extracted_array = ast.literal_eval(array_string)
            return extracted_array
        except SyntaxError:
            return None
    else:
        return None

# Example usage:

