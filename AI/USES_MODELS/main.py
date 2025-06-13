from flask import Flask, request, jsonify
import json
import pandas as pd
from rapidfuzz import process
import calendar as cd
import joblib

app = Flask(__name__)

@app.route("/api/v2/predict_price", methods=["POST"])
def predict_price():
    data = request.get_json()
    print(data)

    # Use .get() to avoid KeyError
    commodity = data.get("Commodity")
    date = data.get("Date")
    unit = data.get("Unit")

    # Check for missing fields
    if not commodity or not date or not unit:
        return jsonify({
            "status": 400,
            "message": "Incomplete Data! Required: Commodity, Date, Unit"
        }), 400  # <- sets HTTP status code to 400 (bad request)
        
    #compare and make proper commodity
    with open("model/price_estimate/structure.json", "r") as f:
        json_data = json.load(f)

    choices = json_data["Commodity"]
    commodity = process.extractOne(commodity, choices=choices)[0]
    date= pd.to_datetime(date)
    year = date.year
    month = date.strftime("%B")
    
    all_cols = json_data["format"]
    
    user_data = {
        "Year":year,
        f"{month}" :1,
        f"{commodity}":1
    }
    
    final_data = {}
    
    all_keys = all_cols

    for key in all_keys:
        if key not in user_data:
            final_data[key] =0
        else:
            final_data[key] = user_data[key]
    
    final_data = pd.DataFrame([final_data])        
    print(final_data)
    
    model = joblib.load("model/price_estimate/predict_price.pkl")
    
    predicted = model.predict(final_data)

    # Proceed if everything is valid
    return jsonify({
        "status": 200,
        "message": "Data looks good!",
        "data": {
            "Commodity": commodity,
            "Date": month,
            "Year":year,
            "Unit": unit,
            "Predicted": predicted[0]
        }
    })



if __name__ == '__main__':
    app.run(debug=True)