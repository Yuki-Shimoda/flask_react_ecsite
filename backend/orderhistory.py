# OrderHIstory.py処理　一時保存　変更あり

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import Flask, abort, jsonify, render_template, 

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:postgres@localhost:5432/fr_ec'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['SECRET_KEY'] = 'secret_key'
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

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
