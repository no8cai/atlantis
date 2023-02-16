from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Review,Product
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__,url_prefix="/api")

#Get all reviews
@review_routes.route('/reviews')
def all_reviews():
    return {"Reviews":[review.to_dict_full() for review in Review.query.all()]}

#Get all reviews by productId
@review_routes.route('/products/<int:id>/reviews')
def all_product_reviews(id):
    return {"Reviews":[review.to_dict_full() for review in Review.query.all() if int(review.productId) == int(id)]}

# Create a review based on productId
@review_routes.route('/products/<int:id>/reviews', methods=['POST'])
@login_required
def add_review(id):
    #use form to validate post data
    form = ReviewForm()
    #insert csrf_token
    form['csrf_token'].data = request.cookies['csrf_token']
    #get current logged in user ID
    currentId=current_user.get_id()
    
    if form.validate_on_submit():

        new_review=Review(userId=currentId,productId=id)
        form.populate_obj(new_review)
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict_full(),201
    
    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400

# Edit a review
@review_routes.route('/reviews/<int:id>', methods=['PUT'])
@login_required
def edit_product(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # check if the product is in the database
    oneReview = Review.query.get(id)
    if not oneReview:
        return {
            'message':'HTTP Error',
            'errors':["Review couldn't be found"],
            'statusCode': 404
            },404
    # check if the current user is the product owner
    currentId=current_user.get_id()
    if int(oneReview.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The review is not belongs to the current user'],
          'statusCode': 403
          },403
    
    if form.validate_on_submit():
        form.populate_obj(oneReview)
        db.session.add(oneReview)
        db.session.commit()
        # realtecartitems=Cartitem.query.filter(Cartitem.quantity>)
        return oneReview.to_dict_full()

    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400


# Delete a Review
@review_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    oneReview = Review.query.get(id)
    if not oneReview:
        return {
            'message':'HTTP Error',
            "errors":["Review couldn't be found"],
            'statusCode': 404
            },404

    currentId=current_user.get_id()
    if int(oneReview.userId) != int(currentId):
        return {
          'message':'Forbidden Error',
          'errors': ['The review is not belongs to the current user'],
          'statusCode': 403
          },403
    
    db.session.delete(oneReview)
    db.session.commit()
    return {
        "message": "Review successfully deleted",
        'statusCode': 200
        },200