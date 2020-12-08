from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, db, Patient, Provider
import os
import boto3
from app.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME

providers = Blueprint('providers', __name__)

@providers.route('/photo/<id>')
def get_photo(id):
    provider = Provider.query.get(id)
    format_provider = provider.to_dict()
    print("!!!!!!!!!",format_provider)
    return {"provider" : format_provider}