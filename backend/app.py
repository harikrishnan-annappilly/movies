from flask import Flask, render_template
from flask_jwt_extended import JWTManager
from flask_restful import Api

from db import db
from resources.user import UsersResource, UserResource, AuthResource

app = Flask(__name__)

app.config['SECRET_KEY'] = 'key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
api = Api(app)
JWTManager(app)


@app.before_request
def create_tables():
    db.create_all()


@app.route('/')
def index():
    return render_template('index.html')


api.add_resource(UsersResource, '/users')
api.add_resource(UserResource, '/user/<int:user_id>')
api.add_resource(AuthResource, '/login')

if __name__ == '__main__':
    app.run(debug=True)
