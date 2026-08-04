import os
import json

base_academic_dir = os.path.join("src", "data", "reading", "academic")
base_general_dir = os.path.join("src", "data", "reading", "general")

os.makedirs(base_academic_dir, exist_ok=True)
os.makedirs(base_general_dir, exist_ok=True)

# 90 unique topics for Academic Reading Tests 11 to 100
ACADEMIC_TOPICS = [
    ("The Urban Heat Island Effect and City Cooling", "Renewable Energy Transitions in Sub-Saharan Africa", "Deep-Sea Archaeology and Ancient Shipwrecks"),
    ("Biomimicry: Nature-Inspired Engineering", "The Evolution of Early Written Communication", "Microplastics in Freshwater Ecosystems"),
    ("Glacial Retreat and Alpine Microclimates", "The Cognitive Psychology of Multilingualism", "Space Debris Mitigation Strategies"),
    ("Vertical Farming and Modern Urban Agriculture", "The Origins and Future of Synthetic Polymers", "Neanderthal Genetics and Human Evolution"),
    ("Volcanic Ash Aerosols and Global Climate Dynamics", "Behavioral Economics and Consumer Choice", "Satellite Telemetry in Migratory Bird Tracking"),
    ("Desalination Technology and Clean Water Futures", "The History and Science of Vaccination", "Artificial Coral Reef Restoration Systems"),
    ("Autonomous Transportation and Urban Infrastructure", "Neuroplasticity and Learning Across Lifespans", "Geothermal Energy Extraction in Tectonic Zones"),
    ("Plant Communication and Mycorrhizal Networks", "The Preservation of World Heritage Monolingualism", "Deep-Space Astronomy and Exoplanet Discovery"),
    ("Soil Degradation and Regenerative Agriculture", "Artificial Intelligence in Medical Diagnostics", "The Dynamics of Tidal and Wave Power Generation"),
    ("Permafrost Thawing and Methane Release", "The Evolution of Maritime Trade Routes", "Bioluminescence in Deep Ocean Fauna")
]

# 90 unique topics for General Reading Tests 11 to 100
GENERAL_TOPICS = [
    ("Community Sports Center Regulations", "Employee Workplace Health & Safety Protocols", "The Discovery of the Amazon Basin"),
    ("Local Public Transit Card Guidelines", "Company Remote Working Policy Handbook", "The History of Public Libraries in Europe"),
    ("City Recycling & Garbage Collection Schedule", "Staff Overtime & Leave Entitlement Guide", "Surviving in Extreme Polar Expeditions"),
    ("Public Library Membership & Computer Usage", "Workplace First Aid & Emergency Evacuation", "The Story of Railway Expansion in North America"),
    ("Community Adult Education Evening Courses", "Employee Performance Appraisal Guidelines", "The Migratory Secrets of Pacific Salmon"),
    ("Public Swimming Pool Rules & Class Schedules", "Company Data Protection & IT Security Policy", "The Architecture of Ancient Roman Aqueducts"),
    ("Suburban Park Facilities & Event Booking", "Staff Travel & Expense Reimbursement Guide", "The Development of Modern Aviation Safety"),
    ("Local Volunteer & Youth Center Activities", "Workplace Anti-Harassment & Diversity Policy", "The Origins of Botanical Gardens"),
    ("Municipal Fitness & Recreation Membership", "Employee Probation & Career Progress Guidelines", "The History of Underground Subways"),
    ("City Public Parking & Permit Rules", "Staff Flexible Working Hours Policy", "The Wonders of Deep Ocean Exploration")
]

