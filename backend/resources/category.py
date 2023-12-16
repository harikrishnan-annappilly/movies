from typing import List
from flask_restful import Resource, reqparse
from models import CategoryModel
from util.helper import if_exist_400, find_or_404, strip_str

parser = reqparse.RequestParser()
parser.add_argument('name', required=True, type=strip_str)


class CategoriesResource(Resource):
    def get(self):
        categories: List[CategoryModel] = CategoryModel.find_all()
        return [category.json() for category in categories]

    def post(self):
        payload = parser.parse_args()

        @if_exist_400(CategoryModel, name=payload.get('name'))
        def inner():
            category = CategoryModel(**payload)
            category.save()
            return category.json(), 201

        return inner()


class CategoryResource(Resource):
    def get(self, id):
        @find_or_404(CategoryModel, id=id)
        def inner(*args):
            (category,) = args
            category: CategoryModel
            return category.json()

        return inner()

    def put(self, id):
        payload = parser.parse_args()

        @if_exist_400(CategoryModel, not_id=id, name=payload.get('name'))
        @find_or_404(CategoryModel, id=id)
        def inner(*args):
            (category,) = args
            category: CategoryModel
            category.update(**payload)
            return category.json(), 202

        return inner()

    def delete(self, id):
        @find_or_404(CategoryModel, id=id)
        def inner(*args):
            (category,) = args

            category: CategoryModel
            response = category.json()
            category.delete()
            return {'message': 'category deleted', 'data': response}

        return inner()
