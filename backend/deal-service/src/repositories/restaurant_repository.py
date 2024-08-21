from models import db
from models.restaurant import Restaurant_Model

class Restaurant_Repository:
    @staticmethod
    def get_all_restaurants():
        res = db.session.query(Restaurant_Model).all()
        return [dict(r.as_dict()) for r in res]

    @staticmethod
    def add_restaurant(restaurant_name):
        restaurant = Restaurant_Model(restaurant_name=restaurant_name)
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.restaurant_id
    
    @staticmethod
    def check_if_restaurant_exists(restaurant_name):
        return db.session.query(Restaurant_Model).filter(Restaurant_Model.restaurant_name.ilike(restaurant_name + "%")).first() is not None