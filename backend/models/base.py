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

    @classmethod
    def find_or_404(cls, **kwargs):
        def wrap(func):
            def inner(*f_args, **f_kwargs):
                model = cls.find_one(**kwargs)
                if model is None:
                    return {'message': 'not found, what we do now..!', 'model': cls.__name__}, 404
                return func(*f_args, model, **f_kwargs)

            return inner

        return wrap

    @classmethod
    def if_exist_400(cls, **kwargs):
        def wrap(func):
            def inner(*f_args, **f_kwargs):
                model = cls.find_one(**kwargs)
                if model:
                    return {'message': 'item already exist with given details', 'model': cls.__name__}, 400
                return func(*f_args, **f_kwargs)

            return inner

        return wrap
