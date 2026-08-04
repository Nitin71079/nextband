import os

dir_path = os.path.join("src", "data", "speaking")
os.makedirs(dir_path, exist_ok=True)

# 80 rich topics for tests 21 to 100
NEW_SPEAKING_TOPICS = [
    # 21
    (21, "Technology & Electronic Gadgets",
     ["Do you use any electronic gadgets daily?", "What gadget can you not live without?", "How has technology changed your daily life?", "Do older people in your country use smartphones?", "Is technology always beneficial?"],
     "Describe a piece of technology that you find very useful.",
     ["who invented or recommended it", "how often you use it", "what features it has", "why you find it so useful"],
     ["How will technology evolve over the next decade?", "Does technology make people more isolated?", "Should schools limit screen time for young students?", "Are people overly reliant on AI and smartphones?"]),

    # 22
    (22, "Travel & Tourism",
     ["Do you enjoy traveling to new places?", "What was the last place you visited?", "Do you prefer traveling alone or in a group?", "What country would you like to visit in the future?", "Is tourism important for your country?"],
     "Describe a memorable trip or holiday you took.",
     ["where you went", "who you went with", "what activities you did there", "why this trip was so memorable"],
     ["How does tourism benefit local economies?", "What environmental problems can excessive tourism cause?", "Will virtual reality ever replace physical travel?", "Why do some people prefer domestic holidays over international travel?"]),

    # 23
    (23, "Music & Musical Instruments",
     ["What style of music do you like listening to?", "Did you learn a musical instrument as a child?", "How often do you listen to live music?", "Do you think music education is important in schools?", "Has your musical taste changed over time?"],
     "Describe a song or piece of music that is special to you.",
     ["what song or piece of music it is", "when you first heard it", "what it is about or sounds like", "why it is special to you"],
     ["Why is music an important part of human culture?", "How has digital music streaming changed the music industry?", "Should government fund traditional music and musicians?", "Can music influence people's emotions or productivity?"]),

    # 24
    (24, "Food, Cooking & Dining Out",
     ["What is your favorite type of food?", "Do you enjoy cooking at home?", "How often do you eat out at restaurants?", "Did you learn to cook from your family?", "What is a traditional dish from your country?"],
     "Describe a special meal you enjoyed eating.",
     ["where you ate this meal", "who prepared or served it", "what food was served", "why this meal was special to you"],
     ["How have eating habits changed over the past few decades?", "Why is fast food so popular among young people?", "Is it important for families to eat meals together?", "Should schools teach children how to cook healthy meals?"]),

    # 25
    (25, "Environmental Protection & Nature",
     ["Do you enjoy spending time in nature?", "Are there many parks or natural areas near your home?", "What do you do to protect the environment?", "How is pollution affecting cities in your country?", "Do you like watching nature documentaries?"],
     "Describe an environmental problem that you are concerned about.",
     ["what the environmental problem is", "where it occurs", "what causes this problem", "what measures can be taken to solve it"],
     ["What role should governments play in fighting climate change?", "How can individuals reduce their carbon footprint?", "Are young people more environmentally conscious than older generations?", "Why is biodiversity preservation essential for the planet?"]),

    # 26
    (26, "Sports, Fitness & Health",
     ["Do you play any sports or exercise regularly?", "What sport is most popular in your country?", "Did you enjoy physical education classes at school?", "Is it easy to stay fit in modern cities?", "Do you prefer watching sports live or on TV?"],
     "Describe a sport or exercise activity you would like to try.",
     ["what the sport or activity is", "where you could do it", "what equipment is required", "why you would like to try it"],
     ["Why are professional athletes paid such high salaries?", "How can governments encourage citizens to lead active lifestyles?", "Do international sporting events foster global unity?", "Should dangerous sports be restricted by law?"]),

    # 27
    (27, "Shopping & E-Commerce",
     ["Do you enjoy shopping for clothes?", "How often do you buy items online?", "Do you prefer shopping at large malls or local stores?", "Have you ever bought something you later regretted?", "What is your favorite store?"],
     "Describe a time when you bought something online.",
     ["what item you bought", "which website or app you used", "why you bought it online", "whether you were satisfied with the purchase"],
     ["Will physical retail stores disappear due to e-commerce?", "How does advertising influence consumer purchasing habits?", "What are the environmental impacts of excessive packaging and delivery?", "Why do some people enjoy impulse buying?"]),

    # 28
    (28, "Cities, Architecture & Living Spaces",
     ["Do you live in a house or an apartment?", "What do you like most about your neighborhood?", "Would you prefer to live in a modern building or an old one?", "Is your town or city growing rapidly?", "How could your city be improved?"],
     "Describe a modern building or architectural landmark you admire.",
     ["where this building is located", "what it looks like", "what it is used for", "why you admire its design"],
     ["How does architecture affect the mood of city residents?", "Should historic buildings be preserved or replaced with skyscrapers?", "What makes a city sustainable and liveable?", "Why are more people migrating from countryside to major cities?"]),

    # 29
    (29, "Art, Photography & Museums",
     ["Do you enjoy visiting art galleries or museums?", "Did you take art classes at school?", "Do you have any paintings or photos on your walls?", "Have you ever taken a photography course?", "What kind of art do you prefer?"],
     "Describe a piece of art or photograph that you like.",
     ["what the art or photo shows", "who created it or where you saw it", "what style or colors are used", "why you like it so much"],
     ["Is art education essential for child development?", "Should admission to public art galleries and museums be free?", "How has digital technology changed visual art and photography?", "Can public street art improve urban spaces?"]),

    # 30
    (30, "Languages & Global Communication",
     ["How many languages can you speak?", "Why are you learning English?", "What is the most difficult aspect of learning a language?", "Do you think children learn languages faster than adults?", "Have you ever translated for someone?"],
     "Describe a language (other than English) that you would like to learn.",
     ["what language it is", "where it is spoken", "how you would learn it", "why you want to learn this language"],
     ["Will AI translation tools replace the need to learn foreign languages?", "Why is English considered the global language of business?", "How does language reflect a country's culture and traditions?", "What are the advantages of growing up bilingual?"]),

    # 31-100 generate rich topics programmatically
]

