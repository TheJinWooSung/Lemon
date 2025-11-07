import os, requests

def generate(prompt: str) -> str:
    """Generate an image using Replicate Stable-Diffusion endpoint."""
    token = os.getenv("REPLICATE_API_TOKEN")
    headers = {"Authorization": f"Token {token}"}
    payload = {"version": "latest", "input": {"prompt": prompt}}

    r = requests.post("https://api.replicate.com/v1/predictions", json=payload, headers=headers)
    r.raise_for_status()
    return r.json()["urls"]["get"]
