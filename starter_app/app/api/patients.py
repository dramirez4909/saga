from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, db, Patient

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