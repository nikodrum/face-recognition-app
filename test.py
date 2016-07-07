# -*- coding: utf-8 -*-
"""
Created on Thu Jun 30 10:21:48 2016

@author: Niko
"""

import os
os.chdir('c:/users/prost/projects/flask-app-template-master/app/darknet/')

with open("/users/niko_yakovlev/Documents/projects/darknet/data/dog.jpg", "rb") as imageFile:
  file = imageFile.read()
with open("/users/niko_yakovlev/temp.txt",'wb') as f:
    f.write(file)

import requests

r = requests.post('http://localhost:5000/api/v0/recognize',data = f)
image = Image.open(io.BytesIO(r.content))
image.show()
