import asyncio
import os
import edge_tts
from mutagen.mp3 import MP3

async def synthesize_long_audio(text, voice, output_path):
    # Split by double newline to avoid edge-tts stream truncation
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    with open(output_path, "wb") as f:
        for p in paragraphs:
            comm = edge_tts.Communicate(p, voice, rate="-15%")
            async for data in comm.stream():
                if data["type"] == "audio":
                    f.write(data["data"])

    audio = MP3(output_path)
    length_sec = audio.info.length
    mins = int(length_sec // 60)
    secs = int(length_sec % 60)
    print(f"Synthesized full audio to {output_path}: {mins} mins {secs} secs ({length_sec:.1f}s)")
    return length_sec

if __name__ == "__main__":
    test_text = ("Hello. " + "This is a test paragraph of the listening exam. " * 30 + "\n\n") * 10
    asyncio.run(synthesize_long_audio(test_text, "en-GB-RyanNeural", "test_chunk_out.mp3"))
