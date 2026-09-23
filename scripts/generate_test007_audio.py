"""
IELTS Listening Test 007 – Audio Generator
Generates realistic ~18-22 minute IELTS Listening Audio for Test 007 using gTTS.
Saves generated MP3 to public/audio/listening/test007.mp3

Usage:
    python scripts/generate_test007_audio.py
"""

import os
import time
import tempfile
import struct
from gtts import gTTS

OUTPUT_DIR  = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "listening")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "test007.mp3")
TEMP_DIR    = tempfile.mkdtemp()

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Minimal valid MP3 silent frame (MPEG-1 Layer 3, 128kbps, 44.1kHz, 0.026 sec duration per frame)
# We can repeat this silent frame to build exact silence without network calls!
SILENT_MP3_FRAME = b'\xff\xfb\x90\xc4\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00' * 26

def make_silence_file(filename: str, duration_sec: float = 3.0) -> str:
    """Generate a clean silent MP3 file locally."""
    path = os.path.join(TEMP_DIR, filename)
    # Approx 38 frames per second
    num_frames = int(duration_sec * 38)
    with open(path, "wb") as f:
        f.write(SILENT_MP3_FRAME * num_frames)
    return path

def tts(text: str, filename: str, lang: str = "en", tld: str = "co.uk") -> str:
    """Synthesise text to an MP3 file and return the path."""
    clean_text = text.replace(".", " ").strip()
    if not clean_text:
        return make_silence_file(filename, duration_sec=5.0)

    path = os.path.join(TEMP_DIR, filename)
    print(f"  Generating: {filename} ...")
    try:
        gTTS(text=text, lang=lang, tld=tld, slow=False).save(path)
    except Exception as e:
        print(f"  Warning on {filename}: {e}. Falling back to silence.")
        return make_silence_file(filename, duration_sec=3.0)
    time.sleep(0.3)
    return path

def concat_mp3s(paths: list, output: str):
    """Concatenate MP3 segment files sequentially."""
    print(f"\nConcatenating {len(paths)} audio segments -> {output}")
    with open(output, "wb") as out_f:
        for p in paths:
            if p and os.path.exists(p):
                with open(p, "rb") as in_f:
                    out_f.write(in_f.read())
    size_mb = os.path.getsize(output) / 1_048_576
    print(f"Done! Output: {output}  ({size_mb:.2f} MB)")

