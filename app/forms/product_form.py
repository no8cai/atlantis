from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange
from app.models import Product
from datetime import datetime

class ProductForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    price = DecimalField("price", validators=[DataRequired()])
    discount = DecimalField("discount", validators=[DataRequired()])
    inventory = IntegerField('inventory', validators=[DataRequired(),NumberRange(min=1)])
    style = StringField('styple', validators=[DataRequired()])
    brand = StringField('brand', validators=[DataRequired()])
    color = StringField('color', validators=[DataRequired()])
    dimension = StringField('dimension', validators=[DataRequired()])
    about = StringField('about', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    imageUrl = StringField('imageUrl', validators=[DataRequired()])