package main

import (
)

var aminoAcidInfoMap map[rune]map[string]float32 = map[rune]map[string]float32{
    'A': {
        "weight": 89.09404,
        "hydropathyIndex": 1.8,
        "meltingPoint": 300,
        "polarity": 0,
        "solubility": 1,
        "pKa1": 2.34,
        "pKa2": 9.69,
        "pKa3": 0,
    },
    'C': {
        "weight": 121.15404,
        "hydropathyIndex": 2.5,
        "meltingPoint": 244,
        "polarity": 0,
        "solubility": 0,
        "pKa1": 1.96,
        "pKa2": 8.18,
        "pKa3": 0,
    },
    'D': {
        "weight": 133.10384,
        "hydropathyIndex": -3.5,
        "meltingPoint": 270,
        "polarity": 1,
        "solubility": -1,
        "pKa1": 1.88,
        "pKa2": 9.60,
        "pKa3": 3.65,
    },
    'E': {
        "weight": 147.13074,
        "hydropathyIndex": -3.5,
        "meltingPoint": 199,
        "polarity": 1,
        "solubility": -1,
        "pKa1": 2.19,
        "pKa2": 9.67,
        "pKa3": 4.25,
    },
    'F': {
        "weight": 165.19074,
        "hydropathyIndex": 2.8,
        "meltingPoint": 278,
        "polarity": 0,
        "solubility": -1,
        "pKa1": 1.83,
        "pKa2": 9.13,
        "pKa3": 0,
    },
    'G': {
        "weight": 75.06714,
        "hydropathyIndex": -0.4,
        "meltingPoint": 233,
        "polarity": 0,
        "solubility": 1,
        "pKa1": 2.34,
        "pKa2": 9.60,
        "pKa3": 0,
    },
    'H': {
        "weight": 155.155634,
        "hydropathyIndex": -3.2,
        "meltingPoint": 285,
        "polarity": 1,
        "solubility": 0,
        "pKa1": 1.82,
        "pKa2": 9.17,
        "pKa3": 6.00,
    },
    'I': {
        "weight": 131.17464,
        "hydropathyIndex": 4.5,
        "meltingPoint": 288,
        "polarity": 0,
        "solubility": -1,
        "pKa1": 2.36,
        "pKa2": 9.60,
        "pKa3": 0,
    },
    'K': {
        "weight": 146.18934,
        "hydropathyIndex": -3.9,
        "meltingPoint": 215,
        "polarity": 1,
        "solubility": 1,
        "pKa1": 2.18,
        "pKa2": 8.95,
        "pKa3": 10.53,
    },
    'L': {
        "weight": 131.17464,
        "hydropathyIndex": 3.8,
        "meltingPoint": 286,
        "polarity": 0,
        "solubility": -1,
        "pKa1": 2.36,
        "pKa2": 9.62,
        "pKa3": 0,
    },
    'M': {
        "weight": 149.20784,
        "hydropathyIndex": 1.9,
        "meltingPoint": 281,
        "polarity": 0,
        "solubility": -1,
        "pKa1": 2.28,
        "pKa2": 9.21,
        "pKa3": 0,
    },
    'N': {
        "weight": 132.11904,
        "hydropathyIndex": -3.5,
        "meltingPoint": 235,
        "polarity": 1,
        "solubility": 0,
        "pKa1": 2.02,
        "pKa2": 8.8,
        "pKa3": 0,
    },
    'P': {
        "weight": 115.13194,
        "hydropathyIndex": -1.6,
        "meltingPoint": 228,
        "polarity": 0,
        "solubility": 0,
        "pKa1": 1.99,
        "pKa2": 10.6,
        "pKa3": 0,
    },
    'Q': {
        "weight": 146.14594,
        "hydropathyIndex": -3.5,
        "meltingPoint": 185,
        "polarity": 1,
        "solubility": 0,
        "pKa1": 2.17,
        "pKa2": 9.13,
        "pKa3": 0,
    },
    'R': {
        "weight": 174.20274,
        "hydropathyIndex": -4.5,
        "meltingPoint": 244,
        "polarity": 1,
        "solubility": 1,
        "pKa1": 2.17,
        "pKa2": 9.04,
        "pKa3": 12.48,
    },
    'S': {
        "weight": 105.09344,
        "hydropathyIndex": -0.8,
        "meltingPoint": 235,
        "polarity": 1,
        "solubility": 1,
        "pKa1": 2.21,
        "pKa2": 9.15,
        "pKa3": 0,
    },
    'T': {
        "weight": 119.12034,
        "hydropathyIndex": -0.7,
        "meltingPoint": 256,
        "polarity": 1,
        "solubility": 1,
        "pKa1": 2.09,
        "pKa2": 9.1,
        "pKa3": 0,
    },
    'V': {
        "weight": 117.14784,
        "hydropathyIndex": 4.2,
        "meltingPoint": 298,
        "polarity": 0,
        "solubility": -1,
        "pKa1": 2.32,
        "pKa2": 9.62,
        "pKa3": 0,
    },
    'W': {
        "weight": 204.22844,
        "hydropathyIndex": -0.9,
        "meltingPoint": 290,
        "polarity": 0,
        "solubility": 0,
        "pKa1": 2.83,
        "pKa2": 9.39,
        "pKa3": 0,
    },
    'Y': {
        "weight": 181.19124,
        "hydropathyIndex": -1.3,
        "meltingPoint": 343,
        "polarity": 0,
        "solubility": -1,
        "pKa1": 2.20,
        "pKa2": 9.11,
        "pKa3": 0,
    },
}

func getProteinInfo(protein string) []map[string]interface{} {
    proteinInfo := []map[string]interface{}{}
    var currentWeight float32 = 0.0000
    var hydropathyIndex float32 = 0.0000
    totalWeight := getProteinWeight(protein)
    for _, aminoAcid := range protein {
        aminoAcidInfo := aminoAcidInfoMap[aminoAcid]
        currentWeight += aminoAcidInfo["weight"]
        hydropathyIndex += aminoAcidInfo["hydropathyIndex"]
        proteinInfo = append(proteinInfo, map[string]interface{}{
            "letter": string(aminoAcid),
            "weight": currentWeight - 18.01528,
            "hydropathyIndex": hydropathyIndex,
            "polarity": aminoAcidInfo["polarity"],
            "meltingPoint": aminoAcidInfo["meltingPoint"],
            "solubility": aminoAcidInfo["solubility"],
            "residue": ((aminoAcidInfo["weight"] - 18.01528) / (totalWeight)) * 100,
            "pi": (aminoAcidInfo["pKa1"] + aminoAcidInfo["pKa2"]) / 2,
            "pka": map[string]interface{}{
                "pka1": aminoAcidInfo["pKa1"],
                "pka2": aminoAcidInfo["pKa2"],
                "pka3": aminoAcidInfo["pKa3"],
            },
        })
    }
    return proteinInfo
}

func getProteinWeight(protein string) float32 {
    var totalWeight float32 = 0.0000
    for _, aminoAcid := range protein {
        aminoAcidInfo := aminoAcidInfoMap[aminoAcid]
        totalWeight += aminoAcidInfo["weight"]
    }
    totalWeight -= (18.01528 - float32(len(protein)))

    return totalWeight
}
