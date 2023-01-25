from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange
from app.models import Product
from datetime import datetime

class CartitemForm(FlaskForm):
    quantity = IntegerField('quantity', validators=[DataRequired(),NumberRange(min=1)])