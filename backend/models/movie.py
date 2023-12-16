from sqlalchemy.orm import Mapped
from db import db
from . import BaseModel
from . import CategoryModel


class MovieModel(BaseModel):
    name = db.Column(db.String(20), nullable=False, unique=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category_model.id'), nullable=False)
    category = db.relationship('CategoryModel', backref='movies')
    category: Mapped[CategoryModel]

    def json(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category.json(),
        }
