from db import db


class BaseModel(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, **kwargs):
        self.query.filter_by(id=self.id).update(kwargs)
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def _find(cls, **kwargs):
        conditions = [
            getattr(cls, key) == value if not key.startswith('not_') else getattr(cls, key[4:]) != value
            for key, value in kwargs.items()
        ]
        return cls.query.filter(*conditions)

    @classmethod
    def find_one(cls, **kwargs):
        return cls._find(**kwargs).first()

    @classmethod
    def find_all(cls, **kwargs):
        return cls._find(**kwargs).all()
