from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User

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
    cartitems = db.relationship("Cartitem", back_populates="product", cascade="all, delete")

    def to_dict(self):
        return{
            'id':self.id,
            'creatorId':self.creatorId,
            'title':self.title,
            'category':self.category,
            'price':str(self.price),
            'discount':str(self.discount),
            'inventory':str(self.inventory),
            'style':self.style,
            'brand':self.brand,
            'color':self.color,
            'dimension':self.dimension,
            'about':self.about,
            'description':self.description,
            'imageUrl':self.imageUrl
        }

    def to_dict_full(self):
        return{
            'id':self.id,
            'creatorId':self.creatorId,
            'title':self.title,
            'category':self.category,
            'price':str(self.price),
            'discount':str(self.discount),
            'inventory':str(self.inventory),
            'style':self.style,
            'brand':self.brand,
            'color':self.color,
            'dimension':self.dimension,
            'about':self.about,
            'description':self.description,
            'imageUrl':self.imageUrl,
            'creator':User.query.get(self.creatorId).to_dict()        
        }