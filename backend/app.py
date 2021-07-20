
from flask import Flask, jsonify, request, redirect
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import *
from flask_cors import CORS
import psycopg2
from sqlalchemy.orm import relationship
from sqlalchemy.orm.query import Query
from sqlalchemy.sql.schema import ForeignKey

app = Flask(__name__, static_folder='.', static_url_path='')

CORS(app, support_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:kaorunagisa14@localhost:5432/fr_ec'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_AS_ASCII'] = False

db = SQLAlchemy(app)

def get_connection():
    localhost = 'localhost'
    port = '5432'
    users = 'postgres'
    dbnames = 'fr_ec'
    passwords = 'kaorunagisa14'
    return psycopg2.connect("host=" + localhost + " port=" + port + " user=" + users + " dbname=" + dbnames + " password=" + passwords)

class ItemTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)

class Order(db.Model):
    __tablename__ ='orders'
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
    # orderItems = relationship('OrderItems',backref='orders')

    # totalPrice = db.Column(db.Integer, nullable=True)
    # orderDate = db.Column(db.Integer, nullable=True)

class Carts(db.Model):
    # __tablename__ ='Cart'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    item_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String, nullable=False)

class OrderItems(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, nullable=False) #db.ForeignKey('orders.id')
    cart_id = db.Column(db.Integer, nullable=False)
    # order= relationship('Order')

db.create_all()


@app.route('/', methods=['GET'])
def home():
    if request.method=='GET':
        dic_item={}
        id_list=[]
        name_list=[]
        price_list=[]
        image_list=[]
        Items = ItemTable.query.all()
        for item in Items:
            id = item.id
            name = item.name
            price = item.price
            image = item.image

            id_list.append(id)
            name_list.append(name)
            price_list.append(price)
            image_list.append(image)

            id_id = 0
            for id in id_list:
                dic_item[id] ={}
                dic_item[id]['name']=name_list[id_id]
                dic_item[id]['price']=price_list[id_id]
                dic_item[id]['image']=image_list[id_id]
                id_id+=1
    return jsonify(dic_item)

@app.route('/item_detail/<int:Id>', methods=['POST'])
def detail(Id):
    if request.method =='POST':
        data = request.get_json()
        item_id = Id
        user_id= 1
        user_id= 3
        # item_id = data['post_item']
        quantity= data['post_quantity']
        # new_orderItem = Carts(status=0,quantity=quantity,item_id=item_id, user_id=user_id)
        carts = db.session.query(Carts).all()
        for cart in carts:
            if cart.status == 0 and cart.item_id != item_id:
                new_orderItem = Carts(status=0,quantity=quantity,item_id=item_id, user_id=user_id)
                db.session.add(new_orderItem)
                db.session.commit()

        # db.session.add(new_orderItem)
        # db.session.commit()
        print('DBにCart追加完了')

        user = 3
        u_id = db.session.query(Order).filter(Order.user_id == str(user), Order.status ==0).all()
        if u_id:
            print('重複したuser_idにてstatus:0のレコードを発見')
            return redirect('/')
        else:
            new_record = Order(status=0, user_id=str(user))
            db.session.add(new_record)
            db.session.commit()
            print('DBにOrder追加完了')
        return redirect('/')

def toDict(self):
    return{
            'id': self[0],
            'quantity':self[1],
            'item': {
                'name': self[2],
                'price': self[3],
                'image': self[4]
            }
    }

@app.route('/cart', methods=['GET', 'POST'])
def ordered():
    if request.method == 'GET':
        with get_connection() as conn:
            with conn.cursor() as cur:
                sql = 'SELECT carts.id, carts.quantity, item_table.name, item_table.price, item_table.image FROM carts JOIN item_table ON carts.item_id = item_table.id WHERE carts.status = 0 ORDER BY id ASC'
                cur.execute(sql)
                result_list = cur.fetchall()
                l = []
                for item in result_list:
                    c = toDict(item)
                    l.append(c)
            return jsonify(l)

    user = 1
    user = 3
    print(request.get_json())
    data = request.get_json()
    destinationName = data['post_orderInfo']['destinationName']
    # destinationEmail = data['post_orderInfo']['destinationEmail']
    destinationZipcode = data['post_orderInfo']['destinationZipcode']
    destinationAddress = data['post_orderInfo']['destinationAddress']
    destinationTel = data['post_orderInfo']['destinationTel']
    order_id_tup = db.session.query(Order.id).filter(Order.user_id == str(user), Order.status == 0).first()
    cart_id_tup = db.session.query(Carts.id).filter(Carts.user_id == str(user), Carts.status ==0).all()
    order_id=order_id_tup[0]
    cart_ids=[]
    for cartId in cart_id_tup:
        cart_ids.append(cartId[0])
    
    for cart_id in cart_ids:
        item = OrderItems(order_id=order_id, cart_id=cart_id)
        db.session.add(item)
    db.session.commit()

    order_record = db.session.query(Order).filter(Order.user_id ==str(user), Order.status ==0).all()
    order_record = order_record[0]
    order_record.destination_name = destinationName
    order_record.destination_zipcode = destinationZipcode
    order_record.destination_address = destinationAddress
    order_record.destination_tel = destinationTel
    order_record.status = 1
    db.session.commit()
    print('order情報追加・Orderのstatus変更完了')

    cart_records_list = db.session.query(Carts).filter(Carts.user_id == str(user), Carts.status==0).all()
    for cart_records in cart_records_list:
        cart_records.status = 1
        db.session.commit()
        print('cartのstatus変更完了')
    return redirect('/')

