from db import db
from . import BaseModel


class UserModel(BaseModel):
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(20), nullable=False)

    def json(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
        }
