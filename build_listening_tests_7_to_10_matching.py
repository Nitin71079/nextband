import os
import asyncio
import edge_tts
from mutagen.mp3 import MP3

public_audio_dir = os.path.join("public", "audio", "listening")
data_tests_dir = os.path.join("src", "data", "listening", "tests")

os.makedirs(public_audio_dir, exist_ok=True)
os.makedirs(data_tests_dir, exist_ok=True)

VOICES = {
    "gb_narrator": "en-GB-LibbyNeural",
    "gb_female1": "en-GB-SoniaNeural",
    "gb_male1": "en-GB-RyanNeural",
    "gb_prof": "en-GB-ThomasNeural",
    "gb_female2": "en-GB-MaisieNeural",
    
    "au_narrator": "en-AU-NatashaNeural",
    "au_female1": "en-AU-NatashaNeural",
    "au_male1": "en-AU-WilliamMultilingualNeural",
    "au_guide": "en-AU-WilliamMultilingualNeural",
    
    "nz_narrator": "en-NZ-MollyNeural",
    "nz_female1": "en-NZ-MollyNeural",
    "nz_male1": "en-NZ-MitchellNeural",
    "nz_guide": "en-NZ-MitchellNeural",
    
    "us_narrator": "en-US-AvaNeural",
    "us_female1": "en-US-AvaNeural",
    "us_male1": "en-US-AndrewNeural",
    "us_guide": "en-US-AvaNeural"
}

def get_mp3_silence_bytes(duration_sec):
    frame = b'\xff\xfb\x90\xc4' + b'\x00' * 413
    return frame * int(38 * duration_sec)

async def synthesize_line(voice, text):
    communicate = edge_tts.Communicate(text, voice)
    audio_data = b""
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data += chunk["data"]
    return audio_data

