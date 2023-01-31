from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    eric = User(
        username='Eric', email='eric@aa.io', password='password1',city='Katy',state='Texas',zipcode='77450')
    ericwife = User(
        username='Ericwife', email='ericwife@aa.io', password='password2',city='Katy',state='Texas',zipcode='77450')
    demo = User(
        username='demoUser', email='demo@aa.io', password='password3',city='Los Angeles',state='California',zipcode='90011')
    seller1 = User(
        username='sellerUser1', email='seller1@aa.io', password='password4',city='New York City',state='New York',zipcode='90012')
    seller2 = User(
        username='sellerUser2', email='seller2@aa.io', password='password5',city='New York City',state='New York',zipcode='90013')

    db.session.add(eric)
    db.session.add(ericwife)
    db.session.add(demo)
    db.session.add(seller1)
    db.session.add(seller2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()