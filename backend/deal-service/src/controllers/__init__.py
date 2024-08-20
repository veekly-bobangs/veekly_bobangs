from flask import jsonify, Blueprint
from .chope_deals import *

base_routes = Blueprint('base_routes', __name__, template_folder='controllers')

@base_routes.route("/hello", methods=["GET"])
def say_hello():
    return jsonify({"msg": "Hello from Flask"})

@base_routes.route('/flask-health-check', methods=["GET"])
def flask_health_check():
	return "success", 200
