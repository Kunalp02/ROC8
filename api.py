from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from data import data  
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DataItem(BaseModel):
    Day: str
    Age: str
    Gender: str
    A: int
    B: int
    C: int
    D: int
    E: int
    F: int

@app.get("/data", response_model=List[DataItem]) 
def get_data():
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
