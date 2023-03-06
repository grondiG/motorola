import requests
import random

try:
    for i in range(5):
        print("Draw image test " + str(i + 1) + ": ", end="")
        aminoAcids = ['A', 'V', 'I', 'L', 'M', 'F', 'Y', 'W', 'S', 'T', 'N', 'Q', 'C', 'U', 'G', 'P', 'R', 'H', 'K', 'D', 'E']
        imageRequest = requests.get("http://127.0.0.1:3000/api/sequenceImg/" + 'M' + ''.join([random.choice(aminoAcids) for i in range(10)]))

        if imageRequest.status_code != 200:
            print("Test failed")
            exit(1)
        print("Test passed")
except:
    print("Server not running")
    exit(1)
