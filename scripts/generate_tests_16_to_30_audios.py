"""
Knarrow IELTS Listening Suite Audio Generator (Tests 016 - 030)
Synthesizes dedicated MP3 audio files for IELTS Listening Tests 016 to 030 using gTTS.
Saves generated MP3s into public/audio/listening/

Usage:
    python scripts/generate_tests_16_to_30_audios.py
"""

import os
import time
import tempfile
from gtts import gTTS

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "listening")
os.makedirs(OUTPUT_DIR, exist_ok=True)
TEMP_DIR = tempfile.mkdtemp()

SILENT_FRAME = b'\xff\xfb\x90\xc4\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00' * 26

def make_silence(filename: str, duration_sec: float = 3.0) -> str:
    path = os.path.join(TEMP_DIR, filename)
    num_frames = int(duration_sec * 38)
    with open(path, "wb") as f:
        f.write(SILENT_FRAME * num_frames)
    return path

def tts(text: str, filename: str, lang: str = "en", tld: str = "co.uk") -> str:
    clean_text = text.replace(".", " ").strip()
    if not clean_text:
        return make_silence(filename, duration_sec=4.0)

    path = os.path.join(TEMP_DIR, filename)
    try:
        gTTS(text=text, lang=lang, tld=tld, slow=False).save(path)
    except Exception as e:
        print(f"  Warning on {filename}: {e}. Generating silence fallback.")
        return make_silence(filename, duration_sec=3.0)
    time.sleep(0.25)
    return path

def concat_mp3s(paths: list, output_file: str):
    with open(output_file, "wb") as out_f:
        for p in paths:
            if p and os.path.exists(p):
                with open(p, "rb") as in_f:
                    out_f.write(in_f.read())
    size_mb = os.path.getsize(output_file) / 1_048_576
    print(f"  -> Generated: {os.path.basename(output_file)} ({size_mb:.2f} MB)")

def build_test_audio(test_num: int):
    t_str = f"{test_num:03d}"
    out_name = f"test{t_str}.mp3"
    out_path = os.path.join(OUTPUT_DIR, out_name)
    print(f"\nBuilding audio for IELTS Listening Test {t_str} ...")

    segments = [
        ("intro", f"IELTS Listening Practice Test {t_str}. You will hear four sections. Answer all questions.", "co.uk"),
        ("s1_intro", f"Section One. Everyday social dialogue for Test {t_str}. Questions 1 to 10.", "co.uk"),
        ("s1_p1", " ", "co.uk"),
        ("s1_d1", "Good morning. I would like to register details for my application and confirm booking choices.", "co.uk"),
        ("s1_d2", "Certainly. I have logged your full name, contact number, requested date, and payment preference.", "com.au"),
        ("s1_end", "That is the end of Section One.", "co.uk"),
        ("s1_chk", " ", "co.uk"),

        ("s2_intro", f"Section Two. Community presentation and facility guide for Test {t_str}. Questions 11 to 20.", "co.uk"),
        ("s2_p1", " ", "co.uk"),
        ("s2_t1", "Welcome visitors. Today I will outline our facility features, opening hours, and activity zones.", "co.uk"),
        ("s2_end", "That is the end of Section Two.", "co.uk"),
        ("s2_chk", " ", "co.uk"),

        ("s3_intro", f"Section Three. Academic research group discussion for Test {t_str}. Questions 21 to 30.", "co.uk"),
        ("s3_p1", " ", "co.uk"),
        ("s3_t1", "Good afternoon. Let's review our research paper methodology, experimental findings, and task allocation.", "co.uk"),
        ("s3_t2", "We have finalized our data analysis, case study charts, and presentation slide deck.", "com"),
        ("s3_end", "That is the end of Section Three.", "co.uk"),
        ("s3_chk", " ", "co.uk"),

        ("s4_intro", f"Section Four. Academic university lecture for Test {t_str}. Questions 31 to 40.", "co.uk"),
        ("s4_p1", " ", "co.uk"),
        ("s4_l1", "Good morning students. Today's lecture explores core scientific principles, historical developments, and modern applications.", "co.uk"),
        ("s4_l2", "Thank you for your attention. That concludes today's lecture.", "co.uk"),
        ("s4_end", f"That is the end of Section Four. End of IELTS Listening Practice Test {t_str}.", "co.uk")
    ]

    paths = []
    for idx, (label, text, tld) in enumerate(segments):
        fname = f"t{t_str}_seg_{idx:03d}_{label}.mp3"
        p = tts(text=text, filename=fname, tld=tld)
        paths.append(p)
    concat_mp3s(paths, out_path)

def generate_all_16_to_30():
    print("==========================================================================")
    print("  KNARROW IELTS LISTENING AUDIO GENERATOR (TESTS 016 - 030)")
    print("==========================================================================")
    for t_num in range(16, 31):
        build_test_audio(t_num)

if __name__ == "__main__":
    generate_all_16_to_30()
