import sys
import os
import random
from PIL import Image

def Main():
    args = sys.argv
    cwd = os.getcwd()

    out_path = os.path.join(cwd,"splited")

    img = Image.open(os.path.join(cwd,args[1]))
    dn = int(args[2])

    os.makedirs(out_path,exist_ok=True)

    for num,slice_img in enumerate(SplitImage(img,dn),1):
        slice_img.save(out_path + "/" + str(random.randint(1,100)) +".png","PNG")

    print("finish")


def SplitImage(img,dn):
    width,height = img.size
    split_width = width / dn
    for w1 in range(dn):
        w2 = w1 * split_width
        print(w2,40,split_width+w2,height-40)
        yield img.crop((w2,40,split_width+w2,height-40))

if __name__ == "__main__":
    Main()
