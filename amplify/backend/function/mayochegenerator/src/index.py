import logging
import requests
from bs4 import BeautifulSoup
import json
import re
import random
from datetime import date

def findAnimalPhoto(url):
    """
    Function to get image src url from AnimaloftheDay
    """
    try:
        response = requests.get(url, allow_redirects=True)
        response.raise_for_status()
    except requests.exceptions.HTTPError as err:
        return False
    soup = BeautifulSoup(response.text, 'html.parser')
    image_found = []
    for image in soup.find_all('img'):
        if 'of the Day' in str(image.get('title')):
            image_found.append(image.get('src'))
    return image_found

def random_date():
  """
  Returns a random date between 1998 and current year
  """
  today = date.today() 
  year = random.randint(1998, today.year)
  month = random.randint(1, 12)
  if month in [1, 3, 5, 7, 8, 10, 12 ]:
    last = 31
  elif month in  [4, 6, 9, 11]:
    last = 30
  elif month == 2:
    last = 28
  day = random.randint(1, last)

  return date(year=year, day=day, month=month)

def got_a_picture(animal):
  """
  Return if got a picture
  """
  day, month, year = random_date().strftime('%d %B %Y').split(' ')
  url = 'http://' + animal + 'oftheday.com/archive/' +  year + '/' + month + '/' + day + '.html'
  images = findAnimalPhoto(url)
  data = {}
  if images:
    for image in images:
      if re.search("[0-9].jpg$", image):
        data['day'] = day
        data['year'] = year
        data['month'] = month
        data['url'] = url.replace('html', 'jpg')
        return data
            

def handler(event, context):
  """
  Main function
  """
  animal_types = ['cat', 'dog', 'pet']
  result = {}
  for animal in animal_types:
    limit = 30
    i = 1
    while i < limit:
      url =  got_a_picture(animal)
      if url:
        result[animal] = url
        i = limit
      else:
        i = ( i + 1)
  if result:
    return {
      'statusCode': 200,
      'body': result
    }
  else:
    return {
      'statusCode': 500,
      'body': 'Error Failed to get image for animal'
    }