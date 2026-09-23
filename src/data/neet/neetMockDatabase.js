// NEET-UG 100 Full-Length Mock Exams Database Generator (18,000 Questions)
import { NEET_CONFIG } from '../../config/neetConfig.js';

// NCERT-aligned Question Templates & Generators per subject
const PHYSICS_TOPICS = [
  { topic: "Kinematics", unit: "Physics XI - Unit 2", template: (i, m) => ({
    q: `A particle starts from rest with a uniform acceleration of ${(i % 5) + 2} m/s². What is the distance travelled by the particle in the ${(i % 4) + 3}rd second?`,
    opts: [
      `A. ${((i % 5) + 2) * ((i % 4) + 3 - 0.5)} m`,
      `B. ${((i % 5) + 2) * ((i % 4) + 3)} m`,
      `C. ${(((i % 5) + 2) * Math.pow((i % 4) + 3, 2)) / 2} m`,
      `D. ${((i % 5) + 2) * 2} m`
    ],
    ansIdx: 0,
    exp: `Distance in n-th second $S_n = u + \\frac{a}{2}(2n - 1)$. Here $u = 0, a = ${(i % 5) + 2}$, $n = ${(i % 4) + 3}$. $S_n = \\frac{${(i % 5) + 2}}{2}(2(${(i % 4) + 3}) - 1) = ${((i % 5) + 2) * ((i % 4) + 3 - 0.5)}$ m.`
  })},
  { topic: "Work, Energy & Power", unit: "Physics XI - Unit 4", template: (i, m) => ({
    q: `A body of mass ${(i % 4) + 2} kg is dropped from a height of ${(i % 10) * 10 + 20} m. What is its kinetic energy just before hitting the ground? (Take $g = 10\\text{ m/s}^2$)`,
    opts: [
      `A. ${((i % 4) + 2) * 10 * ((i % 10) * 10 + 20)} J`,
      `B. ${((i % 4) + 2) * 5 * ((i % 10) * 10 + 20)} J`,
      `C. ${((i % 4) + 2) * 20 * ((i % 10) * 10 + 20)} J`,
      `D. ${((i % 4) + 2) * ((i % 10) * 10 + 20)} J`
    ],
    ansIdx: 0,
    exp: `By conservation of energy, $K.E. = P.E. = mgh = (${(i % 4) + 2})(10)(${(i % 10) * 10 + 20}) = ${((i % 4) + 2) * 10 * ((i % 10) * 10 + 20)}$ J.`
  })},
  { topic: "Electrostatics", unit: "Physics XII - Unit 1", template: (i, m) => ({
    q: `Two point charges $+${(i % 5) + 1}\\,\\mu\\text{C}$ and $+${(i % 3) + 4}\\,\\mu\\text{C}$ are placed ${(i % 4) + 2}\\text{ cm}$ apart in vacuum. The electrostatic force between them is proportional to:`,
    opts: [
      `A. $1 / r^2$`,
      `B. $1 / r$`,
      `C. $r^2$`,
      `D. $r$`
    ],
    ansIdx: 0,
    exp: `According to Coulomb's law, $F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2}$. Thus electrostatic force is inversely proportional to the square of separation distance ($1/r^2$).`
  })},
  { topic: "Current Electricity", unit: "Physics XII - Unit 2", template: (i, m) => ({
    q: `Three resistors of resistance ${(i % 3) + 2}\\,\\Omega$, ${(i % 3) + 4}\\,\\Omega$, and ${(i % 3) + 6}\\,\\Omega$ are connected in series across a battery of voltage ${(i % 4) * 6 + 12}\\text{ V}$. The total current drawn from the battery is:`,
    opts: [
      `A. ${(((i % 4) * 6 + 12) / (((i % 3) + 2) + ((i % 3) + 4) + ((i % 3) + 6))).toFixed(2)} A`,
      `B. ${(((i % 4) * 6 + 12) * 2).toFixed(2)} A`,
      `C. ${(((i % 4) * 6 + 12) / 2).toFixed(2)} A`,
      `D. ${(((i % 3) + 2) + ((i % 3) + 4) + ((i % 3) + 6)).toFixed(2)} A`
    ],
    ansIdx: 0,
    exp: `In series, $R_{\\text{eq}} = R_1 + R_2 + R_3 = ${((i % 3) + 2) + ((i % 3) + 4) + ((i % 3) + 6)}\\,\\Omega$. Total current $I = V / R_{\\text{eq}} = ${(i % 4) * 6 + 12} / ${((i % 3) + 2) + ((i % 3) + 4) + ((i % 3) + 6)} = ${(((i % 4) * 6 + 12) / (((i % 3) + 2) + ((i % 3) + 4) + ((i % 3) + 6))).toFixed(2)}$ A.`
  })},
  { topic: "Ray Optics", unit: "Physics XII - Unit 5", template: (i, m) => ({
    q: `A concave mirror produces a real, inverted image of height ${(i % 3) + 2}\\text{ cm}$ for an object of height $1\\text{ cm}$. The magnification produced by the mirror is:`,
    opts: [
      `A. -${(i % 3) + 2}`,
      `B. +${(i % 3) + 2}`,
      `C. -1 / ${(i % 3) + 2}`,
      `D. +1 / ${(i % 3) + 2}`
    ],
    ansIdx: 0,
    exp: `Magnification $m = h_i / h_o$. For real and inverted images, image height is negative. Hence $m = -${(i % 3) + 2} / 1 = -${(i % 3) + 2}$.`
  })},
  { topic: "Dual Nature of Matter", unit: "Physics XII - Unit 6", template: (i, m) => ({
    q: `If the momentum of a photon is increased by ${(i % 5) * 10 + 10}\\%, what is the corresponding change in its de Broglie wavelength?`,
    opts: [
      `A. Wavelength decreases inversely with momentum ($h / p$)`,
      `B. Wavelength increases by ${(i % 5) * 10 + 10}\\%`,
      `C. Wavelength remains unchanged`,
      `D. Wavelength doubles`
    ],
    ansIdx: 0,
    exp: `De Broglie wavelength $\\lambda = h / p$. Since wavelength is inversely proportional to momentum, an increase in momentum results in a corresponding reduction in de Broglie wavelength.`
  })}
];

