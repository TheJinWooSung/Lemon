package handlers

import (
	"encoding/json"
	"image/jpeg"
	"log"
	"net/http"
	"os"
)

type compressRequest struct {
	ImagePath string `json:"image_path"`
	Quality   int    `json:"quality"`
}

func HandleCompress(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", 405)
		return
	}
	var req compressRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	if req.Quality <= 0 {
		req.Quality = 80
	}

	in, err := os.Open(req.ImagePath)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	img, _, err := image.Decode(in)
	in.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	outFile := "out_compressed.jpg"
	out, _ := os.Create(outFile)
	defer out.Close()

	jpeg.Encode(out, img, &jpeg.Options{Quality: req.Quality})
	log.Printf("[render] compressed %s → %s (q=%d)\n", req.ImagePath, outFile, req.Quality)
	json.NewEncoder(w).Encode(map[string]string{"image_path": outFile, "status": "ok"})
}
