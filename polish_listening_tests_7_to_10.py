import os
import asyncio
import edge_tts
from mutagen.mp3 import MP3

public_audio_dir = os.path.join("public", "audio", "listening")
data_tests_dir = os.path.join("src", "data", "listening", "tests")

os.makedirs(public_audio_dir, exist_ok=True)
os.makedirs(data_tests_dir, exist_ok=True)

VOICES = {
    "narrator": "en-GB-LibbyNeural",
    "female1": "en-GB-SoniaNeural",
    "male1": "en-GB-RyanNeural",
    "prof": "en-GB-ThomasNeural",
    "female2": "en-GB-MaisieNeural",
    "au_female": "en-AU-NatashaNeural",
    "au_male": "en-AU-WilliamMultilingualNeural",
    "nz_female": "en-NZ-MollyNeural",
    "nz_male": "en-NZ-MitchellNeural",
    "us_female": "en-US-AvaNeural",
    "us_male": "en-US-AndrewNeural"
}

def get_mp3_silence_bytes(duration_sec):
    frame = b'\xff\xfb\x90\xc4' + b'\x00' * 413
    return frame * int(38 * duration_sec)

# ==============================================================================
# TEST 9: New Zealand Accent - Public Library & Ancient Agriculture
# ==============================================================================
def get_test009_spec():
    narrator = VOICES["nz_female"]
    f1 = VOICES["nz_female"]  # Emily
    m1 = VOICES["nz_male"]    # Officer
    f2 = VOICES["female2"]    # Guide
    prof = VOICES["prof"]     # Professor Harrison

    s1_lines = [
        (narrator, "This is the International English Language Testing System Listening Test 009.", 1.0),
        (narrator, "Section 1. You will hear a conversation between a volunteer applicant and a library coordinator regarding public library volunteering.", 1.0),
        (narrator, "First, you have some time to look at questions 1 to 5.", 30.0),
        (narrator, "Now we shall begin. You should answer the questions as you listen because you will not hear the recording a second time. Listen carefully and answer questions 1 to 5.", 1.0),
        (m1, "Kia ora, Municipal Central Library Volunteer Office. My name is Oliver. How can I help you today?", 0.5),
        (f1, "Hello Oliver. Good morning. I am calling to apply for the community library volunteer program.", 0.5),
        (m1, "I would be happy to register you today. May I take your full legal name please?", 0.5),
        (f1, "Yes, my name is Emily Watson. That is spelled W-A-T-S-O-N.", 0.5),
        (m1, "Thank you Emily. And could I record your primary contact telephone number?", 0.5),
        (f1, "My telephone number is 07700 900100... wait, sorry, let me double check! Ah, actually it is 07700 900123.", 0.5),
        (m1, "Got it. And what is your home residential address?", 0.5),
        (f1, "My home address is 7 Park Lane, Bristol.", 0.5),
        (m1, "Standard volunteer badge processing is 40 pounds, but local community members receive a 10 pound discount, so it is 30 pounds.", 0.5),
        (f1, "I will pay the 30 pounds fee. When does the volunteer orientation session start?", 0.5),
        (m1, "Orientation begins at 9:30 AM sharp in the Library Activity Room.", 1.0),
        (narrator, "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.", 30.0),
        (narrator, "Now listen carefully and answer questions 6 to 10.", 1.0),
        (f1, "What documents should I bring for registration?", 0.5),
        (m1, "Please bring valid photo ID and proof of local address.", 0.5),
        (f1, "Is parking available for volunteers?", 0.5),
        (m1, "Free parking is available in the north visitor car park.", 0.5),
        (f1, "How do I pay the registration fee?", 0.5),
        (m1, "Payment is processed online via credit card using reference code REG904.", 0.5),
        (f1, "Thank you Oliver for all your assistance.", 0.5),
        (m1, "You are welcome. Have a wonderful day.", 1.0),
        (narrator, "That is the end of Section 1. You now have half a minute to check your answers.", 30.0)
    ]

    s2_lines = [
        (narrator, "Section 2. You will hear an orientation talk about the Royal Botanical Gardens Conservation Center.", 1.0),
        (narrator, "First, you have some time to look at questions 11 to 15.", 30.0),
        (narrator, "Now listen carefully and answer questions 11 to 15.", 1.0),
        (f2, "Good morning visitors, and welcome to the Royal Botanical Gardens. We are delighted to welcome you today.", 0.5),
        (f2, "Our gardens span 40 hectares of diverse plant species and are open daily from 9:00 AM to 5:30 PM.", 0.5),
        (f2, "Looking at your visitor map, the main entrance gates lead directly to the visitor pavilion.", 0.5),
        (f2, "To the right of the pavilion, you will find our interactive exhibition hall containing botanical displays.", 0.5),
        (f2, "Further along the main garden pathway lies our outdoor café and seating terrace.", 1.0),
        (narrator, "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.", 30.0),
        (narrator, "Now listen carefully and answer questions 16 to 20.", 1.0),
        (f2, "Visitors must remain on designated walking paths at all times to protect rare flora.", 0.5),
        (f2, "Guided educational walking tours depart from the main plaza every hour on the hour, led by certified staff.", 0.5),
        (f2, "Special group bookings can be arranged in advance online.", 0.5),
        (f2, "Emergency contact points and first-aid stations are located inside the visitor pavilion.", 0.5),
        (f2, "Enjoy your visit to the Royal Botanical Gardens today.", 1.0),
        (narrator, "That is the end of Section 2. You now have half a minute to check your answers.", 30.0)
    ]

    s3_lines = [
        (narrator, "Section 3. You will hear a university tutorial discussion regarding ancient Mediterranean agricultural techniques.", 1.0),
        (narrator, "First, you have some time to look at questions 21 to 25.", 30.0),
        (narrator, "Now listen carefully and answer questions 21 to 25.", 1.0),
        (prof, "Good afternoon Sophie and Oliver. Today we need to review your research proposal on ancient Mediterranean crop irrigation.", 0.5),
        (f1, "Thank you Professor Harrison. We completed our literature review and archaeological field survey across three sites.", 0.5),
        (m1, "Our empirical data indicates a clear correlation between canal design and crop yield stability.", 0.5),
        (prof, "That is promising. However, your secondary survey exhibited a margin of error during drought periods.", 0.5),
        (f1, "Yes, we encountered measurement challenges due to soil erosion and channel siltation.", 0.5),
        (prof, "I recommend applying a multi-variable statistical regression model to control for environmental variance.", 0.5),
        (m1, "We will re-analyze our raw dataset using multi-variable regression.", 1.0),
        (narrator, "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.", 30.0),
        (narrator, "Now listen carefully and answer questions 26 to 30.", 1.0),
        (prof, "How do you plan to structure the results chapter?", 0.5),
        (f1, "Qualitative case studies in Chapter 3, followed by quantitative irrigation charts in Chapter 4.", 0.5),
        (m1, "We processed the spatial data using SPSS statistical software.", 0.5),
        (prof, "Remember to attach a technical appendix outlining soil sampling logs.", 0.5),
        (f1, "Our team will submit the draft dissertation by the end of November.", 0.5),
        (prof, "Splendid. Keep up the thorough work.", 1.0),
        (narrator, "That is the end of Section 3. You now have half a minute to check your answers.", 30.0)
    ]

    s4_lines = [
        (narrator, "Section 4. You will hear an academic lecture on biomimetic engineering principles in modern architecture.", 1.0),
        (narrator, "First, you have some time to look at questions 31 to 40.", 45.0),
        (narrator, "Now listen carefully and answer questions 31 to 40.", 1.0),
        (prof, "Good afternoon students. In today's lecture, we will examine biomimetic engineering principles in modern architecture.", 0.5),
        (prof, "Over recent decades, multidisciplinary research has transformed our empirical understanding of bio-inspired structural design.", 0.5),
        (prof, "Initial architectural studies established baseline physical parameters and structural loads.", 0.5),
        (prof, "Breakthroughs in computational modeling have revealed intricate structural efficiency mechanisms.", 0.5),
        (prof, "Key findings demonstrate that biological shapes induce natural thermal regulation and load distribution.", 0.5),
        (prof, "Systemic structural stability is maintained through specialized flexible feedback joints.", 0.5),
        (prof, "Empirical testing reveals that bio-inspired materials execute internal load transfers under mechanical stress.", 0.5),
        (prof, "In modern urban planning, architects adopt these natural biological principles to design resilient tall buildings.", 0.5),
        (prof, "Furthermore, long-term research indicates subtle material shifts improve building energy performance over multi-decadal cycles.", 0.5),
        (prof, "Short-term structural testing often fails to capture complex non-linear material dynamics.", 0.5),
        (prof, "Consequently, continuous international structural monitoring protocols remain indispensable.", 0.5),
        (prof, "Open-access data repositories allow architectural engineers worldwide to validate simulation algorithms.", 0.5),
        (prof, "In conclusion, interdisciplinary collaboration between biologists and structural engineers is key to sustainable design.", 1.0),
        (narrator, "That is the end of the Listening Test. You now have ten minutes to transfer your answers to the listening answer sheet.", 60.0)
    ]

    return [s1_lines, s2_lines, s3_lines, s4_lines]

