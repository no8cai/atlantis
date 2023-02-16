from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Orderdetail,Product
from app.forms import OrderdetailForm
from .auth_routes import validation_errors_to_error_messages

orderdetail_routes = Blueprint('orderdetails', __name__,url_prefix="/api")

# Get all orders
@orderdetail_routes.route('/orderdetails')
def all_orderdetails():
    return {"Orderdetails":[orderdetail.to_dict() for orderdetail in Orderdetail.query.all()]}


# Get all orders by the current user
@orderdetail_routes.route('/orderdetails/current')
@login_required
def all_current_orderdetails():
    currentId=current_user.get_id()
    return {"Orderdetails":[orderdetail.to_dict() for orderdetail in Orderdetail.query.all() if int(orderdetail.userId) == int(currentId)]}

# Create a order
@orderdetail_routes.route('/orderdetails/current', methods=['POST'])
@login_required
def add_orderdetail():
    #use form to validate post data
    form = OrderdetailForm()
    #insert csrf_token
    form['csrf_token'].data = request.cookies['csrf_token']
    #get current logged in user ID
    currentId=current_user.get_id()

    if form.validate_on_submit():
        new_order=Orderdetail(userId=currentId)
        form.populate_obj(new_order)
        db.session.add(new_order)
        db.session.commit()
        return new_order.to_dict(),201
 
    
    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


# Edit a order
@orderdetail_routes.route('/orderdetails/<int:id>', methods=['PUT'])
@login_required
def edit_orderdetail(id):
    form = OrderdetailForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # check if the product is in the database
    oneOrder = Orderdetail.query.get(id)
    if not oneOrder:
        return {
            'message':'HTTP Error',
            'errors':["Order couldn't be found"],
            'statusCode': 404
            },404
    # check if the current user is the product owner
    currentId=current_user.get_id()
    if int(oneOrder.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The order is not belongs to the current user'],
          'statusCode': 403
          },403
    
    if form.validate_on_submit():
        form.populate_obj(oneOrder)
        db.session.add(oneOrder)
        db.session.commit()
        return oneOrder.to_dict()

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


# Delete a Orderdetail
@orderdetail_routes.route('/orderdetails/<int:id>', methods=['DELETE'])
@login_required
def delete_orderdetail(id):
    oneOrder = Orderdetail.query.get(id)
    if not oneOrder:
        return {
            'message':'HTTP Error',
            "errors":["Order couldn't be found"],
            'statusCode': 404
            },404

    currentId=current_user.get_id()
    if int(oneOrder.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The order is not belongs to the current user'],
          'statusCode': 403
          },403
    
    
    db.session.delete(oneOrder)
    db.session.commit()
    return {
        "message": "Order successfully deleted",
        'statusCode': 200
        },200