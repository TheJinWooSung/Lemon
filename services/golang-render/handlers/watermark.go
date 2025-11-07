package handlers

import (
	"encoding/json"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"log"
	"net/http"
	"os"
)

type watermarkRequest struct {
	ImagePath string `json:"image_path"`
	Text      string `json:"text"`
}

func HandleWatermark(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", 405)
		return
	}
	var req watermarkRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	in, err := os.Open(req.ImagePath)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	src, _, err := image.Decode(in)
	in.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	bounds := src.Bounds()
	outImg := image.NewRGBA(bounds)
	draw.Draw(outImg, bounds, src, bounds.Min, draw.Src)

	// simple white rectangle watermark placeholder
	for y := bounds.Dy() - 40; y < bounds.Dy()-20; y++ {
		for x := 20; x < 200; x++ {
			outImg.Set(x, y, color.RGBA{255, 255, 255, 120})
		}
	}

	outFile := "out_watermarked.png"
	out, _ := os.Create(outFile)
	defer out.Close()
	png.Encode(out, outImg)

	log.Printf("[render] watermarked %s → %s (%s)\n", req.ImagePath, outFile, req.Text)
	json.NewEncoder(w).Encode(map[string]string{"image_path": outFile, "status": "ok"})
}
