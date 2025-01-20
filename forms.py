from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length, URL, Optional

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=80)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    submit = SubmitField('Register')

class AppForm(FlaskForm):
    title = StringField('App Title', validators=[DataRequired(), Length(max=100)])
    description = TextAreaField('Description', validators=[DataRequired()])
    url = StringField('App URL', validators=[DataRequired(), URL()])
    gradient_start = StringField('Gradient Start Color (hex)', validators=[DataRequired()], default='#6366f1')
    gradient_end = StringField('Gradient End Color (hex)', validators=[DataRequired()], default='#a855f7')
    tags = StringField('Tags (comma separated)', validators=[Optional()])
