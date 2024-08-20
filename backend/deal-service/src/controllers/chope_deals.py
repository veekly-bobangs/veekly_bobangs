from flask import jsonify, Blueprint
from redisConfig import redisClient, SCRAPE_RES, SCRAPE_RES_TIME
import json

chope_deals_routes = Blueprint('chope_deals_routes', __name__, template_folder='controllers')

@chope_deals_routes.route("/get", methods=["GET"])
def get_articles():
    scrape_res = redisClient.get(SCRAPE_RES)
    if scrape_res is None:
        return jsonify({"status": "pending"})
    
    return jsonify(json.loads(scrape_res))

@chope_deals_routes.route("/get-time", methods=["GET"])
def get_time():
    scrape_res_time = redisClient.get(SCRAPE_RES_TIME)
    if scrape_res_time is None:
        return jsonify({"status": "pending"})
    
    return jsonify({"time": scrape_res_time.decode("utf-8")})
