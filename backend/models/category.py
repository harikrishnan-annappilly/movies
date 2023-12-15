from db import db
from . import BaseModel


class CategoryModel(BaseModel):
    name = db.Column(db.String(20), nullable=False, unique=True)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
        }
