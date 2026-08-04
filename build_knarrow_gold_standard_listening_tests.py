import os
import asyncio
import edge_tts
from mutagen.mp3 import MP3

public_audio_dir = os.path.join("public", "audio", "listening")
data_tests_dir = os.path.join("src", "data", "listening", "tests")

os.makedirs(public_audio_dir, exist_ok=True)
os.makedirs(data_tests_dir, exist_ok=True)

# Accent Palettes for IELTS Realism across Tests 7 to 25
ACCENT_PALETTES = [
    # Test 7: British English Palette
    {"narrator": "en-GB-LibbyNeural", "s1_f": "en-GB-SoniaNeural", "s1_m": "en-GB-RyanNeural", "s2": "en-GB-MaisieNeural", "s3_p": "en-GB-ThomasNeural", "s4": "en-GB-ThomasNeural"},
    # Test 8: Australian / British Mix
    {"narrator": "en-AU-NatashaNeural", "s1_f": "en-AU-NatashaNeural", "s1_m": "en-GB-RyanNeural", "s2": "en-AU-WilliamMultilingualNeural", "s3_p": "en-GB-ThomasNeural", "s4": "en-AU-WilliamMultilingualNeural"},
    # Test 9: New Zealand / British Mix
    {"narrator": "en-NZ-MollyNeural", "s1_f": "en-NZ-MollyNeural", "s1_m": "en-GB-RyanNeural", "s2": "en-NZ-MitchellNeural", "s3_p": "en-GB-ThomasNeural", "s4": "en-NZ-MitchellNeural"},
    # Test 10: North American / British Mix
    {"narrator": "en-US-AvaNeural", "s1_f": "en-US-AvaNeural", "s1_m": "en-US-AndrewNeural", "s2": "en-US-AvaNeural", "s3_p": "en-GB-ThomasNeural", "s4": "en-US-AndrewNeural"}
]

# Fill palettes for remaining tests up to Test 25
for i in range(11, 26):
    palette_type = i % 4
    ACCENT_PALETTES.append(ACCENT_PALETTES[palette_type])

LISTENING_SPECS = [
    {
        "test_num": 7,
        "s1_title": "Riverside Student Accommodation Booking",
        "s1_context": "Apartment rental enquiry",
        "s1_name": "Sarah Jenkins", "s1_spell": "J-E-N-K-I-N-S", "s1_phone": "07700 900452", "s1_addr": "42 High Street, Oxford", "s1_fee": "45",
        "s2_title": "Riverside Nature Reserve Visitor Orientation & Map",
        "s2_area": "50 hectares", "s2_time": "8:00 AM to 6:00 PM", "s2_kiosk": "main entrance",
        "s3_prof": "Professor Davies", "s3_s1": "Emma", "s3_s2": "Mark", "s3_topic": "Microplastics in Freshwater Ecosystems",
        "s4_topic": "Avian Migration Navigation Mechanisms & Geomagnetic Receptors"
    },
    {
        "test_num": 8,
        "s1_title": "City Sports & Fitness Club Registration",
        "s1_context": "Gym membership sign-up",
        "s1_name": "David Miller", "s1_spell": "M-I-L-L-E-R", "s1_phone": "07700 900342", "s1_addr": "18 Station Road, Cambridge", "s1_fee": "60",
        "s2_title": "City History Museum Guided Tour",
        "s2_area": "3 floors", "s2_time": "9:30 AM to 5:00 PM", "s2_kiosk": "ground floor hall",
        "s3_prof": "Dr. Henderson", "s3_s1": "Chloe", "s3_s2": "Liam", "s3_topic": "Solar Photovoltaic Cell Efficiency Models",
        "s4_topic": "Paleoclimatology & Polar Ice Core Atmospheric Records"
    },
    {
        "test_num": 9,
        "s1_title": "Municipal Public Library Volunteer Application",
        "s1_context": "Library volunteer registration",
        "s1_name": "Emily Watson", "s1_spell": "W-A-T-S-O-N", "s1_phone": "07700 900123", "s1_addr": "7 Park Lane, Bristol", "s1_fee": "30",
        "s2_title": "Royal Botanical Gardens Conservation Orientation",
        "s2_area": "40 hectares", "s2_time": "9:00 AM to 5:30 PM", "s2_kiosk": "visitor pavilion",
        "s3_prof": "Professor Harrison", "s3_s1": "Sophie", "s3_s2": "Oliver", "s3_topic": "Ancient Mediterranean Crop Irrigation Techniques",
        "s4_topic": "Biomimetic Engineering & Structural Architecture"
    }
]

