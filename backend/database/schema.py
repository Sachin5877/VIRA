from database.database import Base, engine

from models.user import User


def create_tables():
    Base.metadata.create_all(bind=engine)