import os
import requests
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db, Encounter,Provider, Order, Order_Type,Department

departments = Blueprint('departments', __name__)

@departments.route("/")
def get_departments():
    departments = db.session.query(Department).all()
    format_departments = [department.to_dict() for department in departments]
    return {"departments":format_departments}

@departments.route("/list")
def department_list():
    departments = db.session.query(Department).all()
    format_departments = [{"id": department.id, "name": department.name} for department in departments]
    return {"departments":format_departments}