const CHEMISTRY_TOPICS = [
  { topic: "Chemical Bonding", unit: "Chemistry XI - Inorganic", template: (i, m) => ({
    q: `Which of the following chemical species exhibits a linear geometry according to VSEPR theory? (Mock Variant #${m + 1}.${i + 1})`,
    opts: [
      `A. CO₂`,
      `B. H₂O`,
      `C. NH₃`,
      `D. SF₄`
    ],
    ansIdx: 0,
    exp: `Carbon dioxide (CO₂) has sp hybridization with two double bonds and zero lone pairs on the central carbon atom, resulting in a bond angle of 180° and linear geometry.`
  })},
  { topic: "Thermodynamics", unit: "Chemistry XI - Physical", template: (i, m) => ({
    q: `For a spontaneous chemical process occurring at constant temperature and pressure, the Gibbs free energy change ($\Delta G$) must satisfy:`,
    opts: [
      `A. $\Delta G < 0$`,
      `B. $\Delta G > 0$`,
      `C. $\Delta G = 0$`,
      `D. $\Delta G = \Delta H$`
    ],
    ansIdx: 0,
    exp: `According to the Second Law of Thermodynamics, a reaction is spontaneous at constant T and P if and only if the change in Gibbs free energy is negative ($\Delta G < 0$).`
  })},
  { topic: "Organic Reactions", unit: "Chemistry XII - Organic", template: (i, m) => ({
    q: `When ethyl alcohol is reacted with concentrated H₂SO₄ at 443 K (170°C), the primary product formed is: (NCERT organic reaction #${i + 1})`,
    opts: [
      `A. Ethene (CH₂=CH₂)`,
      `B. Ethoxyethane (CH₃-CH₂-O-CH₂-CH₃)`,
      `C. Ethanal (CH₃CHO)`,
      `D. Ethanoic acid (CH₃COOH)`
    ],
    ansIdx: 0,
    exp: `Dehydration of ethanol with excess conc. H₂SO₄ at 443 K undergoes an $E_2$ elimination reaction yielding ethene (CH₂=CH₂). At 413 K, ether is formed instead.`
  })},
  { topic: "Electrochemistry", unit: "Chemistry XII - Physical", template: (i, m) => ({
    q: `The molar conductivity ($\Lambda_m$) of a strong electrolyte increases upon dilution primarily due to:`,
    opts: [
      `A. Decrease in inter-ionic attractions allowing higher ionic mobility`,
      `B. Increase in the total number of ions formed`,
      `C. Decrease in temperature of the electrolyte`,
      `D. Complete breakdown of solvent molecules`
    ],
    ansIdx: 0,
    exp: `For strong electrolytes, ionization is already 100% complete. Dilution increases inter-ionic separation, reducing inter-ionic forces of attraction and increasing ionic mobility.`
  })},
  { topic: "p-Block Elements", unit: "Chemistry XI - Inorganic", template: (i, m) => ({
    q: `Which nitrogen oxide is a neutral oxide and exhibits diamagnetic properties in the gas phase?`,
    opts: [
      `A. N₂O (Nitrous oxide)`,
      `B. NO₂`,
      `C. NO`,
      `D. N₂O₅`
    ],
    ansIdx: 0,
    exp: `Nitrous oxide (N₂O) and Carbon monoxide (CO) are neutral oxides. N₂O has an even number of valence electrons and is diamagnetic.`
  })}
];

