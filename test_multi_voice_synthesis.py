import asyncio
import os
import edge_tts
from mutagen.mp3 import MP3

def get_silence_mp3_bytes(duration_seconds):
    # Standard MP3 silent frame (~26.12ms each, 417 bytes)
    # 38 frames per second = ~15,846 bytes per second of silence
    frame = b'\xff\xfb\x90\xc4' + b'\x00' * 413
    frames_per_sec = 38
    total_frames = int(frames_per_sec * duration_seconds)
    return frame * total_frames

async def synthesize_dialogue(lines, output_mp3_path):
    # lines is a list of tuples: (voice_name, text_prompt, silence_after_sec)
    with open(output_mp3_path, "wb") as f:
        for voice, text, silence_sec in lines:
            if text:
                comm = edge_tts.Communicate(text, voice, rate="-3%")
                async for chunk in comm.stream():
                    if chunk["type"] == "audio":
                        f.write(chunk["data"])
            if silence_sec > 0:
                silence_bytes = get_silence_mp3_bytes(silence_sec)
                f.write(silence_bytes)

    audio = MP3(output_mp3_path)
    length_sec = audio.info.length
    mins = int(length_sec // 60)
    secs = int(length_sec % 60)
    print(f"Multi-voice audio created: {output_mp3_path} | Length = {mins} mins {secs} secs ({length_sec:.1f}s)")
    return length_sec

if __name__ == "__main__":
    narrator = "en-GB-LibbyNeural"
    female_spk = "en-GB-SoniaNeural"
    male_spk = "en-GB-RyanNeural"
    prof_spk = "en-GB-ThomasNeural"

    sample_dialogue = [
        (narrator, "This is the International English Language Testing System Listening Test.", 1.0),
        (narrator, "Section 1. You will hear a conversation between an applicant and a housing officer.", 1.0),
        (narrator, "First, you have some time to look at questions 1 to 5.", 5.0), # 5 sec test pause
        (male_spk, "Good morning, Riverside Housing Office. My name is Mark. How can I help you today?", 0.5),
        (female_spk, "Hello Mark. My name is Sarah Jenkins. I am calling to apply for student accommodation.", 0.5),
        (male_spk, "Welcome Sarah. Could I take your phone number and email address please?", 0.5),
        (female_spk, "My phone number is 07700 900452, and my email is sarah dot jenkins at email dot com.", 0.5),
        (narrator, "That is the end of Section 1. You now have half a minute to check your answers.", 5.0)
    ]

    asyncio.run(synthesize_dialogue(sample_dialogue, "test_multivoice.mp3"))
