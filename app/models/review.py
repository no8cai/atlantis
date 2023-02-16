from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .product import Product

class Review(db.Model):
    __tablename__ = 'reviews'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.String(500), nullable=False)

    user = db.relationship("User", back_populates="reviews")
    product = db.relationship("Product", back_populates="reviews")

    def to_dict(self):
        return{
         "id":self.id,
         "userId":self.userId,
         "productId":self.productId,
         "stars":self.stars,
         "comments":self.comments
        }

    def to_dict_full(self):
        return{
         "id":self.id,
         "userId":self.userId,
         "user": User.query.get(self.userId).to_dict(),   
         "productId":self.productId,
         "stars":self.stars,
         "comments":self.comments
        }