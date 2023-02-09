import openai
import os

openai.api_key = os.environ.get("OPENAI_API_KEY")

response = openai.Completion.create(
         engine="text-davinci-003",
         prompt="how can I sell more products?",
         max_tokens=64,
         temperature=1,
         top_p=0.75,
         n=1,
)


completed_text = response["choices"][0]["text"]
print(completed_text)