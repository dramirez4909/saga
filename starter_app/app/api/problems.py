import os
import request
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
    problem = Problem(patient_id=data["patient"],provider_id=data['provider_id'],name=data['problemName'], created_at=datetime.now(), type=data['type'])
    db.session.add(problem)
    db.session.commit()
    format_problem = problem.to_dict()
    return {"problem":format_problem}
