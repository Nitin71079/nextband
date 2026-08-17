/**
 * TOEFL iBT Official Test Bank (2026 ETS Format)
 * 5 Full Multistage Adaptive TOEFL iBT Practice Tests
 */

export const toeflTests = [
  // ── MOCK TEST 1 ──
  {
    id: "toefl-full-1",
    title: "TOEFL iBT 2026 Practice Test 1",
    format: "2026 ETS Multistage Adaptive",
    durationMinutes: 90,
    sections: {
      reading: {
        title: "Reading Section",
        durationMinutes: 30,
        routerModule: [
          {
            id: "r1-cw-1",
            type: "complete_words",
            instruction: "Complete the missing word fragments in the passage below.",
            passageText: "The university library has recently expan___ its digital research collection. Students can now access thousands of peer-revie___ journal articles online without visiting the campus branch in per___.",
            missingParts: ["ded", "wed", "son"],
            hints: ["expan[ded]", "peer-revie[wed]", "in per[son]"]
          },
          {
            id: "r1-cw-2",
            type: "complete_words",
            instruction: "Complete the missing word fragments in the passage below.",
            passageText: "Professor Henderson reminded students that the deadline for submit___ the midterm essay is Friday midnight. Late submissions will res___ in a grade deduc___.",
            missingParts: ["ting", "ult", "tion"],
            hints: ["submit[ting]", "res[ult]", "deduc[tion]"]
          },
          {
            id: "r1-dl-1",
            type: "read_daily_life",
            instruction: "Read the campus announcement below and answer the questions.",
            stimulusFormat: "Campus Notice",
            passageText: `📌 Main Dining Hall Notice: The Main Dining Hall will close at 4:00 PM on Friday due to electrical upgrades. Students may use the Science Cafe until 8:30 PM.`,
            questions: [
              {
                id: "r1-dl-1-q1",
                questionText: "Why is the Main Dining Hall closing early on Friday?",
                options: ["A. Staff training", "B. Scheduled electrical upgrades", "C. University athletic event", "D. Low attendance"],
                correctAnswer: 1,
                explanation: "The notice states closing is due to electrical system upgrades."
              }
            ]
          },
          {
            id: "r1-acad-1",
            type: "read_academic",
            instruction: "Read the passage below and answer the question.",
            passageTitle: "Photosynthesis & Plant Respiration",
            passageText: "Photosynthesis synthesized nutrients using carbon dioxide, water, and sunlight. Chlorophyll in chloroplasts absorbs light energy and converts it into chemical energy stored within glucose bonds.",
            questions: [
              {
                id: "r1-acad-1-q1",
                questionText: "What is the primary role of chlorophyll during photosynthesis?",
                options: ["A. Consuming oxygen", "B. Absorbing light energy and converting it to chemical energy", "C. Transporting carbon dioxide", "D. Releasing water vapor"],
                correctAnswer: 1,
                explanation: "Chlorophyll absorbs light energy and converts it to chemical energy."
              }
            ]
          }
        ],
        upperModule: [
          {
            id: "r1-u-cw-1",
            type: "complete_words",
            instruction: "Upper Module: Complete the missing word fragments.",
            passageText: "Acoustic design requires precise calculated attenua___ of reverberation time. Specialized sound-absorbing materials are strategically positio___.",
            missingParts: ["tion", "ned"],
            hints: ["attenua[tion]", "positio[ned]"]
          }
        ],
        lowerModule: [
          {
            id: "r1-l-cw-1",
            type: "complete_words",
            instruction: "Lower Module: Complete the missing word fragments.",
            passageText: "Many international stud___ choose to study abroad to improve their English sk___.",
            missingParts: ["ents", "ills"],
            hints: ["stud[ents]", "sk[ills]"]
          }
        ]
      },

      listening: {
        title: "Listening Section",
        durationMinutes: 29,
        routerModule: [
          {
            id: "l1-resp-1",
            type: "listen_choose_response",
            instruction: "Listen to the statement and choose the best response.",
            audioText: "I'm sorry, Professor Miller. I won't be able to attend tomorrow's seminar because of a doctor's appointment.",
            options: [
              "A. The lecture was held yesterday.",
              "B. Thank you for letting me know. Please review the posted slides.",
              "C. The library closes at five.",
              "D. Biology is offered in spring."
            ],
            correctAnswer: 1,
            explanation: "Choice B politely acknowledges the student's absence."
          },
          {
            id: "l1-conv-1",
            type: "listen_conversation",
            instruction: "Listen to the conversation between a student and an academic advisor.",
            audioText: "Student: My two history classes overlap on Tuesday.\nAdvisor: History 201 is also offered on Thursday evening, which clears your conflict.",
            questions: [
              {
                id: "l1-c1-q1",
                questionText: "What solution does the advisor suggest?",
                options: ["A. Taking an online course", "B. Enrolling in the Thursday evening section", "C. Dropping history", "D. Delaying graduation"],
                correctAnswer: 1,
                explanation: "The advisor suggests Thursday evening."
              }
            ]
          }
        ],
        upperModule: [],
        lowerModule: []
      },

      writing: {
        title: "Writing Section",
        durationMinutes: 23,
        totalItems: 12,
        buildSentenceItems: [
          { id: "w1-bs-1", scrambledWords: ["library", "many", "students", "every day", "the", "use"], targetSentence: "Many students use the library every day.", difficulty: "A2" },
          { id: "w1-bs-2", scrambledWords: ["must submit", "by Friday", "their assignments", "all candidates"], targetSentence: "All candidates must submit their assignments by Friday.", difficulty: "B1" },
          { id: "w1-bs-3", scrambledWords: ["has expanded", "significantly", "its research facilities", "the university"], targetSentence: "The university has expanded its research facilities significantly.", difficulty: "B2" },
          { id: "w1-bs-4", scrambledWords: ["carefully", "the professor", "explained", "the exam rules"], targetSentence: "The professor carefully explained the exam rules.", difficulty: "B1" },
          { id: "w1-bs-5", scrambledWords: ["are required", "new international students", "to attend", "orientation"], targetSentence: "New international students are required to attend orientation.", difficulty: "B2" },
          { id: "w1-bs-6", scrambledWords: ["online portal", "can access", "grades", "through the", "students"], targetSentence: "Students can access grades through the online portal.", difficulty: "B1" },
          { id: "w1-bs-7", scrambledWords: ["recommends", "the advisor", "taking", "statistics", "this semester"], targetSentence: "The advisor recommends taking statistics this semester.", difficulty: "B2" },
          { id: "w1-bs-8", scrambledWords: ["will reopen", "the campus cafeteria", "after renovation", "next month"], targetSentence: "The campus cafeteria will reopen after renovation next month.", difficulty: "B2" },
          { id: "w1-bs-9", scrambledWords: ["provides", "useful feedback", "AI evaluation", "for essay writing"], targetSentence: "AI evaluation provides useful feedback for essay writing.", difficulty: "C1" },
          { id: "w1-bs-10", scrambledWords: ["demonstrated", "the study", "a strong correlation", "between sleep and memory"], targetSentence: "The study demonstrated a strong correlation between sleep and memory.", difficulty: "C1" }
        ],
        emailTask: {
          id: "w1-email-1",
          type: "write_email",
          instruction: "Write an email responding to the situation below.",
          scenario: "You missed a lab due to illness. Write to Dr. Aris asking for a makeup session.",
          minWords: 50
        },
        discussionTask: {
          id: "w1-disc-1",
          type: "academic_discussion",
          instruction: "Participate in the online discussion below.",
          professorPrompt: "Professor Lin: Should governments heavily subsidize renewable energy companies?",
          student1: "Sarah: Yes, green technology needs financial incentives to combat climate change.",
          student2: "Mark: No, subsidies waste taxpayer money and private industry should drive growth.",
          minWords: 80
        }
      },

      speaking: {
        title: "Speaking Section",
        durationMinutes: 8,
        totalTasks: 11,
        repeatTasks: [
          { id: "s1-lr-1", audioText: "The campus library will extend operating hours during finals.", recordWindowSec: 8, level: "B1" },
          { id: "s1-lr-2", audioText: "Students must register for laboratory courses before Friday.", recordWindowSec: 8, level: "B1" },
          { id: "s1-lr-3", audioText: "Professor Aris posted the updated syllabus online.", recordWindowSec: 8, level: "B2" },
          { id: "s1-lr-4", audioText: "Academic advisors recommend balancing core requirements with electives.", recordWindowSec: 10, level: "B2" },
          { id: "s1-lr-5", audioText: "Environmental scientists documented a correlation between deforestation and rainfall.", recordWindowSec: 12, level: "C1" },
          { id: "s1-lr-6", audioText: "Interdisciplinary research projects foster innovative problem solving.", recordWindowSec: 12, level: "C1" },
          { id: "s1-lr-7", audioText: "Technological advancements in artificial intelligence are reshaping modern education.", recordWindowSec: 12, level: "C2" }
        ],
        interviewTasks: [
          { id: "s1-int-1", questionText: "What essential skill should university students develop before graduation, and why?", recordWindowSec: 45 },
          { id: "s1-int-2", questionText: "Do you prefer studying individually or working in group seminars? Explain.", recordWindowSec: 45 },
          { id: "s1-int-3", questionText: "Describe a challenging academic project you completed. How did you finish it?", recordWindowSec: 45 },
          { id: "s1-int-4", questionText: "Should physical education be mandatory for all university students? Agree or disagree.", recordWindowSec: 45 }
        ]
      }
    }
  },

  // ── MOCK TEST 2 ──
  {
    id: "toefl-full-2",
    title: "TOEFL iBT 2026 Practice Test 2",
    format: "2026 ETS Multistage Adaptive",
    durationMinutes: 90,
    sections: {
      reading: {
        title: "Reading Section",
        durationMinutes: 30,
        routerModule: [
          {
            id: "r2-cw-1",
            type: "complete_words",
            instruction: "Complete the missing word fragments in the passage below.",
            passageText: "Modern urban infrastructure requires ongoing maintenance to prev___ major service disruptions. Engineers utilize advan___ sensors to monitor bridge stability continuously.",
            missingParts: ["ent", "ced"],
            hints: ["prev[ent]", "advan[ced]"]
          },
          {
            id: "r2-dl-1",
            type: "read_daily_life",
            instruction: "Read the university memo.",
            stimulusFormat: "Campus Email",
            passageText: "Subject: IT System Maintenance. The campus Wi-Fi network will undergo upgrades on Saturday from 2 AM to 6 AM. Network access will be unavailable during this window.",
            questions: [
              {
                id: "r2-dl-1-q1",
                questionText: "When will the campus Wi-Fi network be unavailable?",
                options: ["A. Friday 2 PM", "B. Saturday 2 AM to 6 AM", "C. Sunday all day", "D. Monday morning"],
                correctAnswer: 1,
                explanation: "Wi-Fi upgrades occur Saturday from 2 AM to 6 AM."
              }
            ]
          }
        ],
        upperModule: [],
        lowerModule: []
      },
      listening: {
        title: "Listening Section",
        durationMinutes: 29,
        routerModule: [
          {
            id: "l2-resp-1",
            type: "listen_choose_response",
            instruction: "Listen and choose the best response.",
            audioText: "Could you tell me where the career counseling office is located?",
            options: ["A. It is on the third floor of Hall B.", "B. I like career counseling.", "C. Yesterday at noon.", "D. Graduation is in May."],
            correctAnswer: 0,
            explanation: "Choice A gives location."
          }
        ],
        upperModule: [],
        lowerModule: []
      },
      writing: {
        title: "Writing Section",
        durationMinutes: 23,
        totalItems: 12,
        buildSentenceItems: [
          { id: "w2-bs-1", scrambledWords: ["requires", "diligent practice", "learning a language", "every day"], targetSentence: "Learning a language requires diligent practice every day.", difficulty: "B1" },
          { id: "w2-bs-2", scrambledWords: ["published", "the research team", "their findings", "in a journal"], targetSentence: "The research team published their findings in a journal.", difficulty: "B2" },
          { id: "w2-bs-3", scrambledWords: ["attendance", "is compulsory", "for all lab sessions", "student"], targetSentence: "Student attendance is compulsory for all lab sessions.", difficulty: "B1" },
          { id: "w2-bs-4", scrambledWords: ["can submit", "online", "their draft", "students"], targetSentence: "Students can submit their draft online.", difficulty: "A2" },
          { id: "w2-bs-5", scrambledWords: ["the committee", "approved", "the proposal", "unanimously"], targetSentence: "The committee approved the proposal unanimously.", difficulty: "C1" },
          { id: "w2-bs-6", scrambledWords: ["should consult", "their academic advisor", "students", "regularly"], targetSentence: "Students should consult their academic advisor regularly.", difficulty: "B1" },
          { id: "w2-bs-7", scrambledWords: ["provides", "financial aid", "the university", "to qualified applicants"], targetSentence: "The university provides financial aid to qualified applicants.", difficulty: "B2" },
          { id: "w2-bs-8", scrambledWords: ["was awarded", "first prize", "the engineering student", "in the contest"], targetSentence: "The engineering student was awarded first prize in the contest.", difficulty: "B2" },
          { id: "w2-bs-9", scrambledWords: ["demonstrates", "critical thinking", "effective writing", "and clarity"], targetSentence: "Effective writing demonstrates critical thinking and clarity.", difficulty: "C1" },
          { id: "w2-bs-10", scrambledWords: ["accelerates", "the synthesis", "catalysts", "of chemical compounds"], targetSentence: "Catalysts accelerates the synthesis of chemical compounds.", difficulty: "C2" }
        ],
        emailTask: {
          id: "w2-email-1",
          type: "write_email",
          instruction: "Write an email requesting a deadline extension.",
          scenario: "You need a 2-day extension on your research proposal due to illness. Write to Professor Vance.",
          minWords: 50
        },
        discussionTask: {
          id: "w2-disc-1",
          type: "academic_discussion",
          instruction: "Write your contribution to the academic discussion.",
          professorPrompt: "Professor Davis: Should remote work remain a permanent option for employees?",
          student1: "Claire: Yes, remote work increases flexibility and reduces commuting pollution.",
          student2: "David: No, working in an office builds team collaboration and company culture.",
          minWords: 80
        }
      },
      speaking: {
        title: "Speaking Section",
        durationMinutes: 8,
        totalTasks: 11,
        repeatTasks: [
          { id: "s2-lr-1", audioText: "The registrar office will process transcript requests within two business days.", recordWindowSec: 8, level: "B1" },
          { id: "s2-lr-2", audioText: "All graduate students are invited to present at the research symposium.", recordWindowSec: 8, level: "B2" },
          { id: "s2-lr-3", audioText: "Effective time management is essential for academic success.", recordWindowSec: 8, level: "B1" },
          { id: "s2-lr-4", audioText: "Renewable energy adoption has grown rapidly over the past decade.", recordWindowSec: 10, level: "B2" },
          { id: "s2-lr-5", audioText: "Biological diversity provides fundamental resilience to natural ecosystems.", recordWindowSec: 12, level: "C1" },
          { id: "s2-lr-6", audioText: "Economists analyze consumer behavior to predict market fluctuations.", recordWindowSec: 12, level: "C1" },
          { id: "s2-lr-7", audioText: "Intercultural communication competence enhances global professional collaboration.", recordWindowSec: 12, level: "C2" }
        ],
        interviewTasks: [
          { id: "s2-int-1", questionText: "What is your favorite academic subject, and why do you find it interesting?", recordWindowSec: 45 },
          { id: "s2-int-2", questionText: "Should university lectures be recorded and made available online for all students?", recordWindowSec: 45 },
          { id: "s2-int-3", questionText: "Describe a book or article that had a significant influence on your thinking.", recordWindowSec: 45 },
          { id: "s2-int-4", questionText: "Is it better for students to choose a specific major immediately or explore general subjects first?", recordWindowSec: 45 }
        ]
      }
    }
  },

  // ── MOCK TEST 3 ──
  {
    id: "toefl-full-3",
    title: "TOEFL iBT 2026 Practice Test 3",
    format: "2026 ETS Multistage Adaptive",
    durationMinutes: 90,
    sections: {
      reading: {
        title: "Reading Section",
        durationMinutes: 30,
        routerModule: [
          { id: "r3-cw-1", type: "complete_words", instruction: "Complete the text.", passageText: "Marine biologists have discovered new coral spec___ in deep ocean trenches.", missingParts: ["ies"], hints: ["spec[ies]"] }
        ],
        upperModule: [], lowerModule: []
      },
      listening: {
        title: "Listening Section",
        durationMinutes: 29,
        routerModule: [
          { id: "l3-resp-1", type: "listen_choose_response", instruction: "Choose response.", audioText: "When is the lab report due?", options: ["A. By Friday 5 PM", "B. In the library", "C. Chemistry is fun", "D. Yes it is"], correctAnswer: 0, explanation: "Time answer." }
        ],
        upperModule: [], lowerModule: []
      },
      writing: {
        title: "Writing Section",
        durationMinutes: 23,
        totalItems: 12,
        buildSentenceItems: [
          { id: "w3-bs-1", scrambledWords: ["is crucial", "sleep", "for brain health"], targetSentence: "Sleep is crucial for brain health.", difficulty: "A2" },
          { id: "w3-bs-2", scrambledWords: ["participated", "in the experiment", "fifty volunteers"], targetSentence: "Fifty volunteers participated in the experiment.", difficulty: "B1" },
          { id: "w3-bs-3", scrambledWords: ["announced", "a new grant", "the department chair"], targetSentence: "The department chair announced a new grant.", difficulty: "B2" },
          { id: "w3-bs-4", scrambledWords: ["must wear", "safety goggles", "all lab technicians"], targetSentence: "All lab technicians must wear safety goggles.", difficulty: "B1" },
          { id: "w3-bs-5", scrambledWords: ["reduces", "stress levels", "regular exercise"], targetSentence: "Regular exercise reduces stress levels.", difficulty: "A2" },
          { id: "w3-bs-6", scrambledWords: ["will host", "an international conference", "the university"], targetSentence: "The university will host an international conference.", difficulty: "B2" },
          { id: "w3-bs-7", scrambledWords: ["requires", "critical analysis", "writing a thesis"], targetSentence: "Writing a thesis requires critical analysis.", difficulty: "B2" },
          { id: "w3-bs-8", scrambledWords: ["can register", "online", "participants"], targetSentence: "Participants can register online.", difficulty: "A2" },
          { id: "w3-bs-9", scrambledWords: ["influences", "climate change", "global weather patterns"], targetSentence: "Climate change influences global weather patterns.", difficulty: "B2" },
          { id: "w3-bs-10", scrambledWords: ["uncovered", "archaeologists", "ancient artifacts"], targetSentence: "Archaeologists uncovered ancient artifacts.", difficulty: "C1" }
        ],
        emailTask: { id: "w3-email-1", type: "write_email", instruction: "Write email inquiring about intern positions.", scenario: "Write to Career Coordinator Ms. Lee asking about summer internships.", minWords: 50 },
        discussionTask: { id: "w3-disc-1", type: "academic_discussion", instruction: "Discuss online learning.", professorPrompt: "Prof. Kim: Is online degree learning as effective as traditional campus education?", student1: "Alex: Yes, online learning is flexible.", student2: "Beth: No, campus learning builds human connections.", minWords: 80 }
      },
      speaking: {
        title: "Speaking Section",
        durationMinutes: 8,
        totalTasks: 11,
        repeatTasks: [
          { id: "s3-lr-1", audioText: "The campus bookstore offers discounts on used textbooks.", recordWindowSec: 8, level: "B1" },
          { id: "s3-lr-2", audioText: "Graduate seminars require active student participation.", recordWindowSec: 8, level: "B2" },
          { id: "s3-lr-3", audioText: "Solar power reduces reliance on fossil fuels.", recordWindowSec: 8, level: "B1" },
          { id: "s3-lr-4", audioText: "Artificial intelligence is transforming global healthcare diagnostic procedures.", recordWindowSec: 10, level: "C1" },
          { id: "s3-lr-5", audioText: "Students are encouraged to join student government organizations.", recordWindowSec: 10, level: "B2" },
          { id: "s3-lr-6", audioText: "Cognitive psychology investigates human perception and memory.", recordWindowSec: 12, level: "C1" },
          { id: "s3-lr-7", audioText: "Sustainable urban design minimizes environmental pollution footprints.", recordWindowSec: 12, level: "C2" }
        ],
        interviewTasks: [
          { id: "s3-int-1", questionText: "How do you manage academic stress during exam week?", recordWindowSec: 45 },
          { id: "s3-int-2", questionText: "Is it better to live on campus or in an off-campus apartment?", recordWindowSec: 45 },
          { id: "s3-int-3", questionText: "Describe a professor who inspired you and explain why.", recordWindowSec: 45 },
          { id: "s3-int-4", questionText: "Should university tuition fees be fully subsidized by the government?", recordWindowSec: 45 }
        ]
      }
    }
  },

  // ── MOCK TEST 4 ──
  {
    id: "toefl-full-4",
    title: "TOEFL iBT 2026 Practice Test 4",
    format: "2026 ETS Multistage Adaptive",
    durationMinutes: 90,
    sections: {
      reading: { title: "Reading Section", durationMinutes: 30, routerModule: [{ id: "r4-cw-1", type: "complete_words", instruction: "Complete text.", passageText: "Renewable energy technol___ are advancing rapidly.", missingParts: ["ogies"], hints: ["technol[ogies]"] }], upperModule: [], lowerModule: [] },
      listening: { title: "Listening Section", durationMinutes: 29, routerModule: [{ id: "l4-resp-1", type: "listen_choose_response", instruction: "Choose response.", audioText: "Where is the student center?", options: ["A. Next to the main library.", "B. I like studying.", "C. At 4 PM."], correctAnswer: 0, explanation: "Location." }], upperModule: [], lowerModule: [] },
      writing: {
        title: "Writing Section", durationMinutes: 23, totalItems: 12,
        buildSentenceItems: [
          { id: "w4-bs-1", scrambledWords: ["water", "is essential", "for human survival"], targetSentence: "Water is essential for human survival.", difficulty: "A1" },
          { id: "w4-bs-2", scrambledWords: ["submitted", "the report", "on time"], targetSentence: "The report was submitted on time.", difficulty: "B1" },
          { id: "w4-bs-3", scrambledWords: ["attracts", "the exhibition", "thousands of visitors"], targetSentence: "The exhibition attracts thousands of visitors.", difficulty: "B2" },
          { id: "w4-bs-4", scrambledWords: ["must follow", "students", "safety guidelines"], targetSentence: "Students must follow safety guidelines.", difficulty: "A2" },
          { id: "w4-bs-5", scrambledWords: ["improves", "learning", "active listening"], targetSentence: "Active listening improves learning.", difficulty: "B1" },
          { id: "w4-bs-6", scrambledWords: ["conducted", "the survey", "last month"], targetSentence: "The survey was conducted last month.", difficulty: "B2" },
          { id: "w4-bs-7", scrambledWords: ["enhances", "collaboration", "group work"], targetSentence: "Group work enhances collaboration.", difficulty: "B1" },
          { id: "w4-bs-8", scrambledWords: ["provides", "the app", "instant feedback"], targetSentence: "The app provides instant feedback.", difficulty: "A2" },
          { id: "w4-bs-9", scrambledWords: ["drives", "innovation", "scientific research"], targetSentence: "Scientific research drives innovation.", difficulty: "C1" },
          { id: "w4-bs-10", scrambledWords: ["regulates", "the heart", "blood circulation"], targetSentence: "The heart regulates blood circulation.", difficulty: "B2" }
        ],
        emailTask: { id: "w4-email-1", type: "write_email", instruction: "Write email requesting professor reference.", scenario: "Write to Prof. Smith asking for a letter of recommendation.", minWords: 50 },
        discussionTask: { id: "w4-disc-1", type: "academic_discussion", instruction: "Discuss artificial intelligence.", professorPrompt: "Prof. Zhao: Will AI replace human teachers in the future?", student1: "Tom: Yes, AI can personalize content.", student2: "Eva: No, human empathy is indispensable.", minWords: 80 }
      },
      speaking: {
        title: "Speaking Section", durationMinutes: 8, totalTasks: 11,
        repeatTasks: [
          { id: "s4-lr-1", audioText: "The career fair will take place in the main gymnasium on Tuesday.", recordWindowSec: 8, level: "B1" },
          { id: "s4-lr-2", audioText: "Students can request loaner laptops from the technology helpdesk.", recordWindowSec: 8, level: "B1" },
          { id: "s4-lr-3", audioText: "Public speaking skills enhance professional presentation capabilities.", recordWindowSec: 10, level: "B2" },
          { id: "s4-lr-4", audioText: "Microbiology experiments require strict sterile laboratory environments.", recordWindowSec: 10, level: "C1" },
          { id: "s4-lr-5", audioText: "Historical analysis provides valuable context for contemporary geopolitical events.", recordWindowSec: 12, level: "C1" },
          { id: "s4-lr-6", audioText: "Effective team communication resolves organizational operational friction.", recordWindowSec: 12, level: "C1" },
          { id: "s4-lr-7", audioText: "Neuroscientific research continues to uncover complex brain circuitry mechanisms.", recordWindowSec: 12, level: "C2" }
        ],
        interviewTasks: [
          { id: "s4-int-1", questionText: "What is your main strategy when preparing for a big presentation?", recordWindowSec: 45 },
          { id: "s4-int-2", questionText: "Should university courses require mandatory group work projects?", recordWindowSec: 45 },
          { id: "s4-int-3", questionText: "Describe an achievement you are proud of in your academic journey.", recordWindowSec: 45 },
          { id: "s4-int-4", questionText: "Is it better to study abroad in a non-English speaking country or an English-speaking country?", recordWindowSec: 45 }
        ]
      }
    }
  },

  // ── MOCK TEST 5 ──
  {
    id: "toefl-full-5",
    title: "TOEFL iBT 2026 Practice Test 5",
    format: "2026 ETS Multistage Adaptive",
    durationMinutes: 90,
    sections: {
      reading: { title: "Reading Section", durationMinutes: 30, routerModule: [{ id: "r5-cw-1", type: "complete_words", instruction: "Complete text.", passageText: "Quantum computing represents a major leap forward in proce___ power.", missingParts: ["ssing"], hints: ["proce[ssing]"] }], upperModule: [], lowerModule: [] },
      listening: { title: "Listening Section", durationMinutes: 29, routerModule: [{ id: "l5-resp-1", type: "listen_choose_response", instruction: "Choose response.", audioText: "Did you turn in your assignment?", options: ["A. Yes, I uploaded it this morning.", "B. I like writing.", "C. The class was long."], correctAnswer: 0, explanation: "Yes response." }], upperModule: [], lowerModule: [] },
      writing: {
        title: "Writing Section", durationMinutes: 23, totalItems: 12,
        buildSentenceItems: [
          { id: "w5-bs-1", scrambledWords: ["reading", "expands", "vocabulary"], targetSentence: "Reading expands vocabulary.", difficulty: "A1" },
          { id: "w5-bs-2", scrambledWords: ["completed", "the team", "the project"], targetSentence: "The team completed the project.", difficulty: "A2" },
          { id: "w5-bs-3", scrambledWords: ["attends", "she", "lectures regularly"], targetSentence: "She attends lectures regularly.", difficulty: "A1" },
          { id: "w5-bs-4", scrambledWords: ["requires", "research", "accurate data"], targetSentence: "Research requires accurate data.", difficulty: "B1" },
          { id: "w5-bs-5", scrambledWords: ["promotes", "health", "balanced nutrition"], targetSentence: "Balanced nutrition promotes health.", difficulty: "B1" },
          { id: "w5-bs-6", scrambledWords: ["designed", "the architect", "the building"], targetSentence: "The architect designed the building.", difficulty: "B1" },
          { id: "w5-bs-7", scrambledWords: ["published", "the professor", "his book"], targetSentence: "The professor published his book.", difficulty: "B2" },
          { id: "w5-bs-8", scrambledWords: ["improves", "practice", "performance"], targetSentence: "Practice improves performance.", difficulty: "A2" },
          { id: "w5-bs-9", scrambledWords: ["drives", "curiosity", "discovery"], targetSentence: "Curiosity drives discovery.", difficulty: "B2" },
          { id: "w5-bs-10", scrambledWords: ["enables", "technology", "global connection"], targetSentence: "Technology enables global connection.", difficulty: "C1" }
        ],
        emailTask: { id: "w5-email-1", type: "write_email", instruction: "Write email to residence coordinator.", scenario: "Request room change due to noise issues. Write to Mr. Thomas.", minWords: 50 },
        discussionTask: { id: "w5-disc-1", type: "academic_discussion", instruction: "Discuss space exploration.", professorPrompt: "Prof. Brown: Should nations spend billions on space exploration or focus on Earth problems?", student1: "Leo: Space exploration creates scientific breakthroughs.", student2: "Mia: Earth climate challenges need urgent funding first.", minWords: 80 }
      },
      speaking: {
        title: "Speaking Section", durationMinutes: 8, totalTasks: 11,
        repeatTasks: [
          { id: "s5-lr-1", audioText: "The health center provides free annual flu vaccinations for students.", recordWindowSec: 8, level: "B1" },
          { id: "s5-lr-2", audioText: "Campus dining services will introduce organic vegetarian menu options.", recordWindowSec: 8, level: "B1" },
          { id: "s5-lr-3", audioText: "Faculty members encourage active debate during seminar discussions.", recordWindowSec: 10, level: "B2" },
          { id: "s5-lr-4", audioText: "Atmospheric research vessels collect environmental data across ocean currents.", recordWindowSec: 10, level: "C1" },
          { id: "s5-lr-5", audioText: "Interdisciplinary collaboration stimulates groundbreaking technological innovation.", recordWindowSec: 12, level: "C1" },
          { id: "s5-lr-6", audioText: "Quantitative economic models project steady regional growth trends.", recordWindowSec: 12, level: "C1" },
          { id: "s5-lr-7", audioText: "Neurocognitive rehabilitation therapies assist stroke patients in restoring motor skills.", recordWindowSec: 12, level: "C2" }
        ],
        interviewTasks: [
          { id: "s5-int-1", questionText: "What field of study do you plan to pursue, and what career goals do you have?", recordWindowSec: 45 },
          { id: "s5-int-2", questionText: "Do you prefer written examinations or practical hands-on project assessments?", recordWindowSec: 45 },
          { id: "s5-int-3", questionText: "Describe how modern technology has changed the way you study.", recordWindowSec: 45 },
          { id: "s5-int-4", questionText: "Should university attendance be mandatory for all undergraduate lectures?", recordWindowSec: 45 }
        ]
      }
    }
  }
];
