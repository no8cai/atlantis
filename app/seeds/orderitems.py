from app.models import db, Orderitem, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_orderitems():
    orderitem1 = Orderitem(
        orderId=1, productId=1, title='sample goods1',price=50,imageUrl='http://image1.gpg',quantity=2)    
    orderitem2 = Orderitem(
        orderId=1, productId=2, title='sample goods2',price=60,imageUrl='http://image1.gpg',quantity=1) 
    orderitem3 = Orderitem(
        orderId=2, productId=3, title='sample goods3',price=70,imageUrl='http://image1.gpg',quantity=1) 
    orderitem4 = Orderitem(
        orderId=3, productId=5, title='sample goods3',price=80,imageUrl='http://image1.gpg',quantity=1) 
    
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