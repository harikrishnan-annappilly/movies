from models import BaseModel


def find_or_404(Model: BaseModel, **kwargs):
    def wrapper(func):
        def inner(*func_args, **func_kwargs):
            model = Model.find_one(**kwargs)
            if model is None:
                return {'message': 'item not found', 'table': Model.__tablename__, 'data': kwargs}
            return func(*func_args, model, **func_kwargs)

        return inner

    return wrapper


def if_exist_400(Model: BaseModel, **kwargs):
    def wrapper(func):
        def inner(*func_args, **func_kwargs):
            model = Model.find_one(**kwargs)
            if model:
                return {'message': 'item already taken', 'table': Model.__tablename__, 'data': kwargs}
            return func(*func_args, **func_kwargs)

        return inner

    return wrapper
