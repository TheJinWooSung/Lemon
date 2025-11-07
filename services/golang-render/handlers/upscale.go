package handlers

import (
	"encoding/json"
	"image"
	"log"
	"net/http"
	"os"

	"github.com/disintegration/imaging"
)

type upscaleRequest struct {
	ImagePath string `json:"image_path"`
	Scale     int    `json:"scale"`
}

type upscaleResponse struct {
	ImagePath string `json:"image_path"`
	Status    string `json:"status"`
}

func HandleUpscale(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", 405)
		return
	}
	var req upscaleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	if req.Scale < 1 {
		req.Scale = 2
	}

	img, err := imaging.Open(req.ImagePath)
	if err != nil {
		http.Error(w, "cannot open image", 500)
		return
	}
	dst := imaging.Resize(img, img.Bounds().Dx()*req.Scale, 0, imaging.Lanczos)
	out := "out_upscaled.png"
	err = imaging.Save(dst, out)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	log.Printf("[render] upscaled %s → %s\n", req.ImagePath, out)
	json.NewEncoder(w).Encode(upscaleResponse{ImagePath: out, Status: "ok"})
}
