import os
import requests
from datetime import datetime
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db, Encounter,Provider, Order, Order_Type, Problem
from lxml.html import fromstring

uri="https://utslogin.nlm.nih.gov"
#option 1 - username/pw authentication at /cas/v1/tickets
#auth_endpoint = "/cas/v1/tickets/"
#option 2 - api key authentication at /cas/v1/api-key
auth_endpoint = "/cas/v1/api-key"
apikey=os.environ.get('UMLS_SECRET_KEY')

problems = Blueprint('problems', __name__)

@problems.route("/create",methods=["POST"])
def create_problem():
    data = request.json
    problem = Problem(cui=data["cui"],patient_id=data["patient"],provider_id=data['provider_id'],name=data['problemName'], created_at=datetime.now(), type=data['type'],note=data['instructions'],current=data['current'])
    db.session.add(problem)
    db.session.commit()
    format_problem = problem.to_dict()
    return {"problem":format_problem}

@problems.route("/update",methods=["PATCH"])
def update_problem():
    data = request.json
    print("!!!!!!!!!!!!!!!!!!!!!!!!!",data)
    prob_to_update = Problem.query.get(data['id'])
    prob_to_update.note = data["note"]
    prob_to_update.current = data["current"]
    db.session.add(prob_to_update)
    db.session.commit()
    format_problem = prob_to_update.to_dict()
    return {"problem":format_problem}
