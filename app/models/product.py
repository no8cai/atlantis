from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    price = db.Column(db.DECIMAL(50,2), nullable=False)
    discount = db.Column(db.DECIMAL(3,2), nullable=False)
    inventory = db.Column(db.Integer, nullable=False)
    style = db.Column(db.String(50), nullable=False)
    brand = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(50), nullable=False)
    dimension = db.Column(db.String(50), nullable=False)
    about = db.Column(db.String(2000), nullable=False)
    description = db.Column(db.String(4000), nullable=False)
    imageUrl = db.Column(db.String(1000), nullable=False)

    user = db.relationship("User", back_populates="products")
    cartitem = db.relationship("Cartitem", back_populates="product", uselist=False, cascade="all, delete")