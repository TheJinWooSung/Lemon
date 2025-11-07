from flask import Blueprint, request, jsonify
bp = Blueprint("style", __name__)

@bp.post("/")
def style_transfer():
    data = request.get_json() or {}
    src = data.get("source_url")
    style = data.get("style", "artistic")
    if not src:
        return jsonify({"error": "Missing source_url"}), 400
    # placeholder for style transfer
    return jsonify({"source": src, "style": style, "status": "ok"})
