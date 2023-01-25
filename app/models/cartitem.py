from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .product import Product

class Cartitem(db.Model):
    __tablename__ = 'cartitems'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="cartitems")
    product = db.relationship("Product", back_populates="cartitems")


    def to_dict(self):
        return{
         "id":self.id,
         "userId":self.userId,
         "productId":self.productId,
         "quantity":self.quantity
        }
    
    
    def to_dict_full(self):
        return{
         "id":self.id,
         "userId":self.userId,
         "productId":self.productId,
         "quantity":self.quantity,
         "user": User.query.get(self.userId).to_dict(),
         "product":Product.query.get(self.productId).to_dict()
        }