import asyncio
import os
import edge_tts

OUTPUT_FILE = os.path.join("public", "audio", "listening", "test007.mp3")

full_script_sec1 = """
IELTS Listening Practice Test 007. Section 1. You will hear a conversation between David Miller and a car rental agent at Apex Vehicle Rentals. First, you have some time to look at Questions 1 to 5.
<break time="10s"/><break time="10s"/><break time="10s"/>
Now listen carefully and answer questions 1 to 5.

Good morning, Apex Vehicle Rentals. My name is Sarah. How can I help you today?
Hello Sarah. I’d like to hire a car for a family vacation to the Lake District next week. We're planning to drive up from London.
Certainly! I'd be happy to set up a booking for you. May I take your full name first?
Yes, certainly. It’s David Miller.
Thank you, Mr. Miller. And could I get a primary contact telephone number for the reservation?
Sure, my mobile number is 0 7 7 0 0, 9 0 0 3 4 2.
Got that: 07700 900342. Perfect. Now, what type of vehicle were you hoping to rent? We have compact hatchbacks, sedans, SUVs, and large minivans.
Well, there are four of us going—two adults and two children—plus quite a bit of luggage for the week. So a standard sedan might be a bit tight. I think an S U V would be ideal for the mountain roads.
An S U V is a great choice for the Lake District terrain. We have a comfortable 5-seater premium S U V available. What dates will you need the vehicle for?
We'd like to pick it up on the morning of the 15th of August, and we'll return it on the afternoon of the 22nd of August.
Great, so that's a full seven-day rental from the 15th of August to the 22nd of August.

Before you hear the rest of the conversation, you have some time to look at Questions 6 to 10.
<break time="10s"/><break time="10s"/><break time="10s"/>
Now listen and answer questions 6 to 10.

Now, Mr. Miller, will anyone else be driving the car during the trip, or will you be the sole driver?
My wife will also be sharing the driving duties on the long motorway stretches, so I'd like to add my wife as an additional driver, please.
No problem at all. We'll just need to see her driving license when you come to collect the keys. Are there any optional extras you would like to include? For instance, satellite navigation, roof racks, or child seats?
We have navigation on our phones, but we will definitely need a child seat for our youngest daughter.
I've added one safety child seat to your booking. Now let's discuss insurance coverage. Our standard rental includes basic third-party liability, but we also offer standard collision waiver and premium full-cover insurance.
What does the premium cover include?
The premium tier covers windshields, tires, and underbody damage, and it significantly lowers your excess liability if anything happens.
That sounds worthwhile. We'd prefer the premium tier for full peace of mind.
Excellent choice. With the premium insurance tier, your maximum excess liability amount payable in case of an accident is reduced to just 150 pounds.
That's very reasonable. And how do I confirm the booking today?
We just require a small deposit payment today to hold the vehicle. How would you like to pay?
I'll pay the deposit by credit card, please.
Perfect. I'll process that credit card payment now and send the confirmation email to you right away.

That is the end of Section 1. You now have half a minute to check your answers.
<break time="10s"/><break time="10s"/><break time="10s"/>
"""

async def main():
    print("Testing single-stream synthesis for Test 007 Section 1...")
    communicate = edge_tts.Communicate(full_script_sec1, "en-GB-ThomasNeural")
    await communicate.save(OUTPUT_FILE)
    print(f"File saved to {OUTPUT_FILE}, size: {os.path.getsize(OUTPUT_FILE)} bytes")

if __name__ == "__main__":
    asyncio.run(main())
