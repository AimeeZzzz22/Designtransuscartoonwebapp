from typing import List, Literal

from pydantic import BaseModel, Field


class ConflictInput(BaseModel):
    partner_a: str = Field(..., min_length=1)
    partner_b: str = Field(..., min_length=1)


class ConflictAnalysis(BaseModel):
    partner_a_feelings: List[str]
    partner_b_feelings: List[str]
    partner_a_intent: str
    partner_b_intent: str
    misunderstanding: str
    reframes: List[str]
    next_prompt: str
    safety_flag: Literal["none", "abuse", "coercion", "threat", "self_harm", "other_risk"]


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]

