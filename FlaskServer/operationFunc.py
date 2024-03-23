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

def createCombinedList(summary, lessons):
    # Check if both lists have the same length
    if len(summary) != len(lessons):
        raise ValueError("Both lists must have the same length")

    # Create a new list with sub-lists for every corresponding pair of elements
    combined_list = [[s, l] for s, l in zip(summary, lessons)]

    return combined_list

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

