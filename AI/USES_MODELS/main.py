from flask import Flask, request, jsonify
import tensorflow as tf
import json
import pandas as pd
from rapidfuzz import process
import calendar as cd
import joblib
import numpy as np
from PIL import Image

#predict disease
disease_model = tf.keras.models.load_model( "model/plant_disease_detection/plant_disease.keras")
#classnames
with open("model/plant_disease_detection/predicted_diseases.json", "r") as f:
        class_names = json.load(f)

#predict price
#compare and make proper commodity
price_model = joblib.load("model/price_estimate/predict_price.pkl")

with open("model/price_estimate/structure.json", "r") as f:
    json_data = json.load(f)

app = Flask(__name__)

@app.route("/api/v2/predict_price", methods=["POST"])
def predict_price():
    try:
        data = request.get_json()

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
    
        predicted = price_model.predict(final_data)

        # Proceed if everything is valid
        return jsonify({
        "status": 200,
        "message": "Data looks good!",
        "data": {
            "Commodity": commodity,
            "Month": month,
            "Year":year,
            "Unit": unit,
            "Predicted": predicted[0]
        }
        })
    except Exception as error:
        return jsonify({"message":f"model error : {str(error)}"}),500


@app.route("/api/v2/detect_disease", methods=["POST"])
def detect_disease():
    if 'image' not in request.files:
        return jsonify({"error":"No image detected in the request"}), 400
    
    file =  request.files["image"]
    if file.filename == '':
        return jsonify({"error":"No image detected in the request"}), 400
    
    try:
        img= Image.open(file.stream).convert("RGB").resize((128,128))
        img_array = np.array(img).astype(np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
                
        prediction = disease_model.predict(img_array)
        
        
        
        top3 = prediction[0].argsort()[-3:][::-1]
        predictions_class = [class_names[i] for i  in top3]
        
        return jsonify({
            "Predictions" : predictions_class,
            "message":"This is an AI model. It cannot always give 100/100 result!"
        }), 200
    except Exception as error:
        return jsonify({"message":f"model error : {str(error)}"}),500
        


if __name__ == '__main__':
    app.run(debug=True)