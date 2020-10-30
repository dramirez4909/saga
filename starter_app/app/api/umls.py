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

parser = argparse.ArgumentParser(description='process user given parameters')
#parser.add_argument("-u", "--username", required =  True, dest="username", help = "enter username")
#parser.add_argument("-p", "--password", required =  True, dest="password", help = "enter passowrd")
parser.add_argument("-k", "--apikey", required = True, dest = "apikey", help = "enter api key from your UTS Profile")
parser.add_argument("-v", "--version", required =  False, dest="version", default = "current", help = "enter version example-2015AA")
parser.add_argument("-s", "--string", required =  True, dest="string", help = "enter a search term, like 'diabetic foot'")

@umls.route("/search-term/<search_string>")
def user_activities(search_string):
    string = search_string
    pageNumber = 0
    AuthClient = Authentication(apikey)
    sabs= ['RXNORM','DRUGBANK']
    searchType='exact'
    tgt = AuthClient.gettgt()
    # ticket = AuthClient.getst(tgt)
    # query = {'string':string,'ticket':ticket, 'pageNumber':pageNumber,'sabs':sabs,'searchType':searchType}
    uri = "https://uts-ws.nlm.nih.gov"
    version = "current"
    content_endpoint = "/rest/search/"+version
    # r = requests.get(uri+content_endpoint,params=query)
    # r.encoding = 'utf-8'
    # items  = json.loads(r.text)
    # jsonData = items["result"]
    names = []
    # for result in jsonData["results"]:
    #     print(result['name'])
    #     print(result)
    #     names.append(result['name'])
    # print("THE POINT IS THAT IT WORKS!!!!!!!!!!!!!!!!!",tgt,"ST:",ticket)
    # return {"results": names}
    while True:
        ticket = AuthClient.getst(tgt)
        pageNumber += 1
        query = {'string':string,'ticket':ticket, 'pageNumber':pageNumber,'sabs':sabs,'searchType':searchType}
        #query['includeObsolete'] = 'true'
        #query['includeSuppressible'] = 'true'
        #query['returnIdType'] = "sourceConcept"
        #query['sabs'] = "SNOMEDCT_US"
        r = requests.get(uri+content_endpoint,params=query)
        r.encoding = 'utf-8'
        items  = json.loads(r.text)
        jsonData = items["result"]
        #print (json.dumps(items, indent = 4))

        print("Results for page " + str(pageNumber)+"\n")

        for result in jsonData["results"]:

          try:
            print("ui: " + result["ui"])
          except:
            NameError
          try:
            print("uri: " + result["uri"])
          except:
            NameError
          try:
            print("name: " + result["name"])
            names.append(result['name'])
          except:
            NameError
          try:
            print("Source Vocabulary: " + result["rootSource"])
          except:
            NameError

          print("\n")


        ##Either our search returned nothing, or we're at the end
        if jsonData["results"][0]["ui"] == "NONE":
            return {"results":names}

@umls.route("/search-medications/<search_string>")
def get_medications(search_string):
    string = search_string
    pageNumber = 1
    AuthClient = Authentication(apikey)
    sabs= ['RXNORM']
    searchType='approximate'
    tgt = AuthClient.gettgt()
    ticket = AuthClient.getst(tgt)
    query = {'string':string,'ticket':ticket, 'pageNumber':pageNumber,'sabs':sabs,'searchType':searchType}
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

@umls.route("/search-health-issues/<search_string>")
def get_issues(search_string):
    string = search_string
    pageNumber = 1
    AuthClient = Authentication(apikey)
    sabs= ['RXNORM']
    searchType='approximate'
    tgt = AuthClient.gettgt()
    ticket = AuthClient.getst(tgt)
    query = {'string':string,'ticket':ticket, 'pageNumber':pageNumber,'sabs':sabs,'searchType':searchType}
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

@umls.route("/search-dxs/<search_string>")
def get_mental_health_issues(search_string):
    string = search_string
    pageNumber = 1
    AuthClient = Authentication(apikey)
    sabs= ['RXNORM']
    searchType='approximate'
    tgt = AuthClient.gettgt()
    ticket = AuthClient.getst(tgt)
    query = {'string':string,'ticket':ticket, 'pageNumber':pageNumber,'sabs':sabs,'searchType':searchType}
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