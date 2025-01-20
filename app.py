from flask import Flask, render_template, redirect, url_for, flash, request
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from urllib.parse import urlparse
from models import db, User, App
from forms import LoginForm, RegisterForm, AppForm
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# Initialize extensions
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))

@app.route('/')
def index():
    apps = App.query.order_by(App.created_at.desc()).all()
    return render_template('index.html', apps=apps)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user)
        next_page = request.args.get('next')
        if not next_page or urlparse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Registration successful!')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/create_app', methods=['GET', 'POST'])
@login_required
def create_app():
    form = AppForm()
    if form.validate_on_submit():
        app = App(
            title=form.title.data,
            description=form.description.data,
            url=form.url.data,
            gradient_start=form.gradient_start.data,
            gradient_end=form.gradient_end.data,
            tags=form.tags.data,
            author=current_user
        )
        db.session.add(app)
        db.session.commit()
        flash('Your app has been created!')
        return redirect(url_for('index'))
    return render_template('create_app.html', form=form)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Add dummy data if no apps exist
        if not App.query.first():
            # Create a dummy user if not exists
            if not User.query.filter_by(username='demo_user').first():
                demo_user = User(username='demo_user', email='demo@example.com')
                demo_user.set_password('demo123')
                db.session.add(demo_user)
                db.session.commit()
            else:
                demo_user = User.query.filter_by(username='demo_user').first()

            # Add dummy apps
            dummy_apps = [
                {
                    'title': 'Kokoro TTS',
                    'description': 'Now in 5 languages!',
                    'url': 'https://huggingface.co/spaces/demo/kokoro-tts',
                    'gradient_start': '#4F46E5',
                    'gradient_end': '#7C3AED',
                    'tags': 'AI,TTS,Speech',
                    'likes': 1224
                },
                {
                    'title': 'TransPixar',
                    'description': 'Transform your images into Pixar-style animations',
                    'url': 'https://huggingface.co/spaces/demo/transpixar',
                    'gradient_start': '#EC4899',
                    'gradient_end': '#D946EF',
                    'tags': 'AI,Image,Animation',
                    'likes': 174
                },
                {
                    'title': 'FitDiT',
                    'description': 'FitDiT is a high-fidelity virtual try on model',
                    'url': 'https://huggingface.co/spaces/demo/fitdit',
                    'gradient_start': '#6366F1',
                    'gradient_end': '#A855F7',
                    'tags': 'AI,Fashion,Virtual Try-On',
                    'likes': 129
                },
                {
                    'title': 'ViTPose Transformers',
                    'description': 'Advanced pose estimation using Vision Transformers',
                    'url': 'https://huggingface.co/spaces/demo/vitpose',
                    'gradient_start': '#DC2626',
                    'gradient_end': '#DB2777',
                    'tags': 'AI,Computer Vision,Pose Estimation',
                    'likes': 68
                }
            ]

            for app_data in dummy_apps:
                app = App(
                    title=app_data['title'],
                    description=app_data['description'],
                    url=app_data['url'],
                    gradient_start=app_data['gradient_start'],
                    gradient_end=app_data['gradient_end'],
                    tags=app_data['tags'],
                    likes=app_data['likes'],
                    author=demo_user
                )
                db.session.add(app)
            
            db.session.commit()

    app.run(debug=True)
