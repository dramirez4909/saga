import os
from datetime import datetime
import requests
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db, Encounter,Provider, Order, Order_Type, Medication
#from pyquery import PyQuery as pq
from lxml.html import fromstring
uri="https://utslogin.nlm.nih.gov"
#option 1 - username/pw authentication at /cas/v1/tickets
#auth_endpoint = "/cas/v1/tickets/"
#option 2 - api key authentication at /cas/v1/api-key
auth_endpoint = "/cas/v1/api-key"
apikey=os.environ.get('UMLS_SECRET_KEY')

medications = Blueprint('medications', __name__)

@medications.route("/create",methods=["POST"])
def create_medication():
    data = request.json
    print("!!!!!!!!!!!!!!!!!!!!!!!!!",data)
    medication = Medication(patient_id=data["patient"],instructions=data['instructions'],provider_id=data['provider_id'],name=data['medicationName'], created_at=datetime.now(),cui=data['cui'])
    db.session.add(medication)
    db.session.commit()
    format_medication = medication.to_dict()
    return {"medication":format_medication}