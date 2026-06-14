import json

path = r"C:\Users\Admin\.gemini\antigravity-ide\brain\4d44bd51-222a-4c20-a239-ca646490aa61\.system_generated\logs\transcript.jsonl"
with open(path, "r", encoding="utf-8") as f:
    for line in f:
        data = json.loads(line)
        if data.get("step_index") == 214:
            tc = data["tool_calls"][0]
            args = tc["args"]
            if isinstance(args, str):
                args = json.loads(args)
            print("--- TARGET CONTENT ---")
            print(args["TargetContent"])
            print("--- REPLACEMENT CONTENT ---")
            print(args["ReplacementContent"])
            break