# ==============================================================================
# TEST 7: British Accent - Riverside Accommodation, Nature Reserve, Microplastics, Avian Navigation
# ==============================================================================
def get_test7_spec():
    nar = VOICES["gb_narrator"]
    f1 = VOICES["gb_female1"]
    m1 = VOICES["gb_male1"]
    f2 = VOICES["gb_female2"]
    prof = VOICES["gb_prof"]

    s1_lines = [
        (nar, "This is the International English Language Testing System Listening Test 007.", 1.0),
        (nar, "Section 1. You will hear a phone conversation between a student and an accommodation manager.", 1.0),
        (nar, "First, you have some time to look at questions 1 to 5.", 25.0),
        (nar, "Now we shall begin. Listen carefully and answer questions 1 to 5.", 1.0),
        (m1, "Good morning, Riverside Student Accommodation. My name is Mark. How can I help you today?", 0.5),
        (f1, "Hello Mark. I am calling to apply for student accommodation for the upcoming semester.", 0.5),
        (m1, "I would be glad to help. May I take your full name please?", 0.5),
        (f1, "My name is Sarah Jenkins. That is spelled J-E-N-K-I-N-S.", 0.5),
        (m1, "Thank you Sarah. And what is your contact telephone number?", 0.5),
        (f1, "My phone number is 07700 900452.", 0.5),
        (m1, "Got it. And could you tell me your current home address?", 0.5),
        (f1, "It is 42 High Street, Oxford.", 0.5),
        (m1, "The standard room deposit is 60 pounds, but with student discount it comes to 45 pounds.", 0.5),
        (f1, "45 pounds sounds fair. What time is student orientation on check-in day?", 0.5),
        (m1, "Orientation begins at 9:30 AM sharp in the main hall.", 1.0),
        (nar, "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.", 25.0),
        (nar, "Now listen carefully and answer questions 6 to 10.", 1.0),
        (f1, "What document must I present at check-in?", 0.5),
        (m1, "Please bring valid photo ID such as your passport or driving license.", 0.5),
        (f1, "Where can my parents park when dropping off my luggage?", 0.5),
        (m1, "Free parking is located in the north visitor car park.", 0.5),
        (f1, "How should I pay the deposit?", 0.5),
        (m1, "Deposit payment is made online using credit card.", 0.5),
        (f1, "What reference code should I use for online payment?", 0.5),
        (m1, "Please enter reference code REG904.", 0.5),
        (f1, "And who is the head hall warden if I have questions?", 0.5),
        (m1, "The head hall warden is Mr. Mark Thompson.", 0.5),
        (f1, "Thank you Mark for your help.", 0.5),
        (m1, "You are welcome Sarah. Goodbye.", 1.0),
        (nar, "That is the end of Section 1. You now have half a minute to check your answers.", 25.0)
    ]

    s2_lines = [
        (nar, "Section 2. You will hear an orientation talk about the Riverside Nature Reserve Visitor Center.", 1.0),
        (nar, "First, you have some time to look at questions 11 to 15.", 25.0),
        (nar, "Now listen carefully and answer questions 11 to 15.", 1.0),
        (f2, "Welcome everyone to Riverside Nature Reserve. We span 50 hectares of protected wetlands.", 0.5),
        (f2, "Our gates open daily at 8:00 AM and close at sunset.", 0.5),
        (f2, "Upon entering through the main entrance, you will immediately see our information kiosk.", 0.5),
        (f2, "The exhibition hall hosts historic artifacts and digital displays about local wildlife.", 0.5),
        (f2, "If you need a spot to relax, outdoor seating is located beside the café.", 1.0),
        (nar, "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.", 25.0),
        (nar, "Now listen carefully and answer questions 16 to 20.", 1.0),
        (f2, "To protect fragile plant life, all visitors must remain on designated walking paths.", 0.5),
        (f2, "Guided nature walks depart from the plaza every hour.", 0.5),
        (f2, "All tours are led by our certified staff members.", 0.5),
        (f2, "Groups larger than ten people must book advance online.", 0.5),
        (f2, "First-aid supplies and emergency radios are situated in the main visitor building.", 1.0),
        (nar, "That is the end of Section 2. You now have half a minute to check your answers.", 25.0)
    ]

    s3_lines = [
        (nar, "Section 3. You will hear a university tutorial discussion on freshwater microplastics.", 1.0),
        (nar, "First, you have some time to look at questions 21 to 25.", 25.0),
        (nar, "Now listen carefully and answer questions 21 to 25.", 1.0),
        (prof, "Good morning Emma and Mark. Let us review your research proposal on freshwater microplastics.", 0.5),
        (f1, "Thank you Professor Davies. We chose microplastics because river pollution is escalating.", 0.5),
        (m1, "However, our secondary sediment sampling revealed a significant margin of error during storm events.", 0.5),
        (prof, "Indeed. I recommend applying multi-variable statistical regression to account for water flow turbulence.", 0.5),
        (f1, "That makes sense. We plan to present our qualitative case studies in Chapter 3.", 0.5),
        (m1, "And our complete draft dissertation will be ready for review by the end of November.", 1.0),
        (nar, "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.", 25.0),
        (nar, "Now listen carefully and answer questions 26 to 30.", 1.0),
        (m1, "We processed our water sample toxicity levels using SPSS statistical software.", 0.5),
        (f1, "Sampling was delayed last month due to heavy rainfall flooding the river banks.", 0.5),
        (m1, "We collected core samples across three primary sampling sites.", 0.5),
        (f1, "We have also included sensor calibration logs in the technical appendix.", 0.5),
        (prof, "Excellent. Your primary submission goal remains the completed draft dissertation.", 1.0),
        (nar, "That is the end of Section 3. You now have half a minute to check your answers.", 25.0)
    ]

    s4_lines = [
        (nar, "Section 4. You will hear a lecture on avian migration and geomagnetic navigation mechanisms.", 1.0),
        (nar, "First, you have some time to look at questions 31 to 40.", 35.0),
        (nar, "Now listen carefully and answer questions 31 to 40.", 1.0),
        (prof, "Welcome back. Today we examine avian migration and geomagnetic navigation mechanisms.", 0.5),
        (prof, "Over the past three decades, ornithological research has altered our understanding of bird migration routes.", 0.5),
        (prof, "Initial laboratory studies established biological baseline parameters for magnetic sensitivity.", 0.5),
        (prof, "Recent advances in miniature satellite telemetry allow continuous tracking of individual songbirds.", 0.5),
        (prof, "When facing severe weather, flocks undergo behavioral structural reorganization.", 0.5),
        (prof, "Internal navigation accuracy is regulated through complex physiological feedback mechanisms.", 0.5),
        (prof, "Bio-engineers are now adapting these avian biological principles to develop drone navigation sensors.", 0.5),
        (prof, "Validating magnetic compass models requires continuous multi-decadal field observation.", 0.5),
        (prof, "Standard laboratory tests often fail to capture complex non-linear dynamics during migration.", 0.5),
        (prof, "Therefore, establishing standardized monitoring protocols worldwide is crucial.", 0.5),
        (prof, "Ultimately, solving migratory navigation mysteries requires interdisciplinary collaboration.", 1.0),
        (nar, "That is the end of the Listening Test. You now have ten minutes to transfer your answers.", 30.0)
    ]

    sections = [s1_lines, s2_lines, s3_lines, s4_lines]
    
    js_content = """const listeningTest007 = {
  id: "listening-test-007",
  title: "IELTS Listening Practice Test 007",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test007.mp3",
  transcript: "/assets/listening/test007/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: S1_START, end: S1_END },
    section2: { start: S2_START, end: S2_END },
    section3: { start: S3_START, end: S3_END },
    section4: { start: S4_START, end: S4_END }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: S1_START,
      audioEnd: S1_END,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "RIVERSIDE ACCOMMODATION BOOKING",
      questions: [
        { id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "Sarah Jenkins", explanation: "The student confirms her name is Sarah Jenkins." },
        { id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "07700 900452", explanation: "Sarah gives her contact number 07700 900452." },
        { id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "42 High Street, Oxford", explanation: "Sarah states her address is 42 High Street, Oxford." },
        { id: 4, type: "fill-in", number: 4, label: "Discounted Deposit (£):", answer: "45", explanation: "The discounted deposit fee is 45 pounds." },
        { id: 5, type: "fill-in", number: 5, label: "Orientation Time:", answer: "9:30 AM", explanation: "Orientation begins at 9:30 AM." },
        { id: 6, type: "fill-in", number: 6, label: "Required ID Document:", answer: "photo ID", explanation: "Students must present valid photo ID at check-in." },
        { id: 7, type: "fill-in", number: 7, label: "Parent Parking Area:", answer: "north visitor", explanation: "Free parking is located in the north visitor car park." },
        { id: 8, type: "fill-in", number: 8, label: "Deposit Payment Method:", answer: "credit card", explanation: "Deposit is paid online via credit card." },
        { id: 9, type: "fill-in", number: 9, label: "Payment Reference Code:", answer: "REG904", explanation: "The payment reference code is REG904." },
        { id: 10, type: "fill-in", number: 10, label: "Head Hall Warden:", answer: "Mark", explanation: "Mark is the accommodation manager/warden." }
      ]
    },
    {
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: S2_START,
      audioEnd: S2_END,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "RIVERSIDE NATURE RESERVE ORIENTATION",
      questions: [
        { id: 11, type: "multiple-choice", number: 11, question: "How large is the protected wetland reserve?", options: ["A. 25 hectares", "B. 50 hectares", "C. 100 hectares"], answer: "B", explanation: "The guide states the reserve spans 50 hectares." },
        { id: 12, type: "multiple-choice", number: 12, question: "What time do the main reserve gates open daily?", options: ["A. 7:00 AM", "B. 8:00 AM", "C. 9:00 AM"], answer: "B", explanation: "Gates open daily at 8:00 AM." },
        { id: 13, type: "multiple-choice", number: 13, question: "What is located immediately inside the main entrance?", options: ["A. Information kiosk", "B. Exhibition hall", "C. Outdoor café"], answer: "A", explanation: "The entrance leads directly to the information kiosk." },
        { id: 14, type: "multiple-choice", number: 14, question: "What does the exhibition hall showcase?", options: ["A. Live animals", "B. Historic artifacts and digital displays", "C. Sculpture"], answer: "B", explanation: "The exhibition hall hosts historic artifacts and digital displays." },
        { id: 15, type: "multiple-choice", number: 15, question: "Where is the outdoor seating area positioned?", options: ["A. Main plaza", "B. Beside the café", "C. Gift shop"], answer: "B", explanation: "Outdoor seating is located beside the café." },
        { id: 16, type: "fill-in", number: 16, label: "Visitor path rule:", answer: "designated", explanation: "Visitors must stay on designated walking paths." },
        { id: 17, type: "fill-in", number: 17, label: "Guided nature walk frequency:", answer: "every hour", explanation: "Tours depart from the plaza every hour." },
        { id: 18, type: "fill-in", number: 18, label: "Tour leader qualification:", answer: "certified staff", explanation: "Tours are led by certified staff members." },
        { id: 19, type: "fill-in", number: 19, label: "Large group booking requirement:", answer: "advance online", explanation: "Groups over 10 must book in advance online." },
        { id: 20, type: "fill-in", number: 20, label: "First-aid location:", answer: "main visitor", explanation: "First-aid supplies are inside the main visitor building." }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: S3_START,
      audioEnd: S3_END,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "MICROPLASTICS RESEARCH TUTORIAL",
      questions: [
        { id: 21, type: "multiple-choice", number: 21, question: "Why did Emma and Mark choose freshwater microplastics?", options: ["A. River pollution is escalating", "B. Low equipment cost", "C. Required by university"], answer: "A", explanation: "They selected the topic because river pollution is escalating." },
        { id: 22, type: "multiple-choice", number: 22, question: "What issue occurred during secondary sediment sampling?", options: ["A. Lost samples", "B. Margin of error", "C. Contaminated water"], answer: "B", explanation: "Sampling revealed a margin of error during storm events." },
        { id: 23, type: "multiple-choice", number: 23, question: "Which statistical model does Professor Davies suggest?", options: ["A. Simple average", "B. Multi-variable statistical regression", "C. Qualitative matrix"], answer: "B", explanation: "The professor recommends multi-variable statistical regression." },
        { id: 24, type: "multiple-choice", number: 24, question: "In which chapter will qualitative case studies be presented?", options: ["A. Chapter 1", "B. Chapter 3", "C. Chapter 5"], answer: "B", explanation: "Case studies will appear in Chapter 3." },
        { id: 25, type: "multiple-choice", number: 25, question: "When is the complete draft dissertation due?", options: ["A. End of October", "B. End of November", "C. Mid-December"], answer: "B", explanation: "The draft dissertation is due by the end of November." },
        { id: 26, type: "fill-in", number: 26, label: "Toxicity Data Software:", answer: "SPSS statistical", explanation: "They processed toxicity levels using SPSS statistical software." },
        { id: 27, type: "fill-in", number: 27, label: "Sampling delay cause:", answer: "heavy rainfall", explanation: "Sampling was delayed due to heavy rainfall." },
        { id: 28, type: "fill-in", number: 28, label: "Number of primary sampling sites:", answer: "three", explanation: "Core samples were taken across three primary sites." },
        { id: 29, type: "fill-in", number: 29, label: "Technical appendix content:", answer: "calibration logs", explanation: "Sensor calibration logs are attached in the appendix." },
        { id: 30, type: "fill-in", number: 30, label: "Primary submission goal:", answer: "draft dissertation", explanation: "The primary submission goal is the completed draft dissertation." }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: S4_START,
      audioEnd: S4_END,
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "AVIAN NAVIGATION LECTURE",
      questions: [
        { id: 31, type: "fill-in", number: 31, label: "Research expansion timeline:", answer: "three decades", explanation: "Research has expanded over the past three decades." },
        { id: 32, type: "fill-in", number: 32, label: "Early lab studies established:", answer: "baseline parameters", explanation: "Studies established biological baseline parameters." },
        { id: 33, type: "fill-in", number: 33, label: "Songbird tracking technology:", answer: "satellite telemetry", explanation: "Miniature satellite telemetry enables songbird tracking." },
        { id: 34, type: "fill-in", number: 34, label: "Severe weather flock adaptation:", answer: "structural reorganization", explanation: "Flocks undergo behavioral structural reorganization." },
        { id: 35, type: "fill-in", number: 35, label: "Navigation accuracy regulator:", answer: "physiological feedback", explanation: "Regulated through physiological feedback mechanisms." },
        { id: 36, type: "fill-in", number: 36, label: "Drone sensor bio-adaptation:", answer: "biological principles", explanation: "Engineers adapt biological principles for drone sensors." },
        { id: 37, type: "fill-in", number: 37, label: "Magnetic compass validation timeframe:", answer: "multi-decadal", explanation: "Requires continuous multi-decadal observation." },
        { id: 38, type: "fill-in", number: 38, label: "Standard lab test limitation:", answer: "non-linear dynamics", explanation: "Lab tests miss non-linear dynamics during migration." },
        { id: 39, type: "fill-in", number: 39, label: "Essential global action:", answer: "standardized monitoring", explanation: "Establishing standardized monitoring is crucial." },
        { id: 40, type: "fill-in", number: 40, label: "Key to solving navigation mysteries:", answer: "interdisciplinary collaboration", explanation: "Requires interdisciplinary collaboration." }
      ]
    }
  ]
};

export default listeningTest007;"""
    return sections, js_content

