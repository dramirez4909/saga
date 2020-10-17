from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, db

session = Blueprint('session', __name__)

@session.route("/current_user")
def cur_user():
    if current_user.is_authenticated:
        user = current_user.to_dict()
        print("!!!!!!!!!!!!",user)
        return {"user": user }


@session.route("/", methods=["PUT"])
def login():
    data = request.json
    print(data)
    if not data:
        return {"errors": ""}
    user = User.query.filter(User.username == data['username']).first()
    if user and user.check_password(data['password']):
        format_user = user.to_dict()
        login_user(user)
        return {"user" : format_user}
    else:
        error = {"1":"incorrect password or username"}
        return {"errors":error}


@session.route('/logout', methods=["POST"])
def logout():
    logout_user()
    return {"logout":"successful"}


@session.route('/', methods=["POST"])
def signup():
    data = request.json
    print("Hello!!!!!!!!!!!!!!!")
    print(data)
    errors = {}
    username_exists = User.query.filter(User.username == data['username']).first()
    email_exists = User.query.filter(User.email == data['email']).first()
    if username_exists:
        errors["1"]="The username you entered is not available"
    if email_exists:
        errors["2"]="The email you entered is not available"
    if errors:
        return {"errors": errors}
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()
    format_user = new_user.to_dict()
    return {"user": format_user}