import json, os

CACHE_FILE = "cache/data.json"
os.makedirs("cache", exist_ok=True)

def get_cache(prompt):
    if not os.path.exists(CACHE_FILE):
        return None
    with open(CACHE_FILE) as f:
        data = json.load(f)
    return data.get(prompt)

def set_cache(prompt, url):
    data = {}
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE) as f:
            data = json.load(f)
    data[prompt] = url
    with open(CACHE_FILE, "w") as f:
        json.dump(data, f)
