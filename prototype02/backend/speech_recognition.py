import requests
from google.cloud import storage

def does_blob_exist(filename):
  client= storage.Client()
  bucket = client.get_bucket('learn-thai')
  filename = filename + '.flac'
  blob = bucket.get_blob(filename)
  return blob == None

def upload_blob_to_google_storage(blob_text, word):
  client = storage.Client()
  bucket = client.get_bucket('learn-thai')
  blobname = word + '.flac'
  blob = bucket.blob(blobname)
  blob.upload_from_string(blob_text, 'audio/flac')
  blob.make_public()

def upload_blob_to_google_storage_debug(file_address, word):
  client = storage.Client()
  bucket = client.get_bucket('learn-thai')
  blobname = word + '.flac'
  blob = bucket.blob(blobname)
  file_address = 'Downloads/' + blobname
  blob.upload_from_filename(file_address, 'audio/flac')
  blob.make_public()

# precond: filename is already uploaded to google storage
def speech_to_text(filename):
  assert not does_blob_exist(filename), "invalid audio filename"
  url = 'https://speech.googleapis.com/v1beta1/speech:syncrecognize'
  headers = { 'Content-Type':'application/json', 'Authorization': 'Bearer ' +
  'ya29.El_UAwmr8RhbhZRrVRERBzFzmBlhBvYA43whiDUgHllgnXR1Bb_RGrGQ5l8wuaSUDTMP'+
  'fGjXbiQZA6Gti0ox-YlQ4pHuMTrjjnouArvfRkJpgmzK1oD_8qyBW5--5VC4Lg'}
  data = {
      "audio": {
          "uri":"gs://learn-thai/%s.flac" % (filename)
      },
      "config": {
          "encoding":"FLAC",
          "languageCode":"th-TH",
          "sampleRate":16000
      }
  }
  r = requests.post(url, None, data, headers=headers)
  return r.json()['results'][0]['alternatives'][0]['transcript']

# precond: speech is in blob of type audio/flac contents converted to text form
def validate_speech(blob_text, word):
  upload_blob_to_google_storage_debug(blob_text, word)
  return word

  # text_from_speech = speech_to_text(word)
  # return text_from_speech == word