# Generate specs 10 to 25 dynamically
additional_specs = [
    ("Car Rental Booking", "Regional Art Gallery Tour", "Urban Heat Island Mitigation", "Deep-Sea Hydrothermal Vent Ecosystems"),
    ("Music Festival Volunteering", "Wildlife Sanctuary Guide", "Cognitive Memory Encoding", "Subterranean Mycelial Communication Networks"),
    ("Hotel Event Hall Hire", "Public Transport Hub Redesign", "Renewable Hydroelectric Proposal", "Volcanic Aerosols & Global Climate Cooling"),
    ("Language Exchange Sign-up", "Youth Center Expansion", "Architectural Restoration Study", "Submerged Maritime Archaeology Techniques"),
    ("International Student Orientation", "City Maritime Museum Tour", "Agricultural Robotics Project", "Quantum Information & Cryptography Principles"),
    ("Fitness Personal Training Signup", "National Park Visitor Orientation", "Micro-Loan Business Models", "Deep Space Infrared Telescope Discoveries"),
    ("Summer Internship Application", "Science Center Planetarium Guide", "Coastal Salt Marsh Ecology", "Neuroplasticity and Adult Brain Plasticity"),
    ("Bicycle Rental Program Signup", "Farmers Market Orientation", "Autonomous Transport Analysis", "Linguistic Relativity & Spatial Cognition"),
    ("Theatre Ticket & Backstage Tour", "Historic Castle Preservation Tour", "Waste Recycling Infrastructure", "Atmospheric Water Harvesting Systems"),
    ("Conference Venue Booking", "Geological Cave Exploration", "Behavioral Economics of Apps", "Paleo-Anthropological Hominin Evolution"),
    ("Student Exchange Signup", "Public Sculpture Park Guide", "Desalination Environmental Impact", "Tectonic Plate Dynamics & Seismology"),
    ("Community Allotment Sign-up", "Industrial Heritage Museum Guide", "AI Medical Diagnostics Study", "Glacial Lake Outburst Hydro-Modeling"),
    ("Sports Coaching Inquiry", "Coastal Bird Reserve Orientation", "SCADA Cybersecurity Project", "History of Printing & Paper Manufacture"),
    ("Cultural Festival Booking", "Metropolitan Planetarium Tour", "Sustainable Forest Management", "Non-Linear Fluid Dynamics & Turbulence"),
    ("Volunteer Trail Maintenance", "Regional Airport Guide", "Corporate ESG Metrics Study", "Ethical Governance of CRISPR Gene Editing"),
    ("Language Course Registration", "Historic Mill Restoration Tour", "E-Commerce Consumer Behavior", "Paleo-Oceanic Carbon Circulation Models")
]

for idx, (s1t, s2t, s3t, s4t) in enumerate(additional_specs, start=10):
    LISTENING_SPECS.append({
        "test_num": idx,
        "s1_title": s1t, "s1_context": f"{s1t.lower()} enquiry",
        "s1_name": "James Wilson", "s1_spell": "W-I-L-S-O-N", "s1_phone": "07700 900888", "s1_addr": "12 Victoria Road, Manchester", "s1_fee": "50",
        "s2_title": s2t, "s2_area": "35 hectares", "s2_time": "9:00 AM to 5:00 PM", "s2_kiosk": "central foyer",
        "s3_prof": "Professor Smith", "s3_s1": "Alex", "s3_s2": "Jessica", "s3_topic": s3t,
        "s4_topic": s4t
    })

def get_mp3_silence_bytes(duration_sec):
    frame = b'\xff\xfb\x90\xc4' + b'\x00' * 413
    return frame * int(38 * duration_sec)

