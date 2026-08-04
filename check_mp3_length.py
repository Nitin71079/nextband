import os
from mutagen.mp3 import MP3

audio_dir = os.path.join("public", "audio", "listening")

for i in range(1, 10):
    filename = f"test{i:03d}.mp3"
    filepath = os.path.join(audio_dir, filename)
    if os.path.exists(filepath):
        audio = MP3(filepath)
        length_sec = audio.info.length
        mins = int(length_sec // 60)
        secs = int(length_sec % 60)
        print(f"{filename}: {mins} mins {secs} secs ({length_sec:.1f} seconds) | Size: {os.path.getsize(filepath)/(1024*1024):.2f} MB")
