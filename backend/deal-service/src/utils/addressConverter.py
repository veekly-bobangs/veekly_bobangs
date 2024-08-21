import requests
import json
from urllib.parse import quote

def countPostalCodesFromRawAddress(fullAddress):
    postalCodes = []
    for i in range(len(fullAddress)):
        if fullAddress[i] == ')' and i - len("Singapore (123456") >= 0:
            if fullAddress[i - len("Singapore (123456"): i - len("Singapore (123456") + len("Singapore (")] == "Singapore (":
                postalCodes.append(fullAddress[i - len("123456"): i])
    return len(postalCodes)

        

def getLongLatFromRawAddress(fullAddress):
    postalCodes = []

    for i in range(len(fullAddress)):
       if fullAddress[i] == ')' and i - len("Singapore (123456") >= 0:
            if fullAddress[i - len("Singapore (123456"): i - len("Singapore (123456") + len("Singapore (")] == "Singapore (":
                postalCodes.append(fullAddress[i - len("123456"): i])
        
    longLats = []
    for postal in postalCodes:
        longLats.append(getLongLatFromPostal(postal))
    return longLats
                

def getLongLatFromPostal(postal):
    url = f"https://www.onemap.gov.sg/api/common/elastic/search?searchVal={postal}&returnGeom=Y&getAddrDetails=Y&pageNum=1"
    headers = {"Authorization": "**********************"}
    response = requests.request("GET", url, headers=headers)
    # Parse the response text into a dictionary
    try:
        data = json.loads(response.text)
    except json.JSONDecodeError as e:
        print(f"Error: {e}")
        return None

    if data['found'] == 0:
        print("Invalid postal given")
        return None
        
    # Access the latitude and longitude from the dictionary
    latitude = data['results'][0]['LATITUDE']
    longitude = data['results'][0]['LONGITUDE']
    building_name = data['results'][0]['BUILDING']
    print(f"Queried long lat for: {building_name}")

    return longitude, latitude

"""
Assumes input is of google place address: street name, building name
Only searches street name for better accuracy from API
"""
def getLongLatFromAddressString(address):
    url_encoded_address = quote(address.split(",")[0])
    url = f"https://www.onemap.gov.sg/api/common/elastic/search?searchVal={url_encoded_address}&returnGeom=Y&getAddrDetails=Y&pageNum=1"
    headers = {"Authorization": "**********************"}
    response = requests.request("GET", url, headers=headers)
    # Parse the response text into a dictionary
    try:
        data = json.loads(response.text)
    except json.JSONDecodeError as e:
        print(f"Error: {e}")
        return None
    latitude = data['results'][0]['LATITUDE']
    longitude = data['results'][0]['LONGITUDE']
    building_name = data['results'][0]['BUILDING']

    return longitude, latitude, building_name

if __name__ == "__main__":
    pass
