from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Orderdetail,Product
# from app.forms import CartitemForm
from .auth_routes import validation_errors_to_error_messages

orderdetail_routes = Blueprint('orderdetails', __name__,url_prefix="/api")

@orderdetail_routes.route('/orderdetails')
def all_orderdetails():
    return {"Orderdetails":[orderdetail.to_dict() for orderdetail in Orderdetail.query.all()]}