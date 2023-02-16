from flask_wtf import FlaskForm
from wtforms import StringField,DecimalField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length,NumberRange

class AichatForm(FlaskForm):
    question = StringField('question', validators=[DataRequired()])