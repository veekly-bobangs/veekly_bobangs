from flask import jsonify, Blueprint
from repositories import Restaurant_Repository

restaurants_routes = Blueprint('restaurants_routes', __name__, template_folder='controllers')

@restaurants_routes.route("/get", methods=["GET"])
def get_restaurants():
    return jsonify(Restaurant_Repository.get_all_restaurants())
