package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

func main() {
    router := mux.NewRouter()

    router.HandleFunc("/api/sequences/{seq}", getSequences)
    router.HandleFunc("/api/sequenceImg/{seq}", getSequenceImg)

    http.Handle("/", router)

    port := 3000

    fmt.Printf("Server running on port: %d\n", port)

    err := http.ListenAndServe(":" + strconv.Itoa(port), nil)
    if err != nil {
        fmt.Printf("Error running server: %v", err)
        os.Exit(1)
    }
}

