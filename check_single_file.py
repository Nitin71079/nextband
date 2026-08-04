from mutagen.mp3 import MP3
import os

filepath = os.path.join("public", "audio", "listening", "test007.mp3")
if os.path.exists(filepath):
    audio = MP3(filepath)
    sec = audio.info.length
    mins = int(sec // 60)
    secs = int(sec % 60)
    print(f"test007.mp3 duration: {mins} mins {secs} secs ({sec:.1f} seconds)")