const BOTANY_TOPICS = [
  { topic: "Photosynthesis", unit: "Biology XI - Plant Physiology", template: (i, m) => ({
    q: `In C₄ plants (e.g., maize, sugarcane), the primary CO₂ acceptor in mesophyll cells is: (Mock #${m + 1})`,
    opts: [
      `A. Phosphoenolpyruvate (PEP)`,
      `B. Ribulose-1,5-bisphosphate (RuBP)`,
      `C. Oxaloacetic acid (OAA)`,
      `D. 3-Phosphoglyceric acid (PGA)`
    ],
    ansIdx: 0,
    exp: `In C₄ plants, CO₂ fixation in mesophyll cells is catalyzed by PEP carboxylase, where the 3-carbon compound Phosphoenolpyruvate (PEP) serves as the primary CO₂ acceptor.`
  })},
  { topic: "Plant Genetics", unit: "Biology XII - Genetics", template: (i, m) => ({
    q: `In a dihybrid cross between two heterozygous tall, round-seeded pea plants (TtRr x TtRr), what fraction of the offspring will be dwarf with wrinkled seeds?`,
    opts: [
      `A. 1/16`,
      `B. 3/16`,
      `C. 9/16`,
      `D. 1/4`
    ],
    ansIdx: 0,
    exp: `The phenotypic ratio of a standard Mendelian dihybrid cross is 9:3:3:1. Double recessive offspring (dwarf, wrinkled = ttrr) occur with a frequency of 1/16.`
  })},
  { topic: "Cell Biology", unit: "Biology XI - Cell Biology", template: (i, m) => ({
    q: `Which phase of meiosis is characterized by the formation of synaptonemal complexes and crossing over between non-sister chromatids?`,
    opts: [
      `A. Pachytene (Prophase I)`,
      `B. Zygotene (Prophase I)`,
      `C. Leptotene (Prophase I)`,
      `D. Diakinesis (Prophase I)`
    ],
    ansIdx: 0,
    exp: `Synapsis begins in Zygotene, but actual crossing over and recombinant nodule formation occur during the Pachytene stage of Prophase I.`
  })},
  { topic: "Plant Ecology", unit: "Biology XII - Ecology", template: (i, m) => ({
    q: `In an ecological pyramid of biomass for a aquatic ecosystem (e.g., pond), the pyramid is typically:`,
    opts: [
      `A. Inverted (due to low standing crop of phytoplankton producing high turnover)`,
      `B. Always upright`,
      `C. Spindle-shaped`,
      `D. Bell-shaped`
    ],
    ansIdx: 0,
    exp: `The biomass pyramid in an aquatic ecosystem is inverted because the biomass of zooplankton/fish at any given instant far exceeds the small standing crop of phytoplankton.`
  })},
  { topic: "Plant Anatomy", unit: "Biology XI - Anatomy", template: (i, m) => ({
    q: `In dicotyledonous stems, the vascular bundles are arranged in a characteristic ring format and are classified as:`,
    opts: [
      `A. Conjoint, collateral, and open (with cambium)`,
      `B. Conjoint, collateral, and closed`,
      `C. Radial and open`,
      `D. Concentric and closed`
    ],
    ansIdx: 0,
    exp: `Dicot stem vascular bundles are conjoint, collateral, and open because intrastelar cambium is present between xylem and phloem, allowing secondary growth.`
  })}
];

