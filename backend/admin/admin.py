from flask import Flask
from flask_admin import Admin 
from models import db
from models import Item, Order, Cart, OrderItems 
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, redirect, url_for
from wtforms import form, fields, validators
from werkzeug.security import generate_password_hash, check_password_hash
import flask_admin as admin
import flask_login as login
from flask_admin.contrib import sqla
from flask_admin import helpers, expose
from flask_bootstrap import Bootstrap

# app という名前でインスタンス化
# flaskクラスのappオブジェクト
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:postgres@localhost:5432/fr_ec'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['SECRET_KEY'] = 'secret_key'
bootstrap = Bootstrap(app)
db = SQLAlchemy(app)

# アプリケーションコンテキストにdbが使うグローバル変数を設定
# db.init_app(app)
# with app.app_context():
#     db.create_all()

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

#Admin初期ログインフォーム
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

#アカウント作成ページのフォーム
class RegistrationForm(form.Form):
  login = fields.StringField(validators=[validators.required()])
  password = fields.PasswordField(validators=[validators.required()])
  def validate_login(self, field):
    #同じユーザー名がいないかのチェック
    if db.session.query(AdminUser).filter_by(login=self.login.data).count() > 0:
      raise validators.ValidationError('同じユーザー名が存在します。')

#ログイン処理
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


# Flask views
@app.route('/')
def index():
  # return  render_template('index.html')
    return '<a href="/admin/">Click me to get to Admin!</a>'


init_login()
# # 追加したいURLと対応するビューを記述
# admin = Admin(app,'管理者画面', index_view=MyAdminIndexView(), base_template='aaa.html')

# admin = Admin(app,'管理者画面', index_view=MyAdminIndexView(), base_template='master.html')
admin = Admin(app,'管理者画面', index_view=MyAdminIndexView(), base_template='my_master.html')
admin.add_view(MyModelView(AdminUser, db.session))
admin.add_view(MyModelView(Item, db.session))
admin.add_view(MyModelView(Order, db.session))
admin.add_view(MyModelView(Cart, db.session))
admin.add_view(MyModelView(OrderItems, db.session))

# db.create_all()


if __name__ == '__main__':
    app.run(debug=True)

db.create_all()
