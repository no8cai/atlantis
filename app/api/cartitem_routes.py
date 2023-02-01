from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Cartitem,Product
from app.forms import CartitemForm
from .auth_routes import validation_errors_to_error_messages

cartitem_routes = Blueprint('cartitmes', __name__,url_prefix="/api")

# Get all caritem data
@cartitem_routes.route('/cartitems')
def all_cartitems():
    return {"Cartitems":[cartitem.to_dict_full() for cartitem in Cartitem.query.all()]}

# Get all product data by the current user
@cartitem_routes.route('/cartitems/current')
@login_required
def all_current_cartitems():
    currentId=current_user.get_id()
    return {"Cartitems":[cartitem.to_dict_full() for cartitem in Cartitem.query.all() if int(cartitem.userId) == int(currentId)]}

# Create a cartitem
@cartitem_routes.route('/products/<int:id>/cartitems', methods=['POST'])
@login_required
def add_cartitem(id):
    #use form to validate post data
    form = CartitemForm()
    #insert csrf_token
    form['csrf_token'].data = request.cookies['csrf_token']
    #get current logged in user ID
    currentId=current_user.get_id()
    tempproduct=Product.query.get(id)

    if form.validate_on_submit():
        tempcartitem=Cartitem.query.filter(Cartitem.userId==currentId).filter(Cartitem.productId==int(id)).first()
        if not tempcartitem:
            new_cartitem=Cartitem(userId=currentId,productId=id)
            if int(form.data["quantity"])>tempproduct.inventory:
                return{
                'message':'Validation Error',
                "errors":["the quantiy can not be greater than product inventory"],
                'statusCode': 400
                },400
            form.populate_obj(new_cartitem)
            db.session.add(new_cartitem)
            db.session.commit()
            return new_cartitem.to_dict_full(),201
        else:
            new_quantity=tempcartitem.quantity+int(form.data["quantity"])
            if new_quantity>tempproduct.inventory:
                return{
                'message':'Validation Error',
                "errors":["the quantiy can not be greater than product inventory"],
                'statusCode': 400
                },400
            new_cartitem1=Cartitem(userId=currentId,productId=id,quantity=new_quantity)
            db.session.delete(tempcartitem)
            db.session.add(new_cartitem1)
            db.session.commit()
            return new_cartitem1.to_dict_full(),201
    
    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400

# Edit a product
@cartitem_routes.route('/cartitems/<int:id>', methods=['PUT'])
@login_required
def edit_cartitem(id):
    form = CartitemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # check if the product is in the database
    oneCartitem = Cartitem.query.get(id)
    if not oneCartitem:
        return {
            'message':'HTTP Error',
            'errors':["Cart item couldn't be found"],
            'statusCode': 404
            },404
    # check if the current user is the cart owner
    currentId=current_user.get_id()
    if int(oneCartitem.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The product is not belongs to the current user'],
          'statusCode': 403
          },403
    
    if form.validate_on_submit():
        product=Product.query.get(oneCartitem.productId)
        if int(form.data["quantity"])>int(product.inventory):
            return{
                'message':'Validation Error',
                "errors":["the quantiy can not be greater than product inventory"],
                'statusCode': 400
            },400
        form.populate_obj(oneCartitem)
        db.session.add(oneCartitem)
        db.session.commit()
        return oneCartitem.to_dict_full()

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400

# Delete a cartitem
@cartitem_routes.route('/cartitems/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    oneCartitem = Cartitem.query.get(id)
    if not oneCartitem:
        return {
            'message':'HTTP Error',
            "errors":["Cart item couldn't be found"],
            'statusCode': 404
            },404

    currentId=current_user.get_id()
    if int (oneCartitem.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The cart item is not belongs to the current user'],
          'statusCode': 403
          },403
    
    db.session.delete (oneCartitem)
    db.session.commit()
    return {
        "message": "Cart item successfully deleted",
        'statusCode': 200
        },200