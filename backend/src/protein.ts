export const getAminoAcidspKa1 = (aminoAcid: string): number => {
    switch (aminoAcid) {
        case 'A':
            return 2.34;
        case 'C':
            return 1.96;
        case 'D':
            return 1.88;
        case 'E':
            return 2.19;
        case 'F':
            return 1.83;
        case 'G':
            return 2.34;
        case 'H':
            return 1.82;
        case 'I':
            return 2.36;
        case 'K':
            return 2.18;
        case 'L':
            return 2.36;
        case 'M':
            return 2.28;
        case 'N':
            return 2.02;
        case 'P':
            return 1.99;
        case 'Q':
            return 2.17;
        case 'R':
            return 2.17;
        case 'S':
            return 2.21;
        case 'T':
            return 2.09;
        case 'V':
            return 2.32;
        case 'W':
            return 2.83;
        case 'Y':
            return 2.20;
        default:
            return 0;
    }
}
export const getAminoAcidspKa2 = (aminoAcid: string): number => {
    switch (aminoAcid) {
        case 'A':
            return 9.69;
        case 'C':
            return 8.18;
        case 'D':
            return 9.60;
        case 'E':
            return 9.67;
        case 'F':
            return 9.13;
        case 'G':
            return 9.60;
        case 'H':
            return 9.17;
        case 'I':
            return 9.60;
        case 'K':
            return 8.95;
        case 'L':
            return 9.62;
        case 'M':
            return 9.21;
        case 'N':
            return 8.8;
        case 'P':
            return 10.6;
        case 'Q':
            return 9.13;
        case 'R':
            return 9.04;
        case 'S':
            return 9.15;
        case 'T':
            return 9.1;
        case 'V':
            return 9.62;
        case 'W':
            return 9.39;
        case 'Y':
            return 9.11;
        default:
            return 0;
    }
}
export const getAminoAcidspKa3 = (aminoAcid: string): number => {
    switch (aminoAcid) {
        case 'A':
            return 0;
        case 'C':
            return 0;
        case 'D':
            return 3.65;
        case 'E':
            return 4.25;
        case 'F':
            return 0;
        case 'G':
            return 0;
        case 'H':
            return 6.00;
        case 'I':
            return 0;
        case 'K':
            return 10.53;
        case 'L':
            return 0;
        case 'M':
            return 0;
        case 'N':
            return 0;
        case 'P':
            return 0;
        case 'Q':
            return 0;
        case 'R':
            return 12.48;
        case 'S':
            return 0;
        case 'T':
            return 0;
        case 'V':
            return 0;
        case 'W':
            return 0;
        case 'Y':
            return 0;
        default:
            return 0;
    }
}

export const getAminoAcidMeltingPoint = (aminoAcid: string): number => {
    switch (aminoAcid) {
        case 'A':
            return 300;
        case 'C':
            return 244;
        case 'D':
            return 270;
        case 'E':
            return 199;
        case 'F':
            return 278;
        case 'G':
            return 233;
        case 'H':
            return 285;
        case 'I':
            return 288;
        case 'K':
            return 215;
        case 'L':
            return 286;
        case 'M':
            return 281;
        case 'N':
            return 235;
        case 'P':
            return 228;
        case 'Q':
            return 185;
        case 'R':
            return 244;
        case 'S':
            return 235;
        case 'T':
            return 256;
        case 'V':
            return 298;
        case 'W':
            return 290;
        case 'Y':
            return 343;
        default:
            return NaN;
    }
}

