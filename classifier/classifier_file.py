import sys
import os
from keras.models import load_model
import tensorflow_text as text  # Import to register BERT ops

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  
# Suppress all logs (warnings, info, debug)
# Suppress TensorFlow/Keras logs


import tensorflow as tf
tf.get_logger().setLevel('ERROR')
# Suppress Keras progress bar during prediction (verbose=0)
# This suppresses TensorFlow log messages

def load_trained_model():
    base_dir = os.path.dirname(__file__)
    model_path = os.path.join(base_dir, 'my_email_spam_classifier')
    model = load_model(model_path)
    return model

def main():
    mail_content = sys.argv[1].strip()
    model = load_trained_model()
    
    predicted_mail = model.predict([mail_content], verbose=0)[0][0]
    
    if predicted_mail >= 0.5:
        predicted_mail = "SPAM"
    else:
        predicted_mail = "NOT SPAM"
    
    sys.stdout.write(predicted_mail)

if __name__ == "__main__":
    main()
