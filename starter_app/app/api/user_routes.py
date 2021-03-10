from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, db, Patient, Role, Security_Point
import os
import boto3
from app.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME
from sqlalchemy import or_
from datetime import datetime


user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def index():
  response = User.query.all()
  print("user route______")
  return { "users": [user.to_dict() for user in response]}

@user_routes.route('/id/<id>')
def byId(id):
  user = User.query.get(id)
  print("!!!!!!",user)
  format_user = user.to_dict()
  return { "user": format_user}

@user_routes.route('/create',methods=['GET','POST'])
def create_user():
  time_str = str(datetime.now()).replace(" ","")
  str_format = time_str.replace(":","")
  time_str = str_format.replace(".","")
  rand_string = time_str.replace("-","")
  # rand_number = int(rand_string)
  users = db.session.query(User).filter(User.first_name.ilike(f"New User")).all()
  new_user_num = len(users)
  print("num num cookie",new_user_num)
  new_user = User(username=f"replace-with-username{rand_string[4:-6]}",email=f"replace-with-user-email{rand_string[7:-4]}@saga.com",password="passw0rd123",has_temp_password=True)
  if new_user_num > 0:
    new_user.first_name = "New User"
    new_user.last_name = f"{new_user_num}"
  else:
    new_user.first_name = "New User"
    new_user.last_name = ""
  db.session.add(new_user)
  db.session.commit()
  format_user = new_user.to_dict()
  return {"user":format_user}

@user_routes.route('/search-term/<search_term>')
def bySearchTerm(search_term):
  users = db.session.query(User).filter(or_(User.first_name.ilike(f"%{search_term}%"),User.last_name.ilike(f"%{search_term}%"),User.email.ilike(f"%{search_term}%")))
  format_users = [user.to_dict() for user in users]
  return {"users": format_users}

@user_routes.route('/upload-photo/<id>',methods=['POST'])
def upload(id):
  user = User.query.get(id)
  file = request.files['file']
  s3_resource = boto3.resource('s3')
  my_bucket = s3_resource.Bucket(AWS_BUCKET_NAME)
  mines = my_bucket.Object(file.filename).put(Body=file)
  user.profile_picture_path = f"https://saga-health.s3-us-west-1.amazonaws.com/{file.filename}"
  db.session.add(user)
  db.session.commit()
  format_user = user.to_dict()
  return {"user":format_user}

@user_routes.route('/update/<id>',methods=['POST','PATCH'])
def update(id):
  data = request.json
  user = User.query.get(id)
  user.email = data["email"]
  user.first_name = data["first_name"]
  user.last_name = data["last_name"]
  user.username = data["username"]
  if 'roles' in data:
    user.roles = []
    print("!!!!!!!!",data['roles'])
    for role in data['roles']:
      role = Role.query.get(role['id'])
      user.roles.append(role)
  if 'security_points' in data:
    user.security_points = []
    for security_point in data['security_points']:
      security_point = Security_Point.query.get(security_point['id'])
      user.security_points.append(security_point)
  db.session.add(user)
  db.session.commit()
  format_user = user.to_dict()
  return {"user":format_user}