# Adminページインデックス（各テーブル管理）
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

# アプリケーションコンテキストにdbが使うグローバル変数を設定
app = Flask(__name__)
db.init_app(app)
with app.app_context():
    db.create_all()

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)


class Order(db.Model):
    __tablename__ ='Orders'
    id = db.Column(db.Integer, primary_key=True)
    ordered_date = db.Column(db.Integer, nullable=True)
    status =db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String, nullable=False)
    payment_id = db.Column(db.Integer, nullable=True)
    destination_name = db.Column(db.String, nullable=True)
    destination_email = db.Column(db.String, nullable=True)
    destination_zipcode = db.Column(db.String, nullable=True)
    destination_address = db.Column(db.String, nullable=True)
    destination_tel = db.Column(db.String, nullable=True)
# Test7 = Order(status=0, user_id=3)
# db.session.add(Test7)
# db.session.commit()



class Cart(db.Model):
    # __tablename__ ='Cart'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    item_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String, nullable=False)

class OrderItems(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, nullable=False) 
    cart_id = db.Column(db.Integer, nullable=False)
    
# db.create_all()


