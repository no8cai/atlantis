from app.models import db, Review, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        userId=1, productId=1, stars=2,comments='very nice product')
    review2 = Review(
        userId=1, productId=2, stars=3,comments='very very nice product')
    review3 = Review(
        userId=1, productId=3, stars=4,comments='very very very nice product')       

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")
        
    db.session.commit()