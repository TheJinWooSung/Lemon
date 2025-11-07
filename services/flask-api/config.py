import os

REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")
MODEL_NAME = "stability-ai/stable-diffusion-3"
CACHE_DIR = os.getenv("CACHE_DIR", "cache")