const ZOOLOGY_TOPICS = [
  { topic: "Human Physiology", unit: "Biology XI - Human Physiology", template: (i, m) => ({
    q: `During muscle contraction, the binding of calcium ions ($Ca^{2+}$) to which specific subunit exposes the active myosin-binding sites on actin filaments?`,
    opts: [
      `A. Troponin C`,
      `B. Tropomyosin`,
      `C. Myosin heavy chain`,
      `D. Actinin`
    ],
    ansIdx: 0,
    exp: `Sarcoplasmic $Ca^{2+}$ binds to Troponin C, causing a conformational change that pulls tropomyosin away from the active binding sites on actin filaments.`
  })},
  { topic: "Human Reproduction", unit: "Biology XII - Reproduction", template: (i, m) => ({
    q: `In human females, the LH surge occurring near the midpoint of the menstrual cycle (day 14) directly triggers:`,
    opts: [
      `A. Ovulation (release of secondary oocyte from Graafian follicle)`,
      `B. Regression of corpus luteum`,
      `C. Onset of menses`,
      `D. Proliferation of endometrium`
    ],
    ansIdx: 0,
    exp: `Rapid surge of Luteinizing Hormone (LH surge) induces rupture of the mature Graafian follicle and release of the secondary oocyte (ovulation).`
  })},
  { topic: "Endocrinology", unit: "Biology XI - Endocrine System", template: (i, m) => ({
    q: `Which hormone is secreted by the juxtaglomerular cells of the kidney in response to low arterial blood pressure to convert angiotensinogen to angiotensin I?`,
    opts: [
      `A. Renin`,
      `B. Erythropoietin`,
      `C. Aldosterone`,
      `D. Anti-Diuretic Hormone (ADH)`
    ],
    ansIdx: 0,
    exp: `Renin enzyme is secreted by renal JG cells under hypotension/hypovolemia to initiate the Renin-Angiotensin-Aldosterone System (RAAS).`
  })},
  { topic: "Biotechnology", unit: "Biology XII - Biotechnology", template: (i, m) => ({
    q: `In recombinant DNA technology, the enzyme used to join the sticky or blunt ends of restriction-cut DNA fragments is:`,
    opts: [
      `A. DNA Ligase (T4 DNA Ligase)`,
      `B. DNA Polymerase I`,
      `C. Reverse Transcriptase`,
      `D. Alkaline Phosphatase`
    ],
    ansIdx: 0,
    exp: `DNA Ligase catalyzes the formation of phosphodiester bonds between adjacent nucleotides, sealing nicked DNA fragments ("molecular glue").`
  })},
  { topic: "Immunology & Disease", unit: "Biology XII - Evolution & Health", template: (i, m) => ({
    q: `Antibodies present in human colostrum (first milk) that provide natural passive immunity to the newborn infant belong to which class?`,
    opts: [
      `A. IgA`,
      `B. IgG`,
      `C. IgM`,
      `D. IgE`
    ],
    ansIdx: 0,
    exp: `Secretory IgA antibodies are abundantly present in mother's colostrum, shielding the neonate's gastrointestinal tract against pathogens.`
  })}
];

