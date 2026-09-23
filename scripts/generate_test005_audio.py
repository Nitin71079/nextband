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
    for attempt in range(5):
        try:
            gTTS(text=text, lang=lang, tld=tld, slow=False).save(path)
            print(f"  Successfully synthesized {filename}")
            time.sleep(1.2)
            return path
        except Exception as e:
            print(f"  Attempt {attempt+1} failed on {filename}: {e}. Retrying...")
            time.sleep(3.0)
    
    print(f"  Fallback to silence for {filename}")
    return make_silence(filename, duration_sec=3.0)

sections = [
    ("intro", "IELTS Listening Practice Test 005. You will hear four sections. Answer all questions.", "co.uk"),
    
    # SECTION 1
    ("s1_intro", "Section One. Daniel phones the City Science Museum to book tickets for a school group visit.", "co.uk"),
    ("s1_pause", "", "co.uk"),
    ("s1_dialogue", """
Good morning, City Science Museum bookings line. My name is Daniel Hartley from Westbridge Academy.
Hello Daniel, I can help you register your school group visit for 28 Year 9 students on the 14th of March.
We would like a guided tour with wheelchair access facilities.
The cost per student is 6 pounds 50, and you may use our picnic area for lunch. Confirmation will be emailed.
That is the end of Section One. You now have half a minute to check your answers.
""", "co.uk"),
    ("s1_chk", "", "co.uk"),

    # SECTION 2
    ("s2_intro", "Section Two. Laura gives an introductory orientation talk on the City Science Museum.", "co.uk"),
    ("s2_pause", "", "co.uk"),
    ("s2_talk", """
Welcome to the City Science Museum. Our main entrance is located opposite the central car park.
The Planetarium is on the second floor, while the Innovation Lab is open from 10 AM to 4 PM.
Visitors must store large bags in lockers provided near reception.
That is the end of Section Two. You now have half a minute to check your answers.
""", "co.uk"),
    ("s2_chk", "", "co.uk"),

    # SECTION 3 - Full Authentic Transcript
    ("s3_intro", "Section Three. Discussion between Psychology students Mia, Ethan, and their supervisor Dr. Patel on their research project.", "co.uk"),
    ("s3_pause", "", "co.uk"),
    ("s3_discussion", """
Dr. Patel: Good afternoon, Mia, Ethan. Please come in. I had a chance to read your project proposal over the weekend. Overall, you've selected an interesting topic, but I think there are a few aspects we should refine before you begin collecting data.

Mia: That's good to hear. We were hoping you'd point us in the right direction because we've changed the focus several times already.

Ethan: At first we wanted to investigate stress levels among all university students, but the more we read, the more unrealistic that seemed.

Dr. Patel: That's a common mistake. Broad topics often sound impressive, but they're difficult to investigate properly. Have you decided how you'd like to narrow the study?

Mia: We were thinking about focusing only on first-year students because they're adjusting to university life.

Ethan: Another possibility was comparing first-year and final-year students to see whether stress changes over time.

Dr. Patel: Both ideas have merit. Personally, I'd recommend comparing students from different academic disciplines instead. Students in subjects like engineering, medicine and the arts often experience quite different types of pressure, which could lead to more meaningful conclusions.

Mia: That makes sense. We'd probably get a wider variety of responses as well.

Ethan: We also wanted to ask about data collection. Our original plan was to organise face-to-face interviews.

Dr. Patel: Interviews certainly provide rich information, but have you considered how long they'll take?

Ethan: That's exactly our concern. Even arranging suitable meeting times could become difficult.

Mia: We discussed using an online questionnaire instead, although we weren't sure whether the data would be detailed enough.

Dr. Patel: That's a sensible alternative. Questionnaires are usually more practical for projects of this size. You could always follow them with a small number of interviews if you feel certain responses need further explanation.

Ethan: So we'd benefit from using both methods rather than relying entirely on one?

Dr. Patel: Exactly. Combining different methods often improves the reliability of undergraduate research.

Mia: We also wanted your opinion on the questions we're planning to ask.

Dr. Patel: What topics have you included?

Mia: Study workload, sleeping habits, time management and social activities.

Ethan: I also suggested asking students about their financial situation because I thought that might influence stress.

Dr. Patel: It probably does, but you'll need to be careful. Some participants may feel uncomfortable answering questions about personal finances. Instead of asking for exact figures, consider asking whether financial concerns affect their wellbeing.

Mia: That's much less intrusive.

Dr. Patel: Exactly. Good research isn't just about collecting information; it's about making participants feel comfortable enough to provide honest answers.

Ethan: We reviewed quite a few journal articles while writing the proposal, but we also used several university wellbeing websites.

Dr. Patel: Those websites can provide useful background information, particularly if they're produced by reputable universities. However, your literature review should rely mainly on peer-reviewed academic research.

Mia: We also found a government report on student mental health.

Dr. Patel: Government publications are excellent sources for national statistics. Just remember to distinguish between statistical evidence and academic analysis.

Ethan: Could we ask about the project schedule?

Dr. Patel: Certainly. You've allocated three weeks for distributing questionnaires and another week for analysing the data. I'd recommend allowing more time for analysis instead.

Mia: Really? We assumed analysing survey results would be fairly straightforward.

Dr. Patel: It often takes much longer than students expect, especially once you begin comparing different groups and looking for patterns.

Ethan: Particularly if we decide to include interviews as well.

Dr. Patel: Precisely.

Mia: Finally, we'd appreciate some advice about presenting our findings.

Dr. Patel: Remember that not everyone attending your presentation will have a psychology background. Avoid unnecessary technical terminology wherever possible.

Ethan: We were planning to include several detailed tables.

Dr. Patel: Tables certainly have their place, but graphs usually allow an audience to identify trends much more quickly. You might include one summary table and use charts for the remaining results.

Mia: That sounds much clearer.

Ethan: Yes, it would probably make the presentation easier to follow.

Dr. Patel: I agree. Revise the proposal using today's suggestions and send it to me by next Wednesday. Once I've approved it, you'll be ready to begin collecting data.

Mia: We'll get started straight away.

Ethan: Thanks very much for your feedback.

Dr. Patel: You're welcome. I look forward to seeing the revised version.

That is the end of Section Three. You now have half a minute to check your answers.
""", "com"),
    ("s3_chk", "", "co.uk"),

    # SECTION 4
    ("s4_intro", "Section Four. Academic lecture on the Future of Vertical Farming.", "co.uk"),
    ("s4_pause", "", "co.uk"),
    ("s4_lecture", """
Good morning. Today we explore vertical farming where crops are grown in stacked layers indoors.
Vertical farms use recirculating irrigation systems consuming up to 90 percent less water.
High-efficiency LED lighting replaces natural sunlight, while artificial intelligence analyzes data to detect nutrient deficiencies or disease early.
Vertical farming focuses on high-value crops like leafy vegetables and herbs.
Automation and robotics transport seedlings and harvest plants, reducing waste and improving yield over time.
That is the end of Section Four. You now have ten minutes to transfer your answers. End of IELTS Listening Test 005.
""", "co.uk")
]

output_file = os.path.join(OUTPUT_DIR, "test005.mp3")
print("Synthesizing Test 005 Audio cleanly ...")
paths = []
for idx, (label, text, tld) in enumerate(sections):
    fname = f"t005_clean_{idx:02d}_{label}.mp3"
    p = tts(text=text, filename=fname, tld=tld)
    paths.append(p)

with open(output_file, "wb") as out_f:
    for p in paths:
        if p and os.path.exists(p):
            with open(p, "rb") as in_f:
                out_f.write(in_f.read())

size_mb = os.path.getsize(output_file) / 1_048_576
print(f"SUCCESS: Generated test005.mp3 ({size_mb:.2f} MB)")