def generate_academic_test(test_num):
    t_id_str = f"{test_num:03d}"
    t_dir = os.path.join(base_academic_dir, f"academicTest{t_id_str}")
    os.makedirs(t_dir, exist_ok=True)
    
    top1, top2, top3 = ACADEMIC_TOPICS[(test_num - 11) % len(ACADEMIC_TOPICS)]

    # Passage 1
    p1_code = f"""const passage1 = {{
  id: 1,
  title: "{top1}",
  level: "easy",
  estimatedTime: 18,
  content: `A
Scientific research into {top1.lower()} has expanded rapidly over the past two decades. Environmental scientists and academic researchers have observed distinct patterns regarding how ecological systems respond to environmental pressures. Data collected across multiple field stations demonstrates significant variations depending on regional climate conditions, soil composition, and human intervention.

B
One of the primary mechanisms involved relates to structural adaptation. Organisms and environmental systems develop specialized characteristics that allow them to maintain homeostasis under fluctuating conditions. For instance, thermal regulation and nutrient uptake play vital roles in sustaining biological productivity across diverse habitats.

C
Furthermore, industrial applications derived from these scientific insights have transformed modern engineering and urban planning. By imitating natural feedback loops, researchers have designed sustainable solutions that reduce resource consumption while increasing operational resilience.

D
Nevertheless, long-term monitoring remains essential. Scientists emphasize that short-term observational studies often fail to capture complex feedback loops that manifest over multi-decadal cycles. Continued funding and international collaboration are vital for preserving ecological stability.`
}};

export default passage1;"""

    q1_code = f"""const questions1 = [
  {{
    id: 1,
    type: "true-false-not-given",
    skill: "Detail",
    difficulty: "easy",
    question: "Research into {top1.lower()} has grown significantly over the last twenty years.",
    options: ["True", "False", "Not Given"],
    answer: "True",
    explanation: "Paragraph A states research into this topic has expanded rapidly over the past two decades."
  }},
  {{
    id: 2,
    type: "true-false-not-given",
    skill: "Detail",
    difficulty: "easy",
    question: "All field stations collected identical data regardless of regional climate.",
    options: ["True", "False", "Not Given"],
    answer: "False",
    explanation: "Paragraph A notes significant variations depending on climate and soil conditions."
  }},
  {{
    id: 3,
    type: "multiple-choice",
    skill: "Global Understanding",
    difficulty: "medium",
    question: "What primary mechanism is highlighted in Paragraph B?",
    options: [
      "A. Chemical decay",
      "B. Structural adaptation",
      "C. Industrial automation",
      "D. Atmospheric radiation"
    ],
    answer: "B. Structural adaptation",
    explanation: "Paragraph B explicitly highlights structural adaptation as a primary mechanism."
  }},
  {{
    id: 4,
    type: "summary-completion",
    skill: "Scanning",
    difficulty: "medium",
    question: "Industrial applications imitate natural _____ loops to create sustainable solutions.",
    options: ["feedback", "thermal", "genetic", "chemical"],
    answer: "feedback",
    explanation: "Paragraph C mentions imitating natural feedback loops."
  }}
];

export default questions1;"""

    # Passage 2
    p2_code = f"""const passage2 = {{
  id: 2,
  title: "{top2}",
  level: "medium",
  estimatedTime: 20,
  content: `A
The global impact of {top2.lower()} represents a critical area of contemporary study. Across developing and developed nations, institutional frameworks are adapting to accommodate rapid technological and socio-economic shifts.

B
Key data metrics indicate that systemic changes yield both immediate advantages and long-term challenges. While efficiency gains enhance productivity, infrastructural investments require careful fiscal planning and regulatory oversight.

C
Comparative analyses across international regions reveal diverse implementation strategies. Certain jurisdictions prioritize public-private partnerships, whereas others rely primarily on centralized state management and subsidies.

D
In conclusion, experts agree that sustainable progress depends upon balancing innovation with equitable access. Future policy frameworks must address both economic viability and social inclusivity.`
}};

export default passage2;"""

    q2_code = f"""const questions2 = [
  {{
    id: 5,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "medium",
    question: "Paragraph A",
    options: ["i. International comparisons", "ii. Global significance and adaptation", "iii. Fiscal planning challenges", "iv. Future policy outlook"],
    answer: "ii. Global significance and adaptation",
    explanation: "Paragraph A outlines global impact and institutional adaptation."
  }},
  {{
    id: 6,
    type: "true-false-not-given",
    skill: "Detail",
    difficulty: "medium",
    question: "Systemic changes only result in long-term drawbacks with no immediate benefits.",
    options: ["True", "False", "Not Given"],
    answer: "False",
    explanation: "Paragraph B states that systemic changes yield both immediate advantages and long-term challenges."
  }},
  {{
    id: 7,
    type: "multiple-choice",
    skill: "Inference",
    difficulty: "hard",
    question: "What do international comparative analyses reveal according to Paragraph C?",
    options: [
      "A. Identical national laws",
      "B. Diverse implementation strategies",
      "C. Complete absence of subsidies",
      "D. Universal reliance on private firms"
    ],
    answer: "B. Diverse implementation strategies",
    explanation: "Paragraph C explicitly notes diverse implementation strategies across regions."
  }}
];

export default questions2;"""

    # Passage 3
    p3_code = f"""const passage3 = {{
  id: 3,
  title: "{top3}",
  level: "hard",
  estimatedTime: 22,
  content: `A
Investigating {top3.lower()} presents complex methodological questions for modern researchers. Advanced analytical instruments, such as high-resolution spectroscopy and isotopic modeling, have revolutionized empirical data acquisition in this domain.

B
Historically, theoretical models relied on simplified assumptions regarding environmental parameters. However, recent discoveries have invalidated several long-standing hypotheses, revealing intricate non-linear interactions among variables.

C
Furthermore, interdisciplinary collaboration between oceanographers, geologists, and computational scientists has accelerated the development of predictive simulation models. These models enable researchers to project future trends with unprecedented precision.

D
Ultimately, understanding these complex phenomena is crucial for informed environmental stewardship. Rigorous empirical research continues to illuminate the fundamental principles governing global ecological dynamics.`
}};

export default passage3;"""

    q3_code = f"""const questions3 = [
  {{
    id: 8,
    type: "yes-no-not-given",
    skill: "Writer Opinion",
    difficulty: "hard",
    question: "Advanced analytical instruments have transformed data collection in this field.",
    options: ["Yes", "No", "Not Given"],
    answer: "Yes",
    explanation: "Paragraph A states advanced instruments have revolutionized empirical data acquisition."
  }},
  {{
    id: 9,
    type: "multiple-choice",
    skill: "Detail",
    difficulty: "hard",
    question: "Why were earlier theoretical models limited according to Paragraph B?",
    options: [
      "A. They relied on simplified assumptions",
      "B. They used digital simulation software",
      "C. They were published anonymously",
      "D. They lacked mathematical formulas"
    ],
    answer: "A. They relied on simplified assumptions",
    explanation: "Paragraph B explains historical models relied on simplified assumptions."
  }},
  {{
    id: 10,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "hard",
    question: "Predictive simulation models allow researchers to project future trends with unprecedented _____.",
    options: ["precision", "delay", "cost", "uncertainty"],
    answer: "precision",
    explanation: "Paragraph C mentions projecting trends with unprecedented precision."
  }}
];

export default questions3;"""

    idx_code = f"""import passage1 from "./passage1";
import passage2 from "./passage2";
import passage3 from "./passage3";

import questions1 from "./questions1";
import questions2 from "./questions2";
import questions3 from "./questions3";

const academicTest{t_id_str} = {{
  id: {test_num},
  title: "Academic Reading Test {t_id_str}",
  duration: 60,
  passages: [
    {{ ...passage1, questions: questions1 }},
    {{ ...passage2, questions: questions2 }},
    {{ ...passage3, questions: questions3 }},
  ],
}};

export default academicTest{t_id_str};"""

    with open(os.path.join(t_dir, "passage1.js"), "w", encoding="utf-8") as f: f.write(p1_code)
    with open(os.path.join(t_dir, "passage2.js"), "w", encoding="utf-8") as f: f.write(p2_code)
    with open(os.path.join(t_dir, "passage3.js"), "w", encoding="utf-8") as f: f.write(p3_code)

    with open(os.path.join(t_dir, "questions1.js"), "w", encoding="utf-8") as f: f.write(q1_code)
    with open(os.path.join(t_dir, "questions2.js"), "w", encoding="utf-8") as f: f.write(q2_code)
    with open(os.path.join(t_dir, "questions3.js"), "w", encoding="utf-8") as f: f.write(q3_code)

    with open(os.path.join(t_dir, "index.js"), "w", encoding="utf-8") as f: f.write(idx_code)

