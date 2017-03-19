import requests

#from requests.packages.urllib3.exceptions import InsecureRequestWarning
#requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

sampleJSON = {
  "dialogAction": {
    "slots": {
      "FirstName": "Rick",
      "Location": "Morty",
      "Phone": "906-440-9412",
      "Emergency": "Stroke"
    },
    "type": "Stroke"
  },
  "sessionAttributes": {}
}

r = requests.post('https://ec2-54-242-20-44.compute-1.amazonaws.com:3333/api/create-call', json=sampleJSON, verify=False)

print r.json()

print "Request sent..."
