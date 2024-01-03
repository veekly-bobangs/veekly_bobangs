from flask import Flask, jsonify
from web_scraping.scrape import get_webscrape_data

app = Flask(__name__)

CACHED_DATA = get_webscrape_data()

@app.route('/get', methods = ['GET'])
def get_articles():
    return jsonify(CACHED_DATA)

@app.route("/hello", methods=["GET"])
def say_hello():
    return jsonify({"msg": "Hello from Flask"})

@app.route('/flask-health-check', methods=["GET"])
def flask_health_check():
	return "success", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)