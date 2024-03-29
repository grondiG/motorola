import requests
import random
import json

try:
    tests = {
            "AUGGUGAGUAGUAGUACUCUAUCACGAUCAUCUAGGUCAUGCAUGCUUGA": ["MHA"],
             "AUGAUAUGCCCCUAUACUACUAUAUCAUCAUCAUCAUCGUAUGA": ["MPLYYYIIIIIV"],
             "CGCAAGUGGGUGCACUGCAGGCCGCAUCGACGUUCUUCCAAAUAUGGUUUUAGUUUGCUCGCCCAUGGUUAAUCAUAUUCUUCUAUAAUGGAUAUGACAUAUAUCCUGAUACGGGACACAGCAUGCUGAACUGCCGGGCAAUCGUUGGAGACACCGCCAGCUGUUAUCUCAAUGAUCGUUGCGGGGUAUCCAAGCUUAGUACAACACGCUGUGAGCGGUGGUGAAAGUCAUCCCUCGCUAUAUAGGUGGG": ["MDMTYILIRDTAC", "MVLVCSPMVNHILL", "MLNCRAIVGDTASCYLNDRCGVSKLSTTRCERW"],
             "AACCAAUCUUAUAAAGCCCCUGCAACCAGGUAGGACGAACUCAGGGCCCCGCUUCUCUACGUGUCCUCGAAUAGCAUGCACAUGCGAAGGGGACAAAUCACGCGUCCGAUUUCGUAUCCCUACGUGGCCGUCUAGCCGCCACAGCCCUGACAUACCAUAGGGUGCCAGCUCCUUGUUAGUGACCCGUUGUUCCUAUCUUGCCGCUAACGGAUAUACCCCAUCUAAGCUCGAAGUUGACGUCGGCUGAGGG": ["MHMRRGQITRPISYPYVAV"],
             "UCGCUUCAGCCCUGAUGGGCGUGGGGUAAUCCCACCUAACACAGGUAGAAAAGAGAUGUCGGCCGAGCUAUAAGGGUAAACGUCCGCUGCCAUGCGCCUAGCGAGAUCCAGAGGACAACUAUCCUCUCUUAGCCUGCAAACGAAUCCGACCCUCCGUGGAAUUAAGCAUUCCAACAACUCGGGUACCCGCCCUAUAUCAGCUAGUUACGCACCGGCUUUCGUGCACAUGAGACAUACUGGCACGAUGUUGUCUUGCAGGCUUCUGGAAUAGCCCGACAUUUGACUGCGCUAUUCGCUGGUAUGCGUUCCGGCUCUCCGGAAAGUGAAGCCAUCUCGUCCGAGGCGUUUACUCCAAACUGU": ["MSAEL", "MRLARSRGQLSSLSLQTNPTLRGIKHSNNSGTRPISASYAPAFVHMRHTGTMLSCRLLE", "MGVG"],
             }
    for i, test in enumerate(tests):
        print("Sequences test " + str(i + 1) + ": ", end="")
        sequenceRequest = requests.get("http://127.0.0.1:3000/api/sequences/" + test)
        if sequenceRequest.status_code != 200:
            print("Test failed")
            exit(1)
        try:
            jsonData = json.loads(sequenceRequest.text)
        except:
            print("Test failed")
            exit(1)
        result = [i["sequence"] for i in jsonData["sequences"]]
        if result != tests[test]:
            print("Test failed")
            exit(1)
        print("Test passed")
except:
    print("Server not running")
    exit(1)
