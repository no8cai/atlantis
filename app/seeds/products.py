from app.models import db, Product, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_products():
    product1 = Product(
        creatorId=1,title='"Acer 27.0" 1920 x 1080 VA Zero-Frame Office Home Computer Monitor - AMD FreeSync - 75Hz Refresh - 1ms VRB - Low Blue Light Filter - Tilt and VESA Compatible - HDMI Port 1.4 & VGA Port KB272HL Hbi', category='Computers',price=159,discount=0.75,inventory=6,style='Modern',brand='Acer',color='black',dimension='9.8 x 24.2 x 17.4 inches',about='"27" full hd (1920 x 1080) widescreen va monitor with amd radeon freesync technology,Response time: 1ms vrb,Zero frame design,Refresh rate: 75hz,Ports: 1 x hdmi port & 1 x vga (vga cable included),Display technology: LED',description="Delve into the world of awesome with Acer's KB272HL Full HD monitor, which offers an unmatched viewing experience. A large 27” screen delivers astonishing, 1920 x 1080 Full HD resolution with excellent detail! Through AMD Radeon technology, the game’s frame rate is determined by your graphics card, not the fixed refresh rate of the monitor, giving you a serious competitive edge.",imageUrl='https://m.media-amazon.com/images/I/81fXRzLabWL._AC_SX679_.jpg')
    product2 = Product(
        creatorId=2, title='Dacoity Gaming Keyboard, 104 Keys All-Metal Panel, Rainbow LED Backlit Quiet Computer Keyboard, Wrist Rest, Multimedia Keys, Anti-ghosting Keys, Waterproof Light Up USB Wired Keyboard for PC Mac Xbox', category='Computers',price=29,discount=0.7,inventory=4,style='Modern',brand='Dacoity',color='grey',dimension='17.68 x 7.87 x 1.77 inches',about='This silent keyboard features a scientific stepped keycap design to maximize hand comfort for long hours of gaming or work. It also provides you with an ergonomic typing angle (7°) and wrist support during use. All keys have a soft feel and no loud clicks. It will not affect others when staying up late typing or playing games, it is very suitable for office or games.',description='Removable keycaps for quick cleaning without worrying about dust or dirt. Two-tone injection-molded keycaps provide crystal-clear uniform backlighting, and letters never fade.',imageUrl='https://m.media-amazon.com/images/I/715XLKbQnFL._AC_SX679_.jpg')
    product3 = Product(
        creatorId=3, title='Digital Camera for Photography VJIANGER 4K 48MP Vlogging Camera for YouTube with WiFi, 16X Digital Zoom, 52mm Wide Angle & Macro Lens, 2 Batteries, 32GB TF Card', category='Electronics',price=119,discount=0.95,inventory=20,style='Modern',brand='VJIANGER',color='black',dimension='7 x 3 x 5 inches',about='The 4k small digital camera with 30fps video resolution and 48 megapixel, provides a smooth shooting experience than 2.7K or 1080P video cameras, which can capture every excellent moment while vlog recording, the best camera for youtube. Equipped with wide angle & macro lenses and supports 16X Digital Zoom to get closer focus from far away and take close-up with clear details photos or recorder a wider range of scenery.',description="If you want a camera that can take good point-and-shoot images, and that comes at a value where if it's lost you won't have to deal with the same level of pain as losing a phone , this camera could very well be for you.This digital camera come with a new 48 Megapixel sensor make it have larger sensors than camera phones.Even cameras that use a comparatively smaller sensor have a good deal more surface area to work with than a smartphone sensor. This makes them not only can bring up great stills quality pictures ,but also much better for shooting in low light, as they can capture greater dynamic range of more detail in highlight and shadows.",imageUrl='https://m.media-amazon.com/images/I/81xi5JoLNmL._AC_SX679_.jpg')

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