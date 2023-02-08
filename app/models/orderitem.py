from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .product import Product

class Orderitem(db.Model):
    __tablename__ = 'orderitems'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    orderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orderdetails.id")), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    title = db.Column(db.String(255), nullable=False)
    price = db.Column(db.DECIMAL(50,2), nullable=False)
    imageUrl = db.Column(db.String(1000), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    orderdetail = db.relationship("Orderdetail", back_populates="orderitems")
    product = db.relationship("Product", back_populates="orderitems")

    def to_dict(self):
        return{
         "id":self.id,
         "orderId":self.orderId,
         "productId":self.productId,
         "title":self.title,
         "price":str(self.price),
         "imageUrl":self.imageUrl,
         "quantity":self.quantity
        }