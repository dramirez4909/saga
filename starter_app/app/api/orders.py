import os
import requests
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, Activity, Security_Point, Role, db, Encounter,Provider, Order, Order_Type
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
    order_type = db.session.query(Order_Type).filter(Order_Type.name == data['order_type']).first()
    provider_user = db.session.query(Provider).filter(Provider.user_id == data['provider_id']).first()
    order = Order(order_type=order_type.id, patient_id=data['patient_id'],provider_id=provider_user.id,status=data['status'] )
    db.session.add(order)
    db.session.commit()
    format_order = order.to_dict()
    return {"order":format_order}

@orders.route("/department")
def department_orders():
    orders = db.session.query(Order).filter(Order.order_type == 1).all()
    print("JADFJASJDFJASDJFASJDFJASDJFJASF",orders)
    format_orders = [order.to_dict() for order in orders]
    return {"orders":format_orders}