import os
import sys

CUR_DIR = os.path.dirname(os.path.abspath(__file__))
APP_PATH = os.path.join(CUR_DIR, '..')
sys.path.append(APP_PATH)
from datetime import datetime
from db import db
from models import UserModel, CategoryModel, MovieModel, BaseModel

users = [
    {'username': 'admin', 'password': 'admin'},
    {'username': 'tom', 'password': '123'},
    {'username': 'jerry', 'password': '123'},
]

categories = [
    {'name': 'Action'},
    {'name': 'Horror'},
    {'name': 'Sci-Fi'},
]

movies = [
    {'name': 'Avatar', 'category_id': 1},
    {'name': 'Avengers', 'category_id': 1},
    {'name': 'Nun', 'category_id': 2},
    {'name': 'Nun 2', 'category_id': 2},
    {'name': 'Moon', 'category_id': 3},
    {'name': 'Interstellar', 'category_id': 3},
    {'name': 'Minnal Murali', 'category_id': 3},
]

items = [
    {'model': UserModel, 'data': users},
    {'model': CategoryModel, 'data': categories},
    {'model': MovieModel, 'data': movies},
]


def log(msg):
    print(datetime.now(), msg)


def generate_sample_data_for_app():
    log('Started data generation script')
    db.drop_all()
    db.create_all()
    log('Recreated tables')

    for item in items:
        Model = item.get('model')
        values = item.get('data')
        log(f'Generating data for: {Model.__name__}')

        for value in values:
            model: BaseModel = Model(**value)
            model.save()

        log(f'Generated data for: {Model.__name__}')

    log('Completed script')


def main():
    from app import app

    with app.app_context():
        generate_sample_data_for_app()


if __name__ == '__main__':
    log('Running as main()')
    main()
