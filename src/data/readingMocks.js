export const readingMocks = [
  {
    id: 1,

    title: "IELTS Academic Reading Test 1",

    duration: "60 Minutes",

    sections: [
      {
        title: "Passage 1",

        passage: `
Urban agriculture has become increasingly important in modern city planning as populations continue growing rapidly across metropolitan regions worldwide. Researchers and environmental planners have explored multiple strategies to improve sustainable food production while reducing transportation costs and carbon emissions associated with traditional agricultural supply chains.

One approach receiving considerable attention is vertical farming. Vertical farms are agricultural systems that grow crops indoors using stacked layers, hydroponic systems, and carefully controlled environmental conditions. Supporters argue these systems significantly improve land efficiency because large quantities of produce can be cultivated in relatively small urban spaces.

Another advantage often associated with vertical farming involves water conservation. Traditional farming methods frequently require extensive irrigation, especially in regions vulnerable to drought and changing climate conditions. In contrast, many hydroponic systems recycle water continuously, dramatically reducing waste. Some studies suggest vertical farms may consume up to 90 percent less water compared to conventional agriculture.

Despite these advantages, critics argue that vertical farming still faces substantial economic and technological barriers. Maintaining artificial lighting systems, temperature control mechanisms, and automated monitoring equipment requires considerable energy consumption. As electricity prices fluctuate, the long-term economic viability of large-scale vertical farming remains uncertain in some regions.

Nevertheless, governments and private investors continue funding research projects related to urban food sustainability. Universities, technology companies, and agricultural scientists are collaborating to develop more energy-efficient systems capable of supporting future population growth while minimizing environmental damage.
        `,

        questions: [
          {
            type: "multiple-choice",

            question:
              "Why has urban agriculture become increasingly important?",

            options: [
              "To increase transportation costs",
              "To improve sustainable food production",
              "To eliminate rural farming",
              "To reduce internet usage"
            ],

            answer:
              "To improve sustainable food production"
          },

          {
            type:
              "true-false-not-given",

            question:
              "Vertical farms always generate higher profits than traditional farms.",

            options: [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ],

            answer:
              "NOT GIVEN"
          },

          {
            type:
              "sentence-completion",

            question:
              "Hydroponic systems help reduce _____ waste.",

            answer:
              "water"
          },

          {
            type:
              "sentence-completion",

            question:
              "Artificial lighting systems require large amounts of _____.",

            answer:
              "energy"
          }
        ]
      },

      {
        title: "Passage 2",

        passage: `
Artificial intelligence has increasingly transformed healthcare systems across the world during the past decade. Medical institutions are investing heavily in machine learning technologies capable of assisting physicians in diagnosis, treatment planning, and patient monitoring. Researchers believe AI systems may eventually improve healthcare accessibility and reduce administrative inefficiencies.

One major application of artificial intelligence involves medical imaging analysis. Algorithms trained using vast datasets can identify patterns in X-rays, MRI scans, and CT images that may be difficult for human specialists to detect quickly. In some cases, AI-assisted systems have demonstrated diagnostic accuracy comparable to experienced radiologists.

However, ethical concerns continue emerging regarding widespread implementation of automated healthcare technologies. Critics argue excessive dependence on algorithms may reduce human oversight and potentially create accountability challenges when medical errors occur. Questions surrounding patient privacy and data security additionally remain central topics in ongoing regulatory discussions.

Despite these concerns, governments and healthcare organizations continue supporting AI integration because of its potential to reduce operational costs and improve efficiency. Automated systems can process administrative paperwork, schedule appointments, and assist with patient communication, allowing healthcare professionals to dedicate more time to direct patient care.

Researchers emphasize artificial intelligence should complement rather than replace medical professionals. Most experts believe successful healthcare systems will combine advanced technology with human expertise to achieve optimal patient outcomes in the future.
        `,

        questions: [
          {
            type: "multiple-choice",

            question:
              "What is one major application of AI in healthcare?",

            options: [
              "Agricultural forecasting",
              "Medical imaging analysis",
              "Tourism planning",
              "Traffic management"
            ],

            answer:
              "Medical imaging analysis"
          },

          {
            type:
              "true-false-not-given",

            question:
              "AI systems have completely replaced radiologists in hospitals.",

            options: [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ],

            answer:
              "FALSE"
          },

          {
            type:
              "sentence-completion",

            question:
              "Critics worry that excessive dependence on algorithms may reduce human _____.",

            answer:
              "oversight"
          },

          {
            type:
              "sentence-completion",

            question:
              "Automated systems help reduce operational _____.",

            answer:
              "costs"
          }
        ]
      },

      {
        title: "Passage 3",

        passage: `
Modern neuroscience research has provided increasing evidence regarding the importance of sleep in cognitive performance, emotional regulation, and long-term memory formation. Scientists have investigated how various stages of sleep contribute to neurological processes essential for learning and psychological well-being.

Sleep consists of multiple cycles, including rapid eye movement (REM) sleep and non-REM sleep. During these stages, the brain performs numerous restorative functions. Researchers believe memory consolidation occurs when neural connections formed during waking hours are strengthened and organized while individuals sleep.

Several experiments conducted over recent decades have demonstrated the negative consequences of sleep deprivation. Participants experiencing insufficient sleep frequently display reduced concentration, impaired decision-making ability, slower reaction times, and increased emotional instability. Chronic sleep deprivation has additionally been associated with elevated risks of cardiovascular disease, obesity, and weakened immune system function.

Interestingly, researchers have also explored the relationship between sleep and creativity. Some studies indicate adequate sleep may improve problem-solving capabilities by allowing the brain to process information more effectively. Certain neurological theories suggest dreaming itself may contribute to creative insight and emotional processing.

Nevertheless, modern lifestyles increasingly interfere with healthy sleep patterns. Excessive screen exposure, irregular work schedules, and heightened stress levels have contributed to widespread sleep-related difficulties across many societies. Public health organizations therefore continue emphasizing the importance of maintaining consistent sleep routines to support both mental and physical health.
        `,

        questions: [
          {
            type: "multiple-choice",

            question:
              "What happens during memory consolidation?",

            options: [
              "Neural connections weaken",
              "Neural connections strengthen",
              "Brain activity stops",
              "Stress disappears"
            ],

            answer:
              "Neural connections strengthen"
          },

          {
            type:
              "true-false-not-given",

            question:
              "Sleep deprivation improves emotional stability.",

            options: [
              "TRUE",
              "FALSE",
              "NOT GIVEN"
            ],

            answer:
              "FALSE"
          },

          {
            type:
              "sentence-completion",

            question:
              "Chronic sleep deprivation has been linked to cardiovascular _____.",

            answer:
              "disease"
          },

          {
            type:
              "sentence-completion",

            question:
              "Excessive _____ exposure contributes to sleep difficulties.",

            answer:
              "screen"
          }
        ]
      }
    ]
  }
];