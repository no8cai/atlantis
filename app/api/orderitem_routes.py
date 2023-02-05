from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Orderitem,Product
# from app.forms import CartitemForm
from .auth_routes import validation_errors_to_error_messages

orderitem_routes = Blueprint('orderitems', __name__,url_prefix="/api")

@orderitem_routes.route('/orderitems')
def all_orderitems():
    return {"Orderitems":[orderitem.to_dict() for orderitem in Orderitem.query.all()]}