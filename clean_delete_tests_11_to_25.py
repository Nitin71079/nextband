import os
import asyncio
import edge_tts
from mutagen.mp3 import MP3

public_audio_dir = os.path.join("public", "audio", "listening")
data_tests_dir = os.path.join("src", "data", "listening", "tests")

# 1. Delete Audio Files test011.mp3 to test025.mp3
for i in range(11, 26):
    num_str = f"{i:03d}"
    mp3_path = os.path.join(public_audio_dir, f"test{num_str}.mp3")
    if os.path.exists(mp3_path):
        os.remove(mp3_path)
        print(f"Deleted audio file: test{num_str}.mp3")

# 2. Delete Dataset Files listeningTest011.js to listeningTest025.js
for i in range(11, 26):
    num_str = f"{i:03d}"
    js_path = os.path.join(data_tests_dir, f"listeningTest{num_str}.js")
    if os.path.exists(js_path):
        os.remove(js_path)
        print(f"Deleted dataset file: listeningTest{num_str}.js")

# 3. Update index.js in src/data/listening/tests/ to export ONLY Tests 1 to 10
index_code = """import listeningTest001 from "./listeningTest001";
import listeningTest002 from "./listeningTest002";
import listeningTest003 from "./listeningTest003";
import listeningTest004 from "./listeningTest004";
import listeningTest005 from "./listeningTest005";
import listeningTest006 from "./listeningTest006";
import listeningTest007 from "./listeningTest007";
import listeningTest008 from "./listeningTest008";
import listeningTest009 from "./listeningTest009";
import listeningTest010 from "./listeningTest010";

export const listeningTests = [
  listeningTest001,
  listeningTest002,
  listeningTest003,
  listeningTest004,
  listeningTest005,
  listeningTest006,
  listeningTest007,
  listeningTest008,
  listeningTest009,
  listeningTest010
];

export default listeningTests;
"""

index_path = os.path.join(data_tests_dir, "index.js")
with open(index_path, "w", encoding="utf-8") as f:
    f.write(index_code)

print("Successfully updated src/data/listening/tests/index.js to export ONLY Tests 1 to 10!")
