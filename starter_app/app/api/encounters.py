import os
import requests
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db, Encounter,Provider
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
    
# @encounters.route("/provider/<id>/weeks")
# def provider_encounters_by_week(id):
#     provider = Provider.query.get(id)
#     encounters = db.session.query(Encounter).filter(Encounter.provider_id == provider.id).all()


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