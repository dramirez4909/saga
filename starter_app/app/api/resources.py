import os
import requests
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db, Encounter,Provider, Order, Order_Type,Department, Resource

resources = Blueprint('resources', __name__)

# @resources.route("/")
# def get_resources():
#     resources = db.session.query(Department).all()
#     format_resources = [department.to_dict() for department in resources]
#     return {"resources":format_resources}

# @resources.route("/id/<id>")
# def get_dept(id):
#     department = Department.query.get(id)
#     format_department = department.to_dict()
#     return {"department":format_department}

@resources.route("/update/<id>",methods=['PATCH'])
def update_resource(id):
    data = request.json
    print("!!!!!!!",data)
    resource = Resource.query.get(id)
    resource.name = data["name"]
    resource.active = data["active"]
    db.session.add(resource)
    db.session.commit()
    format_resource = resource.to_dict()
    return {"resource":format_resource}

@resources.route("/create",methods=["POST"])
def create_resource():
    data = request.json
    print("&&&&&&&&",data)
    new_resource = Resource(name=data["name"],department_id=data["departmentId"],active=data["active"])
    db.session.add(new_resource)
    db.session.commit()
    format_resource = new_resource.to_dict()
    return {"resource":format_resource}

# @resources.route("/list")
# def department_list():
#     departments = db.session.query(Department).all()
#     format_departments = [{"id": department.id, "name": department.name} for department in departments]
#     return {"departments":format_departments}