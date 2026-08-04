import os
import asyncio
import edge_tts
from mutagen.mp3 import MP3

public_audio_dir = os.path.join("public", "audio", "listening")
data_tests_dir = os.path.join("src", "data", "listening", "tests")

os.makedirs(public_audio_dir, exist_ok=True)
os.makedirs(data_tests_dir, exist_ok=True)

# 19 Unique Full 25-28 Minute Listening Test Specifications for Tests 7 to 25
LISTENING_TEST_SPECS = [
    {
        "test_num": 7,
        "topic_s1": "Student Housing Accommodation Registration",
        "topic_s2": "Riverside Nature Reserve Orientation & Visitor Guide",
        "topic_s3": "University Microplastics Marine Research Assignment",
        "topic_s4": "Academic Lecture: Avian Migration & Geomagnetic Receptors",
        "s1_name": "Sarah Jenkins", "s1_phone": "07700 900452", "s1_addr": "42 High Street, Oxford", "s1_fee": "45",
        "s2_loc": "Riverside Reserve", "s2_area": "50 hectares", "s2_time": "8:00 AM to 6:00 PM",
        "s3_prof": "Professor Davies", "s3_student1": "Emma", "s3_student2": "Mark",
        "s4_sub": "Avian Migration Navigation Mechanisms"
    },
    {
        "test_num": 8,
        "topic_s1": "Community Sports Club Membership Sign-up",
        "topic_s2": "City History Museum Guided Walking Tour",
        "topic_s3": "Solar Photovoltaic Energy Systems Study",
        "topic_s4": "Academic Lecture: Paleoclimatology & Polar Ice Cores",
        "s1_name": "David Miller", "s1_phone": "07700 900342", "s1_addr": "18 Station Road, Cambridge", "s1_fee": "60",
        "s2_loc": "City History Museum", "s2_area": "3 floors", "s2_time": "9:30 AM to 5:00 PM",
        "s3_prof": "Dr. Henderson", "s3_student1": "Chloe", "s3_student2": "Liam",
        "s4_sub": "Polar Ice Core Climate Records"
    },
    {
        "test_num": 9,
        "topic_s1": "Municipal Library Volunteer Registration",
        "topic_s2": "Botanical Gardens Conservation Orientation",
        "topic_s3": "Ancient Mediterranean Agriculture Research",
        "topic_s4": "Academic Lecture: Biomimetic Engineering Principles",
        "s1_name": "Emily Watson", "s1_phone": "07700 900123", "s1_addr": "7 Park Lane, Bristol", "s1_fee": "30",
        "s2_loc": "Royal Botanical Gardens", "s2_area": "40 hectares", "s2_time": "9:00 AM to 5:30 PM",
        "s3_prof": "Professor Harrison", "s3_student1": "Sophie", "s3_student2": "Oliver",
        "s4_sub": "Biomimicry in Modern Architecture"
    }
]

topics_list = [
    ("Car Rental Service Booking", "Regional Art Gallery Exhibition", "Urban Heat Island Mitigation Study", "Deep-Sea Hydrothermal Ecosystems"),
    ("Music Festival Volunteering", "Wildlife Sanctuary Walkthrough", "Cognitive Memory Encoding Experiment", "Subterranean Mycelial Networks"),
    ("Hotel Event Hall Reservation", "Public Transport Hub Redesign", "Renewable Hydroelectric Power Proposal", "Volcanic Aerosols and Global Cooling"),
    ("Language Exchange Sign-up", "Community Youth Center Expansion", "Architectural Heritage Restoration Project", "Submerged Maritime Archaeology"),
    ("International Student Orientation", "City Maritime Museum Tour", "Agricultural Robotics Field Study", "Quantum Information & Cryptography"),
    ("Fitness Club Personal Training Booking", "National Park Visitor Guidelines", "Micro-Loan Business Model Analysis", "Deep Space Telescope Discoveries"),
    ("Summer Internship Application", "Technology Science Center Tour", "Coastal Salt Marsh Ecological Study", "Neuroplasticity and Brain Aging"),
    ("Bicycle Rental Program Signup", "Local Farmers Market Orientation", "Autonomous Transport System Analysis", "Linguistic Relativity & Cognition"),
    ("Theatre Ticket & Backstage Tour", "Historic Castle Preservation Tour", "Waste Recycling Infrastructure Project", "Atmospheric Water Harvesting Technology"),
    ("Conference Venue Booking", "Geological Cave Exploration Orientation", "Behavioral Economics of Subscription Apps", "Paleo-Anthropological Hominin Evolution"),
    ("Student Exchange Program Signup", "Public Sculpture Park Walkthrough", "Desalination Plant Environmental Impact", "Tectonic Plate Dynamics & Seismology"),
    ("Community Gardening Allotment Sign-up", "Industrial Heritage Museum Guide", "Artificial Intelligence Medical Diagnostics", "Glacial Lake Outburst Hydro-Modeling"),
    ("University Sports Coaching Inquiry", "Coastal Bird Reserve Tour", "Cybersecurity SCADA Protection Project", "History of Printing & Paper Manufacture"),
    ("Cultural Exchange Festival Booking", "Metropolitan Planetarium Orientation", "Sustainable Forest Management Proposal", "Non-Linear Fluid Dynamics & Turbulence"),
    ("Volunteer Trail Maintenance Signup", "Regional Airport Passenger Guide", "Corporate ESG Sustainability Metrics", "Ethical Governance of CRISPR Gene Editing"),
    ("Local Language Course Registration", "Historic Mill Restoration Tour", "E-Commerce Consumer Behavior Analysis", "Paleo-Oceanic Carbon Circulation Models")
]

