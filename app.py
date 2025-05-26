from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import re
import base64
from io import BytesIO

def preprocess_image(image_data):
    # Giải mã base64
    image_data = re.sub('^data:image/.+;base64,', '', image_data)
    img = Image.open(BytesIO(base64.b64decode(image_data))).convert('L')
    img = img.resize((28, 28))
    img = np.array(img)
    # img = 255 - img  # Đảo màu (nền trắng, chữ đen)
    img = img / 255.0
    img = img.reshape(1, 28, 28, 1)
    return img

app = Flask(__name__)
model = load_model('model/mnist_cnn.keras')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    image_data = data['image']
    img = preprocess_image(image_data)
    prediction = model.predict(img)
    predicted_digit = int(np.argmax(prediction))
    return jsonify({'prediction': predicted_digit})

if __name__ == '__main__':
    app.run(debug=True)