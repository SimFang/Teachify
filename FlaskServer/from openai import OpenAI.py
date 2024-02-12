from openai import OpenAI
import time

client = OpenAI(api_key="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")

thread = client.beta.threads.create()
# store first message in thead 
def generate_course(str) :
    generatesum = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=f"donne moi un sommmaire inerprétable en python sous forme de liste [] des points clé de {str} pour une présentation?"
    )

    paragraphe1 = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content="développe la première partie de ta réponse au premier prompt de manière plutot concise ?"
    )

    # store second message in thread 
    paragraphe2 = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content="développe la deuxième partie de ta réponse au premier prompt de manière plutot concise ? "
    )
    # store first message in thead 
    paragraphe3 = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content="développe la troisième partie de ta réponse au premier prompt de manière plutot concise ?"
    )

    # store second message in thread 
    paragraphe4 = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content="développe la quatrième partie de ta réponse au premier prompt de manière plutot concise ? "
    )

    paragraphe5 = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content="développe la cinquième partie de ta réponse au premier prompt de manière plutot concise"
    )

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
def questionannexe() :
    question = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content="développe la première partie de ta réponse au premier prompt de manière plutot concise ?"
    )
    run = client.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id="asst_1Uxsz3oIdkc0t9RyAkkPdLsz",
    )
    while run.status !="completed":
            run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
            )       
            print(f"🏃‍♂️ {run.status}")
            time.sleep(1)
    else : 
            print("🏁 run completed")
    
generate_course("la révolution française")
