import json

def convert_to_json(input_list):
    json_list = []

    for item in input_list:
        json_object = {
            "type": "lesson",
            "title": item[0],
            "content": item[1]
        }
        json_list.append(json_object)

    return json_list

# Example usage:
input_list = [["theme", "cours"], ["theme", "cours"], ["theme", "cours"], ["theme", "cours"], ["theme", "cours"]]
result_json = convert_to_json(input_list)

# Print the resulting JSON object
print(json.dumps(result_json, indent=2))