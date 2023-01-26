from app.models import db, Product, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_products():
    product1 = Product(
        creatorId=1, title='Monitor', category='computer',price=200,discount=0.9,inventory=20,style='moden',brand='Dell',color='black',dimension='19Lx18Wx20H',about='nice monitor',description='come and buy',imageUrl='https://m.media-amazon.com/images/I/61OI-wQse5L._AC_SX679_.jpg')
    product2 = Product(
        creatorId=2, title='Keyborad', category='computer',price=50,discount=0.7,inventory=15,style='moden',brand='HP',color='grey',dimension='5Lx5Wx5H',about='nice keyboard',description='try typing',imageUrl='https://m.media-amazon.com/images/I/715XLKbQnFL._AC_SX679_.jpg')
    product3 = Product(
        creatorId=3, title='Camera', category='electric',price=70,discount=0.8,inventory=40,style='moden',brand='Dell',color='black',dimension='19Lx18Wx20H',about='nice camera',description='have a look',imageUrl='https://m.media-amazon.com/images/I/81xi5JoLNmL._AC_SX679_.jpg')

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")
        
    db.session.commit()