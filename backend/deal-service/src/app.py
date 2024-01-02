from flask import Flask, jsonify
from web_scraping.scrape import get_webscrape_data

CACHED_DATA = get_webscrape_data()
app = Flask(__name__)

@app.route('/get', methods = ['GET'])
def get_articles():
    return jsonify(CACHED_DATA)

@app.route("/hello", methods=["GET"])
def say_hello():
    return jsonify({"msg": "Hello from Flask"})


if __name__ == "__main__":
    # Please do not set debug=True in production
    app.run(host="0.0.0.0", port=8000, debug=True)