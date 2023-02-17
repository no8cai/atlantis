from app.models import db, Review, environment, SCHEMA
import random

goodreview=[
    "very nice product",
    "I like it",
    "I recently tried this and I highly recommend it!",
    "I absolutely love this!  I couldn't put it down!",
    "I recently purchased this product and was pleasantly surprised by how well it works. It's easy to use and has made a noticeable difference in my daily routine.",
    "I highly recommend this! It's a must-see!",
    "I recently purchased this and I'm in love with it!",
    "This product is really an Eye catcher",
    "I think this is the best product on the market",
    "I just can not put it down",
    "The product is really a good deal",
]

badreview=[
    "I hate this product",
    "This product is not as good as I thought",
    "Poor quality product",
    "I return it right away",
    "The product has a lot of room to improve",
    "I don't like this product at all",
    "My family hate this product",
    "I will not suggest this product to anyone",
    "This is the worst product I have ever seen",
    "I would rather save the money",
    "This product is really bad, I mean it"
]



# Adds a demo user, you can add other users here if you want
def seed_reviews():
          
    review=""
    for product in range(1,25):
        for user in range(1,6):
            starsnum=random.randint(1,5)
            if starsnum>2:
                review=goodreview[random.randint(0,len(goodreview)-1)]
            else:
                review=badreview[random.randint(0,len(badreview)-1)]
            
            db.session.add(Review(userId=user,productId=product,stars=starsnum,comments=review))



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