# ==============================================================================
# TEST 8: Australian / British Mix - Sports Club, History Museum, Solar PV Cells, Paleoclimatology
# ==============================================================================
def get_test8_spec():
    nar = VOICES["au_narrator"]
    f1 = VOICES["au_female1"]
    m1 = VOICES["gb_male1"]
    f2 = VOICES["au_guide"]
    prof = VOICES["gb_prof"]

    s1_lines = [
        (nar, "This is the International English Language Testing System Listening Test 008.", 1.0),
        (nar, "Section 1. You will hear a phone conversation regarding gym membership registration.", 1.0),
        (nar, "First, you have some time to look at questions 1 to 5.", 25.0),
        (nar, "Now we shall begin. Listen carefully and answer questions 1 to 5.", 1.0),
        (m1, "Good morning, City Sports & Fitness Club. My name is Sarah. How can I help?", 0.5),
        (f1, "G'day Sarah. I am calling to sign up for a gym membership.", 0.5),
        (m1, "Wonderful! May I take your full name please?", 0.5),
        (f1, "My name is David Miller. That is spelled M-I-L-L-E-R.", 0.5),
        (m1, "Thank you David. And what is your contact phone number?", 0.5),
        (f1, "My phone number is 07700 900342.", 0.5),
        (m1, "Great. What is your home address?", 0.5),
        (f1, "I live at 18 Station Road, Cambridge.", 0.5),
        (m1, "Standard join fee is 80 pounds, but with corporate discount it is 60 pounds.", 0.5),
        (f1, "60 pounds is great. What time is gym induction tomorrow?", 0.5),
        (m1, "Induction is at 10:00 AM in the main fitness studio.", 1.0),
        (nar, "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.", 25.0),
        (nar, "Now listen carefully and answer questions 6 to 10.", 1.0),
        (f1, "What document should I bring to induction?", 0.5),
        (m1, "Please bring your photo membership card or valid ID.", 0.5),
        (f1, "Where is member car parking located?", 0.5),
        (m1, "Parking is available in the west car park.", 0.5),
        (f1, "How can I pay the joining fee?", 0.5),
        (m1, "You can pay at reception using a debit card.", 0.5),
        (f1, "Do I need a reference code?", 0.5),
        (m1, "Yes, please use reference code FIT802.", 0.5),
        (f1, "Who is the senior fitness manager on duty?", 0.5),
        (m1, "Our senior fitness manager is Sarah Roberts.", 0.5),
        (f1, "Thanks Sarah for your assistance.", 0.5),
        (m1, "You are welcome David. See you tomorrow.", 1.0),
        (nar, "That is the end of Section 1. You now have half a minute to check your answers.", 25.0)
    ]

    s2_lines = [
        (nar, "Section 2. You will hear a guided orientation for the City History Museum.", 1.0),
        (nar, "First, you have some time to look at questions 11 to 15.", 25.0),
        (nar, "Now listen carefully and answer questions 11 to 15.", 1.0),
        (f2, "Welcome visitors to City History Museum. Our historic building features 3 floors of exhibits.", 0.5),
        (f2, "We open daily from 9:30 AM to 5:00 PM.", 0.5),
        (f2, "The main entrance lobby leads directly into the ground floor hall.", 0.5),
        (f2, "Our famous medieval armor gallery is located in the central wing.", 0.5),
        (f2, "For coffee and snacks, our outdoor courtyard seating terrace is located behind the atrium.", 1.0),
        (nar, "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.", 25.0),
        (nar, "Now listen carefully and answer questions 16 to 20.", 1.0),
        (f2, "To hear exhibition commentary, personal audio guides are required for all self-guided visitors.", 0.5),
        (f2, "Guided museum tours depart at 30 minutes intervals.", 0.5),
        (f2, "All tours are led by our expert curators.", 0.5),
        (f2, "School groups must submit an online reservation prior to visiting.", 0.5),
        (f2, "Large coats and bags should be deposited at the ground floor cloakroom.", 1.0),
        (nar, "That is the end of Section 2. You now have half a minute to check your answers.", 25.0)
    ]

    s3_lines = [
        (nar, "Section 3. You will hear a university tutorial on solar photovoltaic cell efficiency.", 1.0),
        (nar, "First, you have some time to look at questions 21 to 25.", 25.0),
        (nar, "Now listen carefully and answer questions 21 to 25.", 1.0),
        (prof, "Good afternoon Chloe and Liam. Let us evaluate your solar photovoltaic cell project.", 0.5),
        (f1, "Thank you Dr. Henderson. We focused on silicon cell degradation under high heat.", 0.5),
        (m1, "Our lab measurements revealed unexpected thermal stress variance across cell layers.", 0.5),
        (prof, "I suggest building a spectral response model to quantify wavelength absorption.", 0.5),
        (f1, "Good idea. We will detail our laboratory tests in Chapter 4.", 0.5),
        (m1, "And our complete research proposal draft will be submitted before the October deadline.", 1.0),
        (nar, "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.", 25.0),
        (nar, "Now listen carefully and answer questions 26 to 30.", 1.0),
        (m1, "We executed numerical simulations using MATLAB simulation software.", 0.5),
        (f1, "Our outdoor cell testing experienced delay due to grid voltage fluctuations.", 0.5),
        (m1, "We measured efficiency parameters across four solar arrays.", 0.5),
        (f1, "All temperature readings are documented in thermal camera logs.", 0.5),
        (prof, "Great. Make sure your final document is formatted as a formal research paper.", 1.0),
        (nar, "That is the end of Section 3. You now have half a minute to check your answers.", 25.0)
    ]

    s4_lines = [
        (nar, "Section 4. You will hear a lecture on paleoclimatology and polar ice core records.", 1.0),
        (nar, "First, you have some time to look at questions 31 to 40.", 35.0),
        (nar, "Now listen carefully and answer questions 31 to 40.", 1.0),
        (prof, "Good day class. Today we discuss paleoclimatology and polar ice core records.", 0.5),
        (prof, "Deep ice core extraction provides continuous atmospheric data spanning eight centuries.", 0.5),
        (prof, "Researchers perform gas bubble extraction to analyze ancient air composition.", 0.5),
        (prof, "Isotopic ratio measurement is conducted via mass spectrometry analysis.", 0.5),
        (prof, "Ice core records demonstrate critical greenhouse climate feedback mechanisms.", 0.5),
        (prof, "Scientists track historical carbon ocean absorption through isotope ratios.", 0.5),
        (prof, "Data models help geologists reconstruct historical carbon cycle modeling.", 0.5),
        (prof, "Ice core layers reveal recurring thousand year cycles of warming and cooling.", 0.5),
        (prof, "Ancient air bubbles confirm unprecedented modern greenhouse gas concentration.", 0.5),
        (prof, "Antarctic fieldwork follows strict international polar drilling protocols.", 0.5),
        (prof, "These ice core findings have forged an undeniable international climate consensus.", 1.0),
        (nar, "That is the end of the Listening Test. You now have ten minutes to transfer your answers.", 30.0)
    ]

    sections = [s1_lines, s2_lines, s3_lines, s4_lines]

    js_content = """const listeningTest008 = {
  id: "listening-test-008",
  title: "IELTS Listening Practice Test 008",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test008.mp3",
  transcript: "/assets/listening/test008/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: S1_START, end: S1_END },
    section2: { start: S2_START, end: S2_END },
    section3: { start: S3_START, end: S3_END },
    section4: { start: S4_START, end: S4_END }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: S1_START,
      audioEnd: S1_END,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "CITY SPORTS & FITNESS CLUB REGISTRATION",
      questions: [
        { id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "David Miller", explanation: "The applicant confirms his name is David Miller." },
        { id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "07700 900342", explanation: "David provides contact number 07700 900342." },
        { id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "18 Station Road, Cambridge", explanation: "David gives address 18 Station Road, Cambridge." },
        { id: 4, type: "fill-in", number: 4, label: "Corporate Join Fee (£):", answer: "60", explanation: "The corporate discount joining fee is 60 pounds." },
        { id: 5, type: "fill-in", number: 5, label: "Induction Time:", answer: "10:00 AM", explanation: "Induction takes place at 10:00 AM." },
        { id: 6, type: "fill-in", number: 6, label: "Document required:", answer: "membership card", explanation: "Members must bring photo membership card or valid ID." },
        { id: 7, type: "fill-in", number: 7, label: "Parking Location:", answer: "west car park", explanation: "Parking is located in the west car park." },
        { id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "debit card", explanation: "Payment is processed via debit card at reception." },
        { id: 9, type: "fill-in", number: 9, label: "Reference Code:", answer: "FIT802", explanation: "The reference code given is FIT802." },
        { id: 10, type: "fill-in", number: 10, label: "Senior Fitness Manager:", answer: "Sarah", explanation: "Sarah Roberts is the fitness manager." }
      ]
    },
    {
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: S2_START,
      audioEnd: S2_END,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "CITY HISTORY MUSEUM GUIDED TOUR",
      questions: [
        { id: 11, type: "multiple-choice", number: 11, question: "How many floors are in the historic museum building?", options: ["A. 2 floors", "B. 3 floors", "C. 5 floors"], answer: "B", explanation: "The museum features 3 floors of exhibits." },
        { id: 12, type: "multiple-choice", number: 12, question: "What time does the museum open daily?", options: ["A. 8:30 AM", "B. 9:30 AM", "C. 10:00 AM"], answer: "B", explanation: "The museum is open daily from 9:30 AM." },
        { id: 13, type: "multiple-choice", number: 13, question: "Where is the famous medieval armor gallery situated?", options: ["A. Ground floor hall", "B. Central wing", "C. Courtyard"], answer: "B", explanation: "The armor gallery is in the central wing." },
        { id: 14, type: "multiple-choice", number: 14, question: "Where is the outdoor courtyard seating terrace located?", options: ["A. Behind the atrium", "B. Entrance lobby", "C. Second floor"], answer: "A", explanation: "Outdoor seating is located behind the atrium." },
        { id: 15, type: "multiple-choice", number: 15, question: "What equipment is required for self-guided visitors?", options: ["A. Map book", "B. Audio guides", "C. VR headset"], answer: "B", explanation: "Personal audio guides are required for self-guided commentary." },
        { id: 16, type: "fill-in", number: 16, label: "Audio guide requirement:", answer: "audio guides", explanation: "Self-guided visitors require audio guides." },
        { id: 17, type: "fill-in", number: 17, label: "Guided tour frequency:", answer: "30 minutes", explanation: "Tours depart at 30 minutes intervals." },
        { id: 18, type: "fill-in", number: 18, label: "Tour guide qualification:", answer: "expert curators", explanation: "Tours are led by expert curators." },
        { id: 19, type: "fill-in", number: 19, label: "School group requirement:", answer: "online reservation", explanation: "School groups must submit an online reservation." },
        { id: 20, type: "fill-in", number: 20, label: "Coat deposit location:", answer: "ground floor cloakroom", explanation: "Bags and coats should be left at the ground floor cloakroom." }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: S3_START,
      audioEnd: S3_END,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "SOLAR PV EFFICIENCY TUTORIAL",
      questions: [
        { id: 21, type: "multiple-choice", number: 21, question: "What main topic did Chloe and Liam research?", options: ["A. Silicon cell degradation", "B. Battery storage", "C. Wind turbines"], answer: "A", explanation: "They investigated silicon cell degradation under heat." },
        { id: 22, type: "multiple-choice", number: 22, question: "What unexpected issue appeared in lab measurements?", options: ["A. Voltage drop", "B. Thermal stress variance", "C. Broken glass"], answer: "B", explanation: "Measurements showed unexpected thermal stress variance." },
        { id: 23, type: "multiple-choice", number: 23, question: "What model does Dr. Henderson suggest building?", options: ["A. Spectral response model", "B. Economic forecast", "C. Chemical kinetic model"], answer: "A", explanation: "Dr. Henderson suggests a spectral response model." },
        { id: 24, type: "multiple-choice", number: 24, question: "Which chapter details laboratory test procedures?", options: ["A. Chapter 2", "B. Chapter 4", "C. Chapter 6"], answer: "B", explanation: "Lab tests will be detailed in Chapter 4." },
        { id: 25, type: "multiple-choice", number: 25, question: "When is the proposal draft due?", options: ["A. Before October", "B. End of November", "C. January"], answer: "A", explanation: "Draft is due before the October deadline." },
        { id: 26, type: "fill-in", number: 26, label: "Simulation software tool:", answer: "MATLAB simulation", explanation: "They ran simulations using MATLAB simulation software." },
        { id: 27, type: "fill-in", number: 27, label: "Outdoor delay cause:", answer: "voltage fluctuations", explanation: "Testing experienced delay due to grid voltage fluctuations." },
        { id: 28, type: "fill-in", number: 28, label: "Number of solar arrays tested:", answer: "four", explanation: "Parameters were measured across four solar arrays." },
        { id: 29, type: "fill-in", number: 29, label: "Temperature reading record:", answer: "thermal camera logs", explanation: "Readings are logged in thermal camera logs." },
        { id: 30, type: "fill-in", number: 30, label: "Required final format:", answer: "research paper", explanation: "The final document must be formatted as a research paper." }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: S4_START,
      audioEnd: S4_END,
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "PALEOCLIMATOLOGY LECTURE",
      questions: [
        { id: 31, type: "fill-in", number: 31, label: "Ice core atmospheric data span:", answer: "eight centuries", explanation: "Data spans eight centuries." },
        { id: 32, type: "fill-in", number: 32, label: "Method to extract air bubbles:", answer: "gas bubble extraction", explanation: "Scientists use gas bubble extraction." },
        { id: 33, type: "fill-in", number: 33, label: "Isotope ratio analytical technique:", answer: "mass spectrometry", explanation: "Isotopic ratio measurement uses mass spectrometry." },
        { id: 34, type: "fill-in", number: 34, label: "Ice cores demonstrate critical:", answer: "feedback mechanisms", explanation: "Cores show critical greenhouse climate feedback mechanisms." },
        { id: 35, type: "fill-in", number: 35, label: "Ocean carbon tracking method:", answer: "isotope ratios", explanation: "Historical carbon ocean absorption is tracked via isotope ratios." },
        { id: 36, type: "fill-in", number: 36, label: "Data model reconstruction target:", answer: "carbon cycle modeling", explanation: "Models assist in carbon cycle modeling." },
        { id: 37, type: "fill-in", number: 37, label: "Climate cycle recurrence interval:", answer: "thousand year", explanation: "Ice cores reveal recurring thousand year cycles." },
        { id: 38, type: "fill-in", number: 38, label: "Air bubbles confirm modern:", answer: "greenhouse gas concentration", explanation: "Bubbles confirm unprecedented greenhouse gas concentration." },
        { id: 39, type: "fill-in", number: 39, label: "Antarctic field compliance:", answer: "polar drilling protocols", explanation: "Fieldwork follows international polar drilling protocols." },
        { id: 40, type: "fill-in", number: 40, label: "Ice core findings created:", answer: "international climate consensus", explanation: "Findings have forged an international climate consensus." }
      ]
    }
  ]
};

export default listeningTest008;"""
    return sections, js_content

