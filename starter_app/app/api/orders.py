import os
from datetime import datetime
import requests
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db, Encounter,Provider, Order, Order_Type, Department
#from pyquery import PyQuery as pq
from lxml.html import fromstring
uri="https://utslogin.nlm.nih.gov"
#option 1 - username/pw authentication at /cas/v1/tickets
#auth_endpoint = "/cas/v1/tickets/"
#option 2 - api key authentication at /cas/v1/api-key
auth_endpoint = "/cas/v1/api-key"
apikey=os.environ.get('UMLS_SECRET_KEY')

orders = Blueprint('orders', __name__)

@orders.route("/create",methods=["POST"])
def create_order():
    data = request.json
    print("!!!!!!!!!!!!!!!!!!!!!!!!!",data)
    order_type = Order_Type.query.get(data['order_type'])
    print("!!!!!!!!!!!!!!!!!",order_type)
    provider_user = db.session.query(Provider).filter(Provider.user_id == data['provider_id']).first()
    order = Order(order_type=order_type.id, created_at=datetime.now(), patient_id=data['patient_id'],provider_id=provider_user.id,status=data['status'], department_id=order_type.department_id,name=data['name'],cui=data['cui'])
    db.session.add(order)
    order_type.orders.append(order)
    db.session.commit()
    format_order = order.to_dict()
    return {"order":format_order}

@orders.route("/department/<department_id>")
def department_orders(department_id):
    department = Department.query.get(department_id)
    resources = [resource.name_and_id() for resource in department.resources]
    encounters = [encounter.basic() for encounter in department.encounters]
    orders = db.session.query(Order).filter(Order.status == "Needs Scheduling").filter(Order.order_type == 1).filter(Order.department_id == department_id).all()
    print("JADFJASJDFJASDJFASJDFJASDJFJASF",orders)
    format_orders = [order.to_dict() for order in orders]
    return {"department":{"orders":format_orders,"encounters":encounters,"resources":resources}}

@orders.route("/update",methods=["PATCH"])
def update_order():
    data = request.json
    print("!!!!!!!!!!!!!!!!!!!!!!!!!",data)
    order_to_update = Order.query.get(data['id'])
    order_to_update.status = data["status"]
    order_to_update.note = data["note"]
    db.session.add(order_to_update)
    db.session.commit()
    format_order = order_to_update.to_dict()
    return {"order":format_order}

# @orders.route("/department")
# def department_orders():
#     orders = db.session.query(Order).filter(Order.status != "scheduled").filter(Order.order_type == 1).all()
#     print("JADFJASJDFJASDJFASJDFJASDJFJASF",orders)
#     format_orders = [order.to_dict() for order in orders]
#     return {"orders":format_orders}