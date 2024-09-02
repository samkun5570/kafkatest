import pandas as pd
from langchain_community.llms import Ollama

url = r'C:\Users\acera\Downloads\walmart.csv'

llm = Ollama(model='llama3')

