from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db

activity = Blueprint('activity', __name__)

@activity.route("/user_activities")
def user_activities():
    user = User.query.get(current_user.id)
    user_role_activities = [security_point.activity.to_dict() for role in user.roles for security_point in role.security_points]
    role_activities = {}
    for activity in user_role_activities:
        role_activities[int(activity["id"])] = activity
    user_level_activities = [security_point.activity.to_dict() for security_point in user.security_points]
    user_activities = {}
    for activity in user_level_activities:
        user_activities[int(activity["id"])] = activity
    return {
        "user_activities":user_activities,
        "role_activities":role_activities
        }

    
