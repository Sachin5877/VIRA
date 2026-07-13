from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    full_name = Column(String(100), nullable=False)
    role = Column(String(20), default="Analyst")
    created_at = Column(DateTime, server_default=func.now())