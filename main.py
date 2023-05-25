from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import random

app = FastAPI()

def createAnswer():
  indexes = []
  count = 0
  result = []
  
  while(True):
    randNum = random.randrange(0,26)
    
    if randNum not in indexes:
      result.append(CHARS[randNum])
      indexes.append(randNum)
      count += 1
      
    if count == 5: break
    
  answer = ''.join(result)
  
  return answer


CHARS = "QWERTYUIOPASDFGHJKLZXCVBNM"
ANSWER = createAnswer()

@app.get("/answer")
def getAnswer():
  return ANSWER

app.mount("/", StaticFiles(directory="static", html=True), name="static")