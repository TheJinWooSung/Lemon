package main

import (
	"log"
	"net/http"
	"ai-imageforge/handlers"
)

func main() {
	http.HandleFunc("/upscale", handlers.HandleUpscale)
	http.HandleFunc("/compress", handlers.HandleCompress)
	http.HandleFunc("/watermark", handlers.HandleWatermark)

	log.Println("Go render service listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