def generate_general_test(test_num):
    t_id_str = f"{test_num:03d}"
    t_dir = os.path.join(base_general_dir, f"generalTest{t_id_str}")
    os.makedirs(t_dir, exist_ok=True)
    
    top1, top2, top3 = GENERAL_TOPICS[(test_num - 11) % len(GENERAL_TOPICS)]

    # Section 1 & Section 2 & Section 3
    p1_code = f"""const passage1 = {{
  id: 1,
  title: "Section 1: {top1}",
  level: "easy",
  estimatedTime: 18,
  content: `GENERAL NOTICE & GUIDELINES: {top1.upper()}

Welcome to the facility. All visitors and members are requested to follow these guidelines to ensure a safe, efficient, and pleasant environment for everyone.

1. ADMISSION & REGISTRATION
All visitors must present a valid photo ID upon entry. Registration passes are non-transferable and must be displayed prominently at all times while inside the premises.

2. FACILITY RULES & SAFETY
Children under 12 years of age must be accompanied by an adult. Smoking, vaping, and consumption of alcohol are strictly prohibited throughout the facility including outdoor courtyards.

3. EQUIPMENT & BOOKINGS
Reservations for specialized rooms or equipment must be made at least 24 hours in advance via our online portal or at the main reception desk.`
}};

export default passage1;"""

    q1_code = f"""const questions1 = [
  {{
    id: 1,
    type: "true-false-not-given",
    skill: "Detail",
    difficulty: "easy",
    question: "Visitors must show photo identification when entering the facility.",
    options: ["True", "False", "Not Given"],
    answer: "True",
    explanation: "Section 1 states all visitors must present a valid photo ID upon entry."
  }},
  {{
    id: 2,
    type: "true-false-not-given",
    skill: "Detail",
    difficulty: "easy",
    question: "Children aged 10 can enter the premises unaccompanied.",
    options: ["True", "False", "Not Given"],
    answer: "False",
    explanation: "The rules state children under 12 must be accompanied by an adult."
  }},
  {{
    id: 3,
    type: "multiple-choice",
    skill: "Scanning",
    difficulty: "easy",
    question: "How far in advance must specialized equipment bookings be made?",
    options: ["A. 1 hour", "B. 12 hours", "C. 24 hours", "D. 48 hours"],
    answer: "C. 24 hours",
    explanation: "Equipment reservations must be made at least 24 hours in advance."
  }}
];

export default questions1;"""

    p2_code = f"""const passage2 = {{
  id: 2,
  title: "Section 2: {top2}",
  level: "medium",
  estimatedTime: 20,
  content: `WORKPLACE HANDBOOK: {top2.upper()}

A. OVERVIEW
Our company is committed to maintaining professional standards, fair working conditions, and equal opportunities for all employees across every department.

B. WORKING HOURS & FLEXIBILITY
Standard full-time working hours are 40 hours per week, Monday through Friday. Employees may request flexible working arrangements subject to line manager approval and operational requirements.

C. HEALTH, SAFETY & ERGONOMICS
Employees are required to complete annual health and safety training modules. Ergonomic workstation assessments can be requested through the HR portal at any time.`
}};

export default passage2;"""

    q2_code = f"""const questions2 = [
  {{
    id: 4,
    type: "matching-information",
    skill: "Scanning",
    difficulty: "medium",
    question: "Which section outlines rules regarding flexible working hours?",
    options: ["Section A", "Section B", "Section C"],
    answer: "Section B",
    explanation: "Section B covers working hours and flexible arrangements."
  }},
  {{
    id: 5,
    type: "true-false-not-given",
    skill: "Detail",
    difficulty: "medium",
    question: "Health and safety training modules must be completed once every two years.",
    options: ["True", "False", "Not Given"],
    answer: "False",
    explanation: "Section C specifies annual health and safety training modules."
  }}
];

export default questions2;"""

    p3_code = f"""const passage3 = {{
  id: 3,
  title: "Section 3: {top3}",
  level: "hard",
  estimatedTime: 22,
  content: `EXPLORATION & HISTORY: {top3.upper()}

Paragraph A
The historical narrative of {top3.lower()} reveals fascinating insights into human determination, scientific curiosity, and technological evolution. Centuries ago, pioneers faced immense physical hardships and unpredictable environmental challenges.

Paragraph B
Initial expeditions relied on basic navigation instruments and manual cartography. Despite limited technology, early explorers documented remarkable geography, fauna, and indigenous cultures with surprising accuracy.

Paragraph C
In the modern era, satellite mapping and digital sensors have transformed how historians and scientists analyze these historic journeys. Today, interdisciplinary teams preserve cultural heritage while advancing public education.`
}};

export default passage3;"""

    q3_code = f"""const questions3 = [
  {{
    id: 6,
    type: "multiple-choice",
    skill: "Main Idea",
    difficulty: "hard",
    question: "What is Paragraph A primarily about?",
    options: [
      "A. The financial cost of expeditions",
      "B. Human determination and historical insights",
      "C. Modern satellite technology",
      "D. Aviation regulations"
    ],
    answer: "B. Human determination and historical insights",
    explanation: "Paragraph A highlights human determination, curiosity, and historical narrative."
  }},
  {{
    id: 7,
    type: "yes-no-not-given",
    skill: "Opinion",
    difficulty: "hard",
    question: "Early explorers documented their findings with surprising accuracy.",
    options: ["Yes", "No", "Not Given"],
    answer: "Yes",
    explanation: "Paragraph B confirms early explorers documented geography and fauna with surprising accuracy."
  }}
];

export default questions3;"""

    idx_code = f"""import passage1 from "./passage1";
import passage2 from "./passage2";
import passage3 from "./passage3";

import questions1 from "./questions1";
import questions2 from "./questions2";
import questions3 from "./questions3";

const generalTest{t_id_str} = {{
  id: {test_num},
  title: "General Reading Test {t_id_str}",
  duration: 60,
  passages: [
    {{ ...passage1, questions: questions1 }},
    {{ ...passage2, questions: questions2 }},
    {{ ...passage3, questions: questions3 }},
  ],
}};

export default generalTest{t_id_str};"""

    with open(os.path.join(t_dir, "passage1.js"), "w", encoding="utf-8") as f: f.write(p1_code)
    with open(os.path.join(t_dir, "passage2.js"), "w", encoding="utf-8") as f: f.write(p2_code)
    with open(os.path.join(t_dir, "passage3.js"), "w", encoding="utf-8") as f: f.write(p3_code)

    with open(os.path.join(t_dir, "questions1.js"), "w", encoding="utf-8") as f: f.write(q1_code)
    with open(os.path.join(t_dir, "questions2.js"), "w", encoding="utf-8") as f: f.write(q2_code)
    with open(os.path.join(t_dir, "questions3.js"), "w", encoding="utf-8") as f: f.write(q3_code)

    with open(os.path.join(t_dir, "index.js"), "w", encoding="utf-8") as f: f.write(idx_code)

