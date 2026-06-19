const academicTest005_passage1 = {
  id: 1,

  title:
    "Cybersecurity in the Digital Age",

  content: `
Cybersecurity has become one of the most important challenges facing modern society. As individuals, businesses and governments increasingly depend on digital technologies, protecting information systems from unauthorized access has become essential. Cyberattacks can disrupt services, compromise sensitive data and create significant financial losses.

The rapid growth of the internet has transformed communication, commerce and information sharing. However, increased connectivity has also expanded opportunities for cybercriminals. Attackers may exploit software vulnerabilities, deceive users through phishing campaigns or deploy malicious software known as malware.

Data breaches represent one of the most common cybersecurity incidents. Organizations often store large amounts of personal and financial information. When security measures fail, attackers may gain access to sensitive records, potentially affecting millions of individuals.

Phishing attacks remain particularly effective because they target human behavior rather than technical weaknesses. Attackers create fraudulent messages that appear legitimate, encouraging victims to reveal passwords or financial information. Security experts emphasize the importance of user education in reducing such risks.

Encryption plays a critical role in protecting digital communications. By converting information into coded formats, encryption helps ensure that only authorized parties can access sensitive data. Financial institutions, healthcare providers and government agencies rely heavily on encryption technologies.

Artificial intelligence is increasingly used in cybersecurity. Machine learning systems can analyze large volumes of network activity and identify unusual behavior patterns. These technologies enable organizations to detect threats more quickly and respond to incidents more effectively.

Despite technological advances, cybersecurity remains a continuous challenge. Attackers constantly develop new techniques, requiring organizations to update defenses regularly. Experts describe cybersecurity as an ongoing process rather than a one-time solution.

Governments have introduced regulations requiring organizations to strengthen security practices and report significant breaches. International cooperation has also become important because cyber threats frequently cross national boundaries.

As digital technologies continue evolving, cybersecurity will remain central to protecting economic activity, public services and personal privacy. Continued investment in technology, education and international collaboration is expected to improve resilience against future threats.
  `,

  questions: [

    // Questions 1-13
    {
  id: 1,
  type: "multiple-choice",
  question:
    "What is a major purpose of cybersecurity?",
  options: [
    "Increase internet usage",
    "Protect information systems",
    "Reduce communication",
    "Eliminate software"
  ],
  answer:
    "Protect information systems"
},

{
  id: 2,
  type: "multiple-choice",
  question:
    "What type of attack targets human behavior?",
  options: [
    "Encryption",
    "Phishing",
    "Compression",
    "Backup"
  ],
  answer:
    "Phishing"
},

{
  id: 3,
  type: "multiple-choice",
  question:
    "What does encryption do?",
  options: [
    "Deletes data",
    "Copies files",
    "Converts information into coded formats",
    "Creates malware"
  ],
  answer:
    "Converts information into coded formats"
},

{
  id: 4,
  type: "multiple-choice",
  question:
    "What technology helps identify unusual network activity?",
  options: [
    "GPS",
    "Artificial Intelligence",
    "Printers",
    "Cloud Storage"
  ],
  answer:
    "Artificial Intelligence"
},

{
  id: 5,
  type: "sentence-completion",
  question:
    "Cyberattacks can create significant financial ______.",
  answer:
    "losses"
},

{
  id: 6,
  type: "sentence-completion",
  question:
    "Attackers may exploit software ______.",
  answer:
    "vulnerabilities"
},

{
  id: 7,
  type: "sentence-completion",
  question:
    "Organizations must update defenses ______.",
  answer:
    "regularly"
},

{
  id: 8,
  type: "short-answer",
  question:
    "Name one method attackers use to steal information.",
  answer:
    "phishing"
},

{
  id: 9,
  type: "matching-headings",
  question:
    "Match the heading to the paragraph discussing AI.",

  options: [
    "Artificial Intelligence in Security",
    "Government Regulations",
    "Data Breaches",
    "Encryption Methods"
  ],

  answer:
    "Artificial Intelligence in Security"
},

{
  id: 10,
  type: "summary-completion",
  question:
    "Cybersecurity is an ongoing ______ rather than a one-time solution.",

  answer:
    "process"
},

{
  id: 11,
  type: "true-false-not-given",
  question:
    "Cyber threats are limited to one country.",

  answer:
    "False"
},

{
  id: 12,
  type: "true-false-not-given",
  question:
    "Encryption helps protect sensitive data.",

  answer:
    "True"
},

{
  id: 13,
  type: "true-false-not-given",
  question:
    "Every cyberattack uses malware.",

  answer:
    "Not Given"
}
  ]
};

export default academicTest005_passage1;