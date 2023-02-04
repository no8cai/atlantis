from app.models import db, Orderdetail, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_orderdetails():
    orderdetail1 = Orderdetail(userId=1, totalprice=100)
    orderdetail2 = Orderdetail(userId=1, totalprice=200)
    orderdetail3 = Orderdetail(userId=2, totalprice=300)
    
    db.session.add(orderdetail1)
    db.session.add(orderdetail2)
    db.session.add(orderdetail3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orderdetails():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orderdetails RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orderdetails")
        
    db.session.commit()