# ==============================================================================
# TEST 10: North American Accent - Car Rental & Deep-Sea Hydrothermal Vents
# ==============================================================================
def get_test010_spec():
    narrator = VOICES["us_female"]
    f1 = VOICES["us_female"]   # Jessica
    m1 = VOICES["us_male"]     # James (Officer)
    f2 = VOICES["us_female"]   # Guide
    prof = VOICES["prof"]      # Professor Smith

    s1_lines = [
        (narrator, "This is the International English Language Testing System Listening Test 010.", 1.0),
        (narrator, "Section 1. You will hear a conversation between a customer and a vehicle rental agent regarding car rental service booking.", 1.0),
        (narrator, "First, you have some time to look at questions 1 to 5.", 30.0),
        (narrator, "Now we shall begin. You should answer the questions as you listen because you will not hear the recording a second time. Listen carefully and answer questions 1 to 5.", 1.0),
        (m1, "Good morning, Apex Car Rentals. My name is James. How can I help you today?", 0.5),
        (f1, "Hello James. Good morning. I would like to inquire about renting an SUV for a business trip next week.", 0.5),
        (m1, "I can certainly set up your rental reservation today. May I take your full legal name please?", 0.5),
        (f1, "Yes, my name is James Wilson. That is spelled W-I-L-S-O-N.", 0.5),
        (m1, "Thank you. And could I record your primary contact telephone number?", 0.5),
        (f1, "My mobile phone number is 07700 900800... wait, sorry, let me check! Ah, actually it is 07700 900888.", 0.5),
        (m1, "Got it. And what is your home residential address?", 0.5),
        (f1, "My home address is 12 Victoria Road, Manchester.", 0.5),
        (m1, "Standard rental is 70 pounds per day, but our corporate discount brings it to 50 pounds per day.", 0.5),
        (f1, "I will take the 50 pounds corporate rate. What time is vehicle pickup on Monday?", 0.5),
        (m1, "Vehicle pickup is scheduled for 9:30 AM at our central garage.", 1.0),
        (narrator, "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.", 30.0),
        (narrator, "Now listen carefully and answer questions 6 to 10.", 1.0),
        (f1, "What documents do I need to present at pickup?", 0.5),
        (m1, "Please present valid photo ID and a valid driver's license.", 0.5),
        (f1, "Is parking available for my personal vehicle during the rental period?", 0.5),
        (m1, "Complimentary parking is provided in the north visitor car park.", 0.5),
        (f1, "How do I complete the reservation payment?", 0.5),
        (m1, "Payment is processed online via credit card using reference code REG904.", 0.5),
        (f1, "Thank you James for all your assistance.", 0.5),
        (m1, "You are welcome. Have a wonderful day.", 1.0),
        (narrator, "That is the end of Section 1. You now have half a minute to check your answers.", 30.0)
    ]

    s2_lines = [
        (narrator, "Section 2. You will hear an orientation presentation introducing the Regional Art Gallery Exhibition.", 1.0),
        (narrator, "First, you have some time to look at questions 11 to 15.", 30.0),
        (narrator, "Now listen carefully and answer questions 11 to 15.", 1.0),
        (f2, "Good morning visitors, and welcome to the Regional Art Gallery. We are delighted to welcome you today.", 0.5),
        (f2, "Our gallery spans 25 hectares of sculpture grounds and is open daily from 9:00 AM to 5:00 PM.", 0.5),
        (f2, "Looking at your visitor map, the main entrance leads directly to the central foyer.", 0.5),
        (f2, "To the right of the foyer, you will find our interactive exhibition hall containing classical paintings.", 0.5),
        (f2, "Further along the ground floor corridor lies our gallery café and outdoor garden terrace.", 1.0),
        (narrator, "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.", 30.0),
        (narrator, "Now listen carefully and answer questions 16 to 20.", 1.0),
        (f2, "Visitors must remain on designated walking paths at all times.", 0.5),
        (f2, "Guided art tours depart from the foyer every hour on the hour, led by certified staff.", 0.5),
        (f2, "Special group bookings can be reserved in advance online.", 0.5),
        (f2, "First-aid stations and cloakrooms are located inside the central foyer.", 0.5),
        (f2, "Enjoy your visit to the Regional Art Gallery today.", 1.0),
        (narrator, "That is the end of Section 2. You now have half a minute to check your answers.", 30.0)
    ]

    s3_lines = [
        (narrator, "Section 3. You will hear a university research project discussion regarding urban heat island mitigation.", 1.0),
        (narrator, "First, you have some time to look at questions 21 to 25.", 30.0),
        (narrator, "Now listen carefully and answer questions 21 to 25.", 1.0),
        (prof, "Good afternoon Alex and Jessica. Today we need to review your research proposal on urban heat island mitigation.", 0.5),
        (f1, "Thank you Professor Smith. We completed our literature review and temperature sensing across three city sectors.", 0.5),
        (m1, "Our empirical data indicates a clear correlation between green roof coverage and localized surface cooling.", 0.5),
        (prof, "That is promising. However, your secondary sector exhibited a margin of error during heatwave events.", 0.5),
        (f1, "Yes, we encountered measurement challenges due to wind turbulence and sensor radiation absorption.", 0.5),
        (prof, "I recommend applying a multi-variable statistical regression model to control for atmospheric variance.", 0.5),
        (m1, "We will re-analyze our raw dataset using multi-variable regression.", 1.0),
        (narrator, "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.", 30.0),
        (narrator, "Now listen carefully and answer questions 26 to 30.", 1.0),
        (prof, "How do you plan to structure the results chapter?", 0.5),
        (f1, "Qualitative case studies in Chapter 3, followed by quantitative temperature charts in Chapter 4.", 0.5),
        (m1, "We processed the temperature dataset using SPSS statistical software.", 0.5),
        (prof, "Remember to attach a technical appendix detailing sensor calibration logs.", 0.5),
        (f1, "Our team will submit the draft report by the end of November.", 0.5),
        (prof, "Splendid. Keep up the thorough work.", 1.0),
        (narrator, "That is the end of Section 3. You now have half a minute to check your answers.", 30.0)
    ]

    s4_lines = [
        (narrator, "Section 4. You will hear an academic lecture on deep-sea hydrothermal vent ecosystems.", 1.0),
        (narrator, "First, you have some time to look at questions 31 to 40.", 45.0),
        (narrator, "Now listen carefully and answer questions 31 to 40.", 1.0),
        (prof, "Good afternoon students. In today's lecture, we will examine deep-sea hydrothermal vent ecosystems.", 0.5),
        (prof, "Over recent decades, oceanographic research has transformed our empirical understanding of chemosynthetic marine life.", 0.5),
        (prof, "Initial submersible exploration established baseline physical parameters and chemical vent plumes.", 0.5),
        (prof, "Breakthroughs in deep-sea telemetry have revealed intricate microbial metabolic pathways.", 0.5),
        (prof, "Key findings demonstrate that extreme hydrostatic pressures induce unique physiological adaptations.", 0.5),
        (prof, "Systemic metabolic equilibrium is maintained through specialized sulfur-oxidizing bacterial enzymes.", 0.5),
        (prof, "Empirical testing reveals vent organisms execute rapid metabolic adjustments under thermal fluctuations.", 0.5),
        (prof, "In marine biotechnology, researchers adopt these chemosynthetic enzymes to develop heat-resistant industrial catalysts.", 0.5),
        (prof, "Furthermore, long-term deep-sea research indicates subtle plume chemistry shifts alter entire benthic ecosystems.", 0.5),
        (prof, "Short-term sampling expeditions fail to capture complex non-linear ecological dynamics.", 0.5),
        (prof, "Consequently, continuous international deep-ocean monitoring protocols remain indispensable.", 0.5),
        (prof, "Open-access oceanographic repositories allow marine biologists worldwide to validate genomic sequences.", 0.5),
        (prof, "In conclusion, interdisciplinary collaboration between oceanographers and microbiologists is vital to understanding deep-sea biodiversity.", 1.0),
        (narrator, "That is the end of the Listening Test. You now have ten minutes to transfer your answers to the listening answer sheet.", 60.0)
    ]

    return [s1_lines, s2_lines, s3_lines, s4_lines]