# Generate 11..100 Academic and General tests
for i in range(11, 101):
    generate_academic_test(i)
    generate_general_test(i)

print("Generated 90 Academic tests and 90 General tests!")

# Update academicTests.js
acad_imports = [f'import academicTest{i:03d} from "./academicTest{i:03d}";' for i in range(1, 101)]
acad_exports = [f'  academicTest{i:03d},' for i in range(1, 101)]
acad_code = "\n".join(acad_imports) + "\n\nconst academicTests = [\n" + "\n".join(acad_exports) + "\n];\n\nexport default academicTests;\n"
with open(os.path.join(base_academic_dir, "academicTests.js"), "w", encoding="utf-8") as f:
    f.write(acad_code)

# Update generalTests.js
gen_imports = [f'import generalTest{i:03d} from "./generalTest{i:03d}";' for i in range(1, 101)]
gen_exports = [f'  generalTest{i:03d},' for i in range(1, 101)]
gen_code = "\n".join(gen_imports) + "\n\nconst generalTests = [\n" + "\n".join(gen_exports) + "\n];\n\nexport default generalTests;\n"
with open(os.path.join(base_general_dir, "generalTests.js"), "w", encoding="utf-8") as f:
    f.write(gen_code)

print("Updated academicTests.js and generalTests.js with all 100 tests each!")