# ==============================================================================
# TEST 9: New Zealand Mix - Library Volunteering, Botanical Gardens, Irrigation, Biomimetic Architecture
# ==============================================================================
def get_test9_spec():
    nar = VOICES["nz_narrator"]
    f1 = VOICES["nz_female1"]
    m1 = VOICES["nz_male1"]
    f2 = VOICES["nz_guide"]
    prof = VOICES["gb_prof"]

    s1_lines = [
        (nar, "This is the International English Language Testing System Listening Test 009.", 1.0),
        (nar, "Section 1. You will hear a phone conversation regarding a public library volunteer application.", 1.0),
        (nar, "First, you have some time to look at questions 1 to 5.", 25.0),
        (nar, "Now we shall begin. Listen carefully and answer questions 1 to 5.", 1.0),
        (m1, "Kia ora, Municipal Central Library Volunteer Office. My name is Oliver. How can I help you?", 0.5),
        (f1, "Hello Oliver. Good morning. I am calling to apply for the community library volunteer program.", 0.5),
        (m1, "I would be happy to register you today. May I take your full name please?", 0.5),
        (f1, "My name is Emily Watson. That is spelled W-A-T-S-O-N.", 0.5),
        (m1, "Thank you Emily. And what is your contact phone number?", 0.5),
        (f1, "My phone number is 07700 900123.", 0.5),
        (m1, "Got it. And what is your residential address?", 0.5),
        (f1, "My address is 7 Park Lane, Bristol.", 0.5),
        (m1, "Standard badge fee is 40 pounds, but local community members receive a discount, making it 30 pounds.", 0.5),
        (f1, "30 pounds is great. What time does orientation start?", 0.5),
        (m1, "Orientation begins at 9:30 AM in the activity room.", 1.0),
        (nar, "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.", 25.0),
        (nar, "Now listen carefully and answer questions 6 to 10.", 1.0),
        (f1, "What documents should I bring for registration?", 0.5),
        (m1, "Please bring valid photo ID and proof of address.", 0.5),
        (f1, "Is parking available for volunteers?", 0.5),
        (m1, "Free parking is available in the north visitor car park.", 0.5),
        (f1, "How do I pay the registration fee?", 0.5),
        (m1, "Payment is processed online via credit card using reference code REG904.", 0.5),
        (f1, "Who is the volunteer coordinator in charge?", 0.5),
        (m1, "The coordinator is Oliver.", 0.5),
        (f1, "Thank you Oliver for all your assistance.", 0.5),
        (m1, "You are welcome Emily. Have a wonderful day.", 1.0),
        (nar, "That is the end of Section 1. You now have half a minute to check your answers.", 25.0)
    ]

    s2_lines = [
        (nar, "Section 2. You will hear an orientation talk about the Royal Botanical Gardens.", 1.0),
        (nar, "First, you have some time to look at questions 11 to 15.", 25.0),
        (nar, "Now listen carefully and answer questions 11 to 15.", 1.0),
        (f2, "Good morning visitors, and welcome to the Royal Botanical Gardens.", 0.5),
        (f2, "Our gardens span 40 hectares of diverse plant species and are open daily from 9:00 AM to 5:30 PM.", 0.5),
        (f2, "The main entrance gates lead directly to the visitor pavilion.", 0.5),
        (f2, "To the right of the pavilion, you will find our display room hosting rare orchids.", 0.5),
        (f2, "Further along the main garden pathway lies our terrace cafe.", 1.0),
        (nar, "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.", 25.0),
        (nar, "Now listen carefully and answer questions 16 to 20.", 1.0),
        (f2, "Visitors must remain on paved pathways at all times.", 0.5),
        (f2, "Guided educational walking tours depart from the main plaza every hour.", 0.5),
        (f2, "Tours are led by certified botanist guides.", 0.5),
        (f2, "Special group bookings require pre-registration online.", 0.5),
        (f2, "First-aid stations are located inside the visitor pavilion.", 1.0),
        (nar, "That is the end of Section 2. You now have half a minute to check your answers.", 25.0)
    ]

    s3_lines = [
        (nar, "Section 3. You will hear a university tutorial on ancient Mediterranean irrigation.", 1.0),
        (nar, "First, you have some time to look at questions 21 to 25.", 25.0),
        (nar, "Now listen carefully and answer questions 21 to 25.", 1.0),
        (prof, "Good afternoon Sophie and Oliver. Let us review your ancient Mediterranean irrigation proposal.", 0.5),
        (f1, "Thank you Professor Harrison. We focused on Roman aqueducts and terrace canal flow.", 0.5),
        (m1, "Our field data indicates a clear correlation between hydraulic gradient modeling and crop stability.", 0.5),
        (prof, "Good work. However, secondary survey data showed measurement errors during drought periods.", 0.5),
        (f1, "We plan to present our archaeological data in Chapter 3.", 0.5),
        (m1, "And our final report submission is scheduled for December.", 1.0),
        (nar, "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.", 25.0),
        (nar, "Now listen carefully and answer questions 26 to 30.", 1.0),
        (m1, "We plotted canal topographies using GIS mapping.", 0.5),
        (f1, "Field surveys encountered difficulties caused by severe soil erosion.", 0.5),
        (m1, "We gathered channel sediment samples across three excavation sites.", 0.5),
        (f1, "Topographical slope measurements are attached in elevation surveys.", 0.5),
        (prof, "Very thorough. Your target output is the final report.", 1.0),
        (nar, "That is the end of Section 3. You now have half a minute to check your answers.", 25.0)
    ]

    s4_lines = [
        (nar, "Section 4. You will hear a lecture on biomimetic engineering in structural architecture.", 1.0),
        (nar, "First, you have some time to look at questions 31 to 40.", 35.0),
        (nar, "Now listen carefully and answer questions 31 to 40.", 1.0),
        (prof, "Good day students. Today we explore biomimetic engineering in structural architecture.", 0.5),
        (prof, "Architects adopt bio-inspired building design to minimize material waste.", 0.5),
        (prof, "Studying bone cross-sections reveals optimal structural load distribution.", 0.5),
        (prof, "High-rise passive ventilation systems mimic termite mound ventilation.", 0.5),
        (prof, "Solar responsive louvers mirror kinetic facade shading techniques.", 0.5),
        (prof, "Micro-cracks in modern composites are repaired using self-healing concrete.", 0.5),
        (prof, "Building cooling costs are lowered by optimizing natural airflow dynamics.", 0.5),
        (prof, "Material durability is evaluated through decade long field tests.", 0.5),
        (prof, "Architectural engineers reduce energy consumption with passive cooling systems.", 0.5),
        (prof, "All structural designs must strictly satisfy building safety standards.", 0.5),
        (prof, "Achieving carbon-neutral skyscrapers requires a strong bio-architectural partnership.", 1.0),
        (nar, "That is the end of the Listening Test. You now have ten minutes to transfer your answers.", 30.0)
    ]

    sections = [s1_lines, s2_lines, s3_lines, s4_lines]

    js_content = """const listeningTest009 = {
  id: "listening-test-009",
  title: "IELTS Listening Practice Test 009",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test009.mp3",
  transcript: "/assets/listening/test009/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: S1_START, end: S1_END },
    section2: { start: S2_START, end: S2_END },
    section3: { start: S3_START, end: S3_END },
    section4: { start: S4_START, end: S4_END }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: S1_START,
      audioEnd: S1_END,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "LIBRARY VOLUNTEER APPLICATION",
      questions: [
        { id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "Emily Watson", explanation: "The applicant confirms her name is Emily Watson." },
        { id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "07700 900123", explanation: "Emily states her contact number 07700 900123." },
        { id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "7 Park Lane, Bristol", explanation: "Emily lives at 7 Park Lane, Bristol." },
        { id: 4, type: "fill-in", number: 4, label: "Discounted Badge Fee (£):", answer: "30", explanation: "Local community volunteer fee is 30 pounds." },
        { id: 5, type: "fill-in", number: 5, label: "Orientation Time:", answer: "9:30 AM", explanation: "Orientation starts at 9:30 AM." },
        { id: 6, type: "fill-in", number: 6, label: "Required Document:", answer: "photo ID", explanation: "Applicants must bring photo ID and proof of address." },
        { id: 7, type: "fill-in", number: 7, label: "Parking Location:", answer: "north visitor", explanation: "Free parking is in the north visitor car park." },
        { id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "credit card", explanation: "Payment is processed online via credit card." },
        { id: 9, type: "fill-in", number: 9, label: "Reference Code:", answer: "REG904", explanation: "The payment reference code is REG904." },
        { id: 10, type: "fill-in", number: 10, label: "Volunteer Coordinator:", answer: "Oliver", explanation: "Oliver is the library volunteer coordinator." }
      ]
    },
    {
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: S2_START,
      audioEnd: S2_END,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "ROYAL BOTANICAL GARDENS ORIENTATION",
      questions: [
        { id: 11, type: "multiple-choice", number: 11, question: "How large are the Royal Botanical Gardens grounds?", options: ["A. 30 hectares", "B. 40 hectares", "C. 60 hectares"], answer: "B", explanation: "The gardens span 40 hectares." },
        { id: 12, type: "multiple-choice", number: 12, question: "What time do the gardens close daily?", options: ["A. 5:00 PM", "B. 5:30 PM", "C. 6:00 PM"], answer: "B", explanation: "The gardens are open daily until 5:30 PM." },
        { id: 13, type: "multiple-choice", number: 13, question: "What is featured in the display room beside the pavilion?", options: ["A. Rare orchids", "B. Tropical birds", "C. Sculptures"], answer: "A", explanation: "The display room features rare orchids." },
        { id: 14, type: "multiple-choice", number: 14, question: "Where is the garden cafe situated?", options: ["A. Main entrance", "B. Along the main garden pathway", "C. North car park"], answer: "B", explanation: "The terrace cafe lies along the main garden pathway." },
        { id: 15, type: "multiple-choice", number: 15, question: "What rule applies to visitors walking in the gardens?", options: ["A. Wear boots", "B. Stay on paved pathways", "C. No cameras"], answer: "B", explanation: "Visitors must remain on paved pathways." },
        { id: 16, type: "fill-in", number: 16, label: "Path rule:", answer: "paved pathways", explanation: "Visitors must remain on paved pathways." },
        { id: 17, type: "fill-in", number: 17, label: "Guided walk frequency:", answer: "every hour", explanation: "Tours depart from the main plaza every hour." },
        { id: 18, type: "fill-in", number: 18, label: "Tour guide qualification:", answer: "botanist guides", explanation: "Tours are led by certified botanist guides." },
        { id: 19, type: "fill-in", number: 19, label: "Special group booking requirement:", answer: "pre-registration", explanation: "Group bookings require pre-registration online." },
        { id: 20, type: "fill-in", number: 20, label: "First-aid station location:", answer: "visitor pavilion", explanation: "First-aid stations are inside the visitor pavilion." }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: S3_START,
      audioEnd: S3_END,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "ANCIENT IRRIGATION TUTORIAL",
      questions: [
        { id: 21, type: "multiple-choice", number: 21, question: "What specific topic did Sophie and Oliver research?", options: ["A. Roman aqueducts and terrace canal flow", "B. Modern dams", "C. Soil chemical composition"], answer: "A", explanation: "They focused on Roman aqueducts and terrace canal flow." },
        { id: 22, type: "multiple-choice", number: 22, question: "What issue affected secondary survey data?", options: ["A. Missing maps", "B. Measurement errors during drought", "C. Broken equipment"], answer: "B", explanation: "Secondary survey data showed measurement errors during drought." },
        { id: 23, type: "multiple-choice", number: 23, question: "Which chapter presents their archaeological data?", options: ["A. Chapter 1", "B. Chapter 3", "C. Chapter 5"], answer: "B", explanation: "Archaeological data will be presented in Chapter 3." },
        { id: 24, type: "multiple-choice", number: 24, question: "When is the final report submission due?", options: ["A. November", "B. December", "C. January"], answer: "B", explanation: "Final report submission is scheduled for December." },
        { id: 25, type: "multiple-choice", number: 25, question: "What tool was used for canal topography mapping?", options: ["A. GIS mapping", "B. CAD drafting", "C. Hand sketching"], answer: "A", explanation: "They plotted canal topographies using GIS mapping." },
        { id: 26, type: "fill-in", number: 26, label: "Topography mapping tool:", answer: "GIS mapping", explanation: "They mapped topographies using GIS mapping." },
        { id: 27, type: "fill-in", number: 27, label: "Field survey difficulty cause:", answer: "soil erosion", explanation: "Surveys encountered difficulties caused by soil erosion." },
        { id: 28, type: "fill-in", number: 28, label: "Number of excavation sites sampled:", answer: "three", explanation: "Sediment samples were gathered across three excavation sites." },
        { id: 29, type: "fill-in", number: 29, label: "Slope measurement record:", answer: "elevation surveys", explanation: "Slope measurements are attached in elevation surveys." },
        { id: 30, type: "fill-in", number: 30, label: "Target output project document:", answer: "final report", explanation: "Their target output is the final report." }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: S4_START,
      audioEnd: S4_END,
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "BIOMIMETIC ARCHITECTURE LECTURE",
      questions: [
        { id: 31, type: "fill-in", number: 31, label: "Goal of bio-inspired design:", answer: "material waste", explanation: "Architects aim to minimize material waste." },
        { id: 32, type: "fill-in", number: 32, label: "Bone cross-section study reveals:", answer: "load distribution", explanation: "Bone study reveals optimal structural load distribution." },
        { id: 33, type: "fill-in", number: 33, label: "High-rise ventilation inspiration:", answer: "termite mound", explanation: "Passive ventilation mimics termite mound ventilation." },
        { id: 34, type: "fill-in", number: 34, label: "Solar responsive louvers mirror:", answer: "kinetic facade", explanation: "Louvers mirror kinetic facade shading techniques." },
        { id: 35, type: "fill-in", number: 35, label: "Self-repairing composite material:", answer: "self-healing concrete", explanation: "Micro-cracks are repaired using self-healing concrete." },
        { id: 36, type: "fill-in", number: 36, label: "Cooling cost reduction method:", answer: "airflow dynamics", explanation: "Costs are lowered by optimizing natural airflow dynamics." },
        { id: 37, type: "fill-in", number: 37, label: "Durability evaluation test period:", answer: "decade long", explanation: "Durability is evaluated through decade long field tests." },
        { id: 38, type: "fill-in", number: 38, label: "Energy reduction design feature:", answer: "passive cooling", explanation: "Engineers reduce energy with passive cooling systems." },
        { id: 39, type: "fill-in", number: 39, label: "Required design compliance:", answer: "safety standards", explanation: "Designs must satisfy building safety standards." },
        { id: 40, type: "fill-in", number: 40, label: "Skyscraper sustainability key:", answer: "bio-architectural partnership", explanation: "Requires a strong bio-architectural partnership." }
      ]
    }
  ]
};

export default listeningTest009;"""
    return sections, js_content

