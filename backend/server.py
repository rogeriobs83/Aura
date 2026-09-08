from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SignUp(BaseModel):
    email: str

@app.post("/signup")
def signup(data: SignUp):
    print("Email received:", data.email)
    return {"message": "Email received successfully"}
