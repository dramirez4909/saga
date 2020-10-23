from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, db, Patient
import os
import boto3
from app.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME
patients = Blueprint('patients', __name__)

@patients.route("/search/<search_term>")
def find_patients(search_term):
    patients = db.session.query(Patient).filter((Patient.firstName.ilike(f"{search_term}%")|Patient.lastName.ilike(f"{search_term}%"))).all()
    format_patients = [patient.to_dict() for patient in patients]
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