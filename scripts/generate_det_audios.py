"""
Knarrow DET Suite — Audio Generator
Synthesizes high-quality MP3 audio files for all DET listening tasks using gTTS.
Saves generated MP3s into public/audio/det/

Usage:
    python scripts/generate_det_audios.py
"""

import os
import time
from gtts import gTTS

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "det")
os.makedirs(OUTPUT_DIR, exist_ok=True)

DET_AUDIO_ITEMS = [
    {
        "filename": "lt-001.mp3",
        "text": "Scientific research suggests that regular exercise improves cognitive performance.",
        "lang": "en",
        "tld": "co.uk"
    },
    {
        "filename": "lt-002.mp3",
        "text": "The international conference on climate change will take place next month.",
        "lang": "en",
        "tld": "com"
    },
    {
        "filename": "il-001.mp3",
        "text": "Hi, I wanted to discuss our lab schedule for next week. We need to reserve the spectroscopy machine before Tuesday.",
        "lang": "en",
        "tld": "co.uk"
    },
    {
        "filename": "il-002.mp3",
        "text": "Could you please review the latest dataset analysis before our meeting with Professor Davis tomorrow afternoon?",
        "lang": "en",
        "tld": "com"
    }
]

def generate_audios():
    print(f"Generating DET MP3 audio files in {OUTPUT_DIR} ...")
    for item in DET_AUDIO_ITEMS:
        filepath = os.path.join(OUTPUT_DIR, item["filename"])
        print(f"  -> Synthesizing {item['filename']} ...")
        tts = gTTS(text=item["text"], lang=item["lang"], tld=item["tld"], slow=False)
        tts.save(filepath)
        time.sleep(0.5)
    print("\n✅ All DET audio files generated successfully!")

if __name__ == "__main__":
    generate_audios()
