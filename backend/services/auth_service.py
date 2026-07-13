from sqlalchemy.orm import Session

from models.user import User
from utils.security import hash_password, verify_password


def create_user(
    db: Session,
    username: str,
    password: str,
    full_name: str,
    role: str = "Analyst"
):
    user = User(
        username=username,
        password=hash_password(password),
        full_name=full_name,
        role=role
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    username: str,
    password: str
):
    user = db.query(User).filter(User.username == username).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user