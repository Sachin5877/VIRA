from sqlalchemy.orm import Session

from models.user import User
from services.auth_service import create_user


def initialize_database(db: Session):
    admin = db.query(User).filter(User.username == "admin").first()

    if not admin:
        create_user(
            db=db,
            username="admin",
            password="admin123",
            full_name="System Administrator",
            role="Admin"
        )

        print("Default admin account created.")
    else:
        print("Admin account already exists.")