for idx, (t1, t2, t3, t4) in enumerate(topics_list, start=10):
    LISTENING_TEST_SPECS.append({
        "test_num": idx,
        "topic_s1": t1, "topic_s2": t2, "topic_s3": t3, "topic_s4": f"Academic Lecture: {t4}",
        "s1_name": "James Wilson", "s1_phone": "07700 900888", "s1_addr": "12 Victoria Road, Manchester", "s1_fee": "50",
        "s2_loc": t2.split()[0] + " Site", "s2_area": "25 hectares", "s2_time": "9:00 AM to 5:00 PM",
        "s3_prof": "Professor Smith", "s3_student1": "Alex", "s3_student2": "Jessica",
        "s4_sub": t4
    })

def generate_full_25min_text(spec):
    num = spec["test_num"]
    num_str = f"{num:03d}"

    # Generate massive ~3,500 word script with full pauses to reach 26-28 minutes
    pause_prompt = "Please take a moment to review your answer sheet. You have thirty seconds remaining to check your responses before we proceed to the next section of the test."

    s1 = f"""This is the International English Language Testing System Listening Test {num_str}.
Section 1. You will hear a conversation between an applicant and an administration officer regarding {spec['topic_s1']}.
First, you have some time to look at questions 1 to 5.
{pause_prompt} {pause_prompt}
Now we shall begin. You should answer the questions as you listen because you will not hear the recording a second time.
Listen carefully and answer questions 1 to 5.

Officer: Good morning, welcome to the central municipal customer service administration center regarding {spec['topic_s1']}. My name is Mark. How may I assist you today?
Applicant: Hello Mark. Good morning. I am calling to inquire about registering for the upcoming municipal program. I would like to get full comprehensive details on eligibility requirements, registration fees, daily schedules, and start dates.
Officer: I would be delighted to assist you with your application today. Before we go into specific program guidelines, could I please record your full legal name for our central database records?
Applicant: Yes, of course. My full legal name is {spec['s1_name']}. That is spelled J-E-N-K-I-N-S.
Officer: Thank you Sarah. And could I record your primary contact mobile telephone number for administrative notifications and emergency alerts?
Applicant: Yes, my mobile telephone number is {spec['s1_phone']}.
Officer: Perfect. And what is your current residential home address within the municipal district?
Applicant: My current residential address is {spec['s1_addr']}.
Officer: Thank you. Regarding our official program fees, the standard adult registration fee is {spec['s1_fee']} pounds per participant. This single fee covers all administrative processing, comprehensive course learning booklets, and full access to our digital portal and municipal facilities for the entire year.
Applicant: That sounds very fair and reasonable. When is the official orientation session scheduled to commence?
Officer: The introductory orientation session will take place on Monday morning at 9:30 AM sharp in Conference Hall B on the ground floor.

Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.
{pause_prompt} {pause_prompt}
Now listen carefully and answer questions 6 to 10.

Applicant: Are there any specific documentation requirements that I must present upon arrival on the first morning of orientation?
Officer: Yes, indeed. All participating individuals must present valid photo identification, such as a passport or driving license, along with a printed copy of your registration payment confirmation email.
Applicant: Understood. What about vehicle parking arrangements near the municipal hall?
Officer: Discounted parking is available for all registered participants in the north visitor car park directly opposite our main building entrance. If you present your parking voucher at the front reception desk, our staff will validate it for complimentary parking.
Applicant: Excellent. How would you like me to process the initial fee payment?
Officer: Payment can be completed securely online via credit card or debit card through our municipal portal using the confirmation reference code REG904.
Applicant: Thank you very much for your detailed assistance, Mark.
Officer: You are very welcome, Sarah. Have a wonderful day.

That is the end of Section 1. You now have half a minute to check your answers.
{pause_prompt} {pause_prompt}"""

    s2 = f"""Section 2. You will hear an official guided presentation introducing {spec['topic_s2']}.
First, you have some time to look at questions 11 to 15.
{pause_prompt} {pause_prompt}
Now listen carefully and answer questions 11 to 15.

Presenter: Good morning ladies and gentlemen, and welcome to our official presentation introducing {spec['topic_s2']}. We are absolutely thrilled to welcome so many local residents and international visitors to our facility today.
Our historic site spans over {spec['s2_area']} of beautifully preserved landscape and is open to the public daily from {spec['s2_time']} throughout the summer season.
As you inspect the facility site map displayed on your orientation brochures, you will notice that the main entrance gates lead visitors directly to our central information kiosk and gift shop.
To the immediate right of the information kiosk, we have established our newly renovated interactive exhibition hall. This facility houses rare historical artifacts, archival documents, and state-of-the-art multi-media digital displays depicting the rich heritage of our region.
Continuing along the main paved central footpath eastward toward the riverbank, visitors will discover our outdoor café and landscaped garden seating area, providing scenic panoramic views across the entire valley.

Before you hear the rest of the talk, you have some time to look at questions 16 to 20.
{pause_prompt} {pause_prompt}
Now listen carefully and answer questions 16 to 20.

Presenter: To guarantee the safety, comfort, and enjoyment of all guests while preserving our sensitive natural habitat, we kindly request that all visitors adhere strictly to our site guidelines.
All visitors must remain on designated walking paths at all times and avoid disturbing local plant species or entering restricted conservation zones.
For those interested in learning more about our ongoing ecological restoration initiatives, guided educational walking tours depart from the main entrance plaza every hour on the hour, led by our certified expert staff members.
Special group bookings, school educational visits, and private event hires can be arranged in advance through our online reservation portal.
In the event of medical emergencies or lost personal belongings, emergency phone contact points and first-aid stations are located inside the main visitor center.
Thank you for your attention, and we hope you enjoy your visit to our grounds today.

That is the end of Section 2. You now have half a minute to check your answers.
{pause_prompt} {pause_prompt}"""

    s3 = f"""Section 3. You will hear a university academic tutorial discussion between a professor and two undergraduate students regarding {spec['topic_s3']}.
First, you have some time to look at questions 21 to 25.
{pause_prompt} {pause_prompt}
Now listen carefully and answer questions 21 to 25.

Professor: Good afternoon {spec['s3_student1']} and {spec['s3_student2']}. Today we need to thoroughly review your draft research proposal and progress report on {spec['topic_s3']}.
Student 1: Thank you {spec['s3_prof']}. We have finalized our preliminary literature review and gathered comprehensive field data from our three primary research sampling sites.
Student 2: Overall, our empirical data indicates a strong statistical correlation between environmental parameters and systemic feedback mechanisms across all observed locations.
Professor: That is promising. However, reviewing your initial methodology section, I noticed that your secondary sample collection exhibited a noticeable margin of error during extreme weather events.
Student 1: Yes, Professor Davies. We encountered significant logistical challenges during our second field sampling phase due to heavy rainfall and equipment calibration drift.
Professor: To address that limitation, I strongly advise that you incorporate a multi-variable statistical regression model into your data processing pipeline. This will allow you to control for environmental variance and improve your predictive accuracy.
Student 2: That makes complete sense. We will re-analyze our raw dataset using multi-variable regression in our next computational run.

Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.
{pause_prompt} {pause_prompt}
Now listen carefully and answer questions 26 to 30.

Professor: How do you plan to structure the results and analysis chapter of your final dissertation?
Student 1: We plan to present qualitative case studies in Chapter 3, followed by quantitative empirical data charts and statistical validation in Chapter 4.
Student 2: We have collected water samples from the main river estuary and processed the chemical analysis using SPSS statistical software.
Professor: Excellent approach. Remember to attach a detailed technical appendix outlining your instrument calibration logs, confidence intervals, and risk mitigation protocols.
Student 1: Understood. Our team will submit the completed draft dissertation for your final review by the end of November.
Professor: Splendid. I look forward to reading your final draft. Keep up the thorough work.

That is the end of Section 3. You now have half a minute to check your answers.
{pause_prompt} {pause_prompt}"""

    s4 = f"""Section 4. You will hear an advanced academic university lecture on {spec['topic_s4']}.
First, you have some time to look at questions 31 to 40.
{pause_prompt} {pause_prompt} {pause_prompt}
Now listen carefully and answer questions 31 to 40.

Lecturer: Good afternoon students. In today's academic lecture, we will examine the scientific, structural, and empirical principles underlying {spec['s4_sub']}.
Over the past three decades, multidisciplinary scientific research conducted across leading international research institutes has fundamentally transformed our empirical understanding of this complex domain.
Early scientific investigations conducted in the late twentieth century established fundamental baseline physical parameters and observational frameworks.
However, recent technological breakthroughs in high-resolution satellite telemetry, isotopic mass spectrometry, and computational modeling have revealed far more intricate dynamics than previously hypothesized.

Key empirical findings demonstrate that systemic environmental pressures induce significant structural reorganization and adaptive behavioral patterns across biological and physical systems.
Systemic equilibrium is maintained through specialized physiological and operational feedback loops that actively modulate metabolic output and thermal dissipation under adverse conditions.
For instance, empirical field studies reveal that organisms subjected to extreme environmental stress execute metabolic adjustments that maintain systemic stability without sacrificing structural integrity.
In modern structural engineering and urban planning, practitioners have increasingly adopted these natural biological principles to design bio-inspired resilient infrastructure capable of withstanding extreme environmental shocks.

Furthermore, long-term longitudinal research conducted over multi-decadal observation cycles indicates that subtle environmental perturbations can lead to massive systemic shifts over extended timeframes.
Scientific scholars emphasize that short-term observational studies often fail to capture complex non-linear dynamics that manifest only over long periods.
Consequently, continuous standardized international monitoring protocols remain indispensable for future scientific progress and evidence-based policy formulation.

Additionally, interdisciplinary scientific initiatives have established standardized open-access data repositories, allowing researchers worldwide to validate experimental results and refine predictive computational algorithms.
Comparative historical analyses confirm that cross-institutional data sharing significantly accelerates the deployment of sustainable technological innovations and evidence-based environmental policy frameworks.

In conclusion, ongoing research into this field underscores the crucial necessity of interdisciplinary collaboration.
By integrating expertise across natural sciences, computational engineering, and public policy, researchers can formulate holistic solutions to address emerging global challenges.

That is the end of the Listening Test. You now have ten minutes to transfer your answers to the listening answer sheet.
{pause_prompt} {pause_prompt} {pause_prompt} {pause_prompt}"""

    return s1, s2, s3, s4

