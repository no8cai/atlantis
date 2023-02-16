from flask import Blueprint, request
from flask_login import current_user, login_required
from app.openai_helper import (chatrobot)
from app.forms import AichatForm
from .auth_routes import validation_errors_to_error_messages

aichat_routes = Blueprint("aichats", __name__)

@aichat_routes.route("", methods=["POST"])
# @login_required
def aichat_robot():
    form = AichatForm()
    #insert csrf_token
    form['csrf_token'].data = request.cookies['csrf_token']
    #get current logged in user ID
    # currentId=current_user.get_id()

    if form.validate_on_submit():
        question = form.data["question"]
        # response = chatrobot("how could I sell more items")
        response = chatrobot(question)
        return {"aires":response}
    
    return {
        'message':'Validation Error',
        "errors":validation_errors_to_error_messages(form.errors),
        'statusCode': 400
        },400
    
    