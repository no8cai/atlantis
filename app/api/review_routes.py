from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from ..models import db,Review,Product
# from app.forms import CartitemForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__,url_prefix="/api")

@review_routes.route('/reviews')
def all_reviews():
    return {"Reviews":[review.to_dict() for review in Review.query.all()]}