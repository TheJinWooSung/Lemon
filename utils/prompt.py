def clean_prompt(prompt: str) -> str:
    return prompt.strip().replace("\n", " ")[:500]
