from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange
from app.models import Product
from datetime import datetime


class OrderdetailForm(FlaskForm):
    totalprice = DecimalField('totalprice', validators=[DataRequired(),NumberRange(min=0)])