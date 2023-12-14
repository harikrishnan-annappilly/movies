from typing import List
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token
from models import UserModel

parser = reqparse.RequestParser()
parser.add_argument('username', required=True)
parser.add_argument('password', required=True)


class UsersResource(Resource):
    def get(self):
        users: List[UserModel] = UserModel.find_all()
        return [user.json() for user in users]

    def post(self):
        payload = parser.parse_args()
        if UserModel.find_one(username=payload.get('username')):
            return {'message': 'username already taken'}, 400
        user = UserModel(**payload)
        user.save()
        return {'message': 'user created success', **user.json()}, 201


class UserResource(Resource):
    def get(self, user_id):
        user: UserModel = UserModel.find_one(id=user_id)
        if user is None:
            return {'message': 'username not found'}, 404
        return user.json()

    def put(self, user_id):
        user: UserModel = UserModel.find_one(id=user_id)
        payload = parser.parse_args()
        username = payload.get('username')
        password = payload.get('password')
        if user is None:
            return {'message': 'username not found'}, 404
        if user.username != username:
            return {'message': 'username already taken'}, 400

        user.username = username
        user.password = password
        user.save()
        return user.json(), 202

    def delete(self, user_id):
        user: UserModel = UserModel.find_one(id=user_id)
        if user is None:
            return {'message': 'username not found'}, 404
        response = user.json()
        user.delete()
        return {'message': 'user delete success', 'data': response}


class AuthResource(Resource):
    def post(self):
        payload = parser.parse_args()
        username = payload.get('username')
        password = payload.get('password')
        user: UserModel = UserModel.find_one(username=username)
        if user is None:
            return {'message': 'username not found'}, 404
        if user.password != password:
            return {'message': 'password incorrect'}, 401
        access_token = create_access_token(identity=username)
        return {'access_token': access_token}
