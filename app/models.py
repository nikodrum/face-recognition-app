# -*- encoding: utf-8 -*-
"""
Python Aplication Template
Licence: GPLv3
"""

from PIL import Image
import io
from subprocess import Popen, PIPE, STDOUT
import os
os.chdir('app/darknet/')

class Recognition():

    def __init__(self,pic_data):
        
        image = Image.open(io.BytesIO(pic_data))
        image.save('data/temp.png')

    def start_recognition(self):

        p = Popen("darknet yolo test cfg/yolo-tiny.cfg weights/yolo-tiny.weights data/temp.png",
                         stdout = PIPE, stderr = STDOUT, shell = True)
        while True:
            line = p.stdout.readline()
            print (line)
            if not line: break

    def recognize(self):
        
        self.start_recognition()
        with open("predictions.png", "rb") as imageFile:
            f = imageFile.read()
        return f