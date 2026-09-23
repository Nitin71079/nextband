export const readingMocks = [
  {
    id: 1,
    title: "IELTS Academic Reading Test 01 (Official Specification)",
    duration: "60 Minutes",
    sections: [
      {
        title: "Passage 1: The Evolution and Future of Urban Vertical Agriculture",
        passage: `
Paragraph A
Urban agriculture has shifted from an experimental sustainable development concept to an essential component of modern metropolitan spatial planning. As global demographic projections indicate that nearly 70 percent of the human population will reside in urban centers by 2050, municipal authorities face unprecedented challenges regarding food security, environmental degradation, and resource distribution. Traditional agricultural supply chains, which rely heavily on long-distance refrigerated transit, consume immense quantities of fossil fuels and contribute significantly to greenhouse gas emissions. In response, environmental planners, agronomists, and urban architects have pioneered vertical farming—a controlled-environment agricultural system that cultivates crops in vertically stacked layers inside specialized indoor facilities.

Paragraph B
The structural mechanics of vertical farming depend on closed-loop hydroponic and aeroponic systems rather than natural soil. Hydroponic infrastructure delivers nutrient-rich water solutions directly to plant roots, while aeroponic systems suspend plant roots in mist chambers, minimizing water consumption. Peer-reviewed environmental studies demonstrate that aeroponic systems utilize up to 95 percent less water than conventional outdoor farming. Furthermore, because these indoor facilities operate within fully sealed thermal microclimates, crops remain entirely isolated from seasonal weather variations, droughts, and agricultural pests. Consequently, vertical farms eliminate the necessity for chemical pesticides while achieving crop yield rates up to twenty times higher per square meter than traditional horizontal farmland.

Paragraph C
Despite these environmental benefits, vertical farming faces severe financial and technological constraints that hinder its universal commercial adoption. Primary among these limitations is energy demand. Deprived of natural sunlight, indoor crops rely on high-intensity Light Emitting Diode (LED) arrays tailored to specific photosynthetically active radiation (PAR) spectrums. Operating these illumination arrays alongside automated climate control systems, dehumidifiers, and ventilation units requires substantial electrical power. In regions where electricity generation remains dependent on coal or natural gas, the carbon footprint of vertical crop production can actually exceed that of field-grown alternatives transported across long distances.

Paragraph D
To mitigate these operational costs, leading agritech developers are integrating renewable energy systems, such as building-integrated photovoltaics and geothermal heat exchangers, into facility designs. Additionally, advanced artificial intelligence algorithms monitor crop health through spectral cameras, dynamically adjusting nutrient concentrations and LED wavelengths to optimize photosynthesis. Analysts predict that as renewable energy costs decline and micro-LED efficiency improves, urban vertical farms will become economically competitive for high-value horticultural products, including leafy greens, strawberries, and medicinal herbs. However, staple calorie crops such as wheat, rice, and corn remain economically unfeasible for indoor cultivation due to their low market value relative to their high spatial and energy requirements.
        `,
        questions: [
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph A from the list of headings.",
            options: ["i. Financial constraints of indoor farming", "ii. Demographic shifts and urban food security", "iii. Technological advancements in LED lighting", "iv. Soil degradation in traditional agriculture"],
            answer: "ii. Demographic shifts and urban food security"
          },
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph B from the list of headings.",
            options: ["i. Water efficiency and pest isolation mechanisms", "ii. The carbon footprint of fossil fuels", "iii. Staple crop production limitations", "iv. Soil fertilization techniques"],
            answer: "i. Water efficiency and pest isolation mechanisms"
          },
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph C from the list of headings.",
            options: ["i. Geothermal heat exchangers", "ii. Environmental benefits of outdoor farming", "iii. High energy demands and financial barriers", "iv. Crop yields per square meter"],
            answer: "iii. High energy demands and financial barriers"
          },
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph D from the list of headings.",
            options: ["i. AI monitoring and future economic viability", "ii. Pesticide application protocols", "iii. Historical transportation routes", "iv. Soil microbial analysis"],
            answer: "i. AI monitoring and future economic viability"
          },
          {
            type: "true-false-not-given",
            question: "By 2050, approximately 70 percent of the world's population is expected to live in urban areas.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "TRUE"
          },
          {
            type: "true-false-not-given",
            question: "Aeroponic systems require more water than traditional outdoor irrigation methods.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "FALSE"
          },
          {
            type: "true-false-not-given",
            question: "Vertical farms have completely eliminated electricity costs in Northern Europe.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "FALSE"
          },
          {
            type: "true-false-not-given",
            question: "Wheat is currently the most profitable crop grown in commercial vertical farms.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "FALSE"
          },
          {
            type: "sentence-completion",
            question: "Hydroponic systems deliver nutrient-rich solutions directly to plant _____.",
            answer: "roots"
          },
          {
            type: "sentence-completion",
            question: "Indoor facilities operate within sealed thermal microclimates, protecting crops from seasonal _____.",
            answer: "droughts"
          },
          {
            type: "sentence-completion",
            question: "Indoor crops rely on high-intensity LED arrays to replace natural _____.",
            answer: "sunlight"
          },
          {
            type: "sentence-completion",
            question: "Spectral cameras monitored by artificial intelligence algorithms measure crop _____.",
            answer: "health"
          },
          {
            type: "multiple-choice",
            question: "What is the main reason staple crops like wheat are unsuitable for vertical farms?",
            options: [
              "They require synthetic pesticides to grow indoors",
              "Their low market value relative to high energy costs",
              "They cannot tolerate artificial LED illumination",
              "Their roots cannot survive in aeroponic mist chambers"
            ],
            answer: "Their low market value relative to high energy costs"
          }
        ]
      },
      {
        title: "Passage 2: Neural Plasticity and Artificial Intelligence in Diagnostic Medicine",
        passage: `
Paragraph A
Over the past two decades, biomedical engineering has experienced a paradigm shift driven by the convergence of clinical neuroscience and deep neural networks. In diagnostic radiology, machine learning algorithms trained on millions of annotated radiological images now demonstrate diagnostic sensitivity exceeding that of human specialists in detecting early-stage carcinomas, pulmonary embolisms, and retinal microaneurysms. These computer-aided diagnostic (CAD) engines process complex volumetric datasets, such as magnetic resonance imaging (MRI) and computed tomography (CT) scans, within seconds, highlighting subtle anatomical anomalies that might evade detection during routine human visual inspection.

Paragraph B
The underlying mechanics of these diagnostic models rely on convolutional neural networks (CNNs), which emulate the hierarchical feature processing observed in the biological visual cortex. Lower structural layers of the network detect basic visual primitives, such as spatial gradients and edge orientations, while deeper layers synthesize these elements into complex anatomical representations. By calculating statistical probability distributions across millions of trained parameters, the algorithm assigns diagnostic confidence scores to candidate pathologies. In double-blind clinical validation trials, AI systems operating alongside board-certified radiologists reduced diagnostic false-negative rates by 18 percent compared to solo human evaluations.

Paragraph C
Notwithstanding these technological achievements, clinical implementation remains fraught with ethical, legal, and operational hurdles. Critics frequently highlight the 'black box' problem—the inherent opacity of deep neural networks whose internal decision-making pathways cannot be easily interpreted by human clinicians. When an algorithm generates a misdiagnosis or recommends an inappropriate intervention, determining legal liability among software developers, healthcare providers, and equipment manufacturers poses complex jurisprudence challenges. Furthermore, algorithmic bias represents a persistent threat; if training datasets predominantly feature demographics from wealthy Western institutions, the model's diagnostic accuracy degrades significantly when deployed in underrepresented global populations.

Paragraph D
To overcome these limitations, regulatory agencies such as the U.S. FDA and the European Medicines Agency are establishing rigorous standardization frameworks for Software as a Medical Device (SaMD). These standards mandate explainable AI (XAI) architectures that provide human clinicians with visual heatmaps indicating which image regions influenced the algorithm's diagnostic output. Medical ethicists emphasize that artificial intelligence must remain a supportive decision-making tool rather than an autonomous diagnostic authority. The optimal future for global healthcare lies in a synergistic partnership where technological processing power enhances human clinical intuition, empathy, and holistic patient care.
        `,
        questions: [
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph A from the list of headings.",
            options: ["i. Convergence of neuroscience and diagnostic AI", "ii. Historical origins of radiological equipment", "iii. Regulatory mandates for SaMD", "iv. Patient privacy laws"],
            answer: "i. Convergence of neuroscience and diagnostic AI"
          },
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph B from the list of headings.",
            options: ["i. Legal liability in automated diagnostics", "ii. Convolutional neural networks and visual cortex emulation", "iii. Demographic bias in rural clinics", "iv. Financial costs of MRI machines"],
            answer: "ii. Convolutional neural networks and visual cortex emulation"
          },
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph C from the list of headings.",
            options: ["i. Ethical hurdles and algorithmic opacity", "ii. Visual heatmaps in diagnostic imaging", "iii. Development of vaccines", "iv. Board-certified radiologist salaries"],
            answer: "i. Ethical hurdles and algorithmic opacity"
          },
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph D from the list of headings.",
            options: ["i. Regulatory standards and explainable AI synergy", "ii. Complete automation of surgical procedures", "iii. History of double-blind trials", "iv. Software programming languages"],
            answer: "i. Regulatory standards and explainable AI synergy"
          },
          {
            type: "true-false-not-given",
            question: "AI diagnostic systems process volumetric datasets within seconds.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "TRUE"
          },
          {
            type: "true-false-not-given",
            question: "In clinical trials, AI operating with radiologists reduced diagnostic false-negative rates.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "TRUE"
          },
          {
            type: "true-false-not-given",
            question: "The European Medicines Agency has banned all medical AI applications.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "FALSE"
          },
          {
            type: "sentence-completion",
            question: "Convolutional neural networks emulate feature processing in the biological visual _____.",
            answer: "cortex"
          },
          {
            type: "sentence-completion",
            question: "The inherent opacity of deep neural network decision-making is known as the black _____ problem.",
            answer: "box"
          },
          {
            type: "sentence-completion",
            question: "Algorithmic bias occurs when training datasets lack demographic _____.",
            answer: "representation"
          },
          {
            type: "sentence-completion",
            question: "Explainable AI architectures provide human clinicians with visual _____.",
            answer: "heatmaps"
          },
          {
            type: "multiple-choice",
            question: "What is the primary role advocated for AI in modern diagnostic medicine?",
            options: [
              "To completely replace human radiologists and clinicians",
              "To act as a supportive tool alongside human clinical judgment",
              "To manage hospital financial billing systems exclusively",
              "To perform surgical interventions without human supervision"
            ],
            answer: "To act as a supportive tool alongside human clinical judgment"
          },
          {
            type: "multiple-choice",
            question: "Why might an AI diagnostic model perform poorly when deployed globally?",
            options: [
              "Because magnetic resonance imaging machines are obsolete",
              "If its training data was biased toward specific wealthy Western demographics",
              "Because radiologists refuse to review computer-generated heatmaps",
              "If the algorithm uses convolutional neural network layers"
            ],
            answer: "If its training data was biased toward specific wealthy Western demographics"
          }
        ]
      },
      {
        title: "Passage 3: Neurobiology of Sleep Architecture and Memory Consolidation",
        passage: `
Paragraph A
For centuries, human sleep was regarded as a passive physiological state characterized by systemic inactivity and dormant neural processes. Modern electroencephalographic (EEG) research has thoroughly dismantled this misconception, revealing that the sleeping brain undergoes dynamic structural reorganization essential for cognitive functioning, emotional regulation, and neuroimmunological maintenance. Sleep architecture consists of recurring 90-to-110-minute cycles alternating between Non-Rapid Eye Movement (NREM) sleep—further divided into light stages N1 and N2, and slow-wave sleep (SWS/N3)—and Rapid Eye Movement (REM) sleep. Each distinct phase plays a specialized role in maintaining neurological homeostasis.

Paragraph B
Slow-wave sleep (N3), dominated by high-amplitude delta waves operating at frequencies between 0.5 and 4 Hz, is the primary phase for physical restoration and declarative memory consolidation. During SWS, synchronized electrical oscillations facilitate a biological dialog between the hippocampus—the temporary storage locus for daily episodic memories—and the neocortex, where long-term structural memories are permanently integrated. This process, known as systemic consolidation, transfers fragile neural representations into resilient neocortical networks. Simultaneously, the brain's glymphatic system expands by up to 60 percent during slow-wave sleep, enabling cerebrospinal fluid to flush out metabolic toxins, including beta-amyloid proteins implicated in neurodegenerative diseases.

Paragraph C
Conversely, Rapid Eye Movement (REM) sleep—characterized by desynchronized theta rhythms resembling waking brain activity, rapid ocular movements, and muscle atonia—is heavily involved in procedural memory consolidation and emotional recalibration. During REM episodes, the brain selectively reactivates neural circuits associated with complex motor skills and affective experiences while suppressing noradrenergic neurotransmission. This neurochemical environment allows the brain to process distressing emotional memories, stripping away their negative affective charge while preserving the core informational content. Depriving individuals of REM sleep impairs emotional empathy, heightens amygdala reactivity, and degrades creative problem-solving capacity.

Paragraph D
Despite the documented vital functions of sleep, modern industrial societies face an epidemic of chronic sleep deprivation. Prolonged exposure to artificial blue light emitted by electronic screens suppresses nocturnal melatonin secretion by the pineal gland, delaying circadian rhythm onset. Furthermore, shift work, urban noise pollution, and elevated psychological stress disrupt sleep continuity. Longitudinal epidemiological studies confirm that long-term sleep restriction correlates with increased incidence of cardiovascular disease, metabolic dysfunction, and cognitive decline. Public health authorities are now recognizing sleep optimization as a vital pillar of preventive medicine alongside physical nutrition and exercise.
        `,
        questions: [
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph A from the list of headings.",
            options: ["i. Dispelling misconceptions: EEG research and sleep architecture", "ii. Surgical treatment of insomnia", "iii. History of alarm clocks", "iv. Dietary nutrients for deep sleep"],
            answer: "i. Dispelling misconceptions: EEG research and sleep architecture"
          },
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph B from the list of headings.",
            options: ["i. Slow-wave sleep: Memory consolidation and metabolic toxin clearance", "ii. REM sleep and vivid dreaming", "iii. Effects of caffeine on blood pressure", "iv. Circadian rhythm disruption in shift workers"],
            answer: "i. Slow-wave sleep: Memory consolidation and metabolic toxin clearance"
          },
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph C from the list of headings.",
            options: ["i. REM sleep: Emotional recalibration and procedural memory", "ii. Hippocampal volume loss in aging", "iii. Glymphatic system clearance rates", "iv. Delta wave frequencies in infants"],
            answer: "i. REM sleep: Emotional recalibration and procedural memory"
          },
          {
            type: "matching-headings",
            question: "Choose the correct heading for Paragraph D from the list of headings.",
            options: ["i. Modern sleep deprivation factors and epidemiological risks", "ii. Blue light filtering software algorithms", "iii. Athletic performance and muscle recovery", "iv. Melatonin supplement dosages"],
            answer: "i. Modern sleep deprivation factors and epidemiological risks"
          },
          {
            type: "true-false-not-given",
            question: "Each complete sleep cycle lasts between 90 and 110 minutes.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "TRUE"
          },
          {
            type: "true-false-not-given",
            question: "The glymphatic system shrinks in volume during slow-wave sleep.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "FALSE"
          },
          {
            type: "true-false-not-given",
            question: "Blue light exposure from screens stimulates melatonin production.",
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            answer: "FALSE"
          },
          {
            type: "sentence-completion",
            question: "Slow-wave sleep is dominated by high-amplitude _____ waves.",
            answer: "delta"
          },
          {
            type: "sentence-completion",
            question: "The hippocampus acts as a temporary storage locus for daily _____ memories.",
            answer: "episodic"
          },
          {
            type: "sentence-completion",
            question: "During REM sleep, muscle atonia occurs alongside rapid ocular _____.",
            answer: "movements"
          },
          {
            type: "sentence-completion",
            question: "Blue light suppresses the secretion of melatonin by the _____ gland.",
            answer: "pineal"
          },
          {
            type: "multiple-choice",
            question: "What is the primary function of the glymphatic system during slow-wave sleep?",
            options: [
              "To generate rapid ocular movements during dreaming",
              "To flush out metabolic toxins such as beta-amyloid proteins",
              "To suppress circadian rhythms in shift workers",
              "To increase muscle tone throughout the body"
            ],
            answer: "To flush out metabolic toxins such as beta-amyloid proteins"
          },
          {
            type: "multiple-choice",
            question: "How does REM sleep assist in emotional recalibration?",
            options: [
              "By eliminating long-term memory capacity completely",
              "By stripping away negative affective charge while preserving informational content",
              "By increasing noradrenergic neurotransmission to maximum levels",
              "By inducing deep muscle contractions throughout the body"
            ],
            answer: "By stripping away negative affective charge while preserving informational content"
          }
        ]
      }
    ]
  }
];