from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange
from app.models import Product
from datetime import datetime


class OrderitemForm(FlaskForm):
    productId = IntegerField('productId', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired(),NumberRange(min=1)])
    title = StringField('title', validators=[DataRequired()])
    price = DecimalField("price", validators=[DataRequired()])
    imageUrl = StringField('imageUrl', validators=[DataRequired()])