from flask import jsonify, Blueprint, request
from repositories import Restaurant_Repository
from celeryUtils.tasks import search_restaurants_online
from celery.result import AsyncResult

restaurants_routes = Blueprint('restaurants_routes', __name__, template_folder='controllers')

@restaurants_routes.route("/get", methods=["GET"])
def get_restaurants():
    return jsonify(Restaurant_Repository.get_all_restaurants())

"""
Add a restaurant to the database. The given restaurant_name is required and should
already be verified by search_restaurant_from_google, ie restaurant_name key exists
in redis cache.
"""
@restaurants_routes.route("/add", methods=["POST"])
def add_restaurant():
    restaurant_name = request.json.get("restaurant_name")
    if restaurant_name is None:
        return jsonify({"error": "restaurant_name is required"}), 400
    
    return jsonify({"restaurant_id": Restaurant_Repository.add_restaurant(restaurant_name)})

"""
Starts a celery task to scrape restaurant locations for a restaurant name.
"""
@restaurants_routes.route("/search-restaurant-online", methods=["POST"])
def search_restaurant_from_google():
    restaurant_name = request.json.get("restaurant_name")
    if restaurant_name is None:
        return jsonify({"error": "restaurant_name is required"}), 400
    
    # Check restaurant is in db
    if Restaurant_Repository.check_if_restaurant_exists(restaurant_name):
        return jsonify({"error": "Restaurant already exists in database"}), 400

    # Start celery task to search for restaurant
    result = search_restaurants_online.delay(restaurant_name)
    return jsonify({"task_id": result.id})

@restaurants_routes.route("/search-restaurant-online/<task_id>", methods=["GET"])
def check_search_restaurant_from_google(task_id):
    if task_id is None:
        return jsonify({"error": "task_id is required"}), 400
    
    result = AsyncResult(task_id)
    if result.ready():#-Line 5
        # Task has completed
        if result.successful():#-Line 6
            return {
                "ready": result.ready(),
                "successful": result.successful(),
                "value": result.result,#-Line 7
            }
        else:
        # Task completed with an error
            return jsonify({'status': 'ERROR', 'error_message': str(result.result)})
    else:
        # Task is still pending
        return jsonify({'status': 'Running'})
