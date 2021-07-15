
from flask import Flask, render_template, request, redirect,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm.query import Query

from flask_cors import CORS

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:mwmw1225zwzw@localhost:5432/fr_ec'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Item(db.Model):
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
    destinationName = db.Column(db.String, nullable=True)
    destinationEmail = db.Column(db.String, nullable=True)
    destinationZipcode = db.Column(db.String, nullable=True)
    destinationAddress = db.Column(db.String, nullable=True)
    destinationTel = db.Column(db.String, nullable=True)

    # totalPrice = db.Column(db.Integer, nullable=True)
    # orderDate = db.Column(db.Integer, nullable=True)



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

db.create_all()

@app.route('/', methods=['GET'])
def home():
    if request.method=='GET':
        dic_item={}
        id_list=[]
        name_list=[]
        price_list=[]
        image_list=[]
        Items = Item.query.all()
        # print(Items)
        # def showItems():
        for item in Items:
            # print(item)
            id = item.id
            name = item.name
            price = item.price
            image = item.image

            # print(id)
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
    # print(dic_item)
    return jsonify(dic_item)
    # showItems()

@app.route('/item_detail/<int:Id>', methods=['POST'])
def detail(Id):
    # if request.method =='GET':
    #     detailItem = Item.query.get(Id)
    #     print(detailItem)
    #     # print(detaiItem)
    #     return Id
    if request.method =='POST':
        # Cartテーブルにレコード追加
        print(request.get_json())
        data = request.get_json()
        item_id = Id
        user_id= 1
        # item_id = data['post_item']
        quantity= data['post_quantity']
        print(quantity)
        new_orderItem = Cart(status=0,quantity=quantity,item_id=item_id, user_id=user_id)
        db.session.add(new_orderItem)
        db.session.commit()
        print('DBにCart追加完了')

        user = 1
        u_id = db.session.query(Order).filter(Order.user_id == str(user), Order.status ==0).all()
        if u_id:
            print(u_id)
            print('重複したuser_idにてstatus:0のレコードを発見')
            return redirect('/')
        else:
            new_record = Order(status=0, user_id=str(user))
            db.session.add(new_record)
            db.session.commit()
            print('DBにOrder追加完了')



        # Orderテーブルでuser_idでソートし、orderedが0のものがないか検索する処理
        # カートに0件のときの処理（ Orderにorderedが0のものがないとき）
            # Order()でレコードを生成
        # カートに1件以上あるときの処理（Orderにorderedが0のものがあるとき）
            # Order()でレコードは生成しない。
        
        # 注文確定ボタンの処理
        # Cartテーブルからidを取得する（複数件になる可能性あり）→変数に入れる（リスト）
        # Orderテーブルからorderedが0のidを取得する（1件）
        # リストに入っている分のidをforで回してCart_idとし、order_idはOrderのidとしてINSERT（add）を実行
        
        return redirect('/')

@app.route('/cart', methods=['POST'])
def ordered():
    user = 1
    print(request.get_json())
    data = request.get_json()
    print(data['post_orderInfo']['info'])
    destinationName = data['post_orderInfo']['destinationName']
    # destinationEmail = data['post_orderInfo']['destinationEmail']
    destinationZipcode = data['post_orderInfo']['destinationZipcode']
    destinationAddress = data['post_orderInfo']['destinationAddress']
    destinationTel = data['post_orderInfo']['destinationTel']
    order_id_tup = db.session.query(Order.id).filter(Order.user_id == str(user), Order.status == 0).first()
    cart_id_tup = db.session.query(Cart.id).filter(Cart.user_id == str(user), Cart.status ==0).all()
    print(order_id_tup)
    order_id=order_id_tup[0]
    print(cart_id_tup) # [(1,),(2,)(4,)]
    # cart_id_tupをリスト型に変換
    cart_ids=[]
    for cartId in cart_id_tup:
        # print(cart_id_list[0])
        cart_ids.append(cartId[0])
    print(cart_ids)
    
    for cart_id in cart_ids:
        item = OrderItems(order_id=order_id, cart_id=cart_id)
        db.session.add(item)
    db.session.commit()

    order_record = db.session.query(Order).filter(Order.user_id ==str(user), Order.status ==0).all()
    order_record = order_record[0]
    order_record.destinationName = destinationName
    order_record.destinationZipcode = destinationZipcode
    order_record.destinationAddress = destinationAddress
    order_record.destinationTel = destinationTel
    order_record.status = 1
    db.session.commit()
    print('order情報追加・Orderのstatus変更完了')

    cart_records_list = db.session.query(Cart).filter(Cart.user_id == str(user), Cart.status==0).all()
    for cart_records in cart_records_list:
        cart_records.status = 1
        # print(cart_records.status)
        db.session.commit()
        print('cartのstatus変更完了')
    # print(cart_records_list[0].status)


    return redirect('/')

if __name__ == "__main__":
    app.debug = True
    app.run(host='127.0.0.1', port=5000)