import sys
import os
from PIL import Image
import random

def Main():
    args = sys.argv
    cwd = os.getcwd()

    out_path = os.path.join(cwd,"splited")

    img = Image.open(os.path.join(cwd,args[1]))
    dn = int(img.size[0] / 10)

    os.makedirs(out_path,exist_ok=True)

    for num,slice_img in enumerate(SplitImage(img,dn),1):
        if num < 5 or num > dn-4:
            continue
        while True:
            path = out_path + "/" + str(random.randint(0,100)) +".png"
            if not os.path.isfile(path):
                slice_img.save(path,"PNG")
                break

    print("finish")


def SplitImage(img,dn):
    width,height = img.size
    split_width = width / dn
    for w1 in range(dn):
        w2 = w1 * split_width
        yield img.crop((w2,40,split_width+w2,height-40))

if __name__ == "__main__":
    Main()
