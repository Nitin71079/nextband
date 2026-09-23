// NEET-UG Official Examination Specification (2026/2027 Pattern)
export const NEET_CONFIG = {
  examName: "NEET-UG",
  formatVersion: "NEET_UG_2026_V1",
  syllabusVersion: "NTA_NEET_UG_2026",
  durationMinutes: 200, // 3 hours 20 minutes
  totalQuestionsToAttempt: 180,
  totalMarks: 720,
  
  markingScheme: {
    correct: 4.0,
    incorrect: -1.0,
    unanswered: 0.0
  },

  subjects: [
    {
      id: "physics",
      name: "Physics",
      code: "PHY",
      questionCount: 45,
      totalMarks: 180,
      color: "#3B82F6",
      chapters: [
        { id: "phy-1", name: "Units and Measurements", ncertUnit: "Physics XI - Unit 1" },
        { id: "phy-2", name: "Kinematics & Motion", ncertUnit: "Physics XI - Unit 2" },
        { id: "phy-3", name: "Laws of Motion", ncertUnit: "Physics XI - Unit 3" },
        { id: "phy-4", name: "Work, Energy and Power", ncertUnit: "Physics XI - Unit 4" },
        { id: "phy-5", name: "Rotational Motion", ncertUnit: "Physics XI - Unit 5" },
        { id: "phy-6", name: "Gravitation", ncertUnit: "Physics XI - Unit 6" },
        { id: "phy-7", name: "Properties of Bulk Matter", ncertUnit: "Physics XI - Unit 7" },
        { id: "phy-8", name: "Thermodynamics & Kinetic Theory", ncertUnit: "Physics XI - Unit 8" },
        { id: "phy-9", name: "Oscillations and Waves", ncertUnit: "Physics XI - Unit 9" },
        { id: "phy-10", name: "Electrostatics", ncertUnit: "Physics XII - Unit 1" },
        { id: "phy-11", name: "Current Electricity", ncertUnit: "Physics XII - Unit 2" },
        { id: "phy-12", name: "Magnetism & EMI", ncertUnit: "Physics XII - Unit 3" },
        { id: "phy-13", name: "Alternating Current & EM Waves", ncertUnit: "Physics XII - Unit 4" },
        { id: "phy-14", name: "Ray & Wave Optics", ncertUnit: "Physics XII - Unit 5" },
        { id: "phy-15", name: "Dual Nature & Atomic Physics", ncertUnit: "Physics XII - Unit 6" },
        { id: "phy-16", name: "Semiconductors & Electronic Devices", ncertUnit: "Physics XII - Unit 7" }
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      code: "CHEM",
      questionCount: 45,
      totalMarks: 180,
      color: "#10B981",
      chapters: [
        { id: "chem-1", name: "Some Basic Concepts & Structure of Atom", ncertUnit: "Chemistry XI - Physical" },
        { id: "chem-2", name: "Chemical Bonding & Molecular Structure", ncertUnit: "Chemistry XI - Inorganic" },
        { id: "chem-3", name: "States of Matter & Thermodynamics", ncertUnit: "Chemistry XI - Physical" },
        { id: "chem-4", name: "Equilibrium & Redox Reactions", ncertUnit: "Chemistry XI - Physical" },
        { id: "chem-5", name: "Periodic Classification & s/p-Block Elements", ncertUnit: "Chemistry XI - Inorganic" },
        { id: "chem-6", name: "Organic Chemistry Principles & Hydrocarbons", ncertUnit: "Chemistry XI - Organic" },
        { id: "chem-7", name: "Solid State & Solutions", ncertUnit: "Chemistry XII - Physical" },
        { id: "chem-8", name: "Electrochemistry & Chemical Kinetics", ncertUnit: "Chemistry XII - Physical" },
        { id: "chem-9", name: "Surface Chemistry & Metallurgy", ncertUnit: "Chemistry XII - Inorganic" },
        { id: "chem-10", name: "d & f Block Elements & Coordination Compounds", ncertUnit: "Chemistry XII - Inorganic" },
        { id: "chem-11", name: "Haloalkanes, Alcohols & Ethers", ncertUnit: "Chemistry XII - Organic" },
        { id: "chem-12", name: "Aldehydes, Ketones & Carboxylic Acids", ncertUnit: "Chemistry XII - Organic" },
        { id: "chem-13", name: "Amines & Biomolecules", ncertUnit: "Chemistry XII - Organic" }
      ]
    },
    {
      id: "botany",
      name: "Botany",
      code: "BOT",
      questionCount: 45,
      totalMarks: 180,
      color: "#059669",
      chapters: [
        { id: "bot-1", name: "Cell Structure and Function", ncertUnit: "Biology XI - Cell Biology" },
        { id: "bot-2", name: "Diversity in the Living World & Plant Kingdom", ncertUnit: "Biology XI - Diversity" },
        { id: "bot-3", name: "Structural Organisation in Flowering Plants", ncertUnit: "Biology XI - Anatomy & Morphology" },
        { id: "bot-4", name: "Transport in Plants & Mineral Nutrition", ncertUnit: "Biology XI - Plant Physiology" },
        { id: "bot-5", name: "Photosynthesis in Higher Plants", ncertUnit: "Biology XI - Plant Physiology" },
        { id: "bot-6", name: "Respiration in Plants & Plant Growth", ncertUnit: "Biology XI - Plant Physiology" },
        { id: "bot-7", name: "Reproduction in Organisms & Flowering Plants", ncertUnit: "Biology XII - Plant Reproduction" },
        { id: "bot-8", name: "Genetics & Inheritance (Mendelian)", ncertUnit: "Biology XII - Genetics" },
        { id: "bot-9", name: "Molecular Basis of Inheritance in Plants", ncertUnit: "Biology XII - Genetics" },
        { id: "bot-10", name: "Ecology, Ecosystems & Biodiversity", ncertUnit: "Biology XII - Ecology" }
      ]
    },
    {
      id: "zoology",
      name: "Zoology",
      code: "ZOO",
      questionCount: 45,
      totalMarks: 180,
      color: "#EC4899",
      chapters: [
        { id: "zoo-1", name: "Animal Kingdom & Structural Organisation", ncertUnit: "Biology XI - Diversity & Tissues" },
        { id: "zoo-2", name: "Digestion and Absorption", ncertUnit: "Biology XI - Human Physiology" },
        { id: "zoo-3", name: "Breathing and Exchange of Gases", ncertUnit: "Biology XI - Human Physiology" },
        { id: "zoo-4", name: "Body Fluids and Circulation", ncertUnit: "Biology XI - Human Physiology" },
        { id: "zoo-5", name: "Excretory Products and Elimination", ncertUnit: "Biology XI - Human Physiology" },
        { id: "zoo-6", name: "Locomotion, Movement & Neural Control", ncertUnit: "Biology XI - Human Physiology" },
        { id: "zoo-7", name: "Chemical Coordination and Integration", ncertUnit: "Biology XI - Endocrine System" },
        { id: "zoo-8", name: "Human Reproduction & Reproductive Health", ncertUnit: "Biology XII - Reproduction" },
        { id: "zoo-9", name: "Evolution & Human Health and Disease", ncertUnit: "Biology XII - Evolution & Health" },
        { id: "zoo-10", name: "Biotechnology Principles and Applications", ncertUnit: "Biology XII - Biotechnology" }
      ]
    }
  ]
};
