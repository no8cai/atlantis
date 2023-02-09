from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange
from app.models import Review

class ReviewForm(FlaskForm):
    stars = IntegerField('stars', validators=[DataRequired(),NumberRange(min=1)])
    comments = StringField('comments', validators=[DataRequired()])