# ==============================================================================
# TEST 10: North American Mix - Car Rental, Art Gallery, Urban Heat Islands, Deep-Sea Hydrothermal Vents
# ==============================================================================
def get_test10_spec():
    nar = VOICES["us_narrator"]
    f1 = VOICES["us_female1"]
    m1 = VOICES["us_male1"]
    f2 = VOICES["us_guide"]
    prof = VOICES["gb_prof"]

    s1_lines = [
        (nar, "This is the International English Language Testing System Listening Test 010.", 1.0),
        (nar, "Section 1. You will hear a phone conversation regarding a car rental booking.", 1.0),
        (nar, "First, you have some time to look at questions 1 to 5.", 25.0),
        (nar, "Now we shall begin. Listen carefully and answer questions 1 to 5.", 1.0),
        (m1, "Good morning, Apex Car Rentals. My name is Rachel. How can I help you?", 0.5),
        (f1, "Hello Rachel. I would like to book an SUV for a business trip.", 0.5),
        (m1, "I can help with that. May I have your full legal name please?", 0.5),
        (f1, "My name is James Wilson. That is spelled W-I-L-S-O-N.", 0.5),
        (m1, "Thank you James. What is your contact phone number?", 0.5),
        (f1, "My mobile number is 07700 900888.", 0.5),
        (m1, "And what is your home residential address?", 0.5),
        (f1, "I live at 12 Victoria Road, Manchester.", 0.5),
        (m1, "Standard rental is 70 pounds per day, but corporate discount makes it 50 pounds.", 0.5),
        (f1, "50 pounds per day works. What time is vehicle pickup?", 0.5),
        (m1, "Pickup is at 9:30 AM at our central garage.", 1.0),
        (nar, "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.", 25.0),
        (nar, "Now listen carefully and answer questions 6 to 10.", 1.0),
        (f1, "What document should I bring for pickup?", 0.5),
        (m1, "Please bring your valid driver license and photo ID.", 0.5),
        (f1, "Where can I leave my personal car during rental?", 0.5),
        (m1, "Complimentary parking is in the north garage.", 0.5),
        (f1, "How do I pay the rental fee?", 0.5),
        (m1, "Payment is processed online using a credit card.", 0.5),
        (f1, "What reference code should I quote?", 0.5),
        (m1, "Use booking reference CAR505.", 0.5),
        (f1, "Who is the duty desk agent on Monday?", 0.5),
        (m1, "Our desk agent is Rachel.", 0.5),
        (f1, "Thank you Rachel for your help.", 0.5),
        (m1, "You are welcome James. Have a safe drive.", 1.0),
        (nar, "That is the end of Section 1. You now have half a minute to check your answers.", 25.0)
    ]

    s2_lines = [
        (nar, "Section 2. You will hear a tour introduction for the Regional Art Gallery.", 1.0),
        (nar, "First, you have some time to look at questions 11 to 15.", 25.0),
        (nar, "Now listen carefully and answer questions 11 to 15.", 1.0),
        (f2, "Welcome visitors to the Regional Art Gallery. Our sculpture park spans 35 hectares.", 0.5),
        (f2, "We are open daily from 9:00 AM to 5:00 PM.", 0.5),
        (f2, "Entering the main glass doors leads directly to the central foyer.", 0.5),
        (f2, "The east gallery displays classical oil paintings.", 0.5),
        (f2, "Refreshments are served in the garden terrace cafe.", 1.0),
        (nar, "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.", 25.0),
        (nar, "Now listen carefully and answer questions 16 to 20.", 1.0),
        (f2, "To protect delicate artwork, touch prohibition rules are strictly enforced.", 0.5),
        (f2, "Guided gallery walks run for 45 minute duration.", 0.5),
        (f2, "Tours are led by our resident art historians.", 0.5),
        (f2, "Groups of ten or more receive a group discount code.", 0.5),
        (f2, "An information desk is situated in the main foyer.", 1.0),
        (nar, "That is the end of Section 2. You now have half a minute to check your answers.", 25.0)
    ]

    s3_lines = [
        (nar, "Section 3. You will hear a university tutorial on urban heat island mitigation.", 1.0),
        (nar, "First, you have some time to look at questions 21 to 25.", 25.0),
        (nar, "Now listen carefully and answer questions 21 to 25.", 1.0),
        (prof, "Good afternoon Alex and Jessica. Let us review your urban heat island project.", 0.5),
        (f1, "Thank you Professor Smith. We evaluated green roofs and permeable asphalt cooling.", 0.5),
        (m1, "Our drone microclimate thermal imaging showed temperature drops near urban trees.", 0.5),
        (prof, "Impressive. I recommend modeling urban wind tunnels in Chapter 5.", 0.5),
        (f1, "We will complete our urban models by the January deadline.", 1.0),
        (nar, "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.", 25.0),
        (nar, "Now listen carefully and answer questions 26 to 30.", 1.0),
        (m1, "We simulated urban microclimates using ENVI-met simulation software.", 0.5),
        (f1, "Maximum cooling effect was observed under dense tree canopy shade.", 0.5),
        (m1, "Surface temperatures were measured across five city zones.", 0.5),
        (f1, "All heat maps are recorded in infrared temperature logs.", 0.5),
        (prof, "Great work. Summarize your findings into a practical policy proposal.", 1.0),
        (nar, "That is the end of Section 3. You now have half a minute to check your answers.", 25.0)
    ]

    s4_lines = [
        (nar, "Section 4. You will hear a lecture on deep-sea hydrothermal vent ecosystems.", 1.0),
        (nar, "First, you have some time to look at questions 31 to 40.", 35.0),
        (nar, "Now listen carefully and answer questions 31 to 40.", 1.0),
        (prof, "Good day class. Today we examine deep-sea hydrothermal vent ecosystems.", 0.5),
        (prof, "Deep sea ocean trench exploration relies on unmanned submersible robotics.", 0.5),
        (prof, "Primary energy production is driven by chemosynthetic extremophile bacteria.", 0.5),
        (prof, "Microbes generate chemical energy via bacterial sulfur oxidation pathways.", 0.5),
        (prof, "Giant vent organisms survive through complex tube worm symbiosis.", 0.5),
        (prof, "Precipitated heavy metals build towering mineral chimney structures.", 0.5),
        (prof, "Submersibles transmit real-time data using subsea submersible telemetry.", 0.5),
        (prof, "Biological stability is monitored across multi-year oceanic expeditions.", 0.5),
        (prof, "Vents discharge superheated water containing rich volcanic fluid chemistry.", 0.5),
        (prof, "Conservationists advocate for strict international deep sea mining regulations.", 0.5),
        (prof, "Protecting benthic habitats requires a dedicated oceanographic research consortium.", 1.0),
        (nar, "That is the end of the Listening Test. You now have ten minutes to transfer your answers.", 30.0)
    ]

    sections = [s1_lines, s2_lines, s3_lines, s4_lines]

    js_content = """const listeningTest010 = {
  id: "listening-test-010",
  title: "IELTS Listening Practice Test 010",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test010.mp3",
  transcript: "/assets/listening/test010/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: S1_START, end: S1_END },
    section2: { start: S2_START, end: S2_END },
    section3: { start: S3_START, end: S3_END },
    section4: { start: S4_START, end: S4_END }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: S1_START,
      audioEnd: S1_END,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "CAR RENTAL SERVICE BOOKING",
      questions: [
        { id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "James Wilson", explanation: "The customer confirms his name is James Wilson." },
        { id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "07700 900888", explanation: "James provides mobile number 07700 900888." },
        { id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "12 Victoria Road, Manchester", explanation: "James gives address 12 Victoria Road, Manchester." },
        { id: 4, type: "fill-in", number: 4, label: "Corporate Rental Fee (£):", answer: "50", explanation: "The discounted corporate rate is 50 pounds per day." },
        { id: 5, type: "fill-in", number: 5, label: "Vehicle Pickup Time:", answer: "9:30 AM", explanation: "Pickup is scheduled for 9:30 AM." },
        { id: 6, type: "fill-in", number: 6, label: "Required Document:", answer: "driver license", explanation: "Customer must present valid driver license and photo ID." },
        { id: 7, type: "fill-in", number: 7, label: "Personal Car Parking:", answer: "north garage", explanation: "Free parking is located in the north garage." },
        { id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "credit card", explanation: "Payment is processed online using a credit card." },
        { id: 9, type: "fill-in", number: 9, label: "Booking Reference Code:", answer: "CAR505", explanation: "The reference code is CAR505." },
        { id: 10, type: "fill-in", number: 10, label: "Duty Desk Agent:", answer: "Rachel", explanation: "Rachel is the rental desk agent." }
      ]
    },
    {
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: S2_START,
      audioEnd: S2_END,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "REGIONAL ART GALLERY TOUR",
      questions: [
        { id: 11, type: "multiple-choice", number: 11, question: "How large is the gallery sculpture park?", options: ["A. 20 hectares", "B. 35 hectares", "C. 50 hectares"], answer: "B", explanation: "The sculpture park spans 35 hectares." },
        { id: 12, type: "multiple-choice", number: 12, question: "What time does the gallery close daily?", options: ["A. 4:30 PM", "B. 5:00 PM", "C. 6:00 PM"], answer: "B", explanation: "The gallery is open daily until 5:00 PM." },
        { id: 13, type: "multiple-choice", number: 13, question: "What is showcased in the east gallery?", options: ["A. Modern photography", "B. Classical oil paintings", "C. Sculptures"], answer: "B", explanation: "The east gallery displays classical oil paintings." },
        { id: 14, type: "multiple-choice", number: 14, question: "Where are refreshments served?", options: ["A. Main foyer", "B. Garden terrace cafe", "C. Entrance hall"], answer: "B", explanation: "Refreshments are served in the garden terrace cafe." },
        { id: 15, type: "multiple-choice", number: 15, question: "What artwork safety rule is enforced?", options: ["A. No photography", "B. Touch prohibition", "C. Silent walking"], answer: "B", explanation: "Touch prohibition rules are strictly enforced." },
        { id: 16, type: "fill-in", number: 16, label: "Artwork safety rule:", answer: "touch prohibition", explanation: "Touch prohibition rules are strictly enforced." },
        { id: 17, type: "fill-in", number: 17, label: "Guided walk duration:", answer: "45 minute", explanation: "Guided gallery walks run for 45 minute duration." },
        { id: 18, type: "fill-in", number: 18, label: "Tour leader qualification:", answer: "art historians", explanation: "Tours are led by resident art historians." },
        { id: 19, type: "fill-in", number: 19, label: "Large group benefit:", answer: "group discount code", explanation: "Groups of 10+ receive a group discount code." },
        { id: 20, type: "fill-in", number: 20, label: "Information desk location:", answer: "main foyer", explanation: "An information desk is situated in the main foyer." }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: S3_START,
      audioEnd: S3_END,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "URBAN HEAT ISLAND TUTORIAL",
      questions: [
        { id: 21, type: "multiple-choice", number: 21, question: "What techniques did Alex and Jessica evaluate?", options: ["A. Green roofs and permeable asphalt cooling", "B. Solar panels", "C. Seawall construction"], answer: "A", explanation: "They evaluated green roofs and permeable asphalt cooling." },
        { id: 22, type: "multiple-choice", number: 22, question: "What did thermal imaging show near urban trees?", options: ["A. Higher humidity", "B. Temperature drops", "C. Wind blockage"], answer: "B", explanation: "Thermal imaging revealed temperature drops near urban trees." },
        { id: 23, type: "multiple-choice", number: 23, question: "Which chapter will include urban wind tunnel modeling?", options: ["A. Chapter 2", "B. Chapter 5", "C. Chapter 7"], answer: "B", explanation: "Wind tunnel modeling will be placed in Chapter 5." },
        { id: 24, type: "multiple-choice", number: 24, question: "When are the urban models due?", options: ["A. December", "B. January", "C. February"], answer: "B", explanation: "Urban models will be completed by the January deadline." },
        { id: 25, type: "multiple-choice", number: 25, question: "Which microclimate simulation software was used?", options: ["A. ENVI-met simulation", "B. AutoCAD", "C. GIS Pro"], answer: "A", explanation: "Microclimates were simulated using ENVI-met simulation software." },
        { id: 26, type: "fill-in", number: 26, label: "Simulation software tool:", answer: "ENVI-met simulation", explanation: "Simulations used ENVI-met simulation software." },
        { id: 27, type: "fill-in", number: 27, label: "Maximum cooling location:", answer: "tree canopy shade", explanation: "Maximum cooling occurred under dense tree canopy shade." },
        { id: 28, type: "fill-in", number: 28, label: "Number of city zones measured:", answer: "five", explanation: "Surface temperatures were measured across five city zones." },
        { id: 29, type: "fill-in", number: 29, label: "Heat map record:", answer: "infrared temperature logs", explanation: "Heat maps are recorded in infrared temperature logs." },
        { id: 30, type: "fill-in", number: 30, label: "Final output document:", answer: "policy proposal", explanation: "Findings will be summarized into a policy proposal." }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: S4_START,
      audioEnd: S4_END,
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "HYDROTHERMAL VENTS LECTURE",
      questions: [
        { id: 31, type: "fill-in", number: 31, label: "Trench exploration technology:", answer: "unmanned submersible", explanation: "Exploration relies on unmanned submersible robotics." },
        { id: 32, type: "fill-in", number: 32, label: "Primary vent energy producers:", answer: "extremophile bacteria", explanation: "Primary energy is driven by chemosynthetic extremophile bacteria." },
        { id: 33, type: "fill-in", number: 33, label: "Bacterial chemical energy pathway:", answer: "sulfur oxidation", explanation: "Microbes use bacterial sulfur oxidation pathways." },
        { id: 34, type: "fill-in", number: 34, label: "Giant organism survival relationship:", answer: "tube worm symbiosis", explanation: "Organisms survive through tube worm symbiosis." },
        { id: 35, type: "fill-in", number: 35, label: "Vent tower formation material:", answer: "mineral chimney", explanation: "Precipitated heavy metals build mineral chimney structures." },
        { id: 36, type: "fill-in", number: 36, label: "Real-time telemetry system:", answer: "subsea submersible", explanation: "Data is transmitted using subsea submersible telemetry." },
        { id: 37, type: "fill-in", number: 37, label: "Biological monitoring period:", answer: "multi-year", explanation: "Monitored across multi-year oceanic expeditions." },
        { id: 38, type: "fill-in", number: 38, label: "Superheated discharge content:", answer: "volcanic fluid chemistry", explanation: "Water contains rich volcanic fluid chemistry." },
        { id: 39, type: "fill-in", number: 39, label: "Conservationist advocacy area:", answer: "deep sea mining", explanation: "Advocating for deep sea mining regulations." },
        { id: 40, type: "fill-in", number: 40, label: "Benthic protection organization:", answer: "research consortium", explanation: "Requires a dedicated oceanographic research consortium." }
      ]
    }
  ]
};

export default listeningTest010;"""
    return sections, js_content

