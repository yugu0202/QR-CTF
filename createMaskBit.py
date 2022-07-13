import time
#x 0~8 box1,2 13~20 box3 6 timing
#y 0~8 13~20 box1,2 0~8 box3 6 timing

mask_data = ""
reverse = True

for x in range(0,11):
    if x >= 0 and x <= 8:
        double_box_flag = True
    else:
        double_box_flag = False

    if x >= 13 and x <= 20:
        single_box_flag = True
    else:
        single_box_flag = False

    if x == 6:
        continue

    mask = ""
    for y in range(21):
        if double_box_flag:
            if y >= 0 and y <= 8:
                continue
            if y >= 13 and y <= 20:
                continue
        elif single_box_flag:
            if y >= 0 and y <= 8:
                continue

        if y == 6:
            continue

        print(x,y)

        if (x+y)%3 == 0:
            mask += "1"
        else:
            mask += "0"

        if (x-1+y)%3 == 0:
            mask += "1"
        else:
            mask += "0"

        time.sleep(0.5)

    if reverse:
        mask_data = "".join(list(reversed(mask))) + mask_data
        reverse = False
    else:
        mask_data = mask + mask_data
        reverse = True

input_data = input("bit > ")

print(mask_data)

mask = mask_data[:len(input_data)]

print(mask)

print(input_data)

data = int(input_data,2)
mask = int(mask,2)

xor_data = "{:0>24}".format(bin(data ^ mask)[2:])
print(xor_data)

print(int(xor_data[4:12],2))
