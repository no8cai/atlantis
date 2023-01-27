from app.models import db, Cartitem, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_cartitems():
    cartitem1 = Cartitem(
        userId= 1,productId=2,quantity=2)
    cartitem2 = Cartitem(
        userId= 1,productId=3,quantity=3)
    cartitem3 = Cartitem(
        userId= 2,productId=3,quantity=2)
    cartitem4 = Cartitem(
        userId= 2,productId=1,quantity=4)
    cartitem5 = Cartitem(
        userId= 3,productId=2,quantity=1)
    cartitem6 = Cartitem(
        userId= 3,productId=1,quantity=1)
   

    db.session.add(cartitem1)
    db.session.add(cartitem2)
    db.session.add(cartitem3)
    db.session.add(cartitem4)
    db.session.add(cartitem5)
    db.session.add(cartitem6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cartitems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cartitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cartitems")
        
    db.session.commit()