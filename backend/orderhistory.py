from flask import Flask, abort, jsonify, render_template, request, redirect, url_for
from wtforms import form, fields, validators
import flask_admin as admin
import flask_login as login
from flask_admin.contrib import sqla
from flask_admin import helpers, expose
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_admin.contrib.sqla import ModelView
from model import (
    Department,
    Employee,
    create_session
)


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:postgres@localhost:5432/fr_ec'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['SECRET_KEY'] = 'secret_key'
db = SQLAlchemy(app)


@app.route('/')
def index():
    return 'Welcome ' 

class OrderHistory(db.Model):
	# __tablename__ = 'order_history' #作成する
	id = db.Column(db.Integer, primary_key=True)
	ordered = db.Column(db.Integer) #, ForeignKey('')
	quantity = db.Column(db.Integer)
	item_id = db.Column(db.Integer)
	user_id = db.Column(db.Integer)

# class Items(db.Model):
# 	id = db.Column(db.Integer, primary_key=True)
# 	price = db.Column(db.Integer)
# 	category = db.Column(db.String(30), nullable=False)
# 	title = db.Column(db.String(30), nullable=False)
# 	image = db.Column(db.String(30), nullable=False)

# db.create_all() #テーブルを作成
# Test = Items(price=10000, category='国産', title='たらば', image='画像パス')
# Test2 = Items(price=12000, category='国産', title='たらば', image='画像パス')
# Test3 = Items(price=15000, category='ノルウェー産', title='カニカニ', image='画像パス')
# Test4 = Items(price=20000, category='国産', title='はなさきガニ', image='画像パス')

# db.session.add(Test4)
# db.session.commit()


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)

db.create_all()

@app.route('/orderhistory')
#DBに接続してorderedカラムが１のものを取得
def orderedhistory():
    orders = db.session.query(OrderHistory).filter(OrderHistory.ordered == 1).all()
    print(orders)#[<>,<>,<>]
    test = []
    for order in orders:
        dic_result = {}
        dic_result['id'] = order.item_id
        dic_result['quantity'] = order.quantity
        test.append(dic_result)
        obj = {}
        obj['itemList'] = test
    print(obj) 
    return jsonify(obj)
app.run(port=8000, debug=True)  


class AdminUser(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  login = db.Column(db.String(50), unique=True)
  password = db.Column(db.String(250))

  @property
  def is_authenticated(self):
    return True

  @property
  def is_active(self):
    return True

  @property
  def is_anonymous(self):
    return False

  def get_id(self):
    return self.id

  def __unicode__(self):
    return self.username


class LoginForm(form.Form):
  login = fields.StringField(validators=[validators.required()])
  password = fields.PasswordField(validators=[validators.required()])

  def validate_login(self, field):
    user = self.get_user()

    if user is None:
      raise validators.ValidationError('ユーザー名もしくはパスワードが違います。')

    if not check_password_hash(user.password, self.password.data):
      raise validators.ValidationError('ユーザー名もしくはパスワードが違います。')

  def get_user(self):
    return db.session.query(AdminUser).filter_by(login=self.login.data).first()


class RegistrationForm(form.Form):
  login = fields.StringField(validators=[validators.required()])
  password = fields.PasswordField(validators=[validators.required()])

  def validate_login(self, field):
    if db.session.query(AdminUser).filter_by(login=self.login.data).count() > 0:
      raise validators.ValidationError('同じユーザー名が存在します。')


def init_login():
  login_manager = login.LoginManager()
  login_manager.init_app(app)

  @login_manager.user_loader
  def load_user(user_id):
    return db.session.query(AdminUser).get(user_id)


class MyModelView(sqla.ModelView):
  def is_accessible(self):
    return login.current_user.is_authenticated


class MyAdminIndexView(admin.AdminIndexView):
  @expose('/')
  def index(self):
    if not login.current_user.is_authenticated:
      return redirect(url_for('.login_view'))
    return super(MyAdminIndexView, self).index()

  @expose('/login/', methods=('GET', 'POST'))
  def login_view(self):
    form = LoginForm(request.form)
    if helpers.validate_form_on_submit(form):
      user = form.get_user()
      login.login_user(user)

    if login.current_user.is_authenticated:
      return redirect(url_for('.index'))
    link = '<p>アカウント未作成用 <a href="' + url_for('.register_view') + '">ここをクリック</a></p>'
    self._template_args['form'] = form
    self._template_args['link'] = link
    return super(MyAdminIndexView, self).index()

  @expose('/register/', methods=('GET', 'POST'))
  def register_view(self):
    form = RegistrationForm(request.form)
    if helpers.validate_form_on_submit(form):
      user = AdminUser()

      form.populate_obj(user)
      user.password = generate_password_hash(form.password.data)
      db.session.add(user)
      db.session.commit()
      login.login_user(user)
      return redirect(url_for('.index'))
    link = '<p>既にアカウントを持っている場合は <a href="' + url_for('.login_view') + '">ここをクリックしてログイン</a></p>'
    self._template_args['form'] = form
    self._template_args['link'] = link
    return super(MyAdminIndexView, self).index()

  @expose('/logout/')
  def logout_view(self):
    login.logout_user()
    return redirect(url_for('.index'))


init_login()
admin = admin.Admin(app, '管理者画面', index_view=MyAdminIndexView(), base_template='master.html')
admin.add_view(MyModelView(AdminUser, db.session))
