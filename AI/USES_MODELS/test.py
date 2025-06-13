import os
import tensorflow as tf
import numpy as np
from PIL import Image
import json

# Silence TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# === PATH CONFIGURATION ===
MODEL_PATH = "model/plant_disease_detection/plant_disease.keras"
CLASS_NAMES_PATH = "model/plant_disease_detection/predicted_diseases.json"
IMAGE_PATH = "data/plant_diseases/valid/Apple___Apple_scab/f8ef99d9-9d01-4aeb-9248-e8c312c9a981___FREC_Scab 3129_270deg.JPG"

# === LOAD MODEL ===
model = tf.keras.models.load_model(MODEL_PATH)

# === LOAD CLASS NAMES ===
with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)

# === PREPROCESS IMAGE ===
def preprocess_image(image_path, target_size=(128, 128)):
    img = Image.open(image_path).convert("RGB").resize(target_size)
    img_array = np.array(img).astype(np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # batch dimension
    return img_array

img_array = preprocess_image(IMAGE_PATH)

# === PREDICT ===
pred = model.predict(img_array)

predicted_class_index = int(np.argmax(pred))
confidence = float(np.max(pred))
predicted_class_name = class_names[predicted_class_index]

# === PRINT RESULTS ===
print(f"\n🧠 Predicted Class Index: {predicted_class_index}")
print(f"✅ Predicted Class Name: {predicted_class_name}")
print(f"📈 Confidence: {confidence:.2%}")

# === BONUS: TOP 3 Predictions ===
top3 = pred[0].argsort()[-3:][::-1]
print("\n🏆 Top 3 Predictions:")
for i in top3:
    print(f"🔹 {class_names[i]}: {pred[0][i]:.3f}")
