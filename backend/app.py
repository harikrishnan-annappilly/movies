from flask import Flask

from db import db

app = Flask(__name__)

app.config['SECRET_KEY'] = 'key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


@app.before_request
def create_tables():
    db.create_all()


@app.route('/')
def index():
    return 'App running...'


if __name__ == '__main__':
    app.run(debug=True)