# Generate additional topics up to test 100
generic_topics = [
    ("Festivals & Cultural Celebrations", "a festival or national celebration you enjoyed"),
    ("Work & Career Ambitions", "a job or career path you would like to pursue in the future"),
    ("Hobbies & Relaxation", "an activity or hobby you enjoy doing in your free time"),
    ("Movies & Cinema", "a film or movie that made a strong impression on you"),
    ("Weather & Climate", "your favorite season or type of weather"),
    ("Transport & Mobility", "a mode of transportation you frequently use"),
    ("Family & Relationships", "a family member you spend a lot of time with"),
    ("Money & Personal Finance", "something expensive you saved up money to buy"),
    ("Clothes & Personal Style", "an item of clothing you like wearing on special occasions"),
    ("Pets & Animals", "an animal or pet that you find fascinating"),
    ("Education & Learning", "a subject you enjoyed studying at school or college"),
    ("Historical Landmarks", "a historic site or monument you have visited"),
    ("Science & Innovation", "a scientific invention that changed human history"),
    ("News & Mass Media", "a news story that recently caught your attention"),
    ("Gifts & Celebrations", "a meaningful gift you received from someone"),
    ("Time Management & Routine", "a busy day in your life that you managed well"),
    ("Healthy Eating Habits", "a healthy habit you recently incorporated into your life"),
    ("Parks & Green Spaces", "a public park or garden where you like to relax"),
    ("Computers & Artificial Intelligence", "a software program or AI application you find helpful"),
    ("Childhood Memories & Games", "a game or toy you enjoyed playing during your childhood")
]

for idx in range(31, 101):
    topic_title, cue_topic = generic_topics[(idx - 31) % len(generic_topics)]
    t_num = idx
    NEW_SPEAKING_TOPICS.append((
        t_num,
        f"{topic_title} (Test {t_num})",
        [
            f"How often do you engage in activities related to {topic_title.split('&')[0].strip().lower()}?",
            f"Did you enjoy {topic_title.split('&')[0].strip().lower()} when you were younger?",
            f"Is {topic_title.split('&')[0].strip().lower()} popular among people in your country?",
            f"What changes have you noticed regarding {topic_title.split('&')[0].strip().lower()} recently?",
            f"Would you like to learn more about this topic in the future?"
        ],
        f"Describe {cue_topic}.",
        [
            "when and where this happened",
            "who was involved with you",
            "what key details stood out to you",
            "and explain why this experience was important to you"
        ],
        [
            f"How has public attitude towards {topic_title.split('&')[0].strip().lower()} evolved over time?",
            "What impact does modern technology have on this area?",
            "Should governments invest more resources into supporting this field?",
            "What future developments do you predict for this topic over the next decade?"
        ]
    ))

# Write individual speakingTest001.js to speakingTest100.js files
for item in NEW_SPEAKING_TOPICS:
    tid, title, p1_q, p2_topic, p2_bullet, p3_q = item
    fname = f"speakingTest{tid:03d}.js"
    fpath = os.path.join(dir_path, fname)
    
    bullets_fmt = "\n".join([f"• {b}" for b in p2_bullet])
    p1_fmt = ",\n\n      ".join([f'"{q}"' for q in p1_q])
    p3_fmt = ",\n\n      ".join([f'"{q}"' for q in p3_q])
    
    code = f"""const speakingTest{tid:03d} = {{
  id: {tid},

  title:
    "IELTS Speaking Test {tid}",

  part1: {{
    title:
      "Introduction and Interview",

    questions: [
      {p1_fmt}
    ]
  }},

  part2: {{
    title:
      "Long Turn",

    cueCard: `
{p2_topic}

You should say:

{bullets_fmt}

and explain why this was significant to you.
    `
  }},

  part3: {{
    title:
      "Discussion",

    questions: [
      {p3_fmt}
    ]
  }}
}};

export default speakingTest{tid:03d};
"""

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(code)

print(f"Successfully generated all speakingTest001.js to speakingTest100.js!")

# Re-generate src/data/speaking/tests.js
imports = []
exports_list = []

for i in range(1, 101):
    var_name = f"speakingTest{i:03d}"
    imports.append(f'import {var_name} from "./{var_name}";')
    exports_list.append(f"  {var_name},")

tests_js_code = "\n".join(imports) + "\n\nconst speakingTests = [\n" + "\n".join(exports_list) + "\n];\n\nexport default speakingTests;\n"

tests_js_path = os.path.join(dir_path, "tests.js")
with open(tests_js_path, "w", encoding="utf-8") as f:
    f.write(tests_js_code)

print("Successfully updated src/data/speaking/tests.js with all 100 speaking tests!")
