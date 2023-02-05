# Atlantis
## an Amazon Clone
## by Eric Chai

>“Buy it Sell it Love it.”

## Link to live site:
https://atlantis-tcam.onrender.com/

## Description:
The clone of the Amazon site has create, read, update, and delete features for products and cart. Users can create products to sell and main while adding items to the cart. There is also a sellcentral feature for users to see and interact with their products. Users can log in to access all these features. In the wiki is the API documentation of the backend routes that we created.

## The technologies invoved

#### General coding:
* Python JavaScript

#### Backend:
* Flask
* SQLAlchemy

#### Frontend:
* React
* Redux
* HTML
* CSS

#### Database:
* Sqlite3(Development)
* PostgreSQL(Production)

#### Website provider:
* Render

## Usage description of features.

## Home Page:
Here a user can see random products to explore, and information about the user.
![](https://github.com/no8cai/atlantis/blob/main/images/homepage.png)


## Single Project page:
This page shows information on a single product and shows different details based on what the user is authorized to see or do.
![](https://github.com/no8cai/atlantis/blob/main/images/singlepage.png)


## Cart item Page:
Here a user can adding item to the cart.
![](https://github.com/no8cai/atlantis/blob/main/images/cartpage.png)

## Create Product Page:
This form is where a user can create a product or edit their product. 
![](https://github.com/no8cai/atlantis/blob/main/images/createform.png)

## Seller centeral Page:
This is where a user can see all the products they created.
![](https://github.com/no8cai/atlantis/blob/main/images/seller.png)



## Roadmap

### Completed Fetures
- [x] The User Authentication
- [x] Product view, create, edit, and delete
- [x] Shopping cart view, create, edit and delete

### Future features
- [ ] Reviews for items
- [ ] Making Orders
- [ ] Filter
- [ ] Search

## Getting Started
This is an instructions on setting up the project locally. To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repor
```
git clone https://github.com/no8cai/atlantis.git
```

2. Populate the .env file based in the root directory on the example below:
```
SECRET_KEY=<<<Your generated key>>>
DATABASE_URL=sqlite:///dev.db
SCHEMA=«custom_schema_name_here»
```
Please make your own schema name, then make new .flaskenv

```
FLASK_APP=app
FLASK_ENV=development
```
Then populate the .env in /react-app to connect frontend and backend

```
REACT_APP_BASE_URL=http://localhost:5000
```


3. Install Pipenv packages on /root directory and install npm packages on /react-app
```
pipenv install
```
```
npm install
```
4. Migrate and Seed the data for Sqlite3
```
pipenv run flask migrate
pipenv run flask upgrade
pipenv run flask seed all
```

5. Run the flask in root for backend and run npm for frontend server in /react-app

```
pipenv run flask run
```

```
npm start
```

## Contact:

### Eric Chai

#### Linkedin
https://www.linkedin.com/in/eric-chai-b5b9b337/

#### Github
https://github.com/no8cai