@app.route('/delete_cartitem/<int:deleteId>', methods=['POST'])
def deleteCartItem(deleteId):
    status_update = db.session.query(Carts).filter(Carts.id == deleteId).first()
    status_update.status = 9
    db.session.commit()
    return redirect('/')

@app.route("/order_history",methods=['GET'])
def history_test():
    user = 3
    if request.method=='GET':
        # item_record = db.session.query(Cart.id,Cart.quantity,Cart.item_id,Item.name,Item.image,Cart.user_id).filter(Cart.user_id=='1').join(Item,Item.id==Cart.item_id).all()
        # print(item_record)
        #ordersテーブルのidをuser_idとstatus:0でソート
        orderIds_tup = db.session.query(Order.id).filter(Order.user_id == str(user), Order.status == 1).all()
        print(orderIds_tup) # [(1,)(2,)]
        # ordersのidをリスト・タプル型からリスト型に
        orderIds =[]
        for orderId in orderIds_tup:
            orderIds.append(orderId[0])
        print(orderIds) # [1,2]
        
        # order_history= db.session.query(Item.name,Item.image,Cart.quantity).filter(Cart.user_id ==str(user), Cart.status==1).join(Cart,Cart.item_id==Item.id).all()
        # print(order_history)

        # order_history2= db.session.query(Item.name,Cart.quantity,OrderItems.order_id,Order.destination_name)\
        #     .filter(Cart.user_id ==str(user), Cart.status==1)\
        #     .join((Cart,Cart.item_id==Item.id),(OrderItems,Cart.id==OrderItems.cart_id),(Order,Order.id==OrderItems.order_id)).all()
        # print(order_history2)

        # order_history3= db.session.query(OrderItems.order_id,Cart.item_id,Cart.quantity,Order.destination_name)\
        #     .filter(Cart.user_id ==str(user), Cart.status==1)\
        #     .join((OrderItems,Cart.id==OrderItems.cart_id),(Order,Order.id==OrderItems.order_id)).all()
        # print(order_history3)

        resdata={}
        item_id_list=[]
        quantity_list=[]
        order_id_list=[]
        destination_name_list=[]
        order_lists= db.session.query(Cart.item_id,Cart.quantity,Order.id,Order.destination_name)\
            .filter(Cart.user_id==str(user),Cart.status==1,Order.status==1)\
            .join((OrderItems,OrderItems.cart_id==Cart.id),(Order,Order.id==OrderItems.order_id))\
            .all()
        # print(order_lists)
        for order_list in order_lists:
            item_id_list.append(order_list[0])
            quantity_list.append(order_list[1])
            order_id_list.append(order_list[2])
            destination_name_list.append(order_list[3])
        # print(item_id_list)
        # print(quantity_list)
        # print('↓order_id_list')
        # print(order_id_list)
        # print(destination_name_list)

        id_id=0
        for order_id in order_id_list:
            if resdata.get(order_id) is None:
                resdata[order_id]={}
                resdata[order_id]['destination_name']= destination_name_list[id_id]
                resdata[order_id]['item_list']= []
                resdata[order_id]['item_list'].append({'item_id':item_id_list[id_id],'quantity':quantity_list[id_id]})
                id_id+=1
            else:
                #既にresdata[order_id]が存在している場合（1注文で複数種類の商品を購入した場合）
                resdata[order_id]['item_list'].append({'item_id':item_id_list[id_id],'quantity':quantity_list[id_id]})
                id_id+=1

        print(resdata)
        print('orderHistory')
        redirect('/')
    return jsonify(resdata)


if __name__ == "__main__":
    app.debug = True
    app.run(host='127.0.0.1', port=5000)