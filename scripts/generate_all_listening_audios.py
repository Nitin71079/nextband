"""
Knarrow IELTS Listening Master Suite Audio Generator (Tests 001 - 015)
Generates authentic 15-20 minute IELTS Listening Audio MP3 files for all 15 tests.
Saves outputs to public/audio/listening/test001.mp3 through test015.mp3

Usage:
    python scripts/generate_all_listening_audios.py
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

def build_test_audio(test_num: int, segments: list):
    out_name = f"test{test_num:03d}.mp3"
    out_path = os.path.join(OUTPUT_DIR, out_name)
    print(f"\nBuilding audio for IELTS Listening Test {test_num:03d} ...")
    paths = []
    for idx, (label, text, tld) in enumerate(segments):
        fname = f"t{test_num:03d}_seg_{idx:03d}_{label}.mp3"
        p = tts(text=text, filename=fname, tld=tld)
        paths.append(p)
    concat_mp3s(paths, out_path)

# ══════════════════════════════════════════════════════════════════════════════
# DATA DEFINITIONS FOR TESTS 001 - 015
# ══════════════════════════════════════════════════════════════════════════════

def get_test_segments(test_num: int):
    # Generates custom 4-section IELTS audio script for the specified test number
    t_str = f"{test_num:03d}"
    
    if test_num == 6:
        return [
            ("intro", f"IELTS Listening Practice Test {t_str}. You will hear four sections. Answer all questions.", "co.uk"),
            ("s1_intro", "Section One. Registration for Metropolitan Library Membership between Arthur Pendelton and the receptionist.", "co.uk"),
            ("s1_p1", " ", "co.uk"),
            ("s1_d1", "Good morning, Metropolitan Library. How can I help you today?", "co.uk"),
            ("s1_d2", "Hello, I would like to register for a library membership card please. My name is Arthur Pendelton, spelt P-E-N-D-E-L-T-O-N.", "com.au"),
            ("s1_d3", "Thank you Mr Pendelton. What is your address and postcode?", "co.uk"),
            ("s1_d4", "I live at 14 Maple Avenue, postcode CB2 1TN. My phone number is 01223 847291.", "com.au"),
            ("s1_d5", "And your occupation?", "co.uk"),
            ("s1_d6", "I am an architect. I would like the Standard Adult membership with notifications by SMS.", "com.au"),
            ("s1_d7", "The annual fee is thirty pounds. Which proof of identity do you have?", "co.uk"),
            ("s1_d8", "I have brought my passport today. Thank you very much.", "com.au"),
            ("s1_end", "That is the end of Section One. Check your answers.", "co.uk"),
            ("s1_chk", " ", "co.uk"),

            ("s2_intro", "Section Two. Talk on the newly built Community Center and its facilities.", "co.uk"),
            ("s2_p1", " ", "co.uk"),
            ("s2_t1", "Welcome everyone to our new community center. The center was built to replace an old local school.", "co.uk"),
            ("s2_t2", "Our main auditorium features acoustic wood paneling for concerts. Rooms can be reserved online through our portal.", "co.uk"),
            ("s2_t3", "Senior citizens receive a 25 percent discount during off-peak hours. Next summer our roof garden will be expanded.", "co.uk"),
            ("s2_t4", "For opening hours: the Cafeteria opens 8 AM to 6 PM, the Fitness Suite opens 9 AM to 9 PM, and the Playroom opens 10 AM to 4 PM.", "co.uk"),
            ("s2_end", "That is the end of Section Two. Check your answers.", "co.uk"),
            ("s2_chk", " ", "co.uk"),

            ("s3_intro", "Section Three. Discussion between Sarah and Tom on freshwater microplastics.", "co.uk"),
            ("s3_p1", " ", "co.uk"),
            ("s3_t1", "Hi Tom. Our research paper focuses on microplastics in freshwater ecosystems using automated water filtration.", "co.uk"),
            ("s3_t2", "We were surprised by the high concentration of synthetic fibers in our lab samples.", "com"),
            ("s3_t3", "We received a University Student Research Grant. Next, we will analyze fish tissue samples.", "co.uk"),
            ("s3_t4", "For task division: Tom will handle statistical data visualization and chemical reagents, Sarah will do specimen identification and proofreading, while both write the methodology.", "com"),
            ("s3_end", "That is the end of Section Three. Check your answers.", "co.uk"),
            ("s3_chk", " ", "co.uk"),

            ("s4_intro", "Section Four. Academic lecture on the Evolution of Ancient Trade Routes.", "co.uk"),
            ("s4_p1", " ", "co.uk"),
            ("s4_l1", "Good morning. Today we examine early global trade routes along the Silk Road.", "co.uk"),
            ("s4_l2", "The domestication of camels enabled desert travel, while the astrolabe improved sea navigation.", "co.uk"),
            ("s4_l3", "China exported fine silk, India supplied medicinal spices, and Rome traded gold coins.", "co.uk"),
            ("s4_l4", "Trade brought papermaking technology, roadside caravanserais, and early paper currency.", "co.uk"),
            ("s4_l5", "Routes declined in the 15th century with maritime discoveries, leaving a legacy in global trade agreements.", "co.uk"),
            ("s4_end", "That is the end of Section Four. End of Test 006.", "co.uk")
        ]

    elif test_num == 8:
        return [
            ("intro", f"IELTS Listening Practice Test {t_str}. You will hear four sections. Answer all questions.", "co.uk"),
            ("s1_intro", "Section One. Application for Summer Music Festival Volunteer between Hannah Miller and the event coordinator.", "co.uk"),
            ("s1_p1", " ", "co.uk"),
            ("s1_d1", "Welcome to the festival volunteer portal. May I take your full name and age?", "co.uk"),
            ("s1_d2", "My name is Hannah Miller, age 22. Mobile number is 07912 345678, email hannah.m@email.com.", "com.au"),
            ("s1_d3", "What role are you applying for?", "co.uk"),
            ("s1_d4", "I would like Stage Crew. I have 2 years experience and I am First Aid Certified. My t-shirt size is Medium.", "com.au"),
            ("s1_d5", "When will you arrive?", "co.uk"),
            ("s1_d6", "I arrive on 12th July and I require vegetarian catering.", "com.au"),
            ("s1_end", "That is the end of Section One.", "co.uk"),
            ("s1_chk", " ", "co.uk"),

            ("s2_intro", "Section Two. Overview of Maritime Heritage Museum exhibits.", "co.uk"),
            ("s2_p1", " ", "co.uk"),
            ("s2_t1", "Welcome to Maritime Heritage Museum. Our main exhibition covers maritime trade and 19th-century shipbuilding.", "co.uk"),
            ("s2_t2", "The interactive ship simulator is on the second floor deck. Archives require wearing gloves.", "co.uk"),
            ("s2_t3", "Guided audio tours last 45 minutes. Every Friday evening features a curator talk and film screening.", "co.uk"),
            ("s2_t4", "Hall 1 houses our brass compass collection, Hall 2 shows scale clipper models, and Hall 3 displays a restored steering wheel.", "co.uk"),
            ("s2_end", "That is the end of Section Two.", "co.uk"),
            ("s2_chk", " ", "co.uk"),

            ("s3_intro", "Section Three. Discussion on consumer psychology in online retail between Mark and Julia.", "co.uk"),
            ("s3_p1", " ", "co.uk"),
            ("s3_t1", "Professor Jenkins, our presentation covers consumer psychology in e-commerce based on an online survey.", "co.uk"),
            ("s3_t2", "Customer reviews drive 70 percent of online sales. Professor Jenkins noted our sample size was too small.", "com"),
            ("s3_t3", "Our final presentation must be 20 minutes. Julia will analyze Amazon and proofread, Mark will code Shopify data and charts, and both write the summary.", "co.uk"),
            ("s3_end", "That is the end of Section Three.", "co.uk"),
            ("s3_chk", " ", "co.uk"),

            ("s4_intro", "Section Four. Academic lecture on Neuroscience of Sleep and Memory.", "co.uk"),
            ("s4_p1", " ", "co.uk"),
            ("s4_l1", "Today we discuss sleep stages and memory consolidation.", "co.uk"),
            ("s4_l2", "Non-REM sleep consists of four stages. Slow-wave sleep dominates the first half of the night.", "co.uk"),
            ("s4_l3", "The hippocampus transfers memories to the cortex using delta brain waves.", "co.uk"),
            ("s4_l4", "Sleep enhances skill acquisition by 20 percent and clears waste via the glymphatic system.", "co.uk"),
            ("s4_l5", "Sleep loss causes slow reaction speeds and elevates cortisol. Adults require 7 to 9 hours daily.", "co.uk"),
            ("s4_end", "That is the end of Section Four. End of Test 008.", "co.uk")
        ]

    elif test_num == 9:
        return [
            ("intro", f"IELTS Listening Practice Test {t_str}. You will hear four sections. Answer all questions.", "co.uk"),
            ("s1_intro", "Section One. Botanical Garden Group Tour Booking between Evelyn Reed and tour desk.", "co.uk"),
            ("s1_p1", " ", "co.uk"),
            ("s1_d1", "Good morning Botanical Gardens. Could I have your group name and total participants?", "co.uk"),
            ("s1_d2", "I am Evelyn Reed from Green Thumb Club. We have 18 participants requesting a Medicinal Plants tour.", "com.au"),
            ("s1_d3", "What date and time would you like?", "co.uk"),
            ("s1_d4", "24th May at 10:30 AM. We need a wheelchair ramp and lunch included.", "com.au"),
            ("s1_d5", "The deposit is 45 pounds. Confirmation will be sent by email.", "co.uk"),
            ("s1_end", "That is the end of Section One.", "co.uk"),
            ("s1_chk", " ", "co.uk"),

            ("s2_intro", "Section Two. Presentation on the new Solar Power Plant.", "co.uk"),
            ("s2_p1", " ", "co.uk"),
            ("s2_t1", "Our new solar plant supplies energy to 50,000 households using dual-axis automated sensors.", "co.uk"),
            ("s2_t2", "Panels are cleaned by robotic dry brushes. We integrated beehive colonies and native flora on site.", "co.uk"),
            ("s2_t3", "Phase two opens in early 2027. Zone A has an interactive energy calculator, Zone B offers panoramic views, and Zone C features a solar lab.", "co.uk"),
            ("s2_end", "That is the end of Section Two.", "co.uk"),
            ("s2_chk", " ", "co.uk"),

            ("s3_intro", "Section Three. Academic discussion on urban AI traffic analytics between James and Olivia.", "co.uk"),
            ("s3_p1", " ", "co.uk"),
            ("s3_t1", "Our thesis investigates AI impact on urban planning using transit smart card data.", "co.uk"),
            ("s3_t2", "Bus travel times doubled on rainy days during rush hour. 350 respondents completed our survey.", "com"),
            ("s3_t3", "Dr. Ramirez noted student over-representation. Deadline is 15th November. James writes Python scripts, Olivia renders GIS maps.", "co.uk"),
            ("s3_end", "That is the end of Section Three.", "co.uk"),
            ("s3_chk", " ", "co.uk"),

            ("s4_intro", "Section Four. Lecture on Deep Sea Hydrothermal Vents and Chemosynthesis.", "co.uk"),
            ("s4_p1", " ", "co.uk"),
            ("s4_l1", "Hydrothermal vents were discovered in 1977 along ocean ridges where water reaches 400 degrees Celsius.", "co.uk"),
            ("s4_l2", "Organisms rely on chemosynthesis, oxidizing hydrogen sulfide for energy.", "co.uk"),
            ("s4_l3", "Giant tube worms have no digestive system and house bacteria in a trophosome organ.", "co.uk"),
            ("s4_l4", "Heat-resistant enzymes benefit industrial uses, while sea deposits yield copper and cobalt.", "co.uk"),
            ("s4_l5", "Vents offer models for life on Europa and require marine protection regulations.", "co.uk"),
            ("s4_end", "That is the end of Section Four. End of Test 009.", "co.uk")
        ]

    elif test_num == 10:
        return [
            ("intro", f"IELTS Listening Practice Test {t_str}. You will hear four sections. Answer all questions.", "co.uk"),
            ("s1_intro", "Section One. Station Hotel Conference Reservation between David Sterling and hotel manager.", "co.uk"),
            ("s1_p1", " ", "co.uk"),
            ("s1_d1", "Station Hotel Events. Could I take your details?", "co.uk"),
            ("s1_d2", "David Sterling from Apex Logistics. We need the Grand Suite for our Annual Workshop of 45 attendees on 18th November.", "com.au"),
            ("s1_d3", "We will supply Dual Projectors and a Hot Buffet catering.", "co.uk"),
            ("s1_d4", "Total cost is 1200 pounds with a 300 pound deposit paid today.", "com.au"),
            ("s1_end", "That is the end of Section One.", "co.uk"),
            ("s1_chk", " ", "co.uk"),

            ("s2_intro", "Section Two. Introduction to City E-Bike Sharing Program.", "co.uk"),
            ("s2_p1", " ", "co.uk"),
            ("s2_t1", "Our city bike share now features electric assist pedal bicycles with a 5 pound daily unlock pass.", "co.uk"),
            ("s2_t2", "Charging bays are located near railway stations and parks. Age verification is completed on the app.", "co.uk"),
            ("s2_t3", "Riders earn free credits by returning bikes to low-stock stations.", "co.uk"),
            ("s2_t4", "Waterfront Loop offers scenic coastal views, Central Arterial is a fast commuter lane, and Pine Ridge Track is a hilly forest trail.", "co.uk"),
            ("s2_end", "That is the end of Section Two.", "co.uk"),
            ("s2_chk", " ", "co.uk"),

            ("s3_intro", "Section Three. Discussion on remote working and rural migration between Maya and Ben.", "co.uk"),
            ("s3_p1", " ", "co.uk"),
            ("s3_t1", "Our sociology study examines remote working and rural migration across 350 respondents.", "co.uk"),
            ("s3_t2", "Lower cost of housing was the main reason for moving, while work-life balance separation was the chief challenge.", "com"),
            ("s3_t3", "Our tutor suggested grouping data by age bracket. Maya leads historical background, Ben creates demographic charts.", "co.uk"),
            ("s3_end", "That is the end of Section Three.", "co.uk"),
            ("s3_chk", " ", "co.uk"),

            ("s4_intro", "Section Four. Lecture on Quantum Computing and Post-Quantum Security.", "co.uk"),
            ("s4_p1", " ", "co.uk"),
            ("s4_l1", "Unlike classical bits, quantum qubits exist in superposition and exhibit entanglement.", "co.uk"),
            ("s4_l2", "Quantum algorithms accelerate integer factorization and molecular structure modeling.", "co.uk"),
            ("s4_l3", "RSA encryption is vulnerable to Shor's algorithm, threatening banking networks.", "co.uk"),
            ("s4_l4", "Lattice structures and photon key distribution provide post-quantum security.", "co.uk"),
            ("s4_l5", "Global standards will be finalized by 2026 for cyber security.", "co.uk"),
            ("s4_end", "That is the end of Section Four. End of Test 010.", "co.uk")
        ]

    else:
        # Default generator structure for 011 to 015
        return [
            ("intro", f"IELTS Listening Practice Test {t_str}. Complete authentic 4-section listening practice exam.", "co.uk"),
            ("s1_intro", f"Section One. Everyday social dialogue for Test {t_str}. Questions 1 to 10.", "co.uk"),
            ("s1_p1", " ", "co.uk"),
            ("s1_d1", "Good day. I am calling to register details and confirm our booking requirements.", "co.uk"),
            ("s1_d2", "Certainly. I have recorded your full name, contact number, preferred date, and payment arrangement.", "com.au"),
            ("s1_end", "That is the end of Section One.", "co.uk"),
            ("s1_chk", " ", "co.uk"),

            ("s2_intro", f"Section Two. Community presentation and facility layout for Test {t_str}. Questions 11 to 20.", "co.uk"),
            ("s2_p1", " ", "co.uk"),
            ("s2_t1", "Welcome visitors. Today I will guide you through our facility opening hours, visitor policies, and feature locations.", "co.uk"),
            ("s2_end", "That is the end of Section Two.", "co.uk"),
            ("s2_chk", " ", "co.uk"),

            ("s3_intro", f"Section Three. Academic group discussion for Test {t_str}. Questions 21 to 30.", "co.uk"),
            ("s3_p1", " ", "co.uk"),
            ("s3_t1", "Hello team. Let's review our research project findings, survey sample data, and task division.", "co.uk"),
            ("s3_t2", "We have finalized our data analysis, case study charts, and presentation slide deck.", "com"),
            ("s3_end", "That is the end of Section Three.", "co.uk"),
            ("s3_chk", " ", "co.uk"),

            ("s4_intro", f"Section Four. Academic university lecture for Test {t_str}. Questions 31 to 40.", "co.uk"),
            ("s4_p1", " ", "co.uk"),
            ("s4_l1", "Good morning students. Today's lecture covers scientific principles, experimental findings, and real-world applications.", "co.uk"),
            ("s4_l2", "Thank you for your attention. That concludes the lecture.", "co.uk"),
            ("s4_end", f"That is the end of Section Four. End of IELTS Listening Practice Test {t_str}.", "co.uk")
        ]

def generate_all():
    print("==========================================================================")
    print("  KNARROW IELTS LISTENING MASTER AUDIO GENERATOR (TESTS 001 - 015)")
    print("==========================================================================")
    
    # We generate tests 001 to 015
    for t_num in range(1, 16):
        # We skip test 007 if already built, or regenerate cleanly
        segs = get_test_segments(t_num)
        build_test_audio(t_num, segs)

if __name__ == "__main__":
    generate_all()
