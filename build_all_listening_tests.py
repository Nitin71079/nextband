import os
import json

TESTS_DIR = os.path.join("src", "data", "listening", "tests")
IMAGES_DIR = os.path.join("public", "images", "listening")
AUDIO_DIR = os.path.join("public", "audio", "listening")

os.makedirs(TESTS_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(AUDIO_DIR, exist_ok=True)

# 18 Test Specifications (Tests 8 to 25)
TEST_SPECS = [
    {
        "num": 8,
        "title": "IELTS Listening Practice Test 008",
        "sec1_title": "RIVERSIDE FITNESS CLUB MEMBERSHIP ENROLMENT",
        "sec1_person": "Sarah Jenkins", "sec1_phone": "07890 123456", "sec1_type": "Gold", "sec1_date": "1st September", "sec1_duration": "12 months", "sec1_locker": "personal", "sec1_extra": "towel service", "sec1_tier": "full access", "sec1_fee": "£55", "sec1_pay": "direct debit",
        "sec2_title": "Oakfield Sports Complex Layout", "sec2_map_title": "OAKFIELD SPORTS COMPLEX",
        "sec2_mcq": [
            ("What is the main goal of the new indoor athletics arena?", "B", ["A. Host international tournaments", "B. Provide year-round training facilities for local clubs", "C. Replace the outdoor football stadium"]),
            ("How can members book squash courts?", "A", ["A. Through the club mobile application", "B. By calling reception 24 hours in advance", "C. At the automated kiosk in the lobby"]),
            ("What is the policy regarding spectator seating in the swimming pool area?", "C", ["A. Spectators must pay an extra entrance fee", "B. Seating is reserved for coaches only", "C. Spectators are allowed on the upper gallery balcony"]),
            ("Why is the sauna facility closed on Thursday mornings?", "A", ["A. For deep cleaning and temperature calibration", "B. It is reserved for private group bookings", "C. Energy saving maintenance"]),
            ("What event is scheduled for the last Saturday of every month?", "C", ["A. Junior swimming gala", "B. Charity marathon run", "C. Open fitness masterclass"])
        ],
        "sec2_map": [
            ("16", "Main Reception Desk", "F"), ("17", "Olympic Swimming Pool", "D"), ("18", "Indoor Tennis Courts", "B"), ("19", "Fitness Gym Suite", "E"), ("20", "Sports Therapy Clinic", "G")
        ],
        "sec3_topic": "Marine Biology Reef Conservation Study",
        "sec3_matching": [
            ("Recommends measuring coral bleaching over a 6-month period.", "B"),
            ("Expresses concern about water temperature sensor accuracy.", "A"),
            ("Suggests contacting the local maritime authority for historical data.", "C"),
            ("Offers to analyze water salinity samples in the university lab.", "A"),
            ("Advises using underwater drone cameras instead of manual diving.", "C")
        ],
        "sec3_mcq": [
            ("Why did the research team modify their study site?", "B", ["A. The original reef was damaged by storm surges", "B. Access to the first site required special permits", "C. Water clarity was insufficient for photography"]),
            ("What difficulty did they face during data collection?", "A", ["A. Unpredictable tidal currents", "B. Equipment battery failure", "C. Shortage of sample containers"]),
            ("How will the students divide the final presentation slides?", "C", ["A. One student presents while the other answers questions", "B. Each student creates alternate sections independently", "C. Each student presents their own lab methodology"]),
            ("What requirement does Dr. Vance emphasize for the data charts?", "A", ["A. All axes must use standard SI units", "B. Graphs must be rendered in color", "C. Error bars must be omitted"]),
            ("When is the final research paper due?", "B", ["A. Midnight on the 10th", "B. 5:00 pm on Friday the 15th", "C. 9:00 am on Monday the 18th"])
        ],
        "sec4_title": "Solar Energy Storage Innovations",
        "sec4_notes": [
            ("Next-generation solar storage relies on solid-state ", "batteries", " to improve energy density."),
            ("Engineers use advanced copper ", "conductors", " to minimize transmission loss."),
            ("Thermal insulation prevents heat dissipation from storage ", "chambers", " during peak output."),
            ("Grid monitoring software prioritizes public ", "safety", " during voltage spikes.")
        ],
        "sec4_table": [("Lithium-ion cells", "High energy density", "recycling"), ("Flow batteries", "Long operational lifespan", "electrolyte"), ("Molten salt storage", "High temperature storage", "insulation")],
        "sec4_flowchart": [("Solar radiation captured by photovoltaic array.", "sand"), ("DC power converted to AC power via central ", "inverter", " units."), ("Excess energy stored in thermal ", "vessels", " for grid distribution.")]
    }
]

# Dynamically generate specs for tests 9 to 25 to ensure complete coverage!
TOPICS = [
    ("Student Accommodation Enrolment", "Campus Library Grounds", "Architecture History Project", "Cognitive Psychology & Memory"),
    ("International Travel Booking", "Airport Terminal Map", "Environmental Science", "Deep-Sea Archaeology"),
    ("Volunteer Recycling Program", "Town Eco-Park Map", "Agricultural Robotics", "History of Cartography"),
    ("Music Festival Tickets", "Festival Grounds Layout", "Food Technology Assignment", "Bio-Inspired Engineering"),
    ("Hotel Conference Booking", "Heritage Museum Plan", "Geothermal Power Study", "History of Writing Systems"),
    ("Language School Enrolment", "Language Center Map", "Urban Transport Design", "Volcanology & Seismic Waves"),
    ("Science Fair Registration", "Science Exhibition Center", "Civil Engineering Bridge Project", "Astrophysics & Exoplanets"),
    ("Art Workshop Inquiry", "Community Art Gallery", "Marine Plastics Research", "History of Textiles & Dyes"),
    ("Car Insurance & Repair", "Vehicle Testing Center", "Artificial Intelligence Ethics", "Desert Ecology & Adaptation"),
    ("University Housing Service", "Student Village Layout", "Cyber-Security Assignment", "History of Clockwork Automation"),
    ("Theatre Group Membership", "Performing Arts Center", "Coastal Erosion Study", "Glaciology & Climate History"),
    ("Health Center Enrolment", "Wellness Center Plan", "Aerodynamic Car Design", "History of Navigation Instruments"),
    ("Wildlife Sanctuary Tour", "Nature Reserve Map", "Renewable Wave Energy", "History of Currency & Trade"),
    ("Photography Club Enquiry", "Media Studio Floor Plan", "Soil Micro-Biome Research", "Paleontology & Dinosaur Fossils"),
    ("Community Cooking Class", "Culinary Institute Plan", "Sustainable Forestry Study", "Industrial Revolution Automation"),
    ("Bicycle Hire Service", "City Bike Park Layout", "Ergonomics & Workplace Design", "History of Astronomy Telescopes"),
    ("Public Library Membership", "Knowledge Center Layout", "Space Exploration Project", "Neuroscience of Language Acquisition")
]

for idx, (t1, t2, t3, t4) in enumerate(TOPICS, start=9):
    TEST_SPECS.append({
        "num": idx,
        "title": f"IELTS Listening Practice Test {idx:03d}",
        "sec1_title": f"{t1.upper()} BOOKING FORM",
        "sec1_person": f"Applicant {idx}", "sec1_phone": f"07123 {idx:03d}99", "sec1_type": "Standard", "sec1_date": "10th October", "sec1_duration": "6 months", "sec1_locker": "standard", "sec1_extra": "parking pass", "sec1_tier": "full", "sec1_fee": f"£{40+idx}", "sec1_pay": "credit card",
        "sec2_title": f"{t2} Layout", "sec2_map_title": t2.upper(),
        "sec2_mcq": [
            (f"What is the primary feature of the new {t2} facility?", "B", ["A. Commercial retail area", "B. Public educational center", "C. Private staff offices"]),
            ("How do visitors register for group tours?", "A", ["A. Online reservation form", "B. In person at reception", "C. Telephone hotlines"]),
            ("What rule applies to mobile phones in quiet areas?", "C", ["A. Phones must be switched off", "B. Calls allowed in designated booths", "C. Silent mode required at all times"]),
            ("Why is section B closed on Wednesdays?", "A", ["A. Scheduled maintenance", "B. Private corporate hire", "C. Staff training workshops"]),
            ("What special event takes place every weekend?", "C", ["A. Youth sports tournament", "B. Local craft market", "C. Live acoustic performance"])
        ],
        "sec2_map": [
            ("16", "Main Reception Desk", "F"), ("17", "Central Exhibition Hall", "D"), ("18", "Resource Center", "B"), ("19", "Outdoor Terrace", "E"), ("20", "Special Collection Room", "G")
        ],
        "sec3_topic": t3,
        "sec3_matching": [
            (f"Recommends focusing the {t3} report on historical data.", "B"),
            ("Expresses concern regarding sample measurement accuracy.", "A"),
            ("Suggests consulting an industry specialist.", "C"),
            ("Offers to lead the data analysis section.", "A"),
            ("Advises using digital simulation software.", "C")
        ],
        "sec3_mcq": [
            ("Why did the students change their research topic?", "B", ["A. Similar project published", "B. Original topic scope was too broad", "C. Equipment was unavailable"]),
            ("What difficulty occurred during literature review?", "A", ["A. Discrepancies in published data", "B. Missing reference books", "C. Language translation issues"]),
            ("How will the draft writing responsibilities be divided?", "C", ["A. One student writes all sections", "B. Written together in lab sessions", "C. Each drafts two sections and peer-reviews"]),
            ("What formatting rule is mandatory for references?", "A", ["A. Strict APA 7th edition compliance", "B. Minimum 30 sources", "C. URLs in footnotes"]),
            ("When is the final draft deadline?", "B", ["A. Wednesday 12:00 pm", "B. Friday 5:00 pm", "C. Monday 9:00 am"])
        ],
        "sec4_title": t4,
        "sec4_notes": [
            (f"Ancient systems utilized specialized ", "stone", " blocks for stability."),
            ("Engineers implemented underground ", "channels", " to convey fluids."),
            ("Materials were treated to prevent structural ", "erosion", " over time."),
            ("Urban planners prioritized public ", "health", " in municipal layouts.")
        ],
        "sec4_table": [("Phase 1", "Initial excavation", "clay"), ("Phase 2", "Structural reinforcement", "timber"), ("Phase 3", "Final sealing", "lime")],
        "sec4_flowchart": [("Raw materials collected from mountain quarries.", "sand"), ("Materials processed through natural ", "filters", " to remove debris."), ("Final product stored in covered ", "chambers", " for urban distribution.")]
    })

print(f"Loaded {len(TEST_SPECS)} test specifications.")

# Generate JS files and SVG maps for Tests 8 to 25
for spec in TEST_SPECS:
    t_num = spec["num"]
    t_id = f"listening-test-{t_num:03d}"
    js_filename = f"listeningTest{t_num:03d}.js"
    js_path = os.path.join(TESTS_DIR, js_filename)
    svg_filename = f"test{t_num:03d}-map.svg"
    svg_path = os.path.join(IMAGES_DIR, svg_filename)

    # 1. Create SVG map
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 520" width="720" height="520" font-family="Arial, sans-serif">
  <rect width="720" height="520" fill="#f8fafc" rx="6"/>
  <text x="360" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#0f172a">{spec['sec2_map_title']} – LAYOUT PLAN</text>
  <text x="686" y="44" font-size="11" fill="#0284c7" font-weight="bold">N</text>
  <line x1="692" y1="48" x2="692" y2="66" stroke="#0284c7" stroke-width="1.5"/>
  <polygon points="692,38 688,50 696,50" fill="#0284c7"/>
  <rect x="50" y="42" width="620" height="420" fill="#ffffff" stroke="#0284c7" stroke-width="3" rx="4"/>
  <rect x="310" y="440" width="100" height="22" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
  <text x="360" y="456" text-anchor="middle" font-size="10" fill="#0369a1" font-weight="bold">MAIN ENTRANCE</text>
  <rect x="330" y="42" width="60" height="420" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
  <text x="360" y="260" text-anchor="middle" font-size="10" fill="#64748b" font-style="italic" transform="rotate(-90,360,260)">Central Avenue</text>
  <circle cx="360" cy="230" r="28" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <text x="360" y="234" text-anchor="middle" font-size="9" fill="#0369a1" font-weight="bold">Fountain</text>
  <rect x="410" y="340" width="240" height="80" fill="#e0f2fe" stroke="#0369a1" stroke-width="2" rx="3"/>
  <text x="530" y="376" text-anchor="middle" font-size="12" fill="#075985" font-weight="bold">16</text>
  <circle cx="530" cy="373" r="14" fill="none" stroke="#075985" stroke-width="2"/>
  <text x="530" y="406" text-anchor="middle" font-size="9" fill="#64748b" font-style="italic">(label here)</text>
  <rect x="250" y="100" width="220" height="75" fill="#fef3c7" stroke="#d97706" stroke-width="2" rx="3"/>
  <text x="360" y="136" text-anchor="middle" font-size="12" fill="#b45309" font-weight="bold">17</text>
  <circle cx="360" cy="133" r="14" fill="none" stroke="#b45309" stroke-width="2"/>
  <text x="360" y="163" text-anchor="middle" font-size="9" fill="#64748b" font-style="italic">(label here)</text>
  <rect x="60" y="55" width="220" height="110" fill="#fce7f3" stroke="#db2777" stroke-width="2" rx="3"/>
  <text x="170" y="106" text-anchor="middle" font-size="12" fill="#9d174d" font-weight="bold">18</text>
  <circle cx="170" cy="103" r="14" fill="none" stroke="#9d174d" stroke-width="2"/>
  <text x="170" y="138" text-anchor="middle" font-size="9" fill="#64748b" font-style="italic">(label here)</text>
  <rect x="60" y="185" width="220" height="120" fill="#f3e8ff" stroke="#9333ea" stroke-width="2" rx="3"/>
  <text x="170" y="240" text-anchor="middle" font-size="12" fill="#7e22ce" font-weight="bold">19</text>
  <circle cx="170" cy="237" r="14" fill="none" stroke="#7e22ce" stroke-width="2"/>
  <text x="170" y="272" text-anchor="middle" font-size="9" fill="#64748b" font-style="italic">(label here)</text>
  <rect x="490" y="55" width="170" height="120" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="3"/>
  <text x="575" y="110" text-anchor="middle" font-size="12" fill="#15803d" font-weight="bold">20</text>
  <circle cx="575" cy="107" r="14" fill="none" stroke="#15803d" stroke-width="2"/>
  <text x="575" y="142" text-anchor="middle" font-size="9" fill="#64748b" font-style="italic">(label here)</text>
  <rect x="50" y="474" width="620" height="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" rx="4"/>
  <line x1="68" y1="490" x2="108" y2="490" stroke="#334155" stroke-width="2"/>
  <text x="115" y="494" font-size="10" fill="#334155">= numbered question location</text>
  <line x1="260" y1="490" x2="300" y2="490" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="307" y="494" font-size="10" fill="#64748b">= named reference (not a question)</text>
</svg>"""
    
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)

    # 2. Create JS Data File
    js_content = f"""const listeningTest{t_num:03d} = {{
  id: "{t_id}",
  title: "{spec['title']}",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test{t_num:03d}.mp3",
  transcript: "/assets/listening/test{t_num:03d}/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {{
    section1: {{ start: 0,    end: 340  }},
    section2: {{ start: 341,  end: 720  }},
    section3: {{ start: 721,  end: 1180 }},
    section4: {{ start: 1181, end: 1680 }}
  }},

  sections: [
    {{
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 340,
      instruction: "Complete the form below.\\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "{spec['sec1_title']}",
      form: [
        {{ id: 1, label: "Full name", answer: "{spec['sec1_person']}" }},
        {{ id: 2, label: "Contact telephone", answer: "{spec['sec1_phone']}" }},
        {{ id: 3, label: "Membership option", answer: "{spec['sec1_type']}" }},
        {{ id: 4, label: "Start date", answer: "{spec['sec1_date']}" }},
        {{ id: 5, label: "Contract duration", answer: "{spec['sec1_duration']}" }},
        {{ id: 6, label: "Locker preference", answer: "{spec['sec1_locker']}" }},
        {{ id: 7, label: "Extra service requested", answer: "{spec['sec1_extra']}" }},
        {{ id: 8, label: "Access tier selected", answer: "{spec['sec1_tier']}" }},
        {{ id: 9, label: "Monthly membership fee", answer: "{spec['sec1_fee']}" }},
        {{ id: 10, label: "Payment method", answer: "{spec['sec1_pay']}" }}
      ]
    }},

    {{
      id: 2,
      title: "Section 2",
      type: "mixed",
      audioStart: 341,
      audioEnd: 720,
      groups: [
        {{
          id: "section2_mcq",
          type: "mcq",
          title: "Questions 11–15",
          instruction: "Choose the correct letter, A, B or C.",
          questions: [
            {{ id: 11, question: "{spec['sec2_mcq'][0][0]}", options: [{{ letter: "A", text: "{spec['sec2_mcq'][0][2][0]}" }}, {{ letter: "B", text: "{spec['sec2_mcq'][0][2][1]}" }}, {{ letter: "C", text: "{spec['sec2_mcq'][0][2][2]}" }}], answer: "{spec['sec2_mcq'][0][1]}" }},
            {{ id: 12, question: "{spec['sec2_mcq'][1][0]}", options: [{{ letter: "A", text: "{spec['sec2_mcq'][1][2][0]}" }}, {{ letter: "B", text: "{spec['sec2_mcq'][1][2][1]}" }}, {{ letter: "C", text: "{spec['sec2_mcq'][1][2][2]}" }}], answer: "{spec['sec2_mcq'][1][1]}" }},
            {{ id: 13, question: "{spec['sec2_mcq'][2][0]}", options: [{{ letter: "A", text: "{spec['sec2_mcq'][2][2][0]}" }}, {{ letter: "B", text: "{spec['sec2_mcq'][2][2][1]}" }}, {{ letter: "C", text: "{spec['sec2_mcq'][2][2][2]}" }}], answer: "{spec['sec2_mcq'][2][1]}" }},
            {{ id: 14, question: "{spec['sec2_mcq'][3][0]}", options: [{{ letter: "A", text: "{spec['sec2_mcq'][3][2][0]}" }}, {{ letter: "B", text: "{spec['sec2_mcq'][3][2][1]}" }}, {{ letter: "C", text: "{spec['sec2_mcq'][3][2][2]}" }}], answer: "{spec['sec2_mcq'][3][1]}" }},
            {{ id: 15, question: "{spec['sec2_mcq'][4][0]}", options: [{{ letter: "A", text: "{spec['sec2_mcq'][4][2][0]}" }}, {{ letter: "B", text: "{spec['sec2_mcq'][4][2][1]}" }}, {{ letter: "C", text: "{spec['sec2_mcq'][4][2][2]}" }}], answer: "{spec['sec2_mcq'][4][1]}" }}
          ]
        }},
        {{
          id: "section2_map",
          type: "map",
          title: "Questions 16–20",
          instruction: "Label the map below.\\nChoose FIVE answers from the box and write the correct letter, A–H, next to Questions 16–20.",
          image: "/images/listening/{svg_filename}",
          options: [
            {{ letter: "A", text: "Alpine Rock Garden" }}, {{ letter: "B", text: "Resource Center" }},
            {{ letter: "C", text: "Children's Area" }}, {{ letter: "D", text: "Central Hall" }},
            {{ letter: "E", text: "Outdoor Terrace" }}, {{ letter: "F", text: "Main Reception Desk" }},
            {{ letter: "G", text: "Special Collection Room" }}, {{ letter: "H", text: "Study Pods" }}
          ],
          questions: [
            {{ id: 16, label: "{spec['sec2_map'][0][1]}", answer: "{spec['sec2_map'][0][2]}" }},
            {{ id: 17, label: "{spec['sec2_map'][1][1]}", answer: "{spec['sec2_map'][1][2]}" }},
            {{ id: 18, label: "{spec['sec2_map'][2][1]}", answer: "{spec['sec2_map'][2][2]}" }},
            {{ id: 19, label: "{spec['sec2_map'][3][1]}", answer: "{spec['sec2_map'][3][2]}" }},
            {{ id: 20, label: "{spec['sec2_map'][4][1]}", answer: "{spec['sec2_map'][4][2]}" }}
          ]
        }}
      ]
    }},

    {{
      id: 3,
      title: "Section 3",
      type: "mixed",
      audioStart: 721,
      audioEnd: 1180,
      groups: [
        {{
          id: "section3_matching",
          type: "matching",
          title: "Questions 21–25",
          instruction: "Who expresses each opinion?\\nChoose the correct letter, A, B or C.",
          options: [{{ letter: "A", text: "Liam" }}, {{ letter: "B", text: "Hannah" }}, {{ letter: "C", text: "Dr. Vance" }}],
          questions: [
            {{ id: 21, item: "{spec['sec3_matching'][0][0]}", answer: "{spec['sec3_matching'][0][1]}" }},
            {{ id: 22, item: "{spec['sec3_matching'][1][0]}", answer: "{spec['sec3_matching'][1][1]}" }},
            {{ id: 23, item: "{spec['sec3_matching'][2][0]}", answer: "{spec['sec3_matching'][2][1]}" }},
            {{ id: 24, item: "{spec['sec3_matching'][3][0]}", answer: "{spec['sec3_matching'][3][1]}" }},
            {{ id: 25, item: "{spec['sec3_matching'][4][0]}", answer: "{spec['sec3_matching'][4][1]}" }}
          ]
        }},
        {{
          id: "section3_mcq",
          type: "mcq",
          title: "Questions 26–30",
          instruction: "Choose the correct letter, A, B or C.",
          questions: [
            {{ id: 26, question: "{spec['sec3_mcq'][0][0]}", options: [{{ letter: "A", text: "{spec['sec3_mcq'][0][2][0]}" }}, {{ letter: "B", text: "{spec['sec3_mcq'][0][2][1]}" }}, {{ letter: "C", text: "{spec['sec3_mcq'][0][2][2]}" }}], answer: "{spec['sec3_mcq'][0][1]}" }},
            {{ id: 27, question: "{spec['sec3_mcq'][1][0]}", options: [{{ letter: "A", text: "{spec['sec3_mcq'][1][2][0]}" }}, {{ letter: "B", text: "{spec['sec3_mcq'][1][2][1]}" }}, {{ letter: "C", text: "{spec['sec3_mcq'][1][2][2]}" }}], answer: "{spec['sec3_mcq'][1][1]}" }},
            {{ id: 28, question: "{spec['sec3_mcq'][2][0]}", options: [{{ letter: "A", text: "{spec['sec3_mcq'][2][2][0]}" }}, {{ letter: "B", text: "{spec['sec3_mcq'][2][2][1]}" }}, {{ letter: "C", text: "{spec['sec3_mcq'][2][2][2]}" }}], answer: "{spec['sec3_mcq'][2][1]}" }},
            {{ id: 29, question: "{spec['sec3_mcq'][3][0]}", options: [{{ letter: "A", text: "{spec['sec3_mcq'][3][2][0]}" }}, {{ letter: "B", text: "{spec['sec3_mcq'][3][2][1]}" }}, {{ letter: "C", text: "{spec['sec3_mcq'][3][2][2]}" }}], answer: "{spec['sec3_mcq'][3][1]}" }},
            {{ id: 30, question: "{spec['sec3_mcq'][4][0]}", options: [{{ letter: "A", text: "{spec['sec3_mcq'][4][2][0]}" }}, {{ letter: "B", text: "{spec['sec3_mcq'][4][2][1]}" }}, {{ letter: "C", text: "{spec['sec3_mcq'][4][2][2]}" }}], answer: "{spec['sec3_mcq'][4][1]}" }}
          ]
        }}
      ]
    }},

    {{
      id: 4,
      title: "Section 4",
      type: "mixed",
      audioStart: 1181,
      audioEnd: 1680,
      groups: [
        {{
          id: "section4_notes",
          type: "notes",
          title: "Questions 31–34",
          instruction: "Complete the notes below.\\nWrite NO MORE THAN TWO WORDS for each answer.",
          notesTitle: "{spec['sec4_title']}",
          notes: [
            {{ type: "heading", text: "Key Concepts & Principles" }},
            {{ type: "blank", id: 31, prefix: "{spec['sec4_notes'][0][0]}", suffix: "." }},
            {{ type: "blank", id: 32, prefix: "{spec['sec4_notes'][1][0]}", suffix: "." }},
            {{ type: "blank", id: 33, prefix: "{spec['sec4_notes'][2][0]}", suffix: "." }},
            {{ type: "blank", id: 34, prefix: "{spec['sec4_notes'][3][0]}", suffix: "." }}
          ],
          answers: {{
            31: "{spec['sec4_notes'][0][1]}",
            32: "{spec['sec4_notes'][1][1]}",
            33: "{spec['sec4_notes'][2][1]}",
            34: "{spec['sec4_notes'][3][1]}"
          }}
        }},
        {{
          id: "section4_table",
          type: "table",
          title: "Questions 35–37",
          instruction: "Complete the table below.\\nWrite NO MORE THAN TWO WORDS for each answer.",
          tableTitle: "Comparative System Analysis",
          headers: ["Category", "Core Feature", "Primary Requirement"],
          rows: [
            [{{ type: "text", value: "{spec['sec4_table'][0][0]}" }}, {{ type: "text", value: "{spec['sec4_table'][0][1]}" }}, {{ id: 35 }}],
            [{{ type: "text", value: "{spec['sec4_table'][1][0]}" }}, {{ type: "text", value: "{spec['sec4_table'][1][1]}" }}, {{ id: 36 }}],
            [{{ type: "text", value: "{spec['sec4_table'][2][0]}" }}, {{ type: "text", value: "{spec['sec4_table'][2][1]}" }}, {{ id: 37 }}]
          ],
          answers: {{
            35: "{spec['sec4_table'][0][2]}",
            36: "{spec['sec4_table'][1][2]}",
            37: "{spec['sec4_table'][2][2]}"
          }}
        }},
        {{
          id: "section4_flowchart",
          type: "flowchart",
          title: "Questions 38–40",
          instruction: "Complete the flow chart below.\\nWrite NO MORE THAN TWO WORDS for each answer.",
          flowchartTitle: "Process & Implementation Cycle",
          steps: [
            {{ type: "text", text: "{spec['sec4_flowchart'][0][0]}" }},
            {{ type: "blank", id: 38, prefix: "{spec['sec4_flowchart'][1][0]}", suffix: "." }},
            {{ type: "blank", id: 39, prefix: "{spec['sec4_flowchart'][2][0]}", suffix: "." }},
            {{ type: "blank", id: 40, prefix: "Controlled distribution ensures reliable output.", suffix: "" }}
          ],
          answers: {{
            38: "{spec['sec4_flowchart'][0][1]}",
            39: "{spec['sec4_flowchart'][1][1]}",
            40: "{spec['sec4_flowchart'][2][1]}"
          }}
        }}
      ]
    }}
  ]
}};

export default listeningTest{t_num:03d};
"""

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_content)

print(f"Successfully generated JS data files and SVG maps for Tests 008 through 025!")
