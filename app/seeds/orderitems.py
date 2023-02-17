from app.models import db, Orderitem, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_orderitems():
    orderitem1 = Orderitem(
        orderId=1, productId=1, title='Dell S2421H 24-Inch 1080p Full HD 1920 x 1080 Resolution 75Hz USB-C Monitor, Built-in Dual Speakers, 4ms Response Time, Dual HDMI Ports, AMD FreeSync Technology, IPS, Silver',price=119.25,imageUrl='https://m.media-amazon.com/images/I/71yI7N2eijL._AC_SX679_.jpg',quantity=1)    
    orderitem2 = Orderitem(
        orderId=1, productId=2, title='Dacoity Gaming Keyboard, 104 Keys All-Metal Panel, Rainbow LED Backlit Quiet Computer Keyboard, Wrist Rest, Multimedia Keys, Anti-ghosting Keys, Waterproof Light Up USB Wired Keyboard for PC Mac Xbox',price=20.30,imageUrl='https://m.media-amazon.com/images/I/715XLKbQnFL._AC_SX679_.jpg',quantity=1) 
    orderitem3 = Orderitem(
        orderId=2, productId=3, title='Digital Camera for Photography VJIANGER 4K 48MP Vlogging Camera for YouTube with WiFi, 16X Digital Zoom, 52mm Wide Angle & Macro Lens, 2 Batteries, 32GB TF Card',price=70,imageUrl='https://m.media-amazon.com/images/I/81xi5JoLNmL._AC_SX679_.jpg',quantity=1) 
    orderitem4 = Orderitem(
        orderId=3, productId=5, title="Under Armour Men's Charged Assert 9 Running Shoe",price=80,imageUrl='https://m.media-amazon.com/images/I/410-L0vF3+L._AC_UY695_.jpg',quantity=1) 
    
    db.session.add(orderitem1)
    db.session.add(orderitem2)
    db.session.add(orderitem3)
    db.session.add(orderitem4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orderitems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orderitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orderitems")
        
    db.session.commit()