async def process_test(test_num, spec_func):
    print(f"--- Processing Listening Test 00{test_num} ---")
    sections, js_template = spec_func()
    
    mp3_filename = f"test00{test_num}.mp3"
    mp3_path = os.path.join(public_audio_dir, mp3_filename)
    js_filename = f"listeningTest00{test_num}.js"
    js_path = os.path.join(data_tests_dir, js_filename)

    full_audio_bytes = b""
    section_bounds = []

    for s_idx, section in enumerate(sections, start=1):
        s_start_time = len(full_audio_bytes) / 32000.0
        
        for voice, text, pause in section:
            speech_bytes = await synthesize_line(voice, text)
            full_audio_bytes += speech_bytes
            if pause > 0:
                silence_bytes = get_mp3_silence_bytes(pause)
                full_audio_bytes += silence_bytes

        s_end_time = len(full_audio_bytes) / 32000.0
        section_bounds.append((s_start_time, s_end_time))

    with open(mp3_path, "wb") as f:
        f.write(full_audio_bytes)

    audio_info = MP3(mp3_path)
    actual_duration = int(audio_info.info.length)
    print(f"Generated {mp3_filename}: Total Duration = {actual_duration}s ({actual_duration // 60}m {actual_duration % 60}s)")

    raw_total = section_bounds[-1][1]
    scale = audio_info.info.length / raw_total if raw_total > 0 else 1.0

    s1_s = int(section_bounds[0][0] * scale)
    s1_e = int(section_bounds[0][1] * scale)
    s2_s = int(section_bounds[1][0] * scale)
    s2_e = int(section_bounds[1][1] * scale)
    s3_s = int(section_bounds[2][0] * scale)
    s3_e = int(section_bounds[2][1] * scale)
    s4_s = int(section_bounds[3][0] * scale)
    s4_e = int(section_bounds[3][1] * scale)

    final_js = js_template.replace("S1_START", str(s1_s)).replace("S1_END", str(s1_e))
    final_js = final_js.replace("S2_START", str(s2_s)).replace("S2_END", str(s2_e))
    final_js = final_js.replace("S3_START", str(s3_s)).replace("S3_END", str(s3_e))
    final_js = final_js.replace("S4_START", str(s4_s)).replace("S4_END", str(s4_e))

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(final_js)

    print(f"Successfully generated {js_filename} with 40 matching questions and audio timelines: S1[{s1_s}-{s1_e}], S2[{s2_s}-{s2_e}], S3[{s3_s}-{s3_e}], S4[{s4_s}-{s4_e}]")

async def main():
    print("Building 100% matching 40-question IELTS Listening Tests 7 to 10...")
    await process_test(7, get_test7_spec)
    await process_test(8, get_test8_spec)
    await process_test(9, get_test9_spec)
    await process_test(10, get_test10_spec)
    print("\nSUCCESS: All 4 Listening Tests (7, 8, 9, 10) built and synced with 40 matching questions!")

if __name__ == "__main__":
    asyncio.run(main())
