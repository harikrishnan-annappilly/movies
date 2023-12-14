from flask import Flask, render_template
from flask_restful import Api

from db import db
from resources.user import UsersResource

app = Flask(__name__)

app.config['SECRET_KEY'] = 'key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
api = Api(app)


@app.before_request
def create_tables():
    db.create_all()


@app.route('/')
def index():
    return render_template('index.html')


api.add_resource(UsersResource, '/users')

if __name__ == '__main__':
    app.run(debug=True)
