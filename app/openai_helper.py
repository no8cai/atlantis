import openai
import os

openai.api_key = os.environ.get("OPENAI_API_KEY")

def chatrobot(questionstr):
    response = openai.Completion.create(
         engine="text-davinci-003",
         prompt=questionstr,
         max_tokens=128,
         temperature=1,
         top_p=0.75,
         n=1,
    )
    completed_text = response["choices"][0]["text"]
    return completed_text