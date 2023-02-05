from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Product,Cartitem
from app.forms import ProductForm
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)

# Get all product data
@product_routes.route('')
def all_products():
    return {"Products":[product.to_dict_full() for product in Product.query.all()]}

# Get all product data by the current user
@product_routes.route('/current')
@login_required
def all_current_products():
    currentId=current_user.get_id()
    return {"Products":[product.to_dict_full() for product in Product.query.all() if int(product.creatorId) == int(currentId)]}

# Get product data by Id
@product_routes.route('/<int:id>')
def single_product(id):
    oneProduct = Product.query.get(id)
    if oneProduct:
      return oneProduct.to_dict_full()
    return {
        'message':'HTTP Error',
        "errors":["Product couldn't be found"],
        'statusCode': 404
        },404

# Create a product
@product_routes.route('', methods=['POST'])
@login_required
def add_product():
    #use form to validate post data
    form = ProductForm()
    #insert csrf_token
    form['csrf_token'].data = request.cookies['csrf_token']
    #get current logged in user ID
    currentId=current_user.get_id()
    
    if form.validate_on_submit():
        new_product=Product(creatorId=currentId)
        form.populate_obj(new_product)
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict_full(),201
    
    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


# Edit a product
@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_product(id):
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # check if the product is in the database
    oneProduct = Product.query.get(id)
    if not oneProduct:
        return {
            'message':'HTTP Error',
            'errors':["Product couldn't be found"],
            'statusCode': 404
            },404
    # check if the current user is the product owner
    currentId=current_user.get_id()
    if int(oneProduct.creatorId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The product is not belongs to the current user'],
          'statusCode': 403
          },403
    
    if form.validate_on_submit():
        form.populate_obj(oneProduct)
        db.session.add(oneProduct)
        db.session.commit()
        # realtecartitems=Cartitem.query.filter(Cartitem.quantity>)
        return oneProduct.to_dict_full()

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400

# Delete a product
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    oneProduct = Product.query.get(id)
    if not oneProduct:
        return {
            'message':'HTTP Error',
            "errors":["Product couldn't be found"],
            'statusCode': 404
            },404

    currentId=current_user.get_id()
    if int(oneProduct.creatorId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The product is not belongs to the current user'],
          'statusCode': 403
          },403
    
    db.session.delete(oneProduct)
    db.session.commit()
    return {
        "message": "Product successfully deleted",
        'statusCode': 200
        },200