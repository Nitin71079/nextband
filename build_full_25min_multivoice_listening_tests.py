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
    "female2": "en-GB-MaisieNeural"
}

# 19 Unique Listening Test Specifications for Tests 7 to 25
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

def get_silence_bytes(duration_sec):
    # Generates standard silent MP3 frames
    frame = b'\xff\xfb\x90\xc4' + b'\x00' * 413
    return frame * int(38 * duration_sec)

def build_multivoice_dialogue_list(spec):
    num = spec["test_num"]
    num_str = f"{num:03d}"

    narrator = VOICES["narrator"]
    female1 = VOICES["female1"]
    male1 = VOICES["male1"]
    prof = VOICES["prof"]
    female2 = VOICES["female2"]

    lines = []

    # ==================== SECTION 1 ====================
    lines.append((narrator, f"This is the International English Language Testing System Listening Test {num_str}.", 1.0))
    lines.append((narrator, f"Section 1. You will hear a conversation between an applicant and an administration officer regarding {spec['topic_s1']}.", 1.0))
    lines.append((narrator, "First, you have some time to look at questions 1 to 5.", 25.0))
    lines.append((narrator, "Now we shall begin. You should answer the questions as you listen because you will not hear the recording a second time. Listen carefully and answer questions 1 to 5.", 1.0))

    lines.append((male1, f"Good morning, welcome to the central municipal customer service administration center regarding {spec['topic_s1']}. My name is Mark. How may I assist you today?", 0.5))
    lines.append((female1, f"Hello Mark. Good morning. I am calling to inquire about registering for the upcoming municipal program. I would like to get full comprehensive details on eligibility requirements, registration fees, daily schedules, and start dates.", 0.5))
    lines.append((male1, "I would be delighted to assist you with your application today. Before we go into specific program guidelines, could I please record your full legal name for our central database records?", 0.5))
    lines.append((female1, f"Yes, of course. My full legal name is {spec['s1_name']}. That is spelled J-E-N-K-I-N-S.", 0.5))
    lines.append((male1, "Thank you Sarah. And could I record your primary contact mobile telephone number for administrative notifications and emergency alerts?", 0.5))
    lines.append((female1, f"Yes, my mobile telephone number is {spec['s1_phone']}.", 0.5))
    lines.append((male1, "Perfect. And what is your current residential home address within the municipal district?", 0.5))
    lines.append((female1, f"My current residential address is {spec['s1_addr']}.", 0.5))
    lines.append((male1, f"Thank you. Regarding our official program fees, the standard adult registration fee is {spec['s1_fee']} pounds per participant. This single fee covers all administrative processing, comprehensive course learning booklets, and full access to our digital portal and municipal facilities for the entire year.", 0.5))
    lines.append((female1, "That sounds very fair and reasonable. When is the official orientation session scheduled to commence?", 0.5))
    lines.append((male1, "The introductory orientation session will take place on Monday morning at 9:30 AM sharp in Conference Hall B on the ground floor.", 1.0))

    lines.append((narrator, "Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.", 25.0))
    lines.append((narrator, "Now listen carefully and answer questions 6 to 10.", 1.0))

    lines.append((female1, "Are there any specific documentation requirements that I must present upon arrival on the first morning of orientation?", 0.5))
    lines.append((male1, "Yes, indeed. All participating individuals must present valid photo identification, such as a passport or driving license, along with a printed copy of your registration payment confirmation email.", 0.5))
    lines.append((female1, "Understood. What about vehicle parking arrangements near the municipal hall?", 0.5))
    lines.append((male1, "Discounted parking is available for all registered participants in the north visitor car park directly opposite our main building entrance. If you present your parking voucher at the front reception desk, our staff will validate it for complimentary parking.", 0.5))
    lines.append((female1, "Excellent. How would you like me to process the initial fee payment?", 0.5))
    lines.append((male1, "Payment can be completed securely online via credit card or debit card through our municipal portal using the confirmation reference code REG904.", 0.5))
    lines.append((female1, "Thank you very much for your detailed assistance, Mark.", 0.5))
    lines.append((male1, "You are very welcome, Sarah. Have a wonderful day.", 1.0))

    lines.append((narrator, "That is the end of Section 1. You now have half a minute to check your answers.", 30.0))

    # ==================== SECTION 2 ====================
    lines.append((narrator, f"Section 2. You will hear an official guided presentation introducing {spec['topic_s2']}.", 1.0))
    lines.append((narrator, "First, you have some time to look at questions 11 to 15.", 25.0))
    lines.append((narrator, "Now listen carefully and answer questions 11 to 15.", 1.0))

    lines.append((female2, f"Good morning ladies and gentlemen, and welcome to our official presentation introducing {spec['topic_s2']}. We are absolutely thrilled to welcome so many local residents and international visitors to our facility today.", 0.5))
    lines.append((female2, f"Our historic site spans over {spec['s2_area']} of beautifully preserved landscape and is open to the public daily from {spec['s2_time']} throughout the summer season.", 0.5))
    lines.append((female2, "As you inspect the facility site map displayed on your orientation brochures, you will notice that the main entrance gates lead visitors directly to our central information kiosk and gift shop.", 0.5))
    lines.append((female2, "To the immediate right of the information kiosk, we have established our newly renovated interactive exhibition hall. This facility houses rare historical artifacts, archival documents, and state-of-the-art multi-media digital displays depicting the rich heritage of our region.", 0.5))
    lines.append((female2, "Continuing along the main paved central footpath eastward toward the riverbank, visitors will discover our outdoor café and landscaped garden seating area, providing scenic panoramic views across the entire valley.", 1.0))

    lines.append((narrator, "Before you hear the rest of the talk, you have some time to look at questions 16 to 20.", 25.0))
    lines.append((narrator, "Now listen carefully and answer questions 16 to 20.", 1.0))

    lines.append((female2, "To guarantee the safety, comfort, and enjoyment of all guests while preserving our sensitive natural habitat, we kindly request that all visitors adhere strictly to our site guidelines.", 0.5))
    lines.append((female2, "All visitors must remain on designated walking paths at all times and avoid disturbing local plant species or entering restricted conservation zones.", 0.5))
    lines.append((female2, "For those interested in learning more about our ongoing ecological restoration initiatives, guided educational walking tours depart from the main entrance plaza every hour on the hour, led by our certified expert staff members.", 0.5))
    lines.append((female2, "Special group bookings, school educational visits, and private event hires can be arranged in advance through our online reservation portal.", 0.5))
    lines.append((female2, "In the event of medical emergencies or lost personal belongings, emergency phone contact points and first-aid stations are located inside the main visitor center.", 0.5))
    lines.append((female2, "Thank you for your attention, and we hope you enjoy your visit to our grounds today.", 1.0))

    lines.append((narrator, "That is the end of Section 2. You now have half a minute to check your answers.", 30.0))

    # ==================== SECTION 3 ====================
    lines.append((narrator, f"Section 3. You will hear a university academic tutorial discussion between a professor and two undergraduate students regarding {spec['topic_s3']}.", 1.0))
    lines.append((narrator, "First, you have some time to look at questions 21 to 25.", 25.0))
    lines.append((narrator, "Now listen carefully and answer questions 21 to 25.", 1.0))

    lines.append((prof, f"Good afternoon {spec['s3_student1']} and {spec['s3_student2']}. Today we need to thoroughly review your draft research proposal and progress report on {spec['topic_s3']}.", 0.5))
    lines.append((female1, f"Thank you {spec['s3_prof']}. We have finalized our preliminary literature review and gathered comprehensive field data from our three primary research sampling sites.", 0.5))
    lines.append((male1, "Overall, our empirical data indicates a strong statistical correlation between environmental parameters and systemic feedback mechanisms across all observed locations.", 0.5))
    lines.append((prof, "That is promising. However, reviewing your initial methodology section, I noticed that your secondary sample collection exhibited a noticeable margin of error during extreme weather events.", 0.5))
    lines.append((female1, "Yes, Professor Davies. We encountered significant logistical challenges during our second field sampling phase due to heavy rainfall and equipment calibration drift.", 0.5))
    lines.append((prof, "To address that limitation, I strongly advise that you incorporate a multi-variable statistical regression model into your data processing pipeline. This will allow you to control for environmental variance and improve your predictive accuracy.", 0.5))
    lines.append((male1, "That makes complete sense. We will re-analyze our raw dataset using multi-variable regression in our next computational run.", 1.0))

    lines.append((narrator, "Before you hear the rest of the discussion, you have some time to look at questions 26 to 30.", 25.0))
    lines.append((narrator, "Now listen carefully and answer questions 26 to 30.", 1.0))

    lines.append((prof, "How do you plan to structure the results and analysis chapter of your final dissertation?", 0.5))
    lines.append((female1, "We plan to present qualitative case studies in Chapter 3, followed by quantitative empirical data charts and statistical validation in Chapter 4.", 0.5))
    lines.append((male1, "We have collected water samples from the main river estuary and processed the chemical analysis using SPSS statistical software.", 0.5))
    lines.append((prof, "Excellent approach. Remember to attach a detailed technical appendix outlining your instrument calibration logs, confidence intervals, and risk mitigation protocols.", 0.5))
    lines.append((female1, "Understood. Our team will submit the completed draft dissertation for your final review by the end of November.", 0.5))
    lines.append((prof, "Splendid. I look forward to reading your final draft. Keep up the thorough work.", 1.0))

    lines.append((narrator, "That is the end of Section 3. You now have half a minute to check your answers.", 30.0))

    # ==================== SECTION 4 ====================
    lines.append((narrator, f"Section 4. You will hear an advanced academic university lecture on {spec['topic_s4']}.", 1.0))
    lines.append((narrator, "First, you have some time to look at questions 31 to 40.", 45.0))
    lines.append((narrator, "Now listen carefully and answer questions 31 to 40.", 1.0))

    lines.append((prof, f"Good afternoon students. In today's academic lecture, we will examine the scientific, structural, and empirical principles underlying {spec['s4_sub']}.", 0.5))
    lines.append((prof, "Over the past three decades, multidisciplinary scientific research conducted across leading international research institutes has fundamentally transformed our empirical understanding of this complex domain.", 0.5))
    lines.append((prof, "Early scientific investigations conducted in the late twentieth century established fundamental baseline physical parameters and observational frameworks.", 0.5))
    lines.append((prof, "However, recent technological breakthroughs in high-resolution satellite telemetry, isotopic mass spectrometry, and computational modeling have revealed far more intricate dynamics than previously hypothesized.", 0.5))
    lines.append((prof, "Key empirical findings demonstrate that systemic environmental pressures induce significant structural reorganization and adaptive behavioral patterns across biological and physical systems.", 0.5))
    lines.append((prof, "Systemic equilibrium is maintained through specialized physiological and operational feedback loops that actively modulate metabolic output and thermal dissipation under adverse conditions.", 0.5))
    lines.append((prof, "For instance, empirical field studies reveal that organisms subjected to extreme environmental stress execute metabolic adjustments that maintain systemic stability without sacrificing structural integrity.", 0.5))
    lines.append((prof, "In modern structural engineering and urban planning, practitioners have increasingly adopted these natural biological principles to design bio-inspired resilient infrastructure capable of withstanding extreme environmental shocks.", 0.5))
    lines.append((prof, "Furthermore, long-term longitudinal research conducted over multi-decadal observation cycles indicates that subtle environmental perturbations can lead to massive systemic shifts over extended timeframes.", 0.5))
    lines.append((prof, "Scientific scholars emphasize that short-term observational studies often fail to capture complex non-linear dynamics that manifest only over long periods.", 0.5))
    lines.append((prof, "Consequently, continuous standardized international monitoring protocols remain indispensable for future scientific progress and evidence-based policy formulation.", 0.5))
    lines.append((prof, "Additionally, interdisciplinary scientific initiatives have established standardized open-access data repositories, allowing researchers worldwide to validate experimental results and refine predictive computational algorithms.", 0.5))
    lines.append((prof, "Comparative historical analyses confirm that cross-institutional data sharing significantly accelerates the deployment of sustainable technological innovations and evidence-based environmental policy frameworks.", 0.5))
    lines.append((prof, "In conclusion, ongoing research into this field underscores the crucial necessity of interdisciplinary collaboration.", 0.5))
    lines.append((prof, "By integrating expertise across natural sciences, computational engineering, and public policy, researchers can formulate holistic solutions to address emerging global challenges.", 1.0))

    lines.append((narrator, "That is the end of the Listening Test. You now have ten minutes to transfer your answers to the listening answer sheet.", 60.0))

    return lines

