import os
import boto3
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_login import LoginManager, current_user
# from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS

from .models import db, User
from .api.session import session
from .api.user_routes import user_routes
from .api.activities import activity
from .api.umls import umls
from .api.patients import patients
from .api.encounters import encounters
from .api.orders import orders
from .api.departments import departments
from .api.medications import medications
from .api.problems import problems
from .api.providers import providers
from .api.roles import roles
from .api.security_points import security_points
from .api.resources import resources

from .config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME
from .config import Config

s3 = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
)

app = Flask(__name__)
app.config.from_object(Config)
# socket=SocketIO(app,cors_allowed_origins="*")
app.debug = True

app.host = 'localhost'

app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(session, url_prefix='/api/session')
app.register_blueprint(providers, url_prefix='/api/providers')
app.register_blueprint(activity, url_prefix='/api/activity')
app.register_blueprint(umls,url_prefix='/api/umls')
app.register_blueprint(patients,url_prefix='/api/patients')
app.register_blueprint(orders,url_prefix='/api/orders')
app.register_blueprint(encounters,url_prefix='/api/encounters')
app.register_blueprint(departments,url_prefix='/api/departments')
app.register_blueprint(medications,url_prefix='/api/medications')
app.register_blueprint(problems,url_prefix='/api/problems')
app.register_blueprint(roles,url_prefix='/api/roles')
app.register_blueprint(security_points,url_prefix='/api/security_points')
app.register_blueprint(resources,url_prefix='/api/resources')
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

# users = [];

# @socket.on('connect')
# def on_connect():
#     print('user connected')
#     emit('retrieve_active_users', broadcast=True)


# @socket.on('username')
# def recieve_username(username):
#     users.append({username : request.sid})
#     print("USERS LIST: ",users)

@app.route('/files')
def files():
    s3_resource= boto3.resource('s3')
    my_bucket = s3_resource.Bucket(AWS_BUCKET_NAME)
    summaries = my_bucket.objects.all()
    return {"summaries":summaries}

@app.route('/upload',methods=['POST'])
def upload():
  file = request.files['file']

  s3_resource = boto3.resource('s3')
  my_bucket = s3_resource.Bucket(AWS_BUCKET_NAME)
  mines = my_bucket.Object(file.filename).put(Body=file)
  mineyy = my_bucket.Object(file.filename).get()
  print("!!!!!!!!!!!!!!!!!!!!!!!",mineyy)
  return "uploaded"

@login.user_loader
def load_user(id):
    user = User.query.filter(User.id == id).first()
    return user
