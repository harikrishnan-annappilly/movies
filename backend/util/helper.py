from models import BaseModel


strip_str = lambda value: value.strip() if isinstance(value, str) else value


def _check_item(Model: BaseModel, need_item: bool, **kwargs):
    """
    This method will check and let you know whether item present or not for the passed Args.
    need_item => used for checking whether to throw error when item is present or not.
    """

    def wrapper(func):
        def inner(*func_args, **func_kwargs):
            model = Model.find_one(**kwargs)
            error_data = (
                {'message': 'item not found', 'code': 404}
                if need_item
                else {'message': 'item already taken', 'code': 400}
            )
            if model is None if need_item else model:
                return {
                    'message': error_data['message'],
                    'table': Model.__tablename__,
                    'data': kwargs,
                }, error_data['code']
            if need_item:
                return func(*func_args, model, **func_kwargs)
            return func(*func_args, **func_kwargs)

        return inner

    return wrapper


def find_or_404(Model: BaseModel, **kwargs):
    need_item = True  # We need item to be present in DB
    return _check_item(Model, need_item, **kwargs)


def if_exist_400(Model: BaseModel, **kwargs):
    need_item = False  # We need item not present in DB
    return _check_item(Model, need_item, **kwargs)
