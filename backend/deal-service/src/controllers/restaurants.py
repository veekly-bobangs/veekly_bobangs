from flask import jsonify, Blueprint, request
from repositories import Restaurant_Repository
from web_scraping.scrape_google_place import scrape_google_place_info
from redisConfig import redisRestaurantScrapeClient
import json

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
Search for a restaurant online using google places. The given restaurant_name is required.
Caches the result in redis, when frontend requests to add the restaurant with same
restaurant_name, it will be checked in redis cache.
"""
@restaurants_routes.route("/search-restaurant-online", methods=["POST"])
def search_restaurant_from_google():
    restaurant_name = request.json.get("restaurant_name")
    if restaurant_name is None:
        return jsonify({"error": "restaurant_name is required"}), 400
    
    # Check restaurant is in db
    if Restaurant_Repository.check_if_restaurant_exists(restaurant_name):
        return jsonify({"error": "Restaurant already exists in database"}), 400

    scraped_data = scrape_google_place_info(restaurant_name + " Singapore")
    if scraped_data is None:
        return jsonify({"error": "Failed to scrape restaurant data"}), 500
    
    redisRestaurantScrapeClient.set(restaurant_name, json.dumps(scraped_data))

    # Scrape google place
    return jsonify(scraped_data)