from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Orderitem,Product,Orderdetail
from app.forms import OrderitemForm
from .auth_routes import validation_errors_to_error_messages

orderitem_routes = Blueprint('orderitems', __name__,url_prefix="/api")

@orderitem_routes.route('/orderitems')
def all_orderitems():
    return {"Orderitems":[orderitem.to_dict() for orderitem in Orderitem.query.all()]}

# Get all order items by the current user
@orderitem_routes.route('/orderitems/current')
def all_orderitems_current():
    currentId=current_user.get_id()
    return {"Orderitems":[orderitem.to_dict() for orderitem in Orderitem.query.join(Orderdetail).filter(
        Orderdetail.userId==currentId
    )]}


# Create a orderitem
@orderitem_routes.route('/orderdetails/<int:id>/orderitems', methods=['POST'])
@login_required
def add_orderitem(id):
    #use form to validate post data
    form = OrderitemForm()
    #insert csrf_token
    form['csrf_token'].data = request.cookies['csrf_token']
    
    oneOrder = Orderdetail.query.get(id)
    

    if not oneOrder:
        return {
            'message':'HTTP Error',
            'errors':["Order couldn't be found"],
            'statusCode': 404
            },404
    # check if the current user is the order owner
    currentId=current_user.get_id()
    if int(oneOrder.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The order is not belongs to the current user'],
          'statusCode': 403
          },403

    if form.validate_on_submit():
        oneProduct = Product.query.get(int(form.data["productId"]))
        if not oneProduct:
            return {
            'message':'HTTP Error',
            'errors':["Product couldn't be found"],
            'statusCode': 404
            },404
        new_orderitem=Orderitem(orderId=id)
        form.populate_obj(new_orderitem)
        if oneProduct.inventory<int(form.data["quantity"]):
            return{
                'message':'Validation Error',
                "errors":["the quantiy can not be greater than product inventory"],
                'statusCode': 400
                },400
        oneProduct.inventory-=int(form.data["quantity"])
        db.session.add(new_orderitem)
        db.session.add(oneProduct)
        db.session.commit()
        return new_orderitem.to_dict(),201
    
    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400

# Edit a orderitem
@orderitem_routes.route('/orderitems/<int:id>', methods=['PUT'])
@login_required
def edit_orderitem(id):
    form = OrderitemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # check if the product is in the database
    oneOrderitem = Orderitem.query.get(id)
    if not oneOrderitem:
        return {
            'message':'HTTP Error',
            'errors':["Orderitem couldn't be found"],
            'statusCode': 404
            },404
    # check if the current user is the order owner
    currentId=current_user.get_id()
    if int(oneOrderitem.orderdetail.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The order is not belongs to the current user'],
          'statusCode': 403
          },403
    
    if form.validate_on_submit():
        form.populate_obj(oneOrderitem)
        db.session.add(oneOrderitem)
        db.session.commit()
        return oneOrderitem.to_dict()

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


# Delete a Orderitem
@orderitem_routes.route('/orderitems/<int:id>', methods=['DELETE'])
@login_required
def delete_orderitem(id):
    oneOrderitem = Orderitem.query.get(id)
    
    if not oneOrderitem:
        return {
            'message':'HTTP Error',
            "errors":["Orderitem couldn't be found"],
            'statusCode': 404
            },404

    # check if the current user is the order owner
    currentId=current_user.get_id()
    if int(oneOrderitem.orderdetail.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The order is not belongs to the current user'],
          'statusCode': 403
          },403
    oneProduct = Product.query.get(oneOrderitem.productId)
    if not oneProduct:
        return {
            'message':'HTTP Error',
            'errors':["Product couldn't be found"],
            'statusCode': 404
            },404
    oneProduct.inventory+=oneOrderitem.quantity
    db.session.delete(oneOrderitem)
    db.session.add(oneProduct)
    db.session.commit()
    return {
        "message": "Orderitem successfully deleted",
        'statusCode': 200
        },200