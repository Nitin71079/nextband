"""
IELTS Listening Test 002 – Audio Generator
Uses gTTS (Google Text-to-Speech) – free, no API key required.
Generates test002.mp3 and saves to public/audio/listening/test002.mp3

Usage:
    python scripts/generate_test002_audio.py

Requirements:
    pip install gtts
"""

import os
import time
import tempfile
from gtts import gTTS

# ── Output path ────────────────────────────────────────────────────────────────
OUTPUT_DIR  = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "listening")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "test002.mp3")
TEMP_DIR    = tempfile.mkdtemp()

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── Helpers ────────────────────────────────────────────────────────────────────

def tts(text: str, filename: str, lang: str = "en", tld: str = "co.uk") -> str:
    """Synthesise text to an MP3 file and return the path."""
    path = os.path.join(TEMP_DIR, filename)
    print(f"  Generating: {filename} ...")
    gTTS(text=text, lang=lang, tld=tld, slow=False).save(path)
    time.sleep(0.4)   # gentle rate-limit to avoid 429s
    return path


def silence_mp3(seconds: float) -> str:
    """
    Return a path to a tiny valid MP3 filled with silence frames.
    We approximate silence by just returning None – the concatenation
    step will skip None entries.  For a proper silence we'd need ffmpeg.
    Instead we synthesise a quiet filler phrase at low volume.
    """
    # gTTS has no silence option; we use a period (.) which produces
    # a very short utterance that acts as a micro-pause between segments.
    # For longer pauses we repeat it.
    dots = ". " * max(1, int(seconds * 0.7))
    return tts(dots, f"pause_{int(seconds*100)}ms_{id(dots)}.mp3")


def concat_mp3s(paths: list, output: str):
    """
    Concatenate MP3 files by binary-appending.
    gTTS produces raw MPEG frames; simple concatenation works for most
    players (Chrome, VLC, etc.).  For perfect accuracy, use ffmpeg concat.
    """
    print(f"\nConcatenating {len(paths)} segments → {output}")
    with open(output, "wb") as out_f:
        for p in paths:
            if p and os.path.exists(p):
                with open(p, "rb") as in_f:
                    out_f.write(in_f.read())
    size_mb = os.path.getsize(output) / 1_048_576
    print(f"Done! Output: {output}  ({size_mb:.1f} MB)")


# ══════════════════════════════════════════════════════════════════════════════
#  SCRIPT SEGMENTS
#  Each tuple: (label, text)
#  British English voice: tld="co.uk"
# ══════════════════════════════════════════════════════════════════════════════

