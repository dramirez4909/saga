from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, db, Patient, Overtime_Patient_Item
import os
from datetime import datetime
import boto3
from app.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME
patients = Blueprint('patients', __name__)


@patients.route("/search/<search_term>")
def find_patients(search_term):
    patients = db.session.query(Patient).filter((Patient.firstName.ilike(f"%{search_term}%")|Patient.lastName.ilike(f"{search_term}%"))).all()
    format_patients = [{"firstName":patient.firstName, "lastName": patient.lastName, "dob":patient.dob, "id":patient.id} for patient in patients]
    return {"patients":format_patients}

@patients.route("/id/<id>")
def get_patient(id):
    patient = Patient.query.get(id)
    format_patient = patient.to_dict()
    return {"patient":format_patient}


@patients.route('/upload/<id>',methods=['POST'])
def upload(id):
  patient = Patient.query.get(id)
  file = request.files['file']
  s3_resource = boto3.resource('s3')
  my_bucket = s3_resource.Bucket(AWS_BUCKET_NAME)
  mines = my_bucket.Object(file.filename).put(Body=file)
  patient.picture = f"https://saga-health.s3-us-west-1.amazonaws.com/{file.filename}"
  db.session.add(patient)
  db.session.commit()
  format_patient = patient.to_dict()
  return {"patient":format_patient}

@patients.route("/create",methods=["POST"])
def create_patient():
    data = request.json
    patient = Patient(firstName=data['firstName'],lastName=data['lastName'], address_line_one = data['addressLineOne'],address_line_two=data['addressLineTwo'],address_line_three=data['addressLineThree'],address_city=data['addressCity'],address_state=data['addressState'],address_zip=data['addressZip'],bmi=data['bmi'],weight=data['weight'],height=data["height"],home_phone=data['homePhone'],mobile_phone=data['mobilePhone'],work_phone=data['workPhone'],occupation=data['occupation'],dob=data['birthday'],sex=data['sex'],smoker=data['smoker'],beats_per_minute=data["heartRate"])
    db.session.add(patient)
    db.session.commit()
    format_patient = patient.to_dict()
    return {"patient":format_patient}


@patients.route("/update-vitals/<id>",methods=["PATCH"])
def update_patient_vitals(id):
    data = request.json
    patient = Patient.query.get(id)
    # todays_date = datetime.today().strftime('%Y-%m-%d')
    todays_date = datetime.now()
    
    if "weight" in data:
        patient.weight = data["weight"]
        newWeightReading = Overtime_Patient_Item(name="weight",patient_id=patient.id,value=data['weight'],date=todays_date)
        patient.overtime_patient_items.append(newWeightReading)
    if "height" in data:
        patient.height = data["height"]
        newHeightReading = Overtime_Patient_Item(name="height",patient_id=patient.id,value=data['height'],date=todays_date)
        patient.overtime_patient_items.append(newHeightReading)
    if "bmi" in data:
        patient.bmi = data['bmi']
        newBmiReading = Overtime_Patient_Item(name="bmi",patient_id=patient.id,value=data['bmi'],date=todays_date)
        patient.overtime_patient_items.append(newBmiReading)
    if "beats_per_minute" in data:
        patient.beats_per_minute = data['beats_per_minute']
        newBpmReading = Overtime_Patient_Item(name="bpm",patient_id=patient.id,value=data['beats_per_minute'],date=todays_date)
        patient.overtime_patient_items.append(newBpmReading)
    if "temperature" in data:
        patient.temperature = data['temperature']
        newTemperatureReading = Overtime_Patient_Item(name="temperature",patient_id=patient.id,value=data['temperature'],date=todays_date)
        patient.overtime_patient_items.append(newTemperatureReading)
    # patient = (firstName=data['firstName'],lastName=data['lastName'], address_line_one = data['addressLineOne'],address_line_two=data['addressLineTwo'],address_line_three=data['addressLineThree'],address_city=data['addressCity'],address_state=data['addressState'],address_zip=data['addressZip'],bmi=data['bmi'],weight=data['weight'],height=data["height"],home_phone=data['homePhone'],mobile_phone=data['mobilePhone'],work_phone=data['workPhone'],occupation=data['occupation'],dob=data['birthday'],sex=data['sex'],smoker=data['smoker'],beats_per_minute=data["heartRate"])
    db.session.add(patient)
    db.session.commit()
    format_patient = patient.to_dict()
    return {"patient":format_patient}

@patients.route("/update-patient/<id>",methods=["PATCH"])
def update_patient(id):
    data = request.json
    patient = Patient.query.get(id)
    patient.firstName = data['firstName']
    patient.lastName = data['lastName']
    patient.address_line_one = data['address_line_one']
    patient.address_line_two = data['address_line_two']
    patient.address_city = data['address_city']
    patient.address_state = data['address_state']
    patient.address_zip= data['address_zip']
    patient.home_phone =data['home_phone']
    patient.work_phone =data['work_phone']
    patient.mobile_phone =data['mobile_phone']
    patient.occupation=data['occupation']
    patient.sex =data['sex']
    # patient = (firstName=data['firstName'],lastName=data['lastName'], address_line_one = data['addressLineOne'],address_line_two=data['addressLineTwo'],address_line_three=data['addressLineThree'],address_city=data['addressCity'],address_state=data['addressState'],address_zip=data['addressZip'],bmi=data['bmi'],weight=data['weight'],height=data["height"],home_phone=data['homePhone'],mobile_phone=data['mobilePhone'],work_phone=data['workPhone'],occupation=data['occupation'],dob=data['birthday'],sex=data['sex'],smoker=data['smoker'],beats_per_minute=data["heartRate"])
    db.session.add(patient)
    db.session.commit()
    format_patient = patient.to_dict()
    return {"patient":format_patient}