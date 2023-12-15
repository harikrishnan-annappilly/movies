from typing import List
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token
from models import UserModel
from util.helper import if_exist_400, find_or_404

parser = reqparse.RequestParser()
parser.add_argument('username', required=True)
parser.add_argument('password', required=True)


class UsersResource(Resource):
    def get(self):
        users: List[UserModel] = UserModel.find_all()
        return [user.json() for user in users]

    def post(self):
        payload = parser.parse_args()

        @if_exist_400(UserModel, username=payload.get('username'))
        def inner():
            user = UserModel(**payload)
            user.save()
            return user.json(), 201

        return inner()


class UserResource(Resource):
    def get(self, user_id):
        @find_or_404(UserModel, id=user_id)
        def inner(*args):
            (user,) = args
            user: UserModel
            return user.json()

        return inner()

    def put(self, user_id):
        payload = parser.parse_args()
        username = payload.get('username')
        password = payload.get('password')

        @find_or_404(UserModel, id=user_id)
        @if_exist_400(UserModel, not_id=user_id, username=username)
        def inner(*args):
            (user,) = args
            user: UserModel

            user.update(**payload)
            return user.json(), 202

        return inner()

    def delete(self, user_id):
        @find_or_404(UserModel, id=user_id)
        def inner(*args):
            (user,) = args
            user: UserModel
            response = user.json()
            user.delete()
            return {'message': 'user delete success', 'data': response}

        return inner()


class AuthResource(Resource):
    def post(self):
        payload = parser.parse_args()
        username = payload.get('username')
        password = payload.get('password')

        @find_or_404(UserModel, username=username)
        def inner(*args):
            (user,) = args
            user: UserModel
            if user.password != password:
                return {'message': 'password incorrect'}, 401
            access_token = create_access_token(identity=username)
            return {'access_token': access_token}

        return inner()
