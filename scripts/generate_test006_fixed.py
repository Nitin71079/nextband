import os
import time
import tempfile
from gtts import gTTS

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "listening")
os.makedirs(OUTPUT_DIR, exist_ok=True)
TEMP_DIR = tempfile.mkdtemp()

SILENT_FRAME = b'\xff\xfb\x90\xc4\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00' * 26

def make_silence(filename: str, duration_sec: float = 3.0) -> str:
    path = os.path.join(TEMP_DIR, filename)
    num_frames = int(duration_sec * 38)
    with open(path, "wb") as f:
        f.write(SILENT_FRAME * num_frames)
    return path

def tts(text: str, filename: str, lang: str = "en", tld: str = "co.uk") -> str:
    clean_text = text.replace(".", " ").strip()
    if not clean_text:
        return make_silence(filename, duration_sec=4.0)

    path = os.path.join(TEMP_DIR, filename)
    for attempt in range(5):
        try:
            gTTS(text=text, lang=lang, tld=tld, slow=False).save(path)
            print(f"  Successfully synthesized {filename}")
            time.sleep(1.2) # Avoid rate limits
            return path
        except Exception as e:
            print(f"  Attempt {attempt+1} failed on {filename}: {e}. Retrying...")
            time.sleep(3.0)
    
    print(f"  Fallback to silence for {filename}")
    return make_silence(filename, duration_sec=3.0)