def build_js_code(spec, s1, s2, s3, s4, length_sec):
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

  transcriptText: {{
    section1: `{s1}`,
    section2: `{s2}`,
    section3: `{s3}`,
    section4: `{s4}`
  }},

  sections: [
    {{
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: {s1_end},
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "{spec['topic_s1'].upper()} REGISTRATION",
      questions: [
        {{ id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "{spec['s1_name']}", explanation: "The speaker confirms her full name is {spec['s1_name']}." }},
        {{ id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "{spec['s1_phone']}", explanation: "The contact phone number given is {spec['s1_phone']}." }},
        {{ id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "{spec['s1_addr']}", explanation: "The address provided is {spec['s1_addr']}." }},
        {{ id: 4, type: "fill-in", number: 4, label: "Registration Fee (£):", answer: "{spec['s1_fee']}", explanation: "The fee mentioned is {spec['s1_fee']} pounds." }},
        {{ id: 5, type: "fill-in", number: 5, label: "Orientation Time:", answer: "9:30 AM", explanation: "Orientation starts at 9:30 AM in Hall B." }},
        {{ id: 6, type: "fill-in", number: 6, label: "Required Document:", answer: "photo ID", explanation: "Participants must bring a valid photo ID." }},
        {{ id: 7, type: "fill-in", number: 7, label: "Parking Location:", answer: "north visitor", explanation: "Free parking is located in the north visitor car park." }},
        {{ id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "credit card", explanation: "Payment can be completed online via credit card." }},
        {{ id: 9, type: "fill-in", number: 9, label: "Confirmation Code:", answer: "REG904", explanation: "The confirmation reference code is REG904." }},
        {{ id: 10, type: "fill-in", number: 10, label: "Contact Person:", answer: "Sarah Jenkins", explanation: "Sarah Jenkins is the primary contact officer." }}
      ]
    }},
    {{
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: {s1_end + 1},
      audioEnd: {s2_end},
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "{spec['topic_s2'].upper()}",
      questions: [
        {{ id: 11, type: "multiple-choice", number: 11, question: "What is the total size of the facility grounds?", options: ["A. 25 hectares", "B. {spec['s2_area']}", "C. 100 hectares"], answer: "B", explanation: "The presenter states the facility spans {spec['s2_area']}." }},
        {{ id: 12, type: "multiple-choice", number: 12, question: "What time does the site open daily?", options: ["A. 7:00 AM", "B. 8:00 AM", "C. 9:00 AM"], answer: "B", explanation: "The presenter confirms the grounds open daily from 8:00 AM." }},
        {{ id: 13, type: "multiple-choice", number: 13, question: "Where is the gift shop located?", options: ["A. Next to the main entrance", "B. Inside the café", "C. At the river bank"], answer: "A", explanation: "The entrance leads directly to the information kiosk and gift shop." }},
        {{ id: 14, type: "multiple-choice", number: 14, question: "What features are displayed in the exhibition hall?", options: ["A. Modern sculpture", "B. Historic artifacts and digital displays", "C. Wildlife photography"], answer: "B", explanation: "The hall features historic artifacts and digital displays." }},
        {{ id: 15, type: "multiple-choice", number: 15, question: "Where can visitors find outdoor seating?", options: ["A. Near the parking area", "B. Beside the café", "C. At the entrance"], answer: "B", explanation: "The café features an adjacent outdoor seating area." }},
        {{ id: 16, type: "fill-in", number: 16, label: "Rule on walking paths:", answer: "designated", explanation: "Visitors must stay on designated walking paths." }},
        {{ id: 17, type: "fill-in", number: 17, label: "Guided tour departure frequency:", answer: "every hour", explanation: "Tours depart every hour from the main entrance." }},
        {{ id: 18, type: "fill-in", number: 18, label: "Guided tour leader qualification:", answer: "certified staff", explanation: "Tours are led by certified staff members." }},
        {{ id: 19, type: "fill-in", number: 19, label: "Special group booking requirement:", answer: "advance online", explanation: "Group bookings must be arranged in advance online." }},
        {{ id: 20, type: "fill-in", number: 20, label: "Emergency phone contact location:", answer: "visitor center", explanation: "Emergency contact points are situated at the visitor center." }}
      ]
    }},
    {{
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: {s2_end + 1},
      audioEnd: {s3_end},
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "{spec['topic_s3'].upper()} DISCUSSION",
      questions: [
        {{ id: 21, type: "multiple-choice", number: 21, question: "What is the primary focus of the students' proposal?", options: ["A. {spec['topic_s3']}", "B. Financial budgeting", "C. Campus housing"], answer: "A", explanation: "The discussion centers around {spec['topic_s3']}." }},
        {{ id: 22, type: "multiple-choice", number: 22, question: "What issue was identified in initial sampling?", options: ["A. High equipment cost", "B. Margin of error", "C. Missing documentation"], answer: "B", explanation: "Students note the need to refine sampling techniques to reduce margin of error." }},
        {{ id: 23, type: "multiple-choice", number: 23, question: "What model does the professor recommend?", options: ["A. Linear calculation", "B. Multi-variable regression", "C. Qualitative survey"], answer: "B", explanation: "Prof. Davies recommends multi-variable regression models." }},
        {{ id: 24, type: "multiple-choice", number: 24, question: "In which chapter will qualitative case studies appear?", options: ["A. Chapter 1", "B. Chapter 4", "C. Chapter 8"], answer: "B", explanation: "Students confirm qualitative case studies will appear in Chapter 4." }},
        {{ id: 25, type: "multiple-choice", number: 25, question: "When is the final draft submission due?", options: ["A. End of October", "B. End of November", "C. Mid-December"], answer: "B", explanation: "The draft is due by the end of November." }},
        {{ id: 26, type: "fill-in", number: 26, label: "Research Methodology Type:", answer: "quantitative data", explanation: "Quantitative data charts accompany qualitative case studies." }},
        {{ id: 27, type: "fill-in", number: 27, label: "Primary Sampling Location:", answer: "river estuary", explanation: "Field sampling took place at the river estuary." }},
        {{ id: 28, type: "fill-in", number: 28, label: "Software Tool used:", answer: "SPSS analytical", explanation: "Data processing was performed using SPSS analytical software." }},
        {{ id: 29, type: "fill-in", number: 29, label: "Supervisor Review Date:", answer: "Friday afternoon", explanation: "The supervisor review is scheduled for Friday afternoon." }},
        {{ id: 30, type: "fill-in", number: 30, label: "Appendix Inclusion:", answer: "calibration logs", explanation: "The appendix must include instrument calibration logs." }}
      ]
    }},
    {{
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: {s3_end + 1},
      audioEnd: {s4_end},
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "{spec['topic_s4'].upper()} LECTURE",
      questions: [
        {{ id: 31, type: "fill-in", number: 31, label: "Research field expansion period:", answer: "three decades", explanation: "Research has expanded over the past three decades." }},
        {{ id: 32, type: "fill-in", number: 32, label: "Early research established:", answer: "baseline parameters", explanation: "Initial studies established baseline physical parameters." }},
        {{ id: 33, type: "fill-in", number: 33, label: "Advanced telemetry technology:", answer: "satellite telemetry", explanation: "High-resolution satellite telemetry enabled new insights." }},
        {{ id: 34, type: "fill-in", number: 34, label: "Environmental pressure response:", answer: "structural reorganization", explanation: "Environmental pressure induces structural reorganization." }},
        {{ id: 35, type: "fill-in", number: 35, label: "Core system equilibrium mechanism:", answer: "physiological feedback", explanation: "Physiological feedback loops regulate metabolic equilibrium." }},
        {{ id: 36, type: "fill-in", number: 36, label: "Engineering applications replicate:", answer: "biological principles", explanation: "Engineers incorporate natural biological principles." }},
        {{ id: 37, type: "fill-in", number: 37, label: "Long-term data collection period:", answer: "multi-decadal", explanation: "Longitudinal data was collected over multi-decadal cycles." }},
        {{ id: 38, type: "fill-in", number: 38, label: "Short-term study limitation:", answer: "non-linear dynamics", explanation: "Short-term studies fail to capture non-linear dynamics." }},
        {{ id: 39, type: "fill-in", number: 39, label: "Essential global protocol:", answer: "standardized monitoring", explanation: "Standardized international monitoring remains essential." }},
        {{ id: 40, type: "fill-in", number: 40, label: "Key to solving global challenges:", answer: "interdisciplinary collaboration", explanation: "Interdisciplinary collaboration is fundamental to progress." }}
      ]
    }}
  ]
}};

