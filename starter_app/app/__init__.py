import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_login import LoginManager, current_user

from .models import db, User
from .api.session import session
from .api.user_routes import user_routes
from .api.activities import activity
from .api.umls import umls
from .api.patients import patients
from .api.encounters import encounters


from .config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(session, url_prefix='/api/session')
app.register_blueprint(activity, url_prefix='/api/activity')
app.register_blueprint(umls,url_prefix='/api/umls')
app.register_blueprint(patients,url_prefix='/api/patients')
app.register_blueprint(encounters,url_prefix='/api/encounters')
db.init_app(app)
Migrate(app, db)

## Application Security
CORS(app)
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        print("favicon route_____")
        return app.send_static_file('favicon.ico')
    print("index route_____")
    return app.send_static_file('index.html')


login = LoginManager(app)
login.login_view = "session.login"

@login.user_loader
def load_user(id):
    user = User.query.filter(User.id == id).first()
    return user
