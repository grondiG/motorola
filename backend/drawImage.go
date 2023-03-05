package main

import (
	"fmt"
	"image"
    "image/draw"
    "image/png"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func getSequenceImg(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    protein := vars["seq"]

    var aminoAcidImages []image.Image

    w.Header().Set("Access-Control-Allow-Origin", "*")

    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

    maxWidth := 0
    maxHeight := 0
    for i, aminoAcid := range protein {
        var filename string
        if i % 2 == 0 {
            filename = fmt.Sprintf("assets/%c.png", aminoAcid)
        } else {
            filename = fmt.Sprintf("assets/%c_rev.png", aminoAcid)
        }

        aminoAcidImgFile, err := os.Open(filename)
        if err != nil {
            fmt.Println(err)
        }
        aminoAcidImg, _, err := image.Decode(aminoAcidImgFile)
        if err != nil {
            fmt.Println(err)
        }
        aminoAcidImages = append(aminoAcidImages, aminoAcidImg)

        if aminoAcidImg.Bounds().Dy() > maxHeight {
            maxHeight = aminoAcidImg.Bounds().Dy()
        }

        maxWidth += aminoAcidImg.Bounds().Dx()
        
    }

    seqImgRect := image.Rectangle{image.Point{0, 0}, image.Point{maxWidth, int(float32(maxHeight) * 1.4)}}
    seqImg := image.NewRGBA(seqImgRect)

    imageX := 0
    imageY := 0

    for _, aminoAcidImg := range aminoAcidImages {
        //if i % 2 == 0 {
            imageY = (maxHeight / 2) - (aminoAcidImg.Bounds().Dy() / 4)
        //} else {
            //imageY = (int(float32(maxHeight) * 1.3) - aminoAcidImg.Bounds().Dy()) / 2
        //}
        if aminoAcidImg.Bounds().Dy() < 280 {
            imageY += aminoAcidImg.Bounds().Dy() / 3
        }

        imageStartingPoint := image.Point{imageX, imageY-30}

        draw.Draw(seqImg, image.Rectangle{imageStartingPoint, imageStartingPoint.Add(aminoAcidImg.Bounds().Size())}, aminoAcidImg, image.Point{0, 0}, draw.Src)

        imageX += aminoAcidImg.Bounds().Dx()
    }
    w.Header().Set("Content-Type", "image/png")

    png.Encode(w, seqImg)
}
