import streamlit as st
from streamlit_webrtc import webrtc_streamer, VideoProcessorBase
import av
import cv2
import numpy as np
from keras.models import model_from_json

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

class EmotionProcessor(VideoProcessorBase):
    def recv(self, frame):
        frm = frame.to_ndarray(format="bgr24")
        gray = cv2.cvtColor(frm, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (p, q, r, s) in faces:
            face = gray[q:q + s, p:p + r]
            cv2.rectangle(frm, (p, q), (p + r, q + s), (255, 0, 0), 2)
            face = cv2.resize(face, (48, 48))
            face = extract_features(face)
            pred = model.predict(face)
            prediction_label = labels[pred.argmax()]

            # Set color based on emotion
            if prediction_label == 'neutral':
                text_color = (0, 255, 0)  # Green
            elif prediction_label == 'sad':
                text_color = (0, 0, 255)  # Red
            elif prediction_label == 'happy':
                text_color = (255, 255, 0)  # Yellow
            elif prediction_label == 'surprise':
                text_color = (0, 255, 255)  # Cyan
            else:
                text_color = (0, 0, 255)  # Default to Red

            cv2.putText(frm, prediction_label, (p - 10, q - 10), cv2.FONT_HERSHEY_COMPLEX_SMALL, 2, text_color)

        return av.VideoFrame.from_ndarray(frm, format="bgr24")

st.title("Real-time Emotion Detection")
webrtc_streamer(key="emotion-detection", video_processor_factory=EmotionProcessor)
btn = st.button("Recommed Movies")