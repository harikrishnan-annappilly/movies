import os
from datetime import datetime
import pytz
from flask import Flask, render_template
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_cors import CORS

from db import db
from resources.user import UsersResource, UserResource, AuthResource
from resources.category import CategoriesResource, CategoryResource
from resources.movie import MoviesResource, MovieResource
from util.swagger import SWAGGER_URL, swaggerui_blueprint

app = Flask(__name__)

CUR_DIR = os.path.dirname(os.path.abspath(__file__))
CUR_TIME = datetime.now(pytz.timezone('Asia/Kolkata'))
BUILD_TIME = CUR_TIME.strftime("%d %b %Y, %I:%M:%S %p %Z")
BUILD_USING = 'Python 🐍 Dev Server ⚙️'
app.config['SECRET_KEY'] = 'key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(CUR_DIR, 'data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
api = Api(app)
JWTManager(app)
CORS(app)


@app.before_request
def create_tables():
    db.create_all()


@app.route('/')
def index():
    return render_template(
        'index.html',
        swagger_url=SWAGGER_URL,
        build_time=BUILD_TIME,
        build_using=BUILD_USING,
    )


api.add_resource(UsersResource, '/users')
api.add_resource(UserResource, '/user/<int:user_id>')
api.add_resource(AuthResource, '/login')
api.add_resource(CategoriesResource, '/categories')
api.add_resource(CategoryResource, '/category/<int:id>')
api.add_resource(MoviesResource, '/movies')
api.add_resource(MovieResource, '/movie/<int:id>')

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