def build_knarrow_dialogue_lines(spec, palette):
    narrator = palette["narrator"]
    female1 = palette["s1_f"]
    male1 = palette["s1_m"]
    speaker2 = palette["s2"]
    prof = palette["s3_p"]

    lines = []

    # ==================== SECTION 1 (500–700 words, 3–4 mins, Easy) ====================
    lines.append((narrator, f"This is the International English Language Testing System Listening Test {spec['test_num']:03d}.", 1.0))
    lines.append((narrator, f"Section 1. You will hear a conversation between an applicant and a service officer regarding {spec['s1_context']}.", 1.0))
    lines.append((narrator, "First, you have some time to look at questions 1 to 5.", 30.0))
    lines.append((narrator, "Now we shall begin. You should answer the questions as you listen because you will not hear the recording a second time. Listen carefully and answer questions 1 to 5.", 1.0))

    lines.append((male1, f"Good morning, central administration office. My name is Mark. How can I help you today?", 0.5))
    lines.append((female1, f"Hello Mark. Good morning. I am calling to inquire about registering for the {spec['s1_title']}. I would like to check availability, fee structure, and documentation requirements.", 0.5))
    lines.append((male1, "I can certainly help you with that application today. Before we go into specific details, could I take your full legal name please?", 0.5))
    lines.append((female1, f"Yes, of course. My name is {spec['s1_name']}. That is spelled {spec['s1_spell']}.", 0.5))
    lines.append((male1, "Thank you. And could I confirm your primary contact telephone number?", 0.5))
    lines.append((female1, f"Yes, my mobile number is 07700 900500... wait, sorry! Let me check my card... Ah, actually it is {spec['s1_phone']}.", 0.5)) # Distractor self-correction!
    lines.append((male1, "Got it, thank you. And what is your current residential address?", 0.5))
    lines.append((female1, f"My current residential home address is {spec['s1_addr']}.", 0.5))
    lines.append((male1, f"Great. Regarding the registration fee, our standard tier is 65 pounds... but since you are a local resident, the discounted fee is {spec['s1_fee']} pounds.", 0.5)) # Distractor!
    lines.append((female1, "That is wonderful. What time does the introductory orientation session start on Monday?", 0.5))
    lines.append((male1, "The session begins at 9:30 AM sharp in Conference Room B.", 1.0))

    lines.append((narrator, "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.", 30.0))
    lines.append((narrator, "Now listen carefully and answer questions 6 to 10.", 1.0))

    lines.append((female1, "What identification documents do I need to bring on the first day?", 0.5))
    lines.append((male1, "You must bring photo identification, such as a passport or driving license, along with your registration email.", 0.5))
    lines.append((female1, "And is parking available nearby?", 0.5))
    lines.append((male1, "Yes, parking is available in the north visitor car park. Reception staff will validate your ticket for free parking.", 0.5))
    lines.append((female1, "How should I pay the registration fee?", 0.5))
    lines.append((male1, "You can pay online via credit card using the reference code REG904.", 0.5))
    lines.append((female1, "Thank you very much Mark for your help.", 0.5))
    lines.append((male1, "You are very welcome. Have a great day.", 1.0))

    lines.append((narrator, "That is the end of Section 1. You now have half a minute to check your answers.", 30.0))

    # ==================== SECTION 2 (700–900 words, 4–5 mins, Medium) ====================
    lines.append((narrator, f"Section 2. You will hear a guided orientation presentation about {spec['s2_title']}.", 1.0))
    lines.append((narrator, "First, you have some time to look at questions 11 to 15.", 30.0))
    lines.append((narrator, "Now listen carefully and answer questions 11 to 15.", 1.0))

    lines.append((speaker2, f"Good morning everyone, and welcome to our official presentation for {spec['s2_title']}. We are delighted to welcome you to our grounds today.", 0.5))
    lines.append((speaker2, f"Our facility spans {spec['s2_area']} of scenic landscape and is open daily from {spec['s2_time']}.", 0.5))
    lines.append((speaker2, f"Looking at your orientation map, the main entrance gates lead directly to the {spec['s2_kiosk']}.", 0.5))
    lines.append((speaker2, "To the right of the kiosk, you will find our interactive exhibition hall containing historic artifacts and digital displays.", 0.5))
    lines.append((speaker2, "Further along the paved central footpath towards the river lies our outdoor café and garden terrace.", 1.0))

    lines.append((narrator, "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.", 30.0))
    lines.append((narrator, "Now listen carefully and answer questions 16 to 20.", 1.0))

    lines.append((speaker2, "To ensure safety and protect wildlife, visitors must remain on designated walking paths at all times.", 0.5))
    lines.append((speaker2, "Guided educational walking tours depart from the main plaza every hour on the hour, led by certified staff.", 0.5))
    lines.append((speaker2, "Special group bookings and school educational visits can be arranged in advance online.", 0.5))
    lines.append((speaker2, "Emergency contact points and first-aid stations are located inside the main visitor pavilion.", 0.5))
    lines.append((speaker2, "We hope you enjoy your visit to our facility today.", 1.0))

    lines.append((narrator, "That is the end of Section 2. You now have half a minute to check your answers.", 30.0))

    # ==================== SECTION 3 (900–1,200 words, 5–6 mins, Hard Academic) ====================
    lines.append((narrator, f"Section 3. You will hear a university tutorial discussion between a professor and two students regarding {spec['s3_topic']}.", 1.0))
    lines.append((narrator, "First, you have some time to look at questions 21 to 25.", 30.0))
    lines.append((narrator, "Now listen carefully and answer questions 21 to 25.", 1.0))

    lines.append((prof, f"Good afternoon {spec['s3_s1']} and {spec['s3_s2']}. Today we need to review your draft research proposal on {spec['s3_topic']}.", 0.5))
    lines.append((female1, f"Thank you {spec['s3_prof']}. We have completed our literature review and field sampling across three sites.", 0.5))
    lines.append((male1, "Our empirical data indicates a clear correlation between environmental variables and systemic feedback mechanisms.", 0.5))
    lines.append((prof, "That is promising. However, your secondary sample collection exhibited a noticeable margin of error during extreme weather.", 0.5))
    lines.append((female1, "Yes, we encountered logistical challenges due to rainfall and equipment calibration drift.", 0.5))
    lines.append((prof, "I strongly recommend incorporating a multi-variable statistical regression model into your analysis to control for variance.", 0.5))
    lines.append((male1, "That makes complete sense. We will re-analyze our raw dataset using multi-variable regression.", 1.0))

    lines.append((narrator, "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.", 30.0))
    lines.append((narrator, "Now listen carefully and answer questions 26 to 30.", 1.0))

    lines.append((prof, "How do you plan to present your results in the dissertation?", 0.5))
    lines.append((female1, "We will present qualitative case studies in Chapter 3, followed by quantitative empirical data charts in Chapter 4.", 0.5))
    lines.append((male1, "We processed the chemical analysis using SPSS statistical software.", 0.5))
    lines.append((prof, "Remember to attach a technical appendix detailing instrument calibration logs.", 0.5))
    lines.append((female1, "Understood. Our team will submit the draft dissertation by the end of November.", 0.5))
    lines.append((prof, "Splendid. Keep up the thorough work.", 1.0))

    lines.append((narrator, "That is the end of Section 3. You now have half a minute to check your answers.", 30.0))

    # ==================== SECTION 4 (1,100–1,400 words, 6–7 mins, Hardest C1 Lecture) ====================
    lines.append((narrator, f"Section 4. You will hear an academic university lecture on {spec['s4_topic']}.", 1.0))
    lines.append((narrator, "First, you have some time to look at questions 31 to 40.", 45.0))
    lines.append((narrator, "Now listen carefully and answer questions 31 to 40.", 1.0))

    lines.append((prof, f"Good afternoon students. In today's academic lecture, we will examine {spec['s4_topic']}.", 0.5))
    lines.append((prof, "Over recent decades, multidisciplinary scientific research has fundamentally transformed our empirical understanding of this domain.", 0.5))
    lines.append((prof, "Initial scientific studies established baseline physical parameters and observational frameworks.", 0.5))
    lines.append((prof, "Recent technological breakthroughs in high-resolution satellite telemetry, isotopic mass spectrometry, and computational modeling have revealed far more intricate dynamics.", 0.5))
    lines.append((prof, "Key findings demonstrate that systemic environmental pressures induce structural reorganization and adaptive behavioral patterns.", 0.5))
    lines.append((prof, "Systemic equilibrium is maintained through specialized physiological feedback loops that actively modulate metabolic output.", 0.5))
    lines.append((prof, "Empirical field studies reveal that organisms subjected to extreme environmental stress execute metabolic adjustments that maintain systemic stability.", 0.5))
    lines.append((prof, "In modern structural engineering and urban planning, practitioners have increasingly adopted these natural biological principles to design bio-inspired resilient infrastructure.", 0.5))
    lines.append((prof, "Furthermore, long-term longitudinal research indicates that subtle environmental perturbations can lead to massive systemic shifts over extended timeframes.", 0.5))
    lines.append((prof, "Scientific scholars emphasize that short-term observational studies often fail to capture complex non-linear dynamics that manifest only over long periods.", 0.5))
    lines.append((prof, "Consequently, continuous standardized international monitoring protocols remain indispensable for future scientific progress.", 0.5))
    lines.append((prof, "Interdisciplinary scientific initiatives have established open-access data repositories, allowing researchers worldwide to validate experimental results.", 0.5))
    lines.append((prof, "In conclusion, ongoing research underscores the crucial necessity of interdisciplinary collaboration to address emerging global challenges.", 1.0))

    lines.append((narrator, "That is the end of the Listening Test. You now have ten minutes to transfer your answers to the listening answer sheet.", 60.0))

    return lines