SEGMENTS = [
    # ── TEST INTRO ─────────────────────────────────────────────────────────────
    ("intro_1", ("IELTS Listening Practice Test 007.", "co.uk")),
    ("intro_2", ("You will hear a number of different recordings and you will have to answer questions based on what you hear.", "co.uk")),
    ("intro_3", ("There will be time for you to read the instructions and questions, and you will have a chance to check your work.", "co.uk")),
    ("intro_4", ("All the recordings will be played ONCE only. The test is in four sections.", "co.uk")),
    ("intro_5", ("At the end of the test, write NO MORE THAN TWO WORDS AND OR A NUMBER for each answer where instructed.", "co.uk")),

    # ── SECTION 1 ──────────────────────────────────────────────────────────────
    ("s1_announce", ("Section One. You will hear a man telephoning a community sports centre to enquire about membership and facility hire.", "co.uk")),
    ("s1_look_q", ("First you have some time to look at Questions one to ten.", "co.uk")),
    ("s1_pause_1", (" ", "co.uk")),
    ("s1_listen_now", ("Now listen carefully and answer Questions one to ten.", "co.uk")),

    ("s1_phone_ring", ("Ring. Ring.", "co.uk")),
    ("s1_rec_1", ("Good morning, Highfield Community Sports Centre. How can I help you today?", "co.uk")),
    ("s1_spk_1", ("Oh hello. I'd like to ask about setting up a membership and booking some facilities, please.", "com.au")),
    ("s1_rec_2", ("Certainly! I can take your registration details right now over the phone. May I have your full name, please?", "co.uk")),
    ("s1_spk_2", ("Yes, my name is Marcus Vance. That's Marcus, M-A-R-C-U-S, and Vance, V-A-N-C-E.", "com.au")),
    ("s1_rec_3", ("Thank you, Mr Vance. Which tier of membership were you looking to join? We offer Silver, Gold, and Platinum packages.", "co.uk")),
    ("s1_spk_3", ("I'd like to go with the Gold membership, as that includes court bookings and pool access.", "com.au")),
    ("s1_rec_4", ("Great choice. And could I take a contact phone number for your account?", "co.uk")),
    ("s1_spk_4", ("Sure, it's zero seven seven four two, eight one nine three zero four.", "com.au")),
    ("s1_rec_5", ("Got that. And what is your current residential postcode?", "co.uk")),
    ("s1_spk_5", ("It's HG2 9QP.", "com.au")),
    ("s1_rec_6", ("Thank you. Now, what primary sport or activity will you be participating in most frequently?", "co.uk")),
    ("s1_spk_6", ("Mainly badminton. I play twice a week with friends.", "com.au")),
    ("s1_rec_7", ("Excellent. We have six badminton courts available. What is your preferred day for evening training sessions?", "co.uk")),
    ("s1_spk_7", ("Thursday evening would suit me best.", "com.au")),
    ("s1_rec_8", ("Thursday evenings, noted. When would you like your membership start date to be?", "co.uk")),
    ("s1_spk_8", ("Could we set it to start on the fifteenth of October?", "com.au")),
    ("s1_rec_9", ("The fifteenth of October, perfect. Now, for locker hire at the centre, there is a refundable locker key deposit.", "co.uk")),
    ("s1_spk_9", ("How much is the deposit?", "com.au")),
    ("s1_rec_10", ("The locker key deposit is fifteen pounds, which is returned when you hand back the key at the end of your membership.", "co.uk")),
    ("s1_spk_10", ("That sounds fine. What document do I need to present when I pick up my card on my first visit?", "com.au")),
    ("s1_rec_11", ("Because you are receiving our student discount rate, you will need to present your valid Student ID card.", "co.uk")),
    ("s1_spk_11", ("No problem, I'll bring my student ID. How will the monthly fees be paid?", "com.au")),
    ("s1_rec_12", ("Monthly fees are set up via Direct Debit. We take the payment on the first of every month.", "co.uk")),
    ("s1_spk_12", ("Direct Debit is perfect. Thank you very much for your help!", "com.au")),
    ("s1_rec_13", ("You're welcome, Mr Vance. We look forward to seeing you on October fifteenth. Goodbye!", "co.uk")),

    ("s1_end_section", ("That is the end of Section One. You now have half a minute to check your answers.", "co.uk")),
    ("s1_pause_check", (" ", "co.uk")),

    # ── SECTION 2 ──────────────────────────────────────────────────────────────
    ("s2_announce", ("Section Two. You will hear a park ranger giving an orientation speech to new volunteers at the Oakridge Nature Reserve.", "co.uk")),
    ("s2_look_q11_15", ("First you have some time to look at Questions eleven to fifteen.", "co.uk")),
    ("s2_pause_1", (" ", "co.uk")),
    ("s2_listen_now1", ("Now listen carefully and answer Questions eleven to fifteen.", "co.uk")),

    ("s2_ranger_1", ("Good morning everyone, and a warm welcome to Oakridge Nature Reserve! My name is Fiona, and I'm the project coordinator for our seasonal restoration project.", "co.uk")),
    ("s2_ranger_2", ("First, let me outline the primary goal of this season's project. While past years focused on planting oak trees, our main focus over the next three months is to restore native wetland habitats across the reserve.", "co.uk")),
    ("s2_ranger_3", ("Regarding gear and clothing, please note that conditions around the marshlands are very muddy. Standard walking shoes are not sufficient. All volunteers must wear waterproof boots at all times while on site.", "co.uk")),
    ("s2_ranger_4", ("Safety is paramount. For those working near the tree clearing areas, safety helmets are mandatory to protect against falling branches.", "co.uk")),
    ("s2_ranger_5", ("For those arriving by vehicle, parking has been arranged free of charge at the West Gate car park. Please display your volunteer pass on your dashboard.", "co.uk")),
    ("s2_ranger_6", ("We appreciate your hard work, so lunch will be provided every day at midday in the main shelter. Today we will be serving hot vegetarian soup with fresh bakery bread.", "co.uk")),

    ("s2_look_q16_20", ("Before you hear the rest of the talk, you have some time to look at Questions sixteen to twenty.", "co.uk")),
    ("s2_pause_2", (" ", "co.uk")),
    ("s2_listen_now2", ("Now listen and answer Questions sixteen to twenty.", "co.uk")),

    ("s2_ranger_7", ("Now, let's look at the site map so you can familiarise yourselves with the layout of the reserve.", "co.uk")),
    ("s2_ranger_8", ("You are currently standing at the Main Volunteer Entrance at the bottom south end of the map. Heading directly north along the central gravel path, on your right side just past the wooden bridge, you will find the Wildflower Meadow.", "co.uk")),
    ("s2_ranger_9", ("If you continue further north along that main path until you reach the edge of the lake, turning left leads you onto the elevated timber platform known as the Wetland Boardwalk.", "co.uk")),
    ("s2_ranger_10", ("Located on the far eastern bank of the lake, tucked away behind the reed beds for wildlife observation, is the Bird Hide. It provides an excellent vantage point for bird watching.", "co.uk")),
    ("s2_ranger_11", ("Next to the West Gate car park, near the south-west boundary fence, is our Equipment Shed, where you will collect your spades, gloves, and tools each morning.", "co.uk")),
    ("s2_ranger_12", ("Finally, situated in the north-western corner near the greenhouses, is our Tree Nursery, where saplings are grown before being transplanted.", "co.uk")),
    ("s2_ranger_13", ("Thank you for listening. Let's grab our gear and get started!", "co.uk")),

    ("s2_end_section", ("That is the end of Section Two. You now have half a minute to check your answers.", "co.uk")),
    ("s2_pause_check", (" ", "co.uk")),

    # ── SECTION 3 ──────────────────────────────────────────────────────────────
    ("s3_announce", ("Section Three. You will hear two university students, Chloe and Liam, discussing their engineering research presentation with their tutor, Doctor Thorne.", "co.uk")),
    ("s3_look_q21_25", ("First you have some time to look at Questions twenty-one to twenty-five.", "co.uk")),
    ("s3_pause_1", (" ", "co.uk")),
    ("s3_listen_now1", ("Now listen carefully and answer Questions twenty-one to twenty-five.", "co.uk")),

    ("s3_doc_1", ("Good afternoon Chloe, Liam. Let's review your progress on the final year group project. Remind me what topic you chose.", "co.uk")),
    ("s3_chloe_1", ("Hello Dr. Thorne. Our project focuses on solar microgrid efficiency in urban high-rises.", "co.uk")),
    ("s3_doc_2", ("Ah yes. And what did your team identify as the primary engineering challenge during peak hours?", "co.uk")),
    ("s3_chloe_2", ("The most critical bottleneck turned out to be intermittent battery storage capacity when solar input fluctuates unpredictably.", "co.uk")),
    ("s3_liam_1", ("That's right. But when we conducted our resident survey, we were surprised by the results.", "com")),
    ("s3_doc_3", ("Oh? What surprised you?", "co.uk")),
    ("s3_liam_2", ("We expected resistance, but resident willingness to adopt smart energy meters was exceptionally high, over eighty percent!", "com")),
    ("s3_chloe_3", ("For our secondary data, we relied heavily on the City Council Energy Audit Report 2024, which gave us detailed hourly load curves.", "co.uk")),
    ("s3_doc_4", ("That's a solid foundation. However, looking at your draft proposal, your scope is too broad. I strongly recommend limiting your detailed case study to just two downtown blocks rather than the whole district.", "co.uk")),
    ("s3_liam_3", ("That makes sense, Dr. Thorne. That will allow us to do a much deeper simulation.", "com")),

    ("s3_look_q26_30", ("Before you hear the rest of the conversation, you have some time to look at Questions twenty-six to thirty.", "co.uk")),
    ("s3_pause_2", (" ", "co.uk")),
    ("s3_listen_now2", ("Now listen and answer Questions twenty-six to thirty.", "co.uk")),

    ("s3_doc_5", ("Now, let's divide the remaining project tasks between the two of you to ensure you hit the deadline next fortnight.", "co.uk")),
    ("s3_chloe_4", ("I can take full responsibility for writing the literature review summary since I've already compiled the paper index.", "co.uk")),
    ("s3_liam_4", ("Great. I'll take charge of the statistical data analysis and running the software algorithms on the load data.", "com")),
    ("s3_chloe_5", ("What about the resident interview transcripts? There are over twenty recorded interviews.", "co.uk")),
    ("s3_liam_5", ("I think both Chloe and Liam should work together on coding the interview transcripts so we don't introduce bias.", "com")),
    ("s3_chloe_6", ("Agreed, we'll do the transcripts jointly. As for creating the 3D model diagrams of the building microgrids, Liam, you're much faster with CAD modeling.", "co.uk")),
    ("s3_liam_6", ("Sure, I'll draw up all the 3D model diagrams.", "com")),
    ("s3_chloe_7", ("And I'll assemble and polish the final presentation slide deck so it looks professional for the committee.", "co.uk")),
    ("s3_doc_6", ("Excellent division of labor. I look forward to seeing your draft next week!", "co.uk")),

    ("s3_end_section", ("That is the end of Section Three. You now have half a minute to check your answers.", "co.uk")),
    ("s3_pause_check", (" ", "co.uk")),

    # ── SECTION 4 ──────────────────────────────────────────────────────────────
    ("s4_announce", ("Section Four. You will hear a lecture by Professor Elena Rostova on Biomimicry in Architecture and Structural Engineering.", "co.uk")),
    ("s4_look_q31_40", ("First you have some time to look at Questions thirty-one to forty.", "co.uk")),
    ("s4_pause_1", (" ", "co.uk")),
    ("s4_listen_now", ("Now listen carefully and answer Questions thirty-one to forty.", "co.uk")),

    ("s4_lec_1", ("Good morning, students. In today's lecture on architectural innovation, we will examine biomimicry, which is defined as the practice of using nature's models and biological systems to solve complex human engineering problems.", "co.uk")),
    ("s4_lec_2", ("One classic example of structural biomimicry is inspired by termite mounds. Termites construct tall towers that maintain constant internal temperatures despite extreme desert heat.", "co.uk")),
    ("s4_lec_3", ("Architect Mick Pearce applied these principles to the Eastgate Centre in Harare, designing natural ventilation and passive cooling systems that draw cool air from the basement and release warm air through roof chimneys.", "co.uk")),
    ("s4_lec_4", ("This bio-inspired design achieved remarkable results, reducing air conditioning energy consumption by up to thirty-five percent compared to conventional office buildings of similar scale.", "co.uk")),
    ("s4_lec_5", ("Another fascinating innovation is the lotus leaf effect. The lotus plant possesses microscopic surface bumps that prevent water and dirt particles from adhering to its leaves.", "co.uk")),
    ("s4_lec_6", ("Materials scientists recreated this structure to formulate self-cleaning surface coatings for exterior building facades, drastically reducing maintenance costs.", "co.uk")),
    ("s4_lec_7", ("Turning to fluid dynamics, marine biologists discovered that bumps called tubercles on humpback whale fins enhance lift and maneuverability underwater.", "co.uk")),
    ("s4_lec_8", ("Engineers adapted these bumpy leading edges for wind turbine blades, significantly reducing aerodynamic drag and increasing electricity generation efficiency.", "co.uk")),
    ("s4_lec_9", ("In medicine and public sanitation, the microscopic texture of shark skin, known as denticles, has proven revolutionary. Its unique pattern prevents bacterial growth on surfaces without requiring chemical disinfectants, making it invaluable for hospital equipment.", "co.uk")),
    ("s4_lec_10", ("In transportation engineering, the Japanese Shinkansen bullet train originally produced loud sonic booms when exiting tunnels. Engineer Eiji Nakatsu noticed how the kingfisher bird dives seamlessly into water without splashing.", "co.uk")),
    ("s4_lec_11", ("By redesigning the nose of the bullet train to emulate the sleek shape of a kingfisher beak, engineers eliminated tunnel sonic booms while simultaneously increasing train velocity and reducing energy use.", "co.uk")),
    ("s4_lec_12", ("Despite these extraordinary breakthroughs, structural biomimicry faces hurdles. The main architectural challenge remains the high initial manufacturing costs associated with fabricating bio-inspired composite materials at commercial scale.", "co.uk")),
    ("s4_lec_13", ("Looking to the future, the next frontier in sustainable architecture will involve the integration of living biological tissue with self-repairing concrete structures capable of sealing cracks automatically.", "co.uk")),
    ("s4_lec_14", ("Thank you for your attention. That concludes today's lecture.", "co.uk")),

    ("s4_end_section", ("That is the end of Section Four. You now have half a minute to check your answers.", "co.uk")),
    ("s4_pause_check", (" ", "co.uk")),

    ("test_end", ("That is the end of the complete IELTS Listening Practice Test 007. You now have ten minutes to transfer your answers to your answer sheet.", "co.uk"))
]

def generate_full_audio():
    print(f"Starting audio generation for IELTS Listening Test 007...")
    paths = []
    for idx, (label, data) in enumerate(SEGMENTS):
        text, tld = data
        fname = f"seg_{idx:03d}_{label}.mp3"
        p = tts(text=text, filename=fname, tld=tld)
        paths.append(p)
    concat_mp3s(paths, OUTPUT_FILE)

if __name__ == "__main__":
    generate_full_audio()
