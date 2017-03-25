import requests
from google.cloud import storage
# from oauth2client.client import GoogleCredentials
# from googleapiclient.discovery import build

# def authGoogleAPI():
#   http = decorator.http()
#   scopes = ['https://www.googleapis.com/auth/sqlservice.admin']
#   credentials = ServiceAccountCredentials.from_json_keyfile_name('./key.json', http=http_auth)
#   service = build('speech', 'v1', credentials=credentials)
#   PROJECT = 'learnthai'
#   ZONE = 'us-central1-a'
#   request = service.instances().list(project=PROJECT, zone=ZONE)
#   response = request.execute()

#   print(response)

#   credentials = GoogleCredentials.get_application_default()
#   service = build('compute', 'v1', credentials=credentials)

#   PROJECT = 'bamboo-machine-422'
#   ZONE = 'us-central1-a'
#   request = service.instances().list(project=PROJECT, zone=ZONE)
#   response = request.execute()

#   print(response)

def does_blob_exist(filename):
  client= storage.Client()
  bucket = client.get_bucket('learn-thai')
  filename = filename + '.flac'
  blob = bucket.get_blob(filename)
  return blob is not None

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
# def speech_to_text(filename):
#   assert does_blob_exist(filename), "invalid audio filename"
#   url = 'https://speech.googleapis.com/v1beta1/speech:syncrecognize'
#   headers = { 'Content-Type':'application/json', 'Authorization': 'Bearer ' +
#   'ya29.El_uA9QpLiOC1MwnsNaoPieMhbdSH6QeXIxLq03g0egqpxEhXmoq8AcZaKopCgjBUGRJGYE4vEp_vzvfvQ-beBLYF5Dq6ri1atQBhpzD5-eyoTxM_zScGiCjRjhVTYHNvg'}
#   data = {
#       "audio": {
#           "uri":"gs://learn-thai/%s.flac" % (filename)
#       },
#       "config": {
#           "encoding":"FLAC",
#           "languageCode":"th-TH",
#           "sampleRate":16000
#       }
#   }
#   r = requests.post(url, None, data, headers=headers)
#   return r.json()['results'][0]['alternatives'][0]['transcript']

def speech_to_text(filename):
  assert does_blob_exist(filename), "invalid audio filename"
  url = 'https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=AIzaSyCAiT9KQcADNPk5h5zmcVh6QN1Y1k8z4p4'
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
  r = requests.post(url, None, data)
  return r.json()['results'][0]['alternatives'][0]['transcript']

# precond: speech is in blob of type audio/flac contents converted to text form
def validate_speech(blob_text, word):
  upload_blob_to_google_storage_debug(blob_text, word)
  return word

  # text_from_speech = speech_to_text(word)
  # return text_from_speech == word