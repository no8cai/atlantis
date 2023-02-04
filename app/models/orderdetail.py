from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import User
from .product import Product

class Orderdetail(db.Model):
    __tablename__ = 'orderdetails'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    totalprice = db.Column(db.DECIMAL(50,2), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship("User", back_populates="orderdetails")
    orderitems = db.relationship("Orderitem", back_populates='orderdetail', cascade="all, delete")