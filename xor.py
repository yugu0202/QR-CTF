
first_data = input("first data? (y/n) >")
reverse_flag = input("reverse? (y/n) >")
data = input("bit data >")
#mask_pattern =  #int(input(">"),2)

bit_len = len(data)

right_line = int(input("right line >"))-1
if reverse_flag == "y":
    pos = int(input("pos >"))-1
else:
    height = int(input("height >"))-1;

mask = ""
now_line = right_line;

if reverse_flag == "y":
    while bit_len > 0:
        print(pos,now_line,(pos+now_line)%3)
        if (pos+now_line)%3 == 0:
            mask += "1"
        else:
            mask += "0"

        print(pos,now_line-1,(pos+now_line-1)%3)
        if (pos+now_line-1)%3 == 0:
            mask += "1"
        else:
            mask += "0"

        pos += 1
        bit_len -= 2
else:
    while bit_len > 0 and height > 0:
        if (height+now_line)%3 == 0:
            mask += "1"
        else:
            mask += "0"

        if (height+now_line-1)%3 == 0:
            mask += "1"
        else:
            mask += "0"

        height -= 1
        bit_len -= 2

print(data)
print(mask)

bit_len = len(data)
data = int(data,2)
mask = int(mask,2)

xor_data = "{:0>24}".format(bin(data ^ mask)[2:])
print(xor_data)
if first_data == "y":
    print(xor_data[0:4])
    print(int(xor_data[4:12],2))
    print(chr(int(xor_data[12:20],2)))
else:
    i = 8
    print(chr(int(xor_data[8:16],2)))
    print(int(xor_data[8:16],2))
    while i <= bit_len:
        print(int(xor_data[i-8:i],2))
        print(chr(int(xor_data[i-8:i],2)))
        i += 8
