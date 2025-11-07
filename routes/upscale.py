from flask import Blueprint, request, jsonify
bp = Blueprint("upscale", __name__)

@bp.post("/")
def upscale_image():
    data = request.get_json() or {}
    url = data.get("image_url")
    if not url:
        return jsonify({"error": "Missing image_url"}), 400
    # placeholder for real upscale call
    return jsonify({"image_url": url, "status": "upscaled"})