export const getAminoAcidPolarity = (aminoAcid: string): number => {
    switch (aminoAcid) {
        case 'A':
            return 0;
        case 'C':
            return 0;
        case 'D':
            return 1;
        case 'E':
            return 1;
        case 'F':
            return 0;
        case 'G':
            return 0;
        case 'H':
            return 1;
        case 'I':
            return 0;
        case 'K':
            return 1;
        case 'L':
            return 0;
        case 'M':
            return 0;
        case 'N':
            return 1;
        case 'P':
            return 0;
        case 'Q':
            return 1;
        case 'R':
            return 1;
        case 'S':
            return 1;
        case 'T':
            return 1;
        case 'V':
            return 0;
        case 'W':
            return 0;
        case 'Y':
            return 0;
        default:
            return NaN;
    }
}
export const getHydropathyIndex = (sequence:string) => {
    let index = 0;
    sequence.split("").forEach((letter:string)=>{
        switch(letter){
            case 'A':
                index += 1.8;
                break;
            case 'C':
                index += 2.5;
                break;
            case 'D':
                index += -3.5;
                break;
            case 'E':
                index += -3.5;
                break;
            case 'F':
                index += 2.8;
                break;
            case 'G':
                index += -0.4;
                break;
            case 'H':
                index += -3.2;
                break;
            case 'I':
                index += 4.5;
                break;
            case 'K':
                index += -3.9;
                break;
            case 'L':
                index += 3.8;
                break;
            case 'M':
                index += 1.9;
                break;
            case 'N':
                index += -3.5;
                break;
            case 'P':
                index += -1.6;
                break;
            case 'Q':
                index += -3.5;
                break;
            case 'R':
                index += -4.5;
                break;
            case 'S':
                index += -0.8;
                break;
            case 'T':
                index += -0.7;
                break;
            case 'V':
                index += 4.2;
                break;
            case 'W':
                index += -0.9;
                break;
            case 'Y':
                index += -1.3;
                break;
        }
    })
    return index;
}

export const getAminoAcidsWeight = (sequence:string) => {
    let weight = 0;
    for(let i=0;i<sequence.length;i++){
        switch(sequence[i]){
            case 'A':
                weight += 89.1;
                break;
            case 'C':
                weight += 121.2;
                break;
            case 'D':
                weight += 133.1;
                break;
            case 'E':
                weight += 147.1;
                break;
            case 'F':
                weight += 165.2;
                break;
            case 'G':
                weight += 75.1;
                break;
            case 'H':
                weight += 155.2;
                break;
            case 'I':
                weight += 131.2;
                break;
            case 'K':
                weight += 146.2;
                break;
            case 'L':
                weight += 131.2;
                break;
            case 'M':
                weight += 149.2;
                break;
            case 'N':
                weight += 132.1;
                break;
            case 'P':
                weight += 115.1;
                break;
            case 'Q':
                weight += 146.2;
                break;
            case 'R':
                weight += 174.2;
                break;
            case 'S':
                weight += 105.1;
                break;
            case 'T':
                weight += 119.1;
                break;
            case 'V':
                weight += 117.1;
                break;
            case 'W':
                weight += 204.2;
                break;
            case 'Y':
                weight += 181.2;
                break;
        }
    }
    return weight - (18.01528*sequence.length);
}

export const getAminoAcidSolubility = (sequence:string) => {
    let solubility = 0;
    for(let i=0;i<sequence.length;i++){
        switch(sequence[i]){
            case 'A':
                solubility = 1;
                break;
            case 'C':
                solubility = 0;
                break;
            case 'D':
                solubility = -1;
                break;
            case 'E':
                solubility = -1;
                break;
            case 'F':
                solubility = -1;
                break;
            case 'G':
                solubility = 1;
                break;
            case 'H':
                solubility = 0;
                break;
            case 'I':
                solubility = -1;
                break;
            case 'K':
                solubility = 1;
                break;
            case 'L':
                solubility = -1;
                break;
            case 'M':
                solubility = -1;
                break;
            case 'N':
                solubility = 0;
                break;
            case 'P':
                solubility = 0;
                break;
            case 'Q':
                solubility = 0;
                break;
            case 'R':
                solubility = 1;
                break;
            case 'S':
                solubility = 1;
                break;
            case 'T':
                solubility = 1;
                break;
            case 'V':
                solubility = -1;
                break;
            case 'W':
                solubility = 0;
                break;
            case 'Y':
                solubility = -1;
                break;
        }
    }
    return solubility;
}