import os
import requests
from datetime import datetime
from datetime import time
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db, Encounter,Provider, Order, Order_Type
#from pyquery import PyQuery as pq
from lxml.html import fromstring
uri="https://utslogin.nlm.nih.gov"
#option 1 - username/pw authentication at /cas/v1/tickets
#auth_endpoint = "/cas/v1/tickets/"
#option 2 - api key authentication at /cas/v1/api-key
auth_endpoint = "/cas/v1/api-key"
apikey=os.environ.get('UMLS_SECRET_KEY')

encounters = Blueprint('encounters', __name__)

@encounters.route("/provider/<id>")
def provider_encounters(id):
    provider = Provider.query.get(id)
    encounters = db.session.query(Encounter).filter(Encounter.provider_id == provider.id).all()
    format_encounters = [encounter.to_dict() for encounter in encounters]
    return {"encounters":format_encounters}
    
@encounters.route("/department")
def department_encounters_and_orders():
    encounters = db.session.query(Encounter).all()
    format_encounters = [encounter.to_dict() for encounter in encounters]
    return {"encounters":format_encounters}

@encounters.route("/create",methods=["POST"])
def create_encounter():
    data = request.json
    order = Order.query.get(data["order"]["id"])
    order.status = "Scheduled"
    start = datetime.fromisoformat((data["start"][:-1]+"-01:00"))
    end = datetime.fromisoformat((data["end"][:-1]+"-01:00"))

    patient_id = data["order"]["patient"]["id"]
    provider_id = data["order"]["provider"]["id"]
    department_id = data["order"]["department"]["id"]
    type = 1
    if data["order"]["type"] == "Outpatient Appointment Request":
        type = 1
    print("!!!!!!!!!!!!!!!!!!!!!!",(data["end"][:-1]+"-05:00"))
    print("!!!!!!!!!!!!!!!!!!!!!!",start)
    encounter = Encounter(resource_id=data['resource'],patient_id=patient_id,start=start,end=end,encounter_type_id=type,provider_id=provider_id,date=start,department_id=department_id)
    order.encounter = encounter
    db.session.add(encounter)
    db.session.add(order)
    db.session.commit()
    format_encounter = encounter.to_dict()
    return {"encounter":format_encounter}

@encounters.route("/encounterfromorder/create",methods=["GET","POST"])
def create_encounter_from_order():
    data = request.json
    print("!!!!!!!!!!!!!!!!!!!!!!",data)
    # encounter = Encounter(patient_id=data["patient_id"],date=data["date"],start=data["start"],end=data["end"],encounter_type_id=data["encounter_type_id"])
    # db.session.add(encounter)
    # db.session.commit()
    # format_encounter = encounter.to_dict()
    return 


class Authentication:
    #def __init__(self, username,password):
    def __init__(self, apikey):
        #self.username=username
        #self.password=password
        self.apikey=apikey
        self.service="http://umlsks.nlm.nih.gov"
        #!/usr/bin/python
        ## 6/16/2017 - remove PyQuery dependency
        ## 5/19/2016 - update to allow for authentication based on api-key, rather than username/pw
        ## See https://documentation.uts.nlm.nih.gov/rest/authentication.html for full explanation

    def gettgt(self):
        #params = {'username': self.username,'password': self.password}
        params = {'apikey': self.apikey}
        h = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain", "User-Agent":"python" }
        r = requests.post(uri+auth_endpoint,data=params,headers=h)
        response = fromstring(r.text)
        ## extract the entire URL needed from the HTML form (action attribute) returned - looks similar to https://utslogin.nlm.nih.gov/cas/v1/tickets/TGT-36471-aYqNLN2rFIJPXKzxwdTNC5ZT7z3B3cTAKfSc5ndHQcUxeaDOLN-cas
        ## we make a POST call to this URL in the getst method
        tgt = response.xpath('//form/@action')[0]
        return tgt

    def getst(self,tgt):
        params = {'service': self.service}
        h = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain", "User-Agent":"python" }
        r = requests.post(tgt,data=params,headers=h)
        st = r.text
        return st