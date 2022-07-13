data = input("data >")
mask = input("mask >")

bit_len = len(data)

data = int(data,2)
mask = int(mask,2)

xor_data = "{:0>24}".format(bin(data ^ mask)[2:])
i = 8
while i <= bit_len:
    print(int(xor_data[i-8:i],2))
    print(chr(int(xor_data[i-8:i],2)))
    i += 8