SEGMENTS = [

    # ── INTRO ──────────────────────────────────────────────────────────────────
    ("intro", (
        "IELTS Listening Practice Test 002. "
        "You will hear the recordings once only. "
        "Answer all questions as you listen. "
        "Write no more than two words and or a number where instructed."
    )),

    # ── SECTION 1 ──────────────────────────────────────────────────────────────
    ("s1_intro", (
        "Section One. You will hear a woman telephoning a leisure centre to book "
        "a swimming lane and enquire about fitness classes. "
        "First you have some time to look at Questions one to ten."
    )),
    ("s1_pause_review", ". . . . . . . . . . . . . . . . . . . . . ."),   # ~5s review
    ("s1_now", "Now listen carefully and answer Questions one to ten."),

    ("s1_ring", "Ring. Ring."),

    ("s1_rec_1", (
        "Good morning, Greenfield Leisure Centre. How can I help you?"
    )),
    ("s1_cal_1", (
        "Oh, hello. I'd like to book some lane swimming sessions please, "
        "and also find out a bit more about your classes."
    )),
    ("s1_rec_2", "Of course! I'll just take a few details. Can I start with your name?"),
    ("s1_cal_2", "Yes, it's Sandra Howell. That's H, O, W, E, L, L."),
    ("s1_rec_3", "Thank you, Ms Howell. And do you have a membership number with us?"),
    ("s1_cal_3", "I do, yes. It's G, L, four, seven, two, eight."),
    ("s1_rec_4", "Perfect. And what activity were you looking to book?"),
    ("s1_cal_4", (
        "Lane swimming, please. I've been doing it for a few years now and "
        "I prefer the quieter sessions if possible."
    )),
    ("s1_rec_5", (
        "Absolutely. We have sessions throughout the week. "
        "Do you have a preferred day?"
    )),
    ("s1_cal_5", "Tuesdays would be ideal for me, if there's availability."),
    ("s1_rec_6", (
        "Let me check. Yes, we have spaces on Tuesdays. "
        "And what time would suit you?"
    )),
    ("s1_cal_6", (
        "I'd prefer early morning. I was thinking around half past seven in the morning, "
        "before work."
    )),
    ("s1_rec_7", (
        "Seven thirty a.m. on Tuesdays. Yes, that lane is available. "
        "How many sessions were you thinking of booking in advance?"
    )),
    ("s1_cal_7", "I'd like to book eight sessions, please."),
    ("s1_rec_8", (
        "Eight sessions, noted. Now, you mentioned classes. "
        "Were you interested in anything specific?"
    )),
    ("s1_cal_8", (
        "Yes, I heard you do some water-based fitness classes. "
        "A friend of mine goes to your aqua aerobics sessions and really enjoys them."
    )),
    ("s1_rec_9", (
        "Ah yes, aqua aerobics is very popular. It's on Wednesday evenings and Saturday "
        "mornings. The fee is twelve pounds per session for members."
    )),
    ("s1_cal_9", (
        "That's reasonable. I'll probably join the Wednesday one. "
        "Can I ask, is it suitable for beginners? I'm a decent swimmer but "
        "I've never done the class before."
    )),
    ("s1_rec_10", (
        "Absolutely, all levels are welcome. The instructor always adapts the session. "
        "Is there anything else I should note for you?"
    )),
    ("s1_cal_10", (
        "Actually, yes. I have a minor knee injury at the moment, so I'd prefer "
        "to stay in the shallow end during the lane swimming if possible."
    )),
    ("s1_rec_11", (
        "Of course, I'll make a note of that so the lifeguard is aware. "
        "Shallow end preference noted. "
        "Now, how would you like us to send your booking confirmation?"
    )),
    ("s1_cal_11", "By email would be best, please."),
    ("s1_rec_12", (
        "Email it is. I'll send that across to the address on your account. "
        "Is there anything else I can help you with today?"
    )),
    ("s1_cal_12", "No, that's everything, thank you. You've been very helpful."),
    ("s1_rec_13", "My pleasure. Enjoy your sessions, Ms Howell. Goodbye."),
    ("s1_cal_13", "Thank you. Goodbye."),

    ("s1_end", (
        "That is the end of Section One. "
        "You now have half a minute to check your answers."
    )),
    ("s1_check_pause", ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ."),  # ~30s

    # ── SECTION 2 ──────────────────────────────────────────────────────────────
    ("s2_intro", (
        "Section Two. You will hear a museum guide giving an introductory talk "
        "to a group of visitors at the Hartley City Museum. "
        "First you have some time to look at Questions eleven to fifteen."
    )),
    ("s2_pause_review", ". . . . . . . . . . . . . . . . . . . . . ."),
    ("s2_now", "Now listen carefully and answer Questions eleven to fifteen."),

    ("s2_guide_1", (
        "Good morning everyone, and welcome to the Hartley City Museum. "
        "My name is Caroline and I'll be your guide for today's visit. "
        "Before we begin our tour, I'd like to share a few important points about the museum."
    )),
    ("s2_guide_2", (
        "The museum was originally opened in eighteen eighty-seven, "
        "when the city council decided that the growing industrial wealth of Hartley "
        "should be matched by a cultural institution worthy of its citizens. "
        "The building itself is Grade One listed and a fine example of Victorian civic architecture."
    )),
    ("s2_guide_3", (
        "In terms of funding, the museum has changed considerably over the years. "
        "Government grants supported us through much of the twentieth century, but today "
        "the majority of our operating budget comes from private donations, "
        "thanks to the generous support of individuals, businesses and foundations "
        "committed to preserving local heritage. "
        "Ticket revenue does contribute, but it covers only a fraction of our running costs."
    )),
    ("s2_guide_4", (
        "Now, I should flag something important before we start. "
        "Today, the Ancient Civilisations Gallery on the first floor is temporarily closed "
        "for installation of a new interactive display. "
        "It will reopen next month and the new experience is going to be wonderful, "
        "so please do come back. "
        "The Natural History Gallery and the Modern Art Gallery are both fully open."
    )),
    ("s2_guide_5", (
        "For those wishing to visit our special photography exhibition, "
        "Portraits of Hartley, nineteen hundred to nineteen fifty, "
        "please be aware that you will need to purchase a separate ticket at the admissions desk. "
        "The exhibition is ticketed to manage visitor numbers and protect the fragile prints on display."
    )),
    ("s2_guide_6", (
        "Finally, many of you may have noticed the wonderful new rooftop café as you came in. "
        "That rooftop café was added as part of our renovation programme completed last spring "
        "and offers spectacular views over the city. "
        "We do recommend booking a table during busy periods."
    )),

    ("s2_map_intro", (
        "Before you hear the rest of the talk, you have some time to look at "
        "Questions sixteen to twenty."
    )),
    ("s2_map_pause", ". . . . . . . . . . . . . . . . . . . . . ."),
    ("s2_map_now", "Now listen and answer Questions sixteen to twenty."),

    ("s2_guide_7", (
        "Right, let me now walk you through the ground floor layout "
        "using the map you'll find on the back of your leaflet."
    )),
    ("s2_guide_8", (
        "As you came through the main doors at the south end, "
        "you entered the Main Entrance Hall, that large open space in the centre bottom of the map. "
        "From there, heading immediately to your left as you enter, "
        "that's the room in the top-left corner of the plan, "
        "you'll find the Cloakroom, where you can store coats, bags and umbrellas. "
        "We strongly recommend using it, as bags are not permitted in several of our galleries."
    )),
    ("s2_guide_9", (
        "Moving to the top-centre-left room, directly north from the Entrance Hall, "
        "that large space is our flagship permanent display, the Egyptian Exhibition, "
        "which features over three hundred artefacts including two genuine mummies on loan from Cairo. "
        "It's absolutely not to be missed."
    )),
    ("s2_guide_10", (
        "Across to the right, in that larger room running across the top-right of the ground floor, "
        "is where the ticketed Photography Exhibition is being held. "
        "As I mentioned, you'll need a separate ticket from the admissions desk before entering."
    )),
    ("s2_guide_11", (
        "On the middle-left of the plan, next to the Central Atrium, "
        "is the Children's Workshop, a wonderful hands-on space where young visitors "
        "can try pottery, printmaking and historical crafts. "
        "Sessions run every hour on weekends."
    )),
    ("s2_guide_12", (
        "And finally, in the middle-right room adjacent to the atrium, "
        "you'll find our Café, serving hot meals, sandwiches and beverages throughout the day. "
        "It's a great place to take a break mid-visit."
    )),
    ("s2_guide_13", (
        "The Lecture Theatre, at the bottom-right, hosts talks most weekday evenings. "
        "Details are on our website. "
        "And the Gift Shop in the bottom-left has a wonderful selection of locally inspired products. "
        "Right, shall we begin? If you'll follow me through the Entrance Hall..."
    )),

    ("s2_end", (
        "That is the end of Section Two. "
        "You now have half a minute to check your answers."
    )),
    ("s2_check_pause", ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ."),

    # ── SECTION 3 ──────────────────────────────────────────────────────────────
    ("s3_intro", (
        "Section Three. You will hear two students, Priya and Tom, discussing their "
        "psychology research project with their tutor, Doctor Chen. "
        "First you have some time to look at Questions twenty-one to twenty-five."
    )),
    ("s3_pause_review", ". . . . . . . . . . . . . . . . . . . . . ."),
    ("s3_now", "Now listen carefully and answer Questions twenty-one to twenty-five."),

    ("s3_chen_1", "Come in, good to see you both. So, how is the project progressing?"),
    ("s3_priya_1", (
        "We've actually made some good progress, Doctor Chen. "
        "But we've run into a couple of issues we wanted your advice on."
    )),
    ("s3_tom_1", (
        "The biggest one is the methodology. We originally planned to recruit "
        "forty participants for the survey, but..."
    )),
    ("s3_chen_2", (
        "Before we get to numbers, I should say that with a student project of this kind, "
        "a sample of thirty to forty is quite adequate. "
        "I actually believe that sample size is sufficient for a valid conclusion, "
        "provided your sampling approach is sound."
    )),
    ("s3_priya_2", "That's reassuring, thank you. Actually, Tom came up with a useful suggestion about the design."),
    ("s3_tom_2", (
        "Yes, I suggested using a control group to compare against the experimental group. "
        "That way we can more clearly attribute any changes in behaviour to the intervention itself, "
        "rather than external factors."
    )),
    ("s3_chen_3", (
        "That's an excellent idea, Tom. A control group will significantly strengthen your findings. "
        "Now, Priya, you mentioned issues. What else were you concerned about?"
    )),
    ("s3_priya_3", (
        "Well, I'm concerned that the data collection period is too short. "
        "We only have three weeks to gather responses, and I worry that won't capture any trends over time."
    )),
    ("s3_chen_4", (
        "That's a fair concern. For a longitudinal element, you're right, three weeks is quite limited. "
        "But for a snapshot study, it can be sufficient if your questions are well designed."
    )),
    ("s3_priya_4", (
        "Which brings me to the questionnaire itself. We've drafted it, "
        "but we're not entirely confident in the wording of a couple of questions."
    )),
    ("s3_chen_5", (
        "My strong recommendation would be to pilot the survey with a small group first, "
        "perhaps five to ten people who aren't part of your final sample. "
        "That will surface any confusing phrasing very quickly."
    )),
    ("s3_priya_5", (
        "That's a great idea. I'll revise the wording of the two problematic questions "
        "before we run the pilot. I think questions four and seven need clearer language."
    )),
    ("s3_chen_6", (
        "Good. And Tom, make sure the revised version goes through Priya before it is distributed. "
        "You both need to agree on the final wording."
    )),

    ("s3_map_intro", (
        "Before you hear the rest of the discussion, you have some time to look at "
        "Questions twenty-six to thirty."
    )),
    ("s3_map_pause", ". . . . . . . . . . . . . . . . . . . . . ."),
    ("s3_map_now", "Now listen and answer Questions twenty-six to thirty."),

    ("s3_chen_7", (
        "Now, I understand the original topic of your project was rather different. "
        "What happened there?"
    )),
    ("s3_tom_3", (
        "Yes, we originally wanted to study stress responses in primary school children. "
        "But the university ethics committee rejected that proposal because it involved minors "
        "and required parental consent at a scale we couldn't manage in the timeframe."
    )),
    ("s3_chen_8", (
        "I see. Well, the current topic, social media use and self-esteem in undergraduates, "
        "is actually very rich ground."
    )),
    ("s3_priya_6", (
        "We were also debating whether to supplement the survey with observational data. "
        "What's your view on that?"
    )),
    ("s3_chen_9", (
        "The main advantage of observational methods is that they capture behaviour in a natural setting. "
        "People aren't performing for a questionnaire. "
        "However, they're time-intensive, so I'd be cautious given your deadline."
    )),
    ("s3_tom_4", (
        "That's true. We might just stick with the survey and interviews then. "
        "Speaking of which, I've been transcribing the interviews we've already conducted, "
        "and some of the recordings are quite unclear in terms of audio quality. "
        "I'm struggling to transcribe a few sections accurately."
    )),
    ("s3_chen_10", (
        "That's an important issue to address. For the ones you can't fully transcribe, "
        "note the gaps clearly in your methodology. Don't guess or paraphrase."
    )),
    ("s3_priya_7", (
        "Doctor Chen, you mentioned in our last meeting that the final report should "
        "acknowledge any weaknesses. Should we have a specific section for that?"
    )),
    ("s3_chen_11", (
        "Absolutely. I want you to include a section that explicitly acknowledges the study's limitations, "
        "sample size, data collection period, any issues with instruments. "
        "Examiners expect that level of critical self-reflection in good research."
    )),
    ("s3_tom_5", (
        "Understood. One last thing. When is the draft literature review due? "
        "I thought it was end of the week, but Priya thought it was next Monday."
    )),
    ("s3_chen_12", (
        "It's due the following Monday, so you have a little more time than you might have thought. "
        "But don't leave it too late; the literature review really does underpin the rest of your analysis."
    )),
    ("s3_priya_8", "That's a relief. We'll make sure it's ready by then."),
    ("s3_chen_13", (
        "Good. Send it to me by the end of Monday and I'll return feedback within two days."
    )),
    ("s3_tom_6", "Thank you very much, Doctor Chen."),
    ("s3_chen_14", "Good luck with it. See you next week."),

    ("s3_end", (
        "That is the end of Section Three. "
        "You now have half a minute to check your answers."
    )),
    ("s3_check_pause", ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ."),

    # ── SECTION 4 ──────────────────────────────────────────────────────────────
    ("s4_intro", (
        "Section Four. You will hear part of a university lecture on urban water management "
        "and sustainable cities. "
        "First you have some time to look at Questions thirty-one to forty."
    )),
    ("s4_pause_review", ". . . . . . . . . . . . . . . . . . . . . ."),
    ("s4_now", "Now listen carefully and answer Questions thirty-one to forty."),

    ("s4_lec_1", (
        "Good afternoon, everyone. Today I want to talk about a challenge that is becoming "
        "increasingly urgent in the twenty-first century: how cities manage their water. "
        "Not just supplying enough clean water, but also dealing with excess water, flooding, "
        "and the growing strain on ageing infrastructure."
    )),
    ("s4_lec_2", (
        "Let me start with some background. More than half the world's population now lives in cities, "
        "and that figure is projected to reach two-thirds by twenty fifty. "
        "This places enormous pressure on freshwater resources and drainage systems "
        "designed decades, sometimes centuries, ago."
    )),
    ("s4_lec_3", (
        "One of the core concepts in this field is surface runoff. "
        "This is the term we use for rainfall that flows across hard surfaces, "
        "roads, pavements, rooftops, and enters the drainage network. "
        "Unlike natural land, which absorbs water, urban surfaces are largely impermeable, "
        "meaning rainfall has nowhere to go except the drains."
    )),
    ("s4_lec_4", (
        "One increasingly popular solution is permeable paving. "
        "By replacing solid concrete surfaces with materials that allow water to seep through, "
        "cities can reduce the volume of surface runoff entering drainage systems, "
        "thereby reducing flood risk during heavy rainfall."
    )),
    ("s4_lec_5", (
        "When we talk about how well a city can deal with water-related disruptions, "
        "whether floods, droughts or infrastructure failure, "
        "we're referring to the city's water resilience. "
        "This concept recognises that we can't eliminate every risk, "
        "but we can design cities to withstand and recover from water-related disruptions "
        "more quickly and at lower cost."
    )),
    ("s4_lec_6", (
        "Now, what is driving much of this crisis? "
        "While climate change is making extreme weather events more frequent and severe, "
        "many researchers argue that population growth is actually the leading cause "
        "of freshwater scarcity in rapidly growing cities, "
        "particularly across South and Southeast Asia and sub-Saharan Africa, "
        "where infrastructure investment has not kept pace with urban expansion."
    )),
    ("s4_lec_7", (
        "Let me turn now to some specific examples. "
        "On your handout you'll see a table comparing three cities and their water management approaches."
    )),
    ("s4_lec_8", (
        "Singapore is one of the most water-stressed nations in the world, "
        "a densely populated island with limited natural freshwater. "
        "Their response has been the N-E-Water programme: "
        "an advanced water recycling initiative that turns treated wastewater into drinking-quality water. "
        "The reported benefit of this approach has been water independence. "
        "Singapore now meets a significant portion of its water demand domestically, "
        "reducing its reliance on imported water from neighbouring Malaysia."
    )),
    ("s4_lec_9", (
        "Copenhagen has faced a different challenge: increasingly severe flooding from extreme rainfall events, "
        "a problem that became acute after devastating floods in twenty eleven. "
        "Their response was to develop a cloudburst management system, "
        "a comprehensive urban plan that uses parks, roads and channels to direct floodwater "
        "away from homes and infrastructure during heavy rain. "
        "The reported benefit has been dramatically reduced flood damage costs "
        "since the programme was implemented."
    )),
    ("s4_lec_10", (
        "Mumbai presents yet another scenario. "
        "The city has long struggled with seasonal flooding linked to its monsoon climate "
        "and overwhelmed drainage systems. "
        "In recent years, the city has invested in upgrading its drainage tunnels beneath the city. "
        "The key benefit reported by city engineers has been faster flood recovery. "
        "The time taken for floodwater to drain after heavy rain has been significantly reduced."
    )),
    ("s4_lec_11", (
        "Now let me take you through the flowchart on your sheet, "
        "which illustrates the stages of implementing a sustainable urban water cycle."
    )),
    ("s4_lec_12", (
        "The process begins with rainfall being collected from rooftops and hard surfaces. "
        "Before this water can enter storage tanks, it passes through constructed wetlands, "
        "engineered ecosystems of plants, gravel and microorganisms "
        "that filter pollutants such as heavy metals, oils and pathogens from the runoff."
    )),
    ("s4_lec_13", (
        "Once filtered and stored, the water is distributed to households and industry "
        "via smart metering, a digital monitoring system that tracks consumption in real time, "
        "identifies leaks, and manages distribution efficiently to avoid waste."
    )),
    ("s4_lec_14", (
        "Finally, the wastewater produced by households and industry is fed into a treatment process, "
        "and through biogas generation, the organic matter in wastewater is converted into methane gas, "
        "which can then be burned to generate electricity. "
        "Enough, in some systems, to power the treatment facility itself, "
        "making the entire cycle largely self-sustaining."
    )),
    ("s4_lec_15", (
        "These approaches represent the frontier of what engineers and urban planners "
        "call the circular water economy: a system where water is treated as a resource "
        "to be used, recovered and reused, rather than simply disposed of. "
        "I'll leave you with that thought, and we'll continue next week "
        "with a detailed case study of the Netherlands, "
        "arguably the world's most sophisticated water management nation. "
        "Read chapters seven and eight of the course textbook before our next session."
    )),

    ("s4_end", (
        "That is the end of the listening test. "
        "You now have ten minutes to transfer your answers to the answer sheet."
    )),
    ("s4_final_pause", (
        ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "
        ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "
        ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "
        ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "
        ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "
        ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
    )),
]

# ══════════════════════════════════════════════════════════════════════════════
#  MAIN
# ══════════════════════════════════════════════════════════════════════════════

def main():
    print("=" * 60)
    print("IELTS Test 002 Audio Generator")
    print(f"Output: {OUTPUT_FILE}")
    print("=" * 60)

    mp3_parts = []
    total = len(SEGMENTS)

    for i, (label, text) in enumerate(SEGMENTS, 1):
        print(f"[{i}/{total}] {label}")
        try:
            path = tts(text, f"{i:03d}_{label}.mp3")
            mp3_parts.append(path)
        except Exception as e:
            print(f"  WARNING: Failed to generate {label}: {e}")
            # Skip and continue – don't abort the whole run
            time.sleep(2)

    concat_mp3s(mp3_parts, OUTPUT_FILE)
    print("\nAudio generation complete!")
    print(f"Place the file at: public/audio/listening/test002.mp3")
    print("It is already saved there.")

if __name__ == "__main__":
    main()
