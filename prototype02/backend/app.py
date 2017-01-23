from flask import Flask, abort, render_template
from speech_recognition import *
app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/ja/")
def hello_ja():
  return "Hello World ja!"

@app.route('/q/<string:filename>')
def q_filename(filename):
  assert not does_blob_exist(filename), "invalid audio filename"
  return speech_to_text(filename)

@app.route('/validate_speech/<string:word>/blob_text/<string:blob_text>',
  methods=["PUT"])
def validate(blob_text, word):
  return validate_speech(blob_text, word)

if __name__ == "__main__":
  app.run(debug=True, threaded=True)