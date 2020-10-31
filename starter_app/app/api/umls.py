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
def user_medications(search_string):
    string = search_string
    pageNumber = 0
    AuthClient = Authentication(apikey)
    sabs= ['RXNORM','DRUGBANK']
    searchType='approximate'
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
    while pageNumber < 3:
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
          print(result)
          w = "/rest/content/"+version + "/CUI/" + "C1163349" + "/atmos"
          tick = {'ticket':ticket}
          p = requests.get(uri+w,params=tick)
          print(p)
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
    return {"results":names}

@umls.route("/search-term/mental-health-problems/<search_string>")
def mental_health_problems(search_string):
    string = search_string
    pageNumber = 0
    AuthClient = Authentication(apikey)
    sabs= ['ICD10']
    searchType='approximate'
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
    while pageNumber < 2:
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
          print("raw result baby: ",result)
          # w = "/rest/content/"+version + "/CUI/" + "C1163349" + "/atmos"
          # tick = {'ticket':ticket}
          # p = requests.get(uri+w,params=tick)
          print(p)
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
    return {"results":names}
  
@umls.route("/search-term/chronic-problems/<search_string>")
def chronic_problems(search_string):
    string = search_string
    pageNumber = 0
    AuthClient = Authentication(apikey)
    sabs= ['ICD10']
    searchType='approximate'
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
    while pageNumber < 2:
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
          print(result)
          w = "/rest/content/"+version + "/CUI/" + "C1163349" + "/atmos"
          tick = {'ticket':ticket}
          p = requests.get(uri+w,params=tick)
          print(p)
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
    return {"results":names}

# from Authentication import *
# import requests
# import json
# import argparse

# parser = argparse.ArgumentParser(description='process user given parameters')
# #parser.add_argument("-u", "--username", required =  True, dest="username", help = "enter username")
# #parser.add_argument("-p", "--password", required =  True, dest="password", help = "enter passowrd")
# parser.add_argument("-k", "--apikey", required = True, dest = "apikey", help = "enter api key from your UTS Profile")
# parser.add_argument("-v", "--version", required =  False, dest="version", default = "current", help = "enter version example-2015AA")
# parser.add_argument("-i", "--identifier", required =  True, dest="identifier", help = "enter identifier example-C0018787")
# parser.add_argument("-s", "--source", required =  False, dest="source", help = "enter source name if known")





##uncomment the print statment if you want the raw json output, or you can just look at the documentation :=)
#https://documentation.uts.nlm.nih.gov/rest/concept/index.html#sample-output
#https://documentation.uts.nlm.nih.gov/rest/source-asserted-identifiers/index.html#sample-output
#print (json.dumps(items, indent = 4))

  ############################
  ### Print out fields ####
@umls.route('/search-cui/')
def search_cui():
  #username = args.username
  #password = args.password
  version = "current"
  identifier = 'C0005684'
  source = 'MTH'
  AuthClient = Authentication(apikey)

  ###################################
  #get TGT for our session
  ###################################

  tgt = AuthClient.gettgt()
  uri = "https://uts-ws.nlm.nih.gov"

  # try:
  #   source
  # except NameError:
  #   source = None

  ##if we don't specify a source vocabulary, assume we're retrieving UMLS CUIs
  # if source is None:
  content_endpoint = "/rest/content/"+str(version)+"/CUI/"+str(identifier)

  # else:
  # content_endpoint = "/rest/content/"+str(version)+"/source/"+str(source)+"/"+str(identifier)

  ##ticket is the only parameter needed for this call - paging does not come into play because we're only asking for one Json object
  ticket = AuthClient.getst(tgt)
  query = {'ticket':ticket}
  r = requests.get("https://uts-ws.nlm.nih.gov/rest/semantic-network/2020AB/TUI/T191",params=query)
  r.encoding = 'utf-8'
  items  = json.loads(r.text)
  print("items boiiii!!!!!!!!!!!!!",items)
  jsonData = items["result"]
  print("RAW JSON DATA BABY:",jsonData)
  classType = jsonData["classType"]
  name = jsonData["name"]
  ui = jsonData["ui"]
  AtomCount = jsonData["atomCount"]
  Definitions = jsonData["definitions"]
  Atoms = jsonData["atoms"]
  DefaultPreferredAtom = jsonData["defaultPreferredAtom"]

  # print out the shared data elements that are common to both the 'Concept' and 'SourceAtomCluster' class
  print ("classType: " + classType)
  print ("ui: " + ui)
  print ("Name: " + name)
  print ("AtomCount: " + str(AtomCount))
  print ("Atoms: " + Atoms)
  print ("Default Preferred Atom: " + DefaultPreferredAtom)

  ## These data elements may or may not exist depending on what class ('Concept' or 'SourceAtomCluster') you're dealing with so we check for each one.
  try:
    jsonData["definitions"]
    print ("definitions: " + jsonData["definitions"])
  except:
        pass

  try:
    jsonData["parents"]
    print ("parents: " + jsonData["parents"])
  except:
        pass

  try:
    jsonData["children"]
    print ("children: " + jsonData["children"])
  except:
        pass

  try:
    jsonData["relations"]
    print ("relations: " + jsonData["relations"])
  except:
        pass

  try:
    jsonData["descendants"]
    print ("descendants: " + jsonData["descendants"])
  except:
        pass

  try:
    jsonData["semanticTypes"]
    print("Semantic Types:")
    for stys in jsonData["semanticTypes"]:
        print("uri: "+ stys["uri"])
        print("name: "+ stys["name"])
        
  except:
        pass