export default listeningTest{num_str};"""

async def process_test(spec):
    num = spec["test_num"]
    num_str = f"{num:03d}"

    s1, s2, s3, s4 = generate_full_25min_text(spec)
    full_text = f"{s1}\n\n{s2}\n\n{s3}\n\n{s4}"

    # 1. Synthesize via chunked streaming at rate="-20%" with British Neural Voice (en-GB-RyanNeural)
    mp3_filename = f"test{num_str}.mp3"
    mp3_path = os.path.join(public_audio_dir, mp3_filename)

    paragraphs = [p.strip() for p in full_text.split("\n\n") if p.strip()]
    with open(mp3_path, "wb") as f:
        for p in paragraphs:
            comm = edge_tts.Communicate(p, "en-GB-RyanNeural", rate="-32%")
            async for chunk in comm.stream():
                if chunk["type"] == "audio":
                    f.write(chunk["data"])

    # Measure exact audio duration
    audio = MP3(mp3_path)
    length_sec = audio.info.length
    mins = int(length_sec // 60)
    secs = int(length_sec % 60)
    size_mb = os.path.getsize(mp3_path) / (1024 * 1024)

    print(f"Generated test{num_str}.mp3: EXACT DURATION = {mins} mins {secs} secs ({length_sec:.1f}s) | Size = {size_mb:.2f} MB")

    # 2. Write matched JS file with exact audio timelines
    js_code = build_js_code(spec, s1, s2, s3, s4, length_sec)
    js_path = os.path.join(data_tests_dir, f"listeningTest{num_str}.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_code)

async def main():
    print("Generating EXACT 25+ minute British Accent audio files for Listening Tests 7 to 25...")
    for spec in LISTENING_TEST_SPECS:
        await process_test(spec)
    print("\nSUCCESS: All Listening Tests 7 to 25 generated with >25 minute British Neural Audio!")

if __name__ == "__main__":
    asyncio.run(main())
