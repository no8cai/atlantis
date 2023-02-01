from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('Email', validators=[DataRequired(message='email field is required'),Email(message="please enter a valid email address."),user_exists])
    password = StringField('Password', validators=[DataRequired(message='password field is required'),Length(min=6, message="password must be at least 6 characters.")])
    city = StringField('City', validators=[DataRequired(message="city is required")])
    state = StringField('State', validators=[DataRequired(message="state is required")])
    zipcode = IntegerField('Zipcode', validators=[DataRequired(message="zipcode is required")])