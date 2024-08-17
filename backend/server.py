from flask import Flask, render_template, redirect, url_for, session
from flask_socketio import SocketIO, emit
import cv2
import numpy as np
from keras.models import model_from_json
import base64

from backend import emotion_detector

app = Flask(__name__)
app.secret_key = "your_secret_key"
socketio = SocketIO(app)

# Load the emotion detection model
with open("emotiondetector.json", "r") as json_file:
    model_json = json_file.read()
model = model_from_json(model_json)
model.load_weights("emotiondetector.h5")

# Load Haar Cascade for face detection
haar_file = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(haar_file)

# Labels for the emotion categories
labels = {0: 'angry', 1: 'disgust', 2: 'fear', 3: 'happy', 4: 'neutral', 5: 'sad', 6: 'surprise'}

def extract_features(image):
    feature = np.array(image)
    feature = feature.reshape(1, 48, 48, 1)
    return feature / 255.0

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on('process_frame')
def process_frame(data):
    # Decode the base64 image from the webcam
    img_data = base64.b64decode(data.split(",")[1])
    np_arr = np.fromstring(img_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # Convert to grayscale and detect face
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    emotion_detected = "neutral"  # Default to neutral
    for (p, q, r, s) in faces:
        face = gray[q:q + s, p:p + r]
        cv2.rectangle(img, (p, q), (p + r, q + s), (255, 0, 0), 2)  # Blue rectangle
        face = cv2.resize(face, (48, 48))
        face = extract_features(face)
        predictions = model.predict(face)
        
        # Debugging: print predictions
        print("Predictions:", predictions)
        
        prediction_index = predictions.argmax()
        prediction_label = labels[prediction_index]
        
        # Check if the highest prediction is "neutral" but "surprise" is also highly predicted
        if prediction_label == "neutral" and predictions[0][6] > 0.5:  # Assuming 0.5 threshold
            prediction_label = "surprise"

        emotion_detected = prediction_label

        if emotion_detected:
            break

    # Store the detected emotion in the session
    session['emotion_detected'] = emotion_detected
    _, img_encoded = cv2.imencode('.png', img)
    img_data = base64.b64encode(img_encoded).decode('utf-8')

    emit('frame_processed', {'image_data': img_data, 'emotion': emotion_detected})

@app.route("/redirect", methods=["POST"])
def redirect_page():
    emotion = session.get('emotion_detected')
    if emotion == 'happy':
        return redirect(url_for('happy_page'))
    elif emotion == 'sad':
        return redirect(url_for('sad_page'))
    else:
        return redirect(url_for('neutral_page'))

@app.route("/happy")
def happy_page():
    return "You are Happy!"

@app.route("/sad")
def sad_page():
    return "You are Sad!"

@app.route("/neutral")
def neutral_page():
    return "You are Neutral!"

if __name__ == "__main__":
    socketio.run(app, debug=True)
