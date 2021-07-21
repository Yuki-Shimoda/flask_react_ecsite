# Adminページインデックス（各テーブル管理）
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)


# Test = Item(price=10000, name='タカアシガニ', image='1.png')
# Test2 = Item(price=12000, name='ズワイガニ', image='2.png')
# Test3 = Item(price=15000, name='タラバガニ', image='3.png')
# Test4 = Item(price=20000, name='毛カニ', image='4.png')
# Test5 = Item(price=20000, name='訓パッポンかりー', image='5.png')
# Test6 = Item(price=20000, name='カニたま', image='6.png')
# Test7 = Item(price=20000, name='カニグラタン', image='7.png')

# db.session.add(Test)
# db.session.add(Test2)
# db.session.add(Test3)
# db.session.add(Test4)
# db.session.add(Test5)
# db.session.add(Test6)
# db.session.add(Test7)
# db.session.commit()

class Order(db.Model):
    __tablename__ ='orders'
    id = db.Column(db.Integer, primary_key=True)
    ordered_date = db.Column(db.Integer, nullable=True)
    status =db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String, nullable=False)
    payment_id = db.Column(db.Integer, nullable=True)
    destinationName = db.Column(db.String, nullable=True)
    destinationEmail = db.Column(db.String, nullable=True)
    destinationZipcode = db.Column(db.String, nullable=True)
    destinationAddress = db.Column(db.String, nullable=True)
    destinationTel = db.Column(db.String, nullable=True)

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

