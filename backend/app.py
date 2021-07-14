
from flask import Flask, jsonify, request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, create_engine
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
from flask_cors import CORS

app = Flask(__name__, static_folder='.', static_url_path='')

CORS(app, support_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:kaorunagisa14@localhost:5432/fr_ec'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class CartList(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ordered = db.Column(db.Integer, server_default="0")
    quantity = db.Column(db.Integer)
    item_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)
    
    def toDict(self):
        return{
            'id': self.id,
            'ordered': self.ordered,
            'quantity': self.quantity,
            'item_id' : self.item_id,
            'user_id' : self.user_id
        }

class ItemTest(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50))
    price = db.Column(db.Integer)
    category = db.Column(db.String(50))
    slug = db.Column(db.String(50))
    description = db.Column(db.String(200))
    image = db.Column(db.String(50))

    def toDict(self):
        return{
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'category': self.category,
            'slug': self.slug,
            'description': self.description,
            'image': self.image
        }

db.create_all()
# db.drop(Cart)

@app.route('/')
def index():
    return 'test'

@app.route('/cart', methods=['GET', 'POST'])
def cart():
    if request.method == 'GET':
        cart_item = CartList.query.filter(CartList.ordered == 0).all()
        # print(cart_item[0].item_id)
        test = []
        for cart in cart_item:
            item_list = ItemTest.query.filter(ItemTest.id == cart.item_id).all()
            test.append(item_list)
        print(test)
        item_list = ItemTest.query.filter(ItemTest.id == cart_item[0].item_id)
        # print(item_list)
        # item_list = ItemTest.query.all()
        itemlist = []
        for item in item_list:
            c = item.toDict()
            itemlist.append(c)
        return jsonify(itemlist)

# [
#     {
#         id: 2,
#         item: {
#             title: '',
#             price: ,
#             image: ''
#         }
#     },
#     {
#         id: 3,
#         item: {
#             title: '',
#             price: ,
#             image: ''
#         }
#     }
# ]