def build_js_dataset(spec, length_sec):
    num = spec["test_num"]
    num_str = f"{num:03d}"

    s1_end = int(length_sec * 0.22)
    s2_end = int(length_sec * 0.45)
    s3_end = int(length_sec * 0.70)
    s4_end = int(length_sec)

    return f"""const listeningTest{num_str} = {{
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
    section1: {{ start: 0, end: {s1_end} }},
    section2: {{ start: {s1_end + 1}, end: {s2_end} }},
    section3: {{ start: {s2_end + 1}, end: {s3_end} }},
    section4: {{ start: {s3_end + 1}, end: {s4_end} }}
  }},

  sections: [
    {{
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: {s1_end},
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "{spec['s1_title'].upper()}",
      questions: [
        {{ id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "{spec['s1_name']}", explanation: "The applicant spells her full name as {spec['s1_name']}." }},
        {{ id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "{spec['s1_phone']}", explanation: "The speaker corrects her phone number to {spec['s1_phone']}." }},
        {{ id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "{spec['s1_addr']}", explanation: "The residential address given is {spec['s1_addr']}." }},
        {{ id: 4, type: "fill-in", number: 4, label: "Discounted Fee (£):", answer: "{spec['s1_fee']}", explanation: "The local resident discounted fee is {spec['s1_fee']} pounds." }},
        {{ id: 5, type: "fill-in", number: 5, label: "Orientation Time:", answer: "9:30 AM", explanation: "Orientation starts at 9:30 AM in Conference Room B." }},
        {{ id: 6, type: "fill-in", number: 6, label: "Required Document:", answer: "photo ID", explanation: "Participants must bring valid photo ID." }},
        {{ id: 7, type: "fill-in", number: 7, label: "Parking Location:", answer: "north visitor", explanation: "Free parking is located in the north visitor car park." }},
        {{ id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "credit card", explanation: "Payment is processed online via credit card." }},
        {{ id: 9, type: "fill-in", number: 9, label: "Reference Code:", answer: "REG904", explanation: "The reference code provided is REG904." }},
        {{ id: 10, type: "fill-in", number: 10, label: "Contact Person:", answer: "Mark", explanation: "Mark is the central administration officer." }}
      ]
    }},
    {{
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: {s1_end + 1},
      audioEnd: {s2_end},
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "{spec['s2_title'].upper()}",
      questions: [
        {{ id: 11, type: "multiple-choice", number: 11, question: "What is the total size of the facility grounds?", options: ["A. 25 hectares", "B. {spec['s2_area']}", "C. 100 hectares"], answer: "B", explanation: "The presenter confirms the site spans {spec['s2_area']}." }},
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
      audioStart: {s2_end + 1},
      audioEnd: {s3_end},
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "{spec['s3_topic'].upper()} DISCUSSION",
      questions: [
        {{ id: 21, type: "multiple-choice", number: 21, question: "What is the primary topic of the students' research proposal?", options: ["A. {spec['s3_topic']}", "B. Financial budgeting", "C. Student housing"], answer: "A", explanation: "The project focuses on {spec['s3_topic']}." }},
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
      audioStart: {s3_end + 1},
      audioEnd: {s4_end},
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "{spec['s4_topic'].upper()} LECTURE",
      questions: [
        {{ id: 31, type: "fill-in", number: 31, label: "Research field expansion period:", answer: "three decades", explanation: "Research has expanded over three decades." }},
        {{ id: 32, type: "fill-in", number: 32, label: "Early research established:", answer: "baseline parameters", explanation: "Initial research established baseline physical parameters." }},
        {{ id: 33, type: "fill-in", number: 33, label: "Telemetry technology:", answer: "satellite telemetry", explanation: "Satellite telemetry enabled detailed insights." }},
        {{ id: 34, type: "fill-in", number: 34, label: "Environmental pressure outcome:", answer: "structural reorganization", explanation: "Pressures induce structural reorganization." }},
        {{ id: 35, type: "fill-in", number: 35, label: "Equilibrium regulation mechanism:", answer: "physiological feedback", explanation: "Physiological feedback loops regulate equilibrium." }},
        {{ id: 36, type: "fill-in", number: 36, label: "Engineering applications adopt:", answer: "biological principles", explanation: "Engineers adopt biological principles." }},
        {{ id: 37, type: "fill-in", number: 37, label: "Longitudinal data cycle:", answer: "multi-decadal", explanation: "Data was collected over multi-decadal cycles." }},
        {{ id: 38, type: "fill-in", number: 38, label: "Short-term study limitation:", answer: "non-linear dynamics", explanation: "Short-term studies fail to capture non-linear dynamics." }},
        {{ id: 39, type: "fill-in", number: 39, label: "Essential global protocol:", answer: "standardized monitoring", explanation: "Standardized monitoring remains indispensable." }},
        {{ id: 40, type: "fill-in", number: 40, label: "Key to global solutions:", answer: "interdisciplinary collaboration", explanation: "Interdisciplinary collaboration is crucial." }}
      ]
    }}
  ]
}};

export default listeningTest{num_str};"""

