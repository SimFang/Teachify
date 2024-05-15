from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    username = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)

class Exercise(db.Model):
    __tablename__ = "exercises"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    theme = db.Column(db.String(345), unique=False)
    input_type = db.Column(db.String(345), unique=False)
    input = db.Column(db.String(325), unique=False)
    exercise_type = db.Column(db.String(325), unique=False)
    content = db.Column(db.Text, unique=False)
    correction = db.Column(db.Text, unique=False)
    result = db.Column(db.Integer, unique=False)
    language = db.Column(db.String(50), unique=False)
    level = db.Column(db.String(50), unique=False)
    user_id = db.Column(db.String(32), unique=False)
    illustration = db.Column(db.String(324), unique=False)


