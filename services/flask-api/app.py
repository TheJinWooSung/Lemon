from flask import Flask
from flask_cors import CORS
from routes import generate, upscale, style_transfer

app = Flask(__name__)
CORS(app)

app.register_blueprint(generate.bp)
app.register_blueprint(upscale.bp)
app.register_blueprint(style_transfer.bp)

@app.get("/")
def healthcheck():
    return {"status": "ok", "service": "flask-api"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