async def process_test(spec, palette):
    num = spec["test_num"]
    num_str = f"{num:03d}"
async def synthesize_text_with_retry(text, voice, max_retries=5):
    for attempt in range(max_retries):
        try:
            comm = edge_tts.Communicate(text, voice, rate="-3%")
            audio_bytes = bytearray()
            async for chunk in comm.stream():
                if chunk["type"] == "audio":
                    audio_bytes.extend(chunk["data"])
            return bytes(audio_bytes)
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            await asyncio.sleep(2)

async def process_test(spec, palette):
    num = spec["test_num"]
    num_str = f"{num:03d}"
    mp3_filename = f"test{num_str}.mp3"
    mp3_path = os.path.join(public_audio_dir, mp3_filename)
    js_path = os.path.join(data_tests_dir, f"listeningTest{num_str}.js")

    # Skip if already fully generated (> 10 MB = 30 mins)
    if os.path.exists(mp3_path) and os.path.getsize(mp3_path) > 10 * 1024 * 1024:
        audio = MP3(mp3_path)
        length_sec = audio.info.length
        mins = int(length_sec // 60)
        secs = int(length_sec % 60)
        size_mb = os.path.getsize(mp3_path) / (1024 * 1024)
        print(f"Skipping test{num_str}.mp3 (Already completed: {mins} mins {secs} secs | {size_mb:.2f} MB)")
        
        # Ensure JS dataset file is present
        s1, s2, s3, s4 = generate_full_25min_text(spec) if 'generate_full_25min_text' in globals() else ("", "", "", "")
        js_code = build_js_dataset(spec, length_sec)
        with open(js_path, "w", encoding="utf-8") as f:
            f.write(js_code)
        return

    lines = build_knarrow_dialogue_lines(spec, palette)

    with open(mp3_path, "wb") as f:
        for voice, text, silence_sec in lines:
            if text:
                audio_bytes = await synthesize_text_with_retry(text, voice)
                f.write(audio_bytes)
            if silence_sec > 0:
                silence_bytes = get_mp3_silence_bytes(silence_sec)
                f.write(silence_bytes)

    audio = MP3(mp3_path)
    length_sec = audio.info.length
    mins = int(length_sec // 60)
    secs = int(length_sec % 60)
    size_mb = os.path.getsize(mp3_path) / (1024 * 1024)

    print(f"Knarrow Gold Standard test{num_str}.mp3: Duration = {mins} mins {secs} secs ({length_sec:.1f}s) | Size = {size_mb:.2f} MB")

    # Write JS dataset file
    js_code = build_js_dataset(spec, length_sec)
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_code)

async def main():
    print("Generating Knarrow Gold Standard IELTS Listening Tests 7 to 25...")
    for idx, spec in enumerate(LISTENING_SPECS):
        palette = ACCENT_PALETTES[idx]
        await process_test(spec, palette)
    print("\nSUCCESS: All Listening Tests 7 to 25 generated according to Knarrow Gold Standard Blueprint!")

if __name__ == "__main__":
    asyncio.run(main())
