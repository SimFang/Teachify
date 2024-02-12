from openai import OpenAI
import time

client = OpenAI(api_key="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")

thread = client.beta.threads.create()

# store first message in thead 
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="I need to solve the equation 3x + 11 = 14. Can you help me?"
)

# store second message in thread 
message2 = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="I need to solve another equation : 11x + 2 = 14. Can you help me?"
)
## to list the messages 
thread_messages = client.beta.threads.messages.list(thread.id)
print(thread_messages)