// Generate 100 complete NEET-UG full-length mock exams (18,000 total questions)
export function generateNEETMocks() {
  const mocks = [];

  for (let mockIndex = 0; mockIndex < 100; mockIndex++) {
    const mockIdNum = String(mockIndex + 1).padStart(3, '0');
    const mockId = `neet-mock-${mockIdNum}`;
    const mockTitle = `NEET-UG Official Full Mock ${mockIdNum}`;
    const difficulty = mockIndex % 3 === 0 ? "Easy-Moderate" : (mockIndex % 3 === 1 ? "Standard NEET Level" : "Challenging Mock");

    const questions = [];

    // 1. Generate 45 Physics Questions
    for (let qIdx = 0; qIdx < 45; qIdx++) {
      const topicObj = PHYSICS_TOPICS[(qIdx + mockIndex) % PHYSICS_TOPICS.length];
      const qData = topicObj.template(qIdx, mockIndex);
      questions.push({
        id: `neet-m${mockIdNum}-phy-${qIdx + 1}`,
        questionNumber: qIdx + 1,
        subject: "physics",
        subSubject: "Physics",
        section: qIdx < 35 ? "A" : "B",
        chapter: topicObj.topic,
        ncertUnit: topicObj.unit,
        difficulty: qIdx % 2 === 0 ? "Moderate" : "Easy",
        questionText: `[Mock ${mockIdNum} - Q${qIdx + 1}] ${qData.q}`,
        options: qData.opts,
        correctAnswer: qData.opts[qData.ansIdx],
        explanation: qData.exp,
        marks: 4,
        negativeMarks: -1
      });
    }

    // 2. Generate 45 Chemistry Questions
    for (let qIdx = 0; qIdx < 45; qIdx++) {
      const topicObj = CHEMISTRY_TOPICS[(qIdx + mockIndex) % CHEMISTRY_TOPICS.length];
      const qData = topicObj.template(qIdx, mockIndex);
      questions.push({
        id: `neet-m${mockIdNum}-chem-${qIdx + 1}`,
        questionNumber: 45 + qIdx + 1,
        subject: "chemistry",
        subSubject: "Chemistry",
        section: qIdx < 35 ? "A" : "B",
        chapter: topicObj.topic,
        ncertUnit: topicObj.unit,
        difficulty: qIdx % 2 === 0 ? "Moderate" : "Easy",
        questionText: `[Mock ${mockIdNum} - Q${45 + qIdx + 1}] ${qData.q}`,
        options: qData.opts,
        correctAnswer: qData.opts[qData.ansIdx],
        explanation: qData.exp,
        marks: 4,
        negativeMarks: -1
      });
    }

    // 3. Generate 45 Botany Questions
    for (let qIdx = 0; qIdx < 45; qIdx++) {
      const topicObj = BOTANY_TOPICS[(qIdx + mockIndex) % BOTANY_TOPICS.length];
      const qData = topicObj.template(qIdx, mockIndex);
      questions.push({
        id: `neet-m${mockIdNum}-bot-${qIdx + 1}`,
        questionNumber: 90 + qIdx + 1,
        subject: "botany",
        subSubject: "Biology (Botany)",
        section: qIdx < 35 ? "A" : "B",
        chapter: topicObj.topic,
        ncertUnit: topicObj.unit,
        difficulty: qIdx % 2 === 0 ? "Easy" : "Moderate",
        questionText: `[Mock ${mockIdNum} - Q${90 + qIdx + 1}] ${qData.q}`,
        options: qData.opts,
        correctAnswer: qData.opts[qData.ansIdx],
        explanation: qData.exp,
        marks: 4,
        negativeMarks: -1
      });
    }

    // 4. Generate 45 Zoology Questions
    for (let qIdx = 0; qIdx < 45; qIdx++) {
      const topicObj = ZOOLOGY_TOPICS[(qIdx + mockIndex) % ZOOLOGY_TOPICS.length];
      const qData = topicObj.template(qIdx, mockIndex);
      questions.push({
        id: `neet-m${mockIdNum}-zoo-${qIdx + 1}`,
        questionNumber: 135 + qIdx + 1,
        subject: "zoology",
        subSubject: "Biology (Zoology)",
        section: qIdx < 35 ? "A" : "B",
        chapter: topicObj.topic,
        ncertUnit: topicObj.unit,
        difficulty: qIdx % 2 === 0 ? "Easy" : "Moderate",
        questionText: `[Mock ${mockIdNum} - Q${135 + qIdx + 1}] ${qData.q}`,
        options: qData.opts,
        correctAnswer: qData.opts[qData.ansIdx],
        explanation: qData.exp,
        marks: 4,
        negativeMarks: -1
      });
    }

    mocks.push({
      id: mockId,
      mockNumber: mockIndex + 1,
      title: mockTitle,
      subtitle: `Official NTA NEET Blueprint | 180 Questions | 720 Marks`,
      durationMinutes: 200,
      totalQuestions: 180,
      totalMarks: 720,
      difficulty: difficulty,
      isPremium: mockIndex >= 3, // First 3 are free sample mocks
      subjects: [
        { id: "physics", name: "Physics", count: 45 },
        { id: "chemistry", name: "Chemistry", count: 45 },
        { id: "botany", name: "Botany", count: 45 },
        { id: "zoology", name: "Zoology", count: 45 }
      ],
      questions: questions
    });
  }

  return mocks;
}

export const ALL_NEET_MOCKS = generateNEETMocks();
