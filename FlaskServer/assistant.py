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
    content="What was the last question about ? "
)

## run for assistant
run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id="asst_1Uxsz3oIdkc0t9RyAkkPdLsz",
)

#asynchronous request handling 
while run.status !="completed":
        run = client.beta.threads.runs.retrieve(
        thread_id=thread.id,
        run_id=run.id
        )       
        print(f"🏃‍♂️ {run.status}")
        time.sleep(1)
else : 
        print("🏁 run completed")

## to list the messages 
thread_messages = client.beta.threads.messages.list(thread.id)
thread_message_data = thread_messages.data

print(thread_message_data)

message3 = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="What was my first prompt about ?"
)

## run for assistant
run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id="asst_1Uxsz3oIdkc0t9RyAkkPdLsz",
)

#asynchronous request handling 
while run.status !="completed":
        run = client.beta.threads.runs.retrieve(
        thread_id=thread.id,
        run_id=run.id
        )       
        print(f"🏃‍♂️ {run.status}")
        time.sleep(1)
else : 
        print("🏁 run completed")

thread_messages = client.beta.threads.messages.list(thread.id)
thread_message_data = thread_messages.data

print(thread_message_data)