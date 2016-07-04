# -*- encoding: utf-8 -*-
"""
Python Aplication Template
Licence: GPLv3
"""

from flask import render_template,request
from app import app, models
from PIL import Image

@app.route('/')
@app.route('/index/')
def index():
    return render_template('index.html')

@app.route('/api/v0/recognize',methods = ['POST'])
def recognition():

    requestes_pic = request.data
    responce_pic = models.Recognition(requestes_pic).recognize()

    return responce_pic, 200