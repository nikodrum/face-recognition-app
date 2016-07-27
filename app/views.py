# -*- encoding: utf-8 -*-
"""
Python Aplication Template
Licence: GPLv3
"""

from flask import render_template,request
from app import app, models
from PIL import Image

@app.route('/')
@app.route('/index')
def index():
	return	render_template('index.html')

@app.route('/api/v0/recognize',methods = ['POST'])
def recognition():

    requested_pic = request.files['myImage']

    print (type(requested_pic))
    
    if type(requested_pic) == bytes:
        responce_pic = models.Recognition(requested_pic).recognize()
    else:
        responce_pic = str(type(requested_pic))
    return { 'img_data' : responce_pic }, 200