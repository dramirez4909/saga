from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, db
from app.api.encounters import Authentication
import requests
import json
import argparse
import os
apikey=os.environ.get('UMLS_SECRET_KEY')

umls = Blueprint('umls', __name__)

@umls.route("/search-term/<search_string>")
def user_activities(search_string):
    string = search_string
    pageNumber = 1
    AuthClient = Authentication(apikey)
    tgt = AuthClient.gettgt()
    ticket = AuthClient.getst(tgt)
    query = {'string':string,'ticket':ticket, 'pageNumber':pageNumber}
    uri = "https://uts-ws.nlm.nih.gov"
    version = "current"
    content_endpoint = "/rest/search/"+version
    r = requests.get(uri+content_endpoint,params=query)
    r.encoding = 'utf-8'
    items  = json.loads(r.text)
    jsonData = items["result"]
    names = []
    for result in jsonData["results"]:
        print(result['name'])
        print(result)
        names.append(result['name'])
    print("THE POINT IS THAT IT WORKS!!!!!!!!!!!!!!!!!",tgt,"ST:",ticket)
    return {"results": names}