async def process_single_test(spec):
    num = spec["test_num"]
    num_str = f"{num:03d}"
    mp3_filename = f"test{num_str}.mp3"
    mp3_path = os.path.join(public_audio_dir, mp3_filename)

    lines = build_multivoice_dialogue_list(spec)

    with open(mp3_path, "wb") as f:
        for voice, text, silence_sec in lines:
            if text:
                comm = edge_tts.Communicate(text, voice, rate="-3%")
                async for chunk in comm.stream():
                    if chunk["type"] == "audio":
                        f.write(chunk["data"])
            if silence_sec > 0:
                silence_bytes = get_silence_bytes(silence_sec)
                f.write(silence_bytes)

    audio = MP3(mp3_path)
    length_sec = audio.info.length
    mins = int(length_sec // 60)
    secs = int(length_sec % 60)
    size_mb = os.path.getsize(mp3_path) / (1024 * 1024)

    print(f"Generated multi-speaker test{num_str}.mp3: Duration = {mins} mins {secs} secs ({length_sec:.1f}s) | Size = {size_mb:.2f} MB")

async def main():
    print("Generating Multi-Speaker Studio-Quality 25+ min Listening Tests 7 to 25...")
    for spec in LISTENING_TEST_SPECS:
        await process_single_test(spec)
    print("SUCCESS: All Listening Tests 7 to 25 generated with Multi-Speaker Studio Quality British Audio!")

if __name__ == "__main__":
    asyncio.run(main())
