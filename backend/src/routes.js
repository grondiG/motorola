"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_size_1 = __importDefault(require("image-size"));
const canvas_1 = require("canvas");
const protein_1 = require("./protein");
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
const getProteinInfo = (sequence) => {
    const info = [];
    sequence.split("").forEach((letter) => {
        info.push({
            letter: letter,
            weight: Math.round(((0, protein_1.getAminoAcidsWeight)(letter) + Number.EPSILON) * 100) / 100,
            hydropathyIndex: (0, protein_1.getHydropathyIndex)(letter),
            pka: {
                pka1: (0, protein_1.getAminoAcidspKa1)(letter),
                pka2: (0, protein_1.getAminoAcidspKa2)(letter),
                pka3: (0, protein_1.getAminoAcidspKa3)(letter)
            },
            polarity: (0, protein_1.getAminoAcidPolarity)(letter),
            pi: Math.round(((((0, protein_1.getAminoAcidspKa1)(letter) + (0, protein_1.getAminoAcidspKa2)(letter)) / 2) + Number.EPSILON) * 100) / 100,
            residue: Math.round((((0, protein_1.getAminoAcidsWeight)(letter) / (0, protein_1.getAminoAcidsWeight)(sequence) * 100) + Number.EPSILON) * 100) / 100
        });
    });
    return info;
};
const getFullWidth = (sequence) => {
    let imgWidth = 0;
    sequence.split("").forEach((letter) => {
        let image = (0, image_size_1.default)(`assets/${letter}.png`);
        imgWidth += image === null || image === void 0 ? void 0 : image.width;
    });
    return imgWidth;
};
const getMaxHeight = (sequence) => {
    const imgHeights = [];
    sequence.split("").forEach((letter) => {
        let image = (0, image_size_1.default)(`assets/${letter}.png`);
        imgHeights.push(image.height);
    });
    return imgHeights.sort()[imgHeights.length - 1];
};
const createAndFillImage = (imageData, sequence) => __awaiter(void 0, void 0, void 0, function* () {
    const canvas = (0, canvas_1.createCanvas)(imageData.width, imageData.height);
    const context = canvas.getContext("2d");
    const path = `./${Date.now()}.png`;
    const coords = {
        x: 0,
        y: 0
    };
    sequence.split("").forEach((letter, index) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, canvas_1.loadImage)(`assets/${index % 2 == 0 ? letter : letter + "_rev"}.png`).then((image) => {
            coords.y = (imageData.height - image.height) / 2;
            context.drawImage(image, coords.x, coords.y, image.width, image.height);
            coords.x += image.width;
        })
            .then(() => {
            const buffer = canvas.toBuffer("image/png");
            fs_1.default.writeFileSync(path, buffer);
            console.log(`${new Date().toUTCString()}:  Adding element to image on path ${path}`);
        });
    }));
    return path;
});
const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
const getSequence = (sequence) => {
    let output = "";
    sequence = sequence.replaceAll("T", "U");
    for (let i = 0; i < sequence.length; i++) {
        if (sequence.slice(i, i + 3) === "AUG") {
            sequence = sequence.slice(i);
            break;
        }
    }
    let temp = sequence.match(/.{1,3}/g);
    if (!(temp === null || temp === void 0 ? void 0 : temp.includes('AUG'))) {
        return "Brak kodonu startu";
    }
    if (!['UGA', 'UAG', 'UAA'].some(el => temp === null || temp === void 0 ? void 0 : temp.includes(el))) {
        return "Brak kodonu stopu";
    }
    for (let i = 0; i < sequence.length; i += 3) {
        const buffer = sequence.slice(i, i + 3);
        switch (buffer) {
            case 'AUG':
                output += "M";
                break;
            case 'UUC':
            case 'UUU':
                output += "F";
                break;
            case 'UUG':
            case 'CUU':
            case 'CUC':
            case 'CUA':
            case 'CUG':
            case 'UUA':
                output += "L";
                break;
            case 'UCC':
            case 'UCA':
            case 'UCG':
            case 'AGU':
            case 'AGC':
            case 'UCU':
                output += "S";
                break;
            case 'UAC':
            case 'UAU':
                output += "Y";
                break;
            case 'UGC':
            case 'UGU':
                output += "C";
                break;
            case 'UGG':
                output += "W";
                break;
            case 'CCC':
            case 'CCA':
            case 'CCG':
            case 'CCU':
                output += "P";
                break;
            case 'CAC':
            case 'CAU':
                output += "H";
                break;
            case 'CAG':
            case 'CAA':
                output += "Q";
                break;
            case 'CGC':
            case 'CGA':
            case 'CGG':
            case 'AGG':
            case 'AGA':
            case 'CGU':
                output += "R";
                break;
            case 'AUC':
            case 'AUA':
            case 'AUU':
                output += "I";
                break;
            case 'ACC':
            case 'ACA':
            case 'ACG':
            case 'ACU':
                output += "T";
                break;
            case 'AAC':
            case 'AAU':
                output += "N";
                break;
            case 'AAA':
            case 'AAG':
                output += "K";
                break;
            case 'GUC':
            case 'GUA':
            case 'GUG':
            case 'GUU':
                output += "V";
                break;
            case 'GCC':
            case 'GCA':
            case 'GCG':
            case 'GCU':
                output += "A";
                break;
            case 'GAU':
            case 'GAC':
                output += "D";
                break;
            case 'GAG':
            case 'GAA':
                output += "E";
                break;
            case 'GGC':
            case 'GGA':
            case 'GGG':
            case 'GGU':
                output += "G";
                break;
            case 'UAG':
            case 'UGA':
            case 'UAA': {
                console.log(`${new Date().toUTCString()}:  Output is ${output}`);
                return output;
            }
            default:
                return "Niepoprawna sekwencja";
        }
    }
    return output;
};
router.get("/api/sequenceImg/:seq", (req, res) => {
    let seq = req.params.seq.toUpperCase();
    console.log(seq);
    const start = process.hrtime();
    const output = getSequence(seq);
    if (output.includes(" ")) {
        res.status(404).send(output);
        return;
    }
    const width = getFullWidth(output);
    const height = getMaxHeight(output);
    console.log(`${new Date().toUTCString()}:  Image dimensions: Width: ${width}, Height: ${height}`);
    let image = "";
    createAndFillImage({ width: width, height: height }, output)
        .then((path) => {
        image = path;
    })
        .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        const path = __dirname.substring(0, __dirname.length - 4) + image.substring(1);
        console.log(`${new Date().toUTCString()}:  Sending image as response on path ${path}`);
        const duration = getDurationInMilliseconds(start);
        console.log(`${new Date().toUTCString()}:  Response time is ${duration.toLocaleString()}ms`);
        console.log(image);
        res.status(200).sendFile(path, () => {
            fs_1.default.unlinkSync(path);
        });
    }));
});
router.get("/api/sequence/:seq", (req, res) => {
    let seq = getSequence(req.params.seq.toUpperCase());
    if (seq.includes(" ")) {
        res.status(404).send(seq);
        return;
    }
    res.status(200).json({ sequence: seq, info: getProteinInfo(getSequence(req.params.seq.toUpperCase())) });
});
router.get("/api/proteinWeight/:seq", (req, res) => {
    let seq = getSequence(req.params.seq.toUpperCase());
    if (seq.includes(" ")) {
        res.status(404).send(seq);
        return;
    }
    res.status(200).json({ weight: (0, protein_1.getAminoAcidsWeight)(seq) });
});
exports.default = router;
