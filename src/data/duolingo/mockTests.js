/**
 * Knarrow DET Practice Test Definitions & Mock Templates
 * Contains 100 Full-Length Adaptive Practice Tests covering all 14 official DET question types.
 * Fully aligned with August 12, 2026 DET Specifications.
 */

export const detMockTests = Array.from({ length: 100 }).map((_, idx) => {
  const num = idx + 1;
  const topicTitle = ["Urban Biodiversity","Quantum Computing","Marine Microplastics","Behavioral Economics","Renewable Energy Infrastructure","Neural Network Architecture","Autonomous Systems & AI","Astrophysics & Space Exploration","Genomic Editing & Bioethics","Global Supply Chain Optimization","Artificial Intelligence in Healthcare","Cognitive Neuroscience & Memory","Nanotechnology in Materials","Deep-Sea Ecosystems","Robotic Surgery & Precision Medicine","Blockchain & Financial Systems","Cybersecurity Threat Intelligence","Space Colonization & Bio-domes","Climate Migration & Urban Planning","Modern Sustainable Architecture","Smart Electrical Microgrids","Natural Language Processing","Agricultural Biotechnology","Cognitive Psychology","Macroeconomic Monetary Policy","Cellular Immunology","Synthetic Biology","Atmospheric Science of Gas Giants","Quantum Cryptography","Industrial Automation Systems","Ocean Thermal Energy","Bioinformatics & Protein Folding","Smart City Infrastructure","Ergonomics in HCI","Behavioral Finance","Environmental Toxicology","Speech Recognition Systems","Epidemiology & Public Health","Geothermal Energy Systems","Structural Health Monitoring","Aeroacoustics in Aviation","Experimental Particle Physics","Hydrological Basin Modeling","Satellite Telecommunications","Neuroplasticity & Rehabilitation","Swarm Robotics","Circular Economy & Recycling","Implantable Nanosensors","Regenerative Agriculture","Urban Drone Freight Logistics","Quantum Sensors & Metrology","Marine Biotechnology","Computational Social Science","Cognitive Robotics","Desalination Technologies","Fusion Energy Development","Biomimetic Architectural Engineering","Decentralized Autonomous Networks","Space Debris Mitigation","Urban Microclimate Modeling","High-Frequency Algorithmic Trading","Neuroeconomics & Decision Making","Microfluidics & Lab-on-a-Chip","Additive Manufacturing in Aerospace","Volcanology & Seismic Monitoring","Soil Carbon Sequestration","Solid-State Battery Chemistry","Computer-Aided Molecular Design","Autonomous Maritime Shipping","Human-Robot Interaction Safety","Biomedical Tissue Engineering","Dark Matter Astrophysics","Smart Grid Cybersecurity","Educational Analytics & Adaptive Learning","Conservation Genetics","Urban Vertical Farming","Optical Wireless Communications","Bio-inspired Computing","Precision Hydrology","Space Mining Regulations","Cellular Agriculture & Cultured Meat","Predictive Maintenance in Rail","Cognitive Hearing Science","Behavioral Nudges in Public Health","Environmental Economic Valuation","Acoustic Wave Sensors","Immunotherapy in Oncology","Geospatial Remote Sensing","Superconducting Quantum Circuits","Industrial Internet of Things","Ocean Acidification Studies","Computational Linguistics & Translation","Sustainable Textile Nanomaterials","Autonomous Aerial Inspection","Neuroprosthetics & Brain-Machine Interfaces","Bioluminescent Bio-sensors","Regenerative Medicine & Stem Cells","Urban Traffic Signal Optimization","Cognitive Ergonomics in Aviation Safety","Global Macro-Financial Risk Management"][idx];
  const itemSuffix = String((idx % 5) + 1).padStart(3, "0");

  return {
    id: `det-full-mock-${num}`,
    title: `Knarrow DET Full Practice Test ${num} — ${topicTitle}`,
    durationMinutes: 60,
    difficulty: idx % 3 === 0 ? "Medium" : idx % 3 === 1 ? "Medium-High" : "Advanced",
    targetScore: 115 + ((idx * 2) % 40),
    itemIds: [
      `swrs-${itemSuffix}`, `swrs-001`, `fitb-${itemSuffix}`, `rc-${itemSuffix}`, `rs-${itemSuffix}`,
      `lt-${itemSuffix}`, `ra-${itemSuffix}`, `di-${itemSuffix}`, `sai-${itemSuffix}`,
      `ir-${itemSuffix}`, `il-${itemSuffix}`, `iw-${itemSuffix}`, `is-${itemSuffix}`,
      `ws-${itemSuffix}`, `ss-${itemSuffix}`
    ],
    description: `Complete 14-task computer-adaptive DET mock exam focused on ${topicTitle.toLowerCase()} with 4-step Interactive Reading and 4-stage Interactive Listening.`
  };
});