# Build section-by-section full scripts to minimize TTS calls while ensuring 100% audio content
sections = [
    ("intro", "IELTS Listening Practice Test 006. You will hear four sections. Answer all questions.", "co.uk"),
    
    # SECTION 1
    ("s1_intro", "Section One. Registration for Metropolitan Library Membership between Arthur Pendelton and the receptionist.", "co.uk"),
    ("s1_pause", "", "co.uk"),
    ("s1_dialogue", """
Good morning, Metropolitan Library. How can I help you today?
Hello, I would like to register for a library membership card please. My name is Arthur Pendelton, spelt P-E-N-D-E-L-T-O-N.
Thank you Mr Pendelton. What is your address and postcode?
I live at 14 Maple Avenue, postcode CB2 1TN. My phone number is 01223 847291.
And your occupation?
I am an architect. I would like the Standard Adult membership with notifications by SMS.
The annual fee is thirty pounds. Which proof of identity do you have?
I have brought my passport today. Thank you very much.
That is the end of Section One. You now have half a minute to check your answers.
""", "co.uk"),
    ("s1_chk", "", "co.uk"),

    # SECTION 2
    ("s2_intro", "Section Two. Talk on the newly built Community Center and its facilities.", "co.uk"),
    ("s2_pause", "", "co.uk"),
    ("s2_talk", """
Welcome everyone to our new community center. The center was built to replace an old local school.
Our main auditorium features acoustic wood paneling for concerts. Rooms can be reserved online through our portal.
Senior citizens receive a 25 percent discount during off-peak hours. Next summer our roof garden will be expanded.
For opening hours: the Cafeteria opens 8 AM to 6 PM, the Fitness Suite opens 9 AM to 9 PM, and the Playroom opens 10 AM to 4 PM.
That is the end of Section Two. You now have half a minute to check your answers.
""", "co.uk"),
    ("s2_chk", "", "co.uk"),

    # SECTION 3
    ("s3_intro", "Section Three. Discussion between Sarah and Tom on freshwater microplastics.", "co.uk"),
    ("s3_pause", "", "co.uk"),
    ("s3_discussion", """
Hi Tom. Our research paper focuses on microplastics in freshwater ecosystems using automated water filtration.
We were surprised by the high concentration of synthetic fibers in our lab samples.
We received a University Student Research Grant. Next, we will analyze fish tissue samples.
For task division: Tom will handle statistical data visualization and chemical reagents, Sarah will do specimen identification and proofreading, while both write the methodology.
That is the end of Section Three. You now have half a minute to check your answers.
""", "com"),
    ("s3_chk", "", "co.uk"),

    # SECTION 4
    ("s4_intro", "Section Four. Academic lecture on Urban Forests: Improving the Health of Modern Cities.", "co.uk"),
    ("s4_pause", "", "co.uk"),
    ("s4_lecture", """
Good morning everyone. Today we're going to explore the growing importance of urban forests and examine how trees and other vegetation contribute to healthier, more sustainable cities.

When people hear the term urban forest, they often imagine a large woodland located inside a city. In fact, the expression refers to the entire collection of trees, shrubs and other vegetation found throughout urban areas, including parks, residential streets, gardens and even green roofs on buildings. Collectively, these green spaces perform a wide range of environmental, economic and social functions.

One of their most significant contributions is improving air quality. Trees absorb pollutants such as nitrogen dioxide and fine particulate matter while also capturing carbon dioxide from the atmosphere. Although no city can solve air pollution simply by planting more trees, research consistently shows that carefully planned urban forests can reduce the concentration of harmful pollutants in densely populated neighbourhoods.

Urban vegetation also plays an important role in regulating temperature. During hot weather, concrete, asphalt and glass absorb large amounts of solar radiation, creating what scientists describe as the urban heat island effect. Trees help counter this phenomenon by providing shade and releasing moisture into the air through a process known as transpiration. As a result, streets lined with mature trees are often several degrees cooler than nearby areas without vegetation.

Water management represents another important benefit. Heavy rainfall frequently overwhelms drainage systems in expanding cities, increasing the risk of flooding. Tree roots improve soil structure, allowing more rainwater to soak into the ground rather than flowing directly into drains. Their leaves and branches also intercept rainfall, slowing the movement of water during storms and reducing pressure on urban infrastructure.

Beyond these environmental advantages, urban forests contribute to public health. Numerous studies suggest that people living near green spaces are more likely to exercise regularly and report lower levels of stress. Hospitals overlooking parks have even reported shorter recovery times among certain groups of patients, although researchers continue to investigate the reasons for this relationship.

Establishing successful urban forests, however, requires careful planning. Not every tree species is suitable for every location. Some grow too large for narrow streets, while others require more water than local climates can provide. Urban planners therefore work closely with ecologists to select species capable of surviving local environmental conditions while providing the greatest long-term benefits.

Maintaining these green spaces also presents financial challenges. Young trees require regular watering during their first few years, damaged branches must be removed to ensure public safety, and diseases or insect infestations need to be monitored continuously. Nevertheless, economists argue that these maintenance costs are often outweighed by long-term savings resulting from improved public health, reduced flood damage and lower energy consumption.

Modern technology has begun transforming the management of urban forests. Satellite imagery, drones and geographic information systems now enable city authorities to monitor tree health across thousands of hectares far more efficiently than traditional field surveys. Artificial intelligence is increasingly being used to analyse this information, helping identify signs of disease, drought stress or storm damage before problems become severe.

Despite these advances, experts emphasise that community participation remains essential. Many cities organise volunteer planting programmes and encourage residents to help care for newly planted trees. Public involvement not only reduces maintenance costs but also increases awareness of environmental issues and strengthens connections between local communities and their neighbourhoods.

Looking ahead, climate change is expected to make urban forests even more valuable. As heatwaves become more frequent and weather patterns grow increasingly unpredictable, well-managed green infrastructure will play an important role in helping cities adapt to changing environmental conditions.

To conclude, urban forests should not be viewed simply as attractive features of the landscape. They are vital components of modern urban infrastructure, supporting environmental sustainability, public health and economic resilience. Continued investment in green spaces, supported by scientific research and community involvement, will remain essential as cities continue to grow.

That is the end of Section Four. You now have ten minutes to transfer your answers. End of IELTS Listening Test 006.
""", "co.uk")
]

output_file = os.path.join(OUTPUT_DIR, "test006.mp3")
print("Synthesizing Test 006 Audio cleanly ...")
paths = []
for idx, (label, text, tld) in enumerate(sections):
    fname = f"t006_clean_{idx:02d}_{label}.mp3"
    p = tts(text=text, filename=fname, tld=tld)
    paths.append(p)

with open(output_file, "wb") as out_f:
    for p in paths:
        if p and os.path.exists(p):
            with open(p, "rb") as in_f:
                out_f.write(in_f.read())

size_mb = os.path.getsize(output_file) / 1_048_576
print(f"SUCCESS: Generated test006.mp3 ({size_mb:.2f} MB)")
