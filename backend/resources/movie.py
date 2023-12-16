from typing import List
from flask_restful import Resource, reqparse
from models import MovieModel, CategoryModel
from util.helper import find_or_404, if_exist_400, strip_str

parser = reqparse.RequestParser()
parser.add_argument('name', required=True, type=strip_str)
parser.add_argument('category_id', required=True, type=int)


class MoviesResource(Resource):
    def get(self):
        movies: List[MovieModel] = MovieModel.find_all()
        return [movie.json() for movie in movies]

    def post(self):
        payload = parser.parse_args()

        @find_or_404(CategoryModel, id=payload.get('category_id'))
        @if_exist_400(MovieModel, name=payload.get('name'))
        def inner(*args):
            movie = MovieModel(**payload)
            movie.save()
            return movie.json()

        return inner()


class MovieResource(Resource):
    def get(self, id):
        @find_or_404(MovieModel, id=id)
        def inner(*args):
            (movie,) = args
            movie: MovieModel
            return movie.json()

        return inner()

    def put(self, id):
        payload = parser.parse_args()

        @find_or_404(MovieModel, id=id)
        @find_or_404(CategoryModel, id=payload.get('category_id'))
        @if_exist_400(MovieModel, not_id=id, name=payload.get('name'))
        def inner(*args):
            movie, _ = args
            movie: MovieModel
            movie.update(**payload)
            return movie.json()

        return inner()

    def delete(self, id):
        @find_or_404(MovieModel, id=id)
        def inner(*args):
            (movie,) = args
            movie: MovieModel
            response = movie.json()
            movie.delete()
            return {'message': 'movie deleted', 'data': response}, 200

        return inner()
