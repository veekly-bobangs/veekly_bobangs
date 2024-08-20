from models import db
from models.restaurant import Restaurant_Model

class Restaurant_Repository:
    @staticmethod
    def get_all_restaurants():
        res = db.session.query(Restaurant_Model).all()
        return [dict(r.as_dict()) for r in res]
