import express from 'express';
import sizeOf from 'image-size';
import {createCanvas, loadImage} from 'canvas';
import {getAminoAcidspKa1,getAminoAcidspKa3,getAminoAcidspKa2,getAminoAcidPolarity,
    getHydropathyIndex,getAminoAcidsWeight} from "./protein";
import fs from 'fs';

const router = express.Router();

const getProteinInfo = (sequence:string) => {
    const info:any = []
    sequence.split("").forEach((letter:string)=>{
        info.push({
            letter:letter,
            weight:Math.round((getAminoAcidsWeight(letter)+Number.EPSILON)*100)/100,
            hydropathyIndex:getHydropathyIndex(letter),
            pka:{
                pka1:getAminoAcidspKa1(letter),
                pka2:getAminoAcidspKa2(letter),
                pka3:getAminoAcidspKa3(letter)
            },
            polarity:getAminoAcidPolarity(letter),
            pi:Math.round((((getAminoAcidspKa1(letter)+getAminoAcidspKa2(letter))/2)+Number.EPSILON)*100)/100,
            residue:Math.round(((getAminoAcidsWeight(letter)/getAminoAcidsWeight(sequence)*100)+Number.EPSILON)*100)/100
        })
    });
    return info;
}

const getFullWidth = (sequence:string) => {
    let imgWidth = 0;
    sequence.split("").forEach( (letter:string)=>{
        let image:any = sizeOf(`assets/${letter}.png`);
        imgWidth += image?.width;
    })
    return imgWidth;
}

const getMaxHeight = (sequence:string) => {
    const imgHeights:number[] = [];
    
    sequence.split("").forEach( (letter:string)=>{
        let image:any = sizeOf(`assets/${letter}.png`);
        imgHeights.push(image.height);
    })

    return imgHeights.sort()[imgHeights.length-1];
}

const createAndFillImage = async (imageData:any, sequence:string) => {
    const canvas = createCanvas(imageData.width, imageData.height);
    const context = canvas.getContext("2d");
    const path = "./output/image.png";

    const coords:any = {
        x:0,
        y:0
    }
    await sequence.split("").forEach(async (letter:string)=>{
        await loadImage(`assets/${letter}.png`).then((image)=>{
            coords.y = (imageData.height - image.height)/2;
            context.drawImage(image, coords.x, coords.y, image.width, image.height);
            coords.x += image.width;
        })
        .then(()=>{
            const buffer = canvas.toBuffer("image/png");
            fs.writeFileSync(path,buffer);
            console.log(`${new Date().toUTCString()}:  Adding element to image on path ${path}`)
        })
    })
    return path;
}
const getDurationInMilliseconds = (start:any) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}


const getSequence = (sequence:string):string => {
    let output:string = "";
    sequence = sequence.replaceAll("T","U");

    for(let i=0;i<sequence.length;i++){
        if(sequence.slice(i,i+3) === "AUG"){
            sequence = sequence.slice(i);
            break;
        }
    }

    let temp = sequence.match(/.{1,3}/g);

    if(!temp?.includes('AUG')){
        return "Brak kodonu startu";
    }

    if(!['UGA','UAG','UAA'].some(el=>temp?.includes(el))){
        return "Brak kodonu stopu";
    }

    for(let i=0;i<sequence.length;i+=3){
        const buffer = sequence.slice(i,i+3);
        switch(buffer){
            case 'AUG':
                output += "M"
            break;
            case 'UUC':
            case 'UUU':
                output += "F"
            break;
            case 'UUG':
            case 'CUU':
            case 'CUC':
            case 'CUA':
            case 'CUG':
            case 'UUA':
                output += "L"
            break;
            case 'UCC':
            case 'UCA':
            case 'UCG':
            case 'AGU':
            case 'AGC':
            case 'UCU':
                output += "S"
            break;
            case'UAC':
            case 'UAU':
                output += "Y"
            break;
            case 'UGC':
            case 'UGU':
                output += "C"
            break;
            case 'UGG':
                output += "W"
            break;
            case 'CCC':
            case 'CCA':
            case 'CCG':
            case 'CCU':
                output += "P"
            break;
            case 'CAC':
            case 'CAU':
                output += "H"
            break;
            case 'CAG':
            case 'CAA':
                output += "Q"
            break;
            case 'CGC':
            case 'CGA':
            case 'CGG':
            case 'AGG':
            case 'AGA':
            case 'CGU':
                output += "R"
            break;
            case 'AUC':
            case 'AUA':
            case 'AUU':
                output += "I"
            break;
            case 'ACC':
            case 'ACA':
            case 'ACG':
            case 'ACU':
                output += "T"
            break;
            case 'AAC':
            case 'AAU':
                output += "N"
            break;
            case 'AAA':
            case 'AAG':
                output += "K"
            break;
            case 'GUC':
            case 'GUA':
            case 'GUG':
            case 'GUU':
                output += "V"
            break;
            case 'GCC':
            case 'GCA':
            case 'GCG':
            case 'GCU':
                output += "A"
            break;
            case 'GAU':
            case 'GAC':
                output += "D"
            break;
            case 'GAG':
            case 'GAA':
                output += "E"
            break;
            case 'GGC':
            case 'GGA':
            case 'GGG':
            case 'GGU' :
                output += "G"
            break;
            case 'UAG':
            case 'UGA':
            case 'UAA':{
                console.log(`${new Date().toUTCString()}:  Output is ${output}`)
                return output;
                }
            default:
                return "Niepoprawna sekwencja";
        }
    }
    return output;
}

router.get("/api/sequenceImg/:seq",(req,res)=>{
    let seq:string = req.params.seq.toUpperCase();
    const start = process.hrtime();
   
    const output:string = getSequence(seq);
    if(output.includes(" ")){
        res.status(404).send(output);
        return;
    }
    const width = getFullWidth(output);
    const height = getMaxHeight(output);
    
    console.log(`${new Date().toUTCString()}:  Image dimensions: Width: ${width}, Height: ${height}`)

    let image = "";

    createAndFillImage({width:width, height:height}, output)
    .then((path)=>{
        image = path;
    })
    .finally(()=>{
        const path = __dirname.substring(0,__dirname.length-4) + image.substring(1);
        console.log(`${new Date().toUTCString()}:  Sending image as response on path ${path}`);
        const duration = getDurationInMilliseconds(start);
        console.log(`${new Date().toUTCString()}:  Response time is ${duration.toLocaleString()}ms`);
        res.status(200).sendFile(path);
    })
})

router.get("/api/sequence/:seq",(req,res)=>{

    let seq:string = getSequence(req.params.seq.toUpperCase());
    if(seq.includes(" ")){
        res.status(404).send(seq);
        return;
    }
    res.status(200).json({sequence:seq, info:getProteinInfo(getSequence(req.params.seq.toUpperCase()))});
});

router.get("/api/proteinWeight/:seq",(req,res)=>{
    let seq:string = getSequence(req.params.seq.toUpperCase());
    if(seq.includes(" ")){
        res.status(404).send(seq);
        return;
    }
    res.status(200).json({weight:getAminoAcidsWeight(seq)});
});

export default router;