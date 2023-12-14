from typing import List
from flask_restful import Resource, reqparse
from models import UserModel


class UsersResource(Resource):
    def get(self):
        users: List[UserModel] = UserModel.find_all()
        return [user.json() for user in users]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)

        payload = parser.parse_args()

        if UserModel.find_one(username=payload.get('username')):
            return {'message': 'username already taken'}, 400

        user = UserModel(**payload)
        user.save()
        return {'message': 'user created success', **user.json()}