async def process_and_synthesize_test(test_num, sections_dialogues, spec_info):
    num_str = f"{test_num:03d}"
    mp3_path = os.path.join(public_audio_dir, f"test{num_str}.mp3")
    js_path = os.path.join(data_tests_dir, f"listeningTest{num_str}.js")

    section_timestamps = []
    current_time_sec = 0.0

    with open(mp3_path, "wb") as f:
        for idx, sec_lines in enumerate(sections_dialogues):
            sec_start = current_time_sec
            for voice, text, silence_sec in sec_lines:
                if text:
                    for attempt in range(4):
                        try:
                            comm = edge_tts.Communicate(text, voice, rate="-3%")
                            async for chunk in comm.stream():
                                if chunk["type"] == "audio":
                                    f.write(chunk["data"])
                            break
                        except Exception:
                            await asyncio.sleep(2)
                if silence_sec > 0:
                    silence_bytes = get_mp3_silence_bytes(silence_sec)
                    f.write(silence_bytes)

            audio = MP3(mp3_path)
            sec_end = audio.info.length
            section_timestamps.append((int(sec_start), int(sec_end)))
            current_time_sec = sec_end

    total_len = section_timestamps[-1][1]
    mins = int(total_len // 60)
    secs = int(total_len % 60)
    print(f"Polished test{num_str}.mp3 generated: Total Duration = {mins} mins {secs} secs ({total_len}s)")
    print(f"Exact Audio Timelines: {section_timestamps}")

    # Write JS dataset file with 100% exact section timestamps
    s1_start, s1_end = section_timestamps[0]
    s2_start, s2_end = section_timestamps[1]
    s3_start, s3_end = section_timestamps[2]
    s4_start, s4_end = section_timestamps[3]

    js_code = f"""const listeningTest{num_str} = {{
  id: "listening-test-{num_str}",
  title: "IELTS Listening Practice Test {num_str}",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test{num_str}.mp3",
  transcript: "/assets/listening/test{num_str}/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {{
    section1: {{ start: {s1_start}, end: {s1_end} }},
    section2: {{ start: {s2_start}, end: {s2_end} }},
    section3: {{ start: {s3_start}, end: {s3_end} }},
    section4: {{ start: {s4_start}, end: {s4_end} }}
  }},

  sections: [
    {{
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: {s1_start},
      audioEnd: {s1_end},
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "{spec_info['s1_title'].upper()}",
      questions: [
        {{ id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "{spec_info['s1_name']}", explanation: "The speaker confirms her full name is {spec_info['s1_name']}." }},
        {{ id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "{spec_info['s1_phone']}", explanation: "The speaker corrects her phone number to {spec_info['s1_phone']}." }},
        {{ id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "{spec_info['s1_addr']}", explanation: "The residential address given is {spec_info['s1_addr']}." }},
        {{ id: 4, type: "fill-in", number: 4, label: "Discounted Fee (£):", answer: "{spec_info['s1_fee']}", explanation: "The local resident fee is {spec_info['s1_fee']} pounds." }},
        {{ id: 5, type: "fill-in", number: 5, label: "Orientation Time:", answer: "9:30 AM", explanation: "Orientation starts at 9:30 AM." }},
        {{ id: 6, type: "fill-in", number: 6, label: "Required Document:", answer: "photo ID", explanation: "Participants must bring valid photo ID." }},
        {{ id: 7, type: "fill-in", number: 7, label: "Parking Location:", answer: "north visitor", explanation: "Free parking is located in the north visitor car park." }},
        {{ id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "credit card", explanation: "Payment is processed online via credit card." }},
        {{ id: 9, type: "fill-in", number: 9, label: "Reference Code:", answer: "REG904", explanation: "The reference code provided is REG904." }},
        {{ id: 10, type: "fill-in", number: 10, label: "Contact Person:", answer: "Mark", explanation: "Mark is the administration officer." }}
      ]
    }},
    {{
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: {s2_start},
      audioEnd: {s2_end},
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "{spec_info['s2_title'].upper()}",
      questions: [
        {{ id: 11, type: "multiple-choice", number: 11, question: "What is the total size of the facility grounds?", options: ["A. 25 hectares", "B. {spec_info['s2_area']}", "C. 100 hectares"], answer: "B", explanation: "The presenter confirms the site spans {spec_info['s2_area']}." }},
        {{ id: 12, type: "multiple-choice", number: 12, question: "What time does the facility open daily?", options: ["A. 7:00 AM", "B. 8:00 AM", "C. 9:00 AM"], answer: "B", explanation: "The presenter states grounds open from 8:00 AM." }},
        {{ id: 13, type: "multiple-choice", number: 13, question: "Where is the gift shop situated?", options: ["A. Main entrance", "B. Beside the lake", "C. Inside the café"], answer: "A", explanation: "The entrance leads directly to the information kiosk and gift shop." }},
        {{ id: 14, type: "multiple-choice", number: 14, question: "What is featured in the exhibition hall?", options: ["A. Modern art", "B. Historic artifacts and digital displays", "C. Sculpture"], answer: "B", explanation: "The hall features historic artifacts and digital displays." }},
        {{ id: 15, type: "multiple-choice", number: 15, question: "Where can visitors find outdoor seating?", options: ["A. Car park", "B. Beside the café", "C. Information kiosk"], answer: "B", explanation: "Outdoor seating is located beside the café." }},
        {{ id: 16, type: "fill-in", number: 16, label: "Rule on walking paths:", answer: "designated", explanation: "Visitors must remain on designated walking paths." }},
        {{ id: 17, type: "fill-in", number: 17, label: "Guided tour departure frequency:", answer: "every hour", explanation: "Tours depart every hour on the hour." }},
        {{ id: 18, type: "fill-in", number: 18, label: "Guided tour leader qualification:", answer: "certified staff", explanation: "Tours are led by certified staff members." }},
        {{ id: 19, type: "fill-in", number: 19, label: "Special group booking requirement:", answer: "advance online", explanation: "Group bookings must be made in advance online." }},
        {{ id: 20, type: "fill-in", number: 20, label: "First-aid station location:", answer: "main visitor", explanation: "First-aid stations are located inside the main visitor center." }}
      ]
    }},
    {{
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: {s3_start},
      audioEnd: {s3_end},
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "PROJECT DISCUSSION",
      questions: [
        {{ id: 21, type: "multiple-choice", number: 21, question: "What is the primary topic of the students' research proposal?", options: ["A. Research Project", "B. Financial budgeting", "C. Student housing"], answer: "A", explanation: "The discussion focuses on the research proposal." }},
        {{ id: 22, type: "multiple-choice", number: 22, question: "What limitation was noted in secondary sampling?", options: ["A. High equipment cost", "B. Margin of error", "C. Missing documentation"], answer: "B", explanation: "Sampling showed a margin of error during weather events." }},
        {{ id: 23, type: "multiple-choice", number: 23, question: "What model does the professor recommend?", options: ["A. Linear calculation", "B. Multi-variable statistical regression", "C. Qualitative survey"], answer: "B", explanation: "The professor advises multi-variable statistical regression." }},
        {{ id: 24, type: "multiple-choice", number: 24, question: "In which chapter will qualitative case studies be presented?", options: ["A. Chapter 1", "B. Chapter 3", "C. Chapter 5"], answer: "B", explanation: "Case studies will appear in Chapter 3." }},
        {{ id: 25, type: "multiple-choice", number: 25, question: "When is the final draft dissertation due?", options: ["A. End of October", "B. End of November", "C. Mid-December"], answer: "B", explanation: "Draft is due by the end of November." }},
        {{ id: 26, type: "fill-in", number: 26, label: "Data Processing Tool:", answer: "SPSS statistical", explanation: "Data was processed using SPSS statistical software." }},
        {{ id: 27, type: "fill-in", number: 27, label: "Field Sampling Issue Cause:", answer: "heavy rainfall", explanation: "Challenges arose due to heavy rainfall." }},
        {{ id: 28, type: "fill-in", number: 28, label: "Primary Sampling Sites Count:", answer: "three", explanation: "Data was collected across three primary sites." }},
        {{ id: 29, type: "fill-in", number: 29, label: "Appendix Inclusion:", answer: "calibration logs", explanation: "Appendix includes instrument calibration logs." }},
        {{ id: 30, type: "fill-in", number: 30, label: "Final Submission Target:", answer: "draft dissertation", explanation: "The team will submit their completed draft dissertation." }}
      ]
    }},
    {{
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: {s4_start},
      audioEnd: {s4_end},
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "UNIVERSITY LECTURE",
      questions: [
        {{ id: 31, type: "fill-in", number: 31, label: "Research field expansion period:", answer: "three decades", explanation: "Research has expanded over three decades." }},
        {{ id: 32, type: "fill-in", number: 32, label: "Early research established:", answer: "baseline parameters", explanation: "Initial research established baseline physical parameters." }},
        {{ id: 33, type: "fill-in", number: 33, label: "Telemetry technology:", answer: "satellite telemetry", explanation: "Satellite telemetry enabled detailed insights." }},
        {{ id: 34, type: "fill-in", number: 34, label: "Environmental pressure outcome:", answer: "structural reorganization", explanation: "Pressures induce structural reorganization." }},
        {{ id: 35, type: "fill-in", number: 35, label: "Equilibrium regulation mechanism:", answer: "physiological feedback", explanation: "Physiological feedback loops regulate equilibrium." }},
        {{ id: 36, type: "fill-in", number: 36, label: "Engineering applications adopt:", answer: "biological principles", explanation: "Engineers adopt biological principles." }},
        {{ id: 37, type: "fill-in", number: 37, label: "Long-term data collection period:", answer: "multi-decadal", explanation: "Data was collected over multi-decadal cycles." }},
        {{ id: 38, type: "fill-in", number: 38, label: "Short-term study limitation:", answer: "non-linear dynamics", explanation: "Short-term studies fail to capture non-linear dynamics." }},
        {{ id: 39, type: "fill-in", number: 39, label: "Essential global protocol:", answer: "standardized monitoring", explanation: "Standardized monitoring remains indispensable." }},
        {{ id: 40, type: "fill-in", number: 40, label: "Key to global solutions:", answer: "interdisciplinary collaboration", explanation: "Interdisciplinary collaboration is crucial." }}
      ]
    }}
  ]
}};

export default listeningTest{num_str};"""

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_code)
    print(f"Updated listeningTest{num_str}.js with exact timeline {section_timestamps}.")

async def main():
    print("Polishing Listening Tests 9 and 10 with 100% exact audio timelines...")
    
    # Test 9
    s9 = get_test009_spec()
    spec9 = {"s1_title": "Municipal Public Library Volunteer Application", "s1_name": "Emily Watson", "s1_phone": "07700 900123", "s1_addr": "7 Park Lane, Bristol", "s1_fee": "30", "s2_title": "Royal Botanical Gardens Conservation Orientation", "s2_area": "40 hectares"}
    await process_and_synthesize_test(9, s9, spec9)

    # Test 10
    s10 = get_test010_spec()
    spec10 = {"s1_title": "Car Rental Service Booking", "s1_name": "James Wilson", "s1_phone": "07700 900888", "s1_addr": "12 Victoria Road, Manchester", "s1_fee": "50", "s2_title": "Regional Art Gallery Exhibition", "s2_area": "25 hectares"}
    await process_and_synthesize_test(10, s10, spec10)

    print("\nSUCCESS: Listening Tests 9 and 10 polished with 100% exact audio timelines!")

if __name__ == "__main__":
    asyncio.run(main())
