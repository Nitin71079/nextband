/**
 * TOEFL iBT Official Test Bank (2026 ETS Format)
 * Includes Two-Stage Adaptive Reading & Listening + Linear Writing & Speaking
 */

export const toeflTests = [
  {
    id: "toefl-full-1",
    title: "TOEFL iBT 2026 Complete Practice Test 1",
    format: "2026 ETS Multistage Adaptive",
    durationMinutes: 90,
    sections: {
      // 📖 READING SECTION (Adaptive)
      reading: {
        title: "Reading Section",
        durationMinutes: 30,
        routerModule: [
          // A. Complete the Words
          {
            id: "r-cw-1",
            type: "complete_words",
            instruction: "Complete the missing word fragments in the passage below to make a grammatically correct text.",
            passageText: "The university library has recently expan___ its digital research collection. Students can now access thousands of peer-revie___ journal articles online without visiting the campus branch in per___.",
            missingParts: ["ded", "wed", "son"],
            hints: ["expan[ded]", "peer-revie[wed]", "in per[son]"],
          },
          {
            id: "r-cw-2",
            type: "complete_words",
            instruction: "Complete the missing word fragments in the passage below.",
            passageText: "Professor Henderson reminded students that the deadline for submit___ the midterm essay is Friday midnight. Late submissions will res___ in a 10 percent grade deduc___.",
            missingParts: ["ting", "ult", "tion"],
            hints: ["submit[ting]", "res[ult]", "deduc[tion]"],
          },
          // B. Read in Daily Life
          {
            id: "r-dl-1",
            type: "read_daily_life",
            instruction: "Read the campus announcement below and answer the questions.",
            stimulusFormat: "Campus Notice",
            passageText: `📌 Campus Dining Hall Maintenance Notice
Please be advised that the Main Campus Dining Hall will close early at 4:00 PM this Friday, October 24th, due to mandatory electrical system upgrades. 

Students requiring dinner options after 4:00 PM may use the Science Building Cafe, which will extend its operating hours until 8:30 PM. Normal dining hall operations will resume on Saturday morning at 7:30 AM.`,
            questions: [
              {
                id: "r-dl-1-q1",
                questionText: "Why is the Main Campus Dining Hall closing early on Friday?",
                options: [
                  "A. Staff training session",
                  "B. Scheduled electrical maintenance",
                  "C. A university athletic event",
                  "D. Low weekend student attendance"
                ],
                correctAnswer: 1, // B
                explanation: "The notice explicitly states that the dining hall will close early due to 'mandatory electrical system upgrades'."
              },
              {
                id: "r-dl-1-q2",
                questionText: "What alternative option is provided for students needing dinner?",
                options: [
                  "A. Ordering food delivered to residence halls",
                  "B. Visiting the off-campus supermarket",
                  "C. Dining at the Science Building Cafe until 8:30 PM",
                  "D. Eating breakfast early on Saturday morning"
                ],
                correctAnswer: 2, // C
                explanation: "The notice mentions that the Science Building Cafe will extend hours until 8:30 PM."
              }
            ]
          },
          // C. Read an Academic Passage
          {
            id: "r-acad-1",
            type: "read_academic",
            instruction: "Read the passage below and answer the questions.",
            passageTitle: "Photosynthesis and Plant Respiration",
            passageText: `Photosynthesis is the fundamental biological process by which green plants and certain solar-dependent organisms synthesize nutrients using carbon dioxide, water, and sunlight. Chlorophyll, the primary pigment embedded in chloroplasts, absorbs light energy—predominantly in the blue and red wavelengths—and converts it into chemical energy stored within glucose bonds. 

Simultaneously, oxygen is liberated as a cellular byproduct. Plant respiration occurs concurrently, consuming oxygen to metabolize stored carbohydrates during darkness. This delicate physiological equilibrium governs global carbon cycles and sustains tropospheric oxygen reserves.`,
            questions: [
              {
                id: "r-acad-1-q1",
                questionText: "According to the passage, what is the primary role of chlorophyll during photosynthesis?",
                options: [
                  "A. Consuming oxygen stored within carbohydrates",
                  "B. Absorbing light energy and converting it to chemical energy",
                  "C. Transporting carbon dioxide directly into soil roots",
                  "D. Releasing water vapor during hot weather"
                ],
                correctAnswer: 1, // B
                explanation: "Paragraph 1 states that chlorophyll absorbs light energy and converts it into chemical energy."
              },
              {
                id: "r-acad-1-q2",
                questionText: "The word 'liberated' in paragraph 2 is closest in meaning to:",
                options: [
                  "A. Released",
                  "B. Absorbed",
                  "C. Destroyed",
                  "D. Measured"
                ],
                correctAnswer: 0, // A
                explanation: "'Liberated' means freed or released as a byproduct."
              }
            ]
          }
        ],
        upperModule: [
          {
            id: "r-upper-cw-1",
            type: "complete_words",
            instruction: "Upper Module: Complete the missing word fragments in the advanced text.",
            passageText: "Architectural acoustic design requires precise calculated attenua___ of reverberation time. Specialized sound-absorbing materials are strategically positio___ to minimize unwanted echo phenom___.",
            missingParts: ["tion", "ned", "ena"],
            hints: ["attenua[tion]", "positio[ned]", "phenom[ena]"]
          },
          {
            id: "r-upper-acad-1",
            type: "read_academic",
            instruction: "Upper Module: Read the academic passage and answer the questions.",
            passageTitle: "The Economic Evolution of Currency",
            passageText: `Before the establishment of standardized coinage, early commercial exchange relied upon commodity barter systems. However, barter inherent limitations—such as the double coincidence of wants—necessitated the emergence of representative token currencies. 

Fiat currency, backed by governmental mandate rather than physical bullion reserves, represents the zenith of monetary abstraction. Contemporary digital fiat transactions have further decoupled economic value from tangible specie.`,
            questions: [
              {
                id: "r-upper-acad-1-q1",
                questionText: "What main drawback of the barter system is identified in the text?",
                options: [
                  "A. High transportation tariffs",
                  "B. The double coincidence of wants",
                  "C. Excessive government regulations",
                  "D. Rapid devaluation of gold"
                ],
                correctAnswer: 1, // B
                explanation: "The text highlights 'the double coincidence of wants' as a major limitation of barter."
              }
            ]
          }
        ],
        lowerModule: [
          {
            id: "r-lower-cw-1",
            type: "complete_words",
            instruction: "Lower Module: Complete the missing word fragments.",
            passageText: "Many international stud___ choose to study abroad to improve their English language sk___ and learn about new cultures.",
            missingParts: ["ents", "ills"],
            hints: ["stud[ents]", "sk[ills]"]
          },
          {
            id: "r-lower-dl-1",
            type: "read_daily_life",
            instruction: "Read the schedule below and answer the question.",
            stimulusFormat: "Library Schedule",
            passageText: "Library Weekend Hours: Saturday 9:00 AM - 5:00 PM. Sunday 1:00 PM - 8:00 PM. Computer lab closes 30 minutes before building shutdown.",
            questions: [
              {
                id: "r-lower-dl-1-q1",
                questionText: "When does the library open on Sunday?",
                options: ["A. 9:00 AM", "B. 1:00 PM", "C. 5:00 PM", "D. 8:00 PM"],
                correctAnswer: 1,
                explanation: "The schedule lists Sunday hours as 1:00 PM - 8:00 PM."
              }
            ]
          }
        ]
      },

      // 🎧 LISTENING SECTION (Adaptive)
      listening: {
        title: "Listening Section",
        durationMinutes: 29,
        routerModule: [
          // A. Listen and Choose a Response
          {
            id: "l-resp-1",
            type: "listen_choose_response",
            instruction: "Listen to the spoken statement and select the most appropriate response.",
            audioText: "I'm sorry, Professor Miller. I won't be able to attend tomorrow's seminar because of a doctor's appointment.",
            options: [
              "A. The lecture was held two weeks ago.",
              "B. Thank you for notifying me. Please review the posted slides and email me your assignment.",
              "C. The library closes at 5:00 PM on weekdays.",
              "D. Biology is offered during the spring semester."
            ],
            correctAnswer: 1, // B
            explanation: "Choice B is the polite, appropriate professor response acknowledging the student's absence."
          },
          {
            id: "l-resp-2",
            type: "listen_choose_response",
            instruction: "Listen to the spoken question and choose the best response.",
            audioText: "Excuse me, do you know if the campus shuttle stops in front of the student center?",
            options: [
              "A. Yes, it arrives every fifteen minutes right at the main entrance.",
              "B. I prefer taking the train to the city.",
              "C. The center opened three years ago.",
              "D. Shuttles are painted blue and yellow."
            ],
            correctAnswer: 0, // A
            explanation: "Choice A directly answers the inquiry about shuttle stops and frequency."
          },
          // B. Listen to a Conversation
          {
            id: "l-conv-1",
            type: "listen_conversation",
            instruction: "Listen to the campus conversation between a student and an academic advisor, then answer the questions.",
            audioText: `Student: Hi, Mr. Davis. I'm trying to finalize my course schedule for next semester, but two of my required history courses overlap on Tuesdays.
Advisor: Let's take a look. History 201 is also offered as an evening lecture on Thursdays, which would clear your Tuesday conflict completely.
Student: Oh, that's great! Will that evening class fulfill my departmental core requirement?
Advisor: Yes, absolutely. It covers identical syllabus material with Professor Vance.`,
            questions: [
              {
                id: "l-conv-1-q1",
                questionText: "What problem does the student have at the beginning of the conversation?",
                options: [
                  "A. She failed her midterm history examination.",
                  "B. Two of her required history classes conflict in schedule.",
                  "C. She wants to change her major to English.",
                  "D. The evening lecture is completely full."
                ],
                correctAnswer: 1, // B
                explanation: "The student explicitly mentions that two required history courses overlap on Tuesdays."
              },
              {
                id: "l-conv-1-q2",
                questionText: "What solution does the academic advisor suggest?",
                options: [
                  "A. Taking an online course at another university",
                  "B. Enrolling in the Thursday evening section of History 201",
                  "C. Dropping the history core requirement entirely",
                  "D. Delaying graduation by one semester"
                ],
                correctAnswer: 1, // B
                explanation: "The advisor suggests taking History 201 on Thursday evening to eliminate the conflict."
              }
            ]
          },
          // C. Listen to an Academic Talk
          {
            id: "l-talk-1",
            type: "listen_academic_talk",
            instruction: "Listen to part of a lecture in an Environmental Science class.",
            audioText: `Professor: Good morning, class. Today we're examining urban heat islands—metropolitan areas that experience significantly higher temperatures than surrounding rural landscapes. 

This thermal disparity is caused by two primary factors: the abundance of heat-absorbing materials like asphalt and concrete, and the reduction of natural vegetation which normally cools the environment through evapotranspiration. 

To mitigate this effect, modern urban planners are implementing reflective cool roofs and expanded municipal green spaces.`,
            questions: [
              {
                id: "l-talk-1-q1",
                questionText: "What is the main topic of the lecture?",
                options: [
                  "A. Methods for measuring solar radiation in space",
                  "B. Causes and mitigation strategies for urban heat islands",
                  "C. The history of asphalt paving in modern cities",
                  "D. Agricultural techniques in rural landscapes"
                ],
                correctAnswer: 1, // B
                explanation: "The lecture focuses on urban heat island causes and mitigation."
              }
            ]
          }
        ],
        upperModule: [
          {
            id: "l-upper-talk-1",
            type: "listen_academic_talk",
            instruction: "Upper Module: Listen to an advanced lecture in Cognitive Psychology.",
            audioText: "Today we explore neuroplasticity—the brain's remarkable capacity to reorganize synaptic connections in response to experiential learning and neural injury...",
            questions: [
              {
                id: "l-upper-talk-1-q1",
                questionText: "What does the professor mean by neuroplasticity?",
                options: [
                  "A. The permanent decay of brain cells",
                  "B. The brain's ability to reorganize synaptic connections",
                  "C. Surgical replacement of skull tissue",
                  "D. Genetic inheritance of IQ scores"
                ],
                correctAnswer: 1,
                explanation: "Neuroplasticity is defined as the brain's capacity to reorganize synaptic connections."
              }
            ]
          }
        ],
        lowerModule: [
          {
            id: "l-lower-resp-1",
            type: "listen_choose_response",
            instruction: "Lower Module: Listen to the question and select the response.",
            audioText: "Where is the main computer lab located?",
            options: [
              "A. It is on the second floor of the technology building.",
              "B. I like using computers.",
              "C. Yesterday at 3 o'clock.",
              "D. The exam was difficult."
            ],
            correctAnswer: 0,
            explanation: "Choice A gives the correct physical location."
          }
        ]
      },

      // ✍️ WRITING SECTION (Linear - 12 items total: 10 Build Sentence, 1 Email, 1 Discussion)
      writing: {
        title: "Writing Section",
        durationMinutes: 23,
        totalItems: 12,
        buildSentenceItems: [
          {
            id: "w-bs-1",
            scrambledWords: ["library", "many", "students", "every day", "the", "use"],
            targetSentence: "Many students use the library every day.",
            difficulty: "A2"
          },
          {
            id: "w-bs-2",
            scrambledWords: ["must submit", "by Friday", "their assignments", "all candidates"],
            targetSentence: "All candidates must submit their assignments by Friday.",
            difficulty: "B1"
          },
          {
            id: "w-bs-3",
            scrambledWords: ["has expanded", "significantly", "its research facilities", "the university"],
            targetSentence: "The university has expanded its research facilities significantly.",
            difficulty: "B2"
          },
          {
            id: "w-bs-4",
            scrambledWords: ["carefully", "the professor", "explained", "the exam rules"],
            targetSentence: "The professor carefully explained the exam rules.",
            difficulty: "B1"
          },
          {
            id: "w-bs-5",
            scrambledWords: ["are required", "new international students", "to attend", "orientation"],
            targetSentence: "New international students are required to attend orientation.",
            difficulty: "B2"
          },
          {
            id: "w-bs-6",
            scrambledWords: ["online portal", "can access", "grades", "through the", "students"],
            targetSentence: "Students can access grades through the online portal.",
            difficulty: "B1"
          },
          {
            id: "w-bs-7",
            scrambledWords: ["recommends", "the advisor", "taking", "statistics", "this semester"],
            targetSentence: "The advisor recommends taking statistics this semester.",
            difficulty: "B2"
          },
          {
            id: "w-bs-8",
            scrambledWords: ["will reopen", "the campus cafeteria", "after renovation", "next month"],
            targetSentence: "The campus cafeteria will reopen after renovation next month.",
            difficulty: "B2"
          },
          {
            id: "w-bs-9",
            scrambledWords: ["provides", "useful feedback", "AI evaluation", "for essay writing"],
            targetSentence: "AI evaluation provides useful feedback for essay writing.",
            difficulty: "C1"
          },
          {
            id: "w-bs-10",
            scrambledWords: ["demonstrated", "the study", "a strong correlation", "between sleep and memory"],
            targetSentence: "The study demonstrated a strong correlation between sleep and memory.",
            difficulty: "C1"
          }
        ],
        emailTask: {
          id: "w-email-1",
          type: "write_email",
          instruction: "Write an email responding to the situation described below. Ensure your email is clear, polite, and well-organized.",
          scenario: `You missed a required laboratory session for your Chemistry 101 course due to an unexpected illness. 

Write an email to your professor, Dr. Aris:
1. Explain why you were absent.
2. Politely request permission to attend a makeup laboratory session.
3. Offer to provide a medical note if required.`,
          minWords: 50,
          suggestedMinutes: 7
        },
        discussionTask: {
          id: "w-disc-1",
          type: "academic_discussion",
          instruction: "Read the online discussion post below and write your contribution to the discussion. State your position clearly and support it with specific reasons and examples.",
          professorPrompt: `Professor Lin: This week we are discussing renewable energy policy. Some economists argue that governments should heavily subsidize solar and wind energy companies to accelerate the green transition. Others believe government subsidies distort free markets and that private industry innovation should drive energy development. What is your opinion?`,
          student1: `Sarah: I strongly support solar subsidies! Without government financial incentives, clean energy technologies cannot compete with established fossil fuel infrastructure quickly enough to combat climate change.`,
          student2: `Mark: I disagree. Subsidies often waste taxpayer money on inefficient companies. If green technology is genuinely superior, private venture capital and consumer demand will naturally fund its expansion.`,
          minWords: 80,
          suggestedMinutes: 10
        }
      },

      // 🎙️ SPEAKING SECTION (Linear - 11 tasks total: 7 Listen & Repeat, 4 Take an Interview)
      speaking: {
        title: "Speaking Section",
        durationMinutes: 8,
        totalTasks: 11,
        repeatTasks: [
          {
            id: "s-lr-1",
            audioText: "The campus library will extend its operating hours during final examination week.",
            recordWindowSec: 8,
            level: "B1"
          },
          {
            id: "s-lr-2",
            audioText: "Students must register for laboratory courses before the deadline on Friday.",
            recordWindowSec: 8,
            level: "B1"
          },
          {
            id: "s-lr-3",
            audioText: "Professor Aris posted the updated syllabus on the university online portal.",
            recordWindowSec: 8,
            level: "B2"
          },
          {
            id: "s-lr-4",
            audioText: "Academic advisors recommend balancing core requirements with elective seminars.",
            recordWindowSec: 10,
            level: "B2"
          },
          {
            id: "s-lr-5",
            audioText: "Environmental scientists have documented a direct correlation between deforestation and local rainfall patterns.",
            recordWindowSec: 12,
            level: "C1"
          },
          {
            id: "s-lr-6",
            audioText: "Interdisciplinary research projects foster innovative problem solving across traditional academic boundaries.",
            recordWindowSec: 12,
            level: "C1"
          },
          {
            id: "s-lr-7",
            audioText: "Technological advancements in artificial intelligence are fundamentally reshaping modern educational pedagogy.",
            recordWindowSec: 12,
            level: "C2"
          }
        ],
        interviewTasks: [
          {
            id: "s-int-1",
            questionText: "What is one essential skill that university students should develop before graduation, and why is it important?",
            recordWindowSec: 45,
            prepWindowSec: 15
          },
          {
            id: "s-int-2",
            questionText: "Do you prefer studying individually in a quiet room or working collaboratively in a group study seminar? Explain your preference.",
            recordWindowSec: 45,
            prepWindowSec: 15
          },
          {
            id: "s-int-3",
            questionText: "Describe a challenging academic project or assignment you completed in the past. How did you manage your time to finish it successfully?",
            recordWindowSec: 45,
            prepWindowSec: 15
          },
          {
            id: "s-int-4",
            questionText: "Some people believe that universities should make physical education and sports mandatory for all students. Do you agree or disagree with this view?",
            recordWindowSec: 45,
            prepWindowSec: 15
          }
        ]
      }
    }
  }
];
