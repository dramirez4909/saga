import os
from datetime import datetime
import requests
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db, Encounter,Provider, Order, Order_Type, Medication
#from pyquery import PyQuery as pq
from lxml.html import fromstring
#option 1 - username/pw authentication at /cas/v1/tickets
#auth_endpoint = "/cas/v1/tickets/"
#option 2 - api key authentication at /cas/v1/api-key
security_points = Blueprint('security_points', __name__)

# @security_points.route("/create",methods=["POST"])
# def create_role():
#     data = request.json
#     print("!!!!!!!!!!!!!!!!!!!!!!!!!",data)
#     role = Role(patient_id=data["patient"],instructions=data['instructions'],provider_id=data['provider_id'],name=data['roleName'], created_at=datetime.now(),cui=data['cui'])
#     db.session.add(role)
#     db.session.commit()
#     format_role = role.to_dict()
#     return {"role":format_role}

@security_points.route("/all")
def get_security_points():
    security_points = Security_Point.query.all()
    format_security_points = {security_point.id: security_point.to_dict() for security_point in security_points}
    return {"security_points":format_security_points}

# @roles.route("/update",methods=["PATCH"])
# def update_medication():
#     data = request.json
#     print("!!!!!!!!!!!!!!!!!!!!!!!!!",data)
#     med_to_update = Medication.query.get(data['id'])
#     med_to_update.instructions = data["instructions"]
#     med_to_update.current = data["current"]
#     db.session.add(med_to_update)
#     db.session.commit()
#     format_medication = med_to_update.to_dict()
#     return {"medication":format_medication}