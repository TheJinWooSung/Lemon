from flask import Blueprint, request, jsonify
from models import stable_diffusion
from utils.cache import get_cache, set_cache
from utils.prompts import clean_prompt

bp = Blueprint("generate", __name__)

@bp.post("/")
def generate_image():
    data = request.get_json() or {}
    prompt = clean_prompt(data.get("prompt", ""))
    if not prompt:
        return jsonify({"error": "Missing prompt"}), 400

    cached = get_cache(prompt)
    if cached:
        return jsonify({"prompt": prompt, "image_url": cached, "cached": True})

    try:
        image_url = stable_diffusion.generate(prompt)
        set_cache(prompt, image_url)
        return jsonify({"prompt": prompt, "image_url": image_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
