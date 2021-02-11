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

@departments.route("/id/<id>")
def get_dept(id):
    department = Department.query.get(id)
    format_department = department.to_dict()
    return {"department":format_department}

@departments.route("/update/<id>",methods=['POST','PATCH'])
def update_dept(id):
    data = request.json
    department = Department.query.get(id)
    department.specialty = data["specialty"]
    department.name = data["name"]
    department.address_line_one = data["addressLineOne"]
    department.address_line_two = data["addressLineTwo"]
    print("!!!!",)
    department.address_city = data["addressCity"]
    department.address_state = data["addressState"]
    department.address_zip = data["addressZip"]
    db.session.add(department)
    db.session.commit()
    format_department = department.to_dict()
    return {"department":format_department}

@departments.route("/list")
def department_list():
    departments = db.session.query(Department).all()
    format_departments = [{"id": department.id, "name": department.name} for department in departments]
    return {"departments":format_departments}