import os
from flask import Flask, request, jsonify

# 1. Initialize the Flask application
app = Flask(__name__)

# --- POST API for Sensor Data ---
@app.route("/sensor", methods=["POST"])
def receive_sensor_data():
    """Handles incoming POST requests with sensor data."""
    
    # Check if the request content type is application/json
    if not request.is_json:
        app.logger.error("ERROR: Request did not contain JSON data.")
        return jsonify({
            "status": "Error", 
            "message": "Content-Type must be application/json"
        }), 415 # 415 Unsupported Media Type

    data = request.get_json()

    # 2. Basic validation check for essential data
    if not data or 'deviceId' not in data or 'value' not in data:
        app.logger.error(f"ERROR: Invalid payload received. Body: {data}")
        return jsonify({
            "status": "Error",
            "message": "Invalid payload. 'deviceId' and 'value' are required.",
        }), 400 # 400 Bad Request

    # 3. Successful Data Handling & Logging
    # Note: In a real app, you would process or save the data here (e.g., to a database)
    
    device_id = data.get('deviceId')
    sensor_value = data.get('value')
    
    app.logger.info(f"DATA RECEIVED: Device ID: {device_id}, Value: {sensor_value}")

    # 4. Send successful response (HTTP 200 OK)
    return jsonify({
        "status": "OK",
        "message": "Data received and processed successfully",
        "received": data,
    }), 200


# --- Test API / Health Check ---
@app.route("/", methods=["GET"])
def health_check():
    """Provides a simple health check for the server."""
    return "4G Module Sensor Server Running and Operational! 🟢", 200

# --- Start the Server ---
if __name__ == "__main__":
    # Get port from environment variables (e.g., set by Render) or default to 5000
    PORT = int(os.environ.get("PORT", 5000))
    app.logger.info(f"Server starting on port {PORT}...")
    
    # run(host='0.0.0.0') makes the server publicly accessible (necessary for cloud platforms)
    app.run(host='0.0.0.0', port=PORT)
