import boto3
import os
import json
from botocore.vendored import requests
from requests_aws4auth import AWS4Auth

region = os.environ["REGION"]
service = "es"
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

host = "https://" + os.environ["ESENDPOINT"] # the Amazon ElaticSearch domain, with https://
index = "lambda-index"
type = "lambda-type"

url = host + "/" + index + "/" + type + "/"

headers = { "Content-Type": "application/json" }

# UpdateSearchCluster - Updates Elasticsearch as new items are added to DynamoDB
def handler(event, context):
    count = 0
    for record in event["Records"]:
        # Generate a UUID from the item primary key for use as the Elasticsearch ID
        id = generateUUID(record)

        if record['eventName'] == 'REMOVE':
            r = requests.delete(url + id, auth=awsauth)
        else:
            document = record['dynamodb']['NewImage']
            r = requests.put(url + id, auth=awsauth, json=document, headers=headers)
        count += 1

    return str(count) + " records processed."

def generateUUID(record):
    keys = record['dynamodb']['Keys']
    
    # If range key exists, concatenate hash and range key with -
    id = ""
    i = 0
    for key, value in keys.items():
        if (i > 0):
            id += "-"
        valueAttr = list(value.values());
        id += valueAttr[0]
        i += 1
    
    print(id)
    return id
