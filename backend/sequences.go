package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

func getSequences(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    minimumProteinLength, err := strconv.Atoi(r.URL.Query().Get("minProteinLen"))

    if err != nil {
        minimumProteinLength = 1
    }
    
    w.Header().Set("Access-Control-Allow-Origin", "*")

    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")


    nucleotideSequence := vars["seq"]
    nucleotideSequence = strings.ReplaceAll(nucleotideSequence, "T", "U")

    convertNucleotideToNumber := map[rune]int{
        'U': 0,
        'C': 1,
        'A': 2,
        'G': 3,
    }
    aminoAcidsTable := [4][4][4]byte{
        {
            {'F', 'F', 'L', 'L'},
            {'S', 'S', 'S', 'S'},
            {'Y', 'Y', '!', '!'},
            {'C', 'C', '!', 'W'},
        },
        {
            {'L', 'L', 'L', 'L'},
            {'P', 'P', 'P', 'P'},
            {'H', 'H', 'Q', 'Q'},
            {'R', 'R', 'R', 'R'},
        },
        {
            {'I', 'I', 'I', 'M'},
            {'T', 'T', 'T', 'T'},
            {'N', 'N', 'K', 'K'},
            {'S', 'S', 'R', 'R'},
        },
        {
            {'V', 'V', 'V', 'V'},
            {'A', 'A', 'A', 'A'},
            {'D', 'D', 'E', 'E'},
            {'G', 'G', 'G', 'G'},
        },
    }

    nucleotideNums := [3]int{-1, -1, -1}

    var aminoAcidSequences [3][]byte
    for i, nucleotide := range nucleotideSequence {
        nucleotideNums[i % 3] = convertNucleotideToNumber[nucleotide]
        if nucleotideNums[0] != -1 && nucleotideNums[1] != -1 && nucleotideNums[2] != -1 {
            aminoAcid := aminoAcidsTable[nucleotideNums[(i - 2) % 3]][nucleotideNums[(i - 1) % 3]][nucleotideNums[i % 3]]
            aminoAcidSequences[(i - 2) % 3] = append(aminoAcidSequences[(i-2)%3], aminoAcid)
        }
    }

    proteins := []string{}

    proteinPattern := regexp.MustCompile("M[^ ]*?!")
    potentialProteins := proteinPattern.FindAll(bytes.Join(aminoAcidSequences[:], []byte(" ")), -1)
    for _, potentialProtein := range potentialProteins {
        if len(potentialProtein) >= minimumProteinLength {
            proteins = append(proteins, string(potentialProtein[:len(potentialProtein)-1]))

        }
    }

    output := []map[string]interface{}{}

    for _, protein := range proteins {
        output = append(output, map[string]interface{}{
            "sequence": protein,
            "info": getProteinInfo(protein),
            "weight": getProteinWeight(protein),
        })
    }

    jsonOutput, err := json.Marshal(map[string]interface{}{"sequences":output})
    
    if err != nil {
        fmt.Printf("Error encoding json: %v", err)
    }

    w.Write(jsonOutput)
}

