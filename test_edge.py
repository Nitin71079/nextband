import asyncio
import edge_tts

async def main():
    text = "Welcome to the IELTS Listening Practice Test. First, you have some time to look at questions 1 to 5."
    communicate = edge_tts.Communicate(text, "en-GB-RyanNeural")
    await communicate.save("test_out.mp3")
    print("Successfully generated British accent audio file test_out.mp3!")

if __name__ == "__main__":
    asyncio.run(main())
