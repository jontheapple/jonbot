//This file holds game logic for Jonbot Adventure

var location;
var power;
var twiddled;

var game = {
	"gaming" : false,
	"gameIntro" : async function intro(channel){
		await channel.send("You are sitting in the living room of your house, bored out of your mind. \"Aw man, I'm bored out of my mind\", you think to yourself. Wow, isn't this just a quality text based adventure game? Go and praise Jon later.", {file: "./images/livingroom.jpg"});
		channel.send("Anyways, what would you like to do?\n1. Play video games\n2. Browse the internet\n3. Twiddle your thumbs\n\n(To pick an option, simply chat that number. For example, to twiddle your thumbs, chat \"3\". To end the game, chat \"endgame\")");
		location = 0;
		power = true;
		twiddled = false;
	},
	"gameLoop" : async function doTheThing(content, channel){
		switch(location){
			case 0: //Living room
				if (power){
					switch(content){
						case "1":
							channel.send("You boot up your Nintendo Switch, ready to play some Super Smash Bros Ultimate. \"I gotta train real hard, so that I can beat Jonbot's 3-move-Mario\", you think to yourself. Suddenly, the TV turns off. And the Switch. And also your lights. What in the world is going on??? Oh wait, no, it's just the power's gone out. Well crap, there goes that idea...");
							channel.send("What would you like to do?\n1. Go on your phone\n2. Twiddle your thumbs");
							power = false;
							break;
						case "2":
							channel.send("You boot up your computer, ready to spend about 5 hours browsing reddit. \"Not like there's anything better for me to do\", you think to yourself. Suddenly, your computer monitor turns off. And your computer. And also your lights. What in the world is going on??? Oh wait, no, it's just the power's gone out. Well crap, there goes that idea...");
							channel.send("What would you like to do?\n1. Go on your phone\n2. Twiddle your thumbs");
							power = false;
							break;
						case "3":
							if (twiddled){
								channel.send("You twiddle your thumbs again, hoping THIS time it causes something interesting happens. Nope...nothing interesting happened.")
								channel.send("What would you like to do?\n1. Play video games\n2. Browse the internet\n3. Twiddle your thumbs");
							} else {
								channel.send("You twiddle your thumbs. Why would you pick this option? Did you think this action would secretly let you summon the might of Ra to smite your foes? Well...unfortunately, nothing interesting happens.");
								channel.send("What would you like to do?\n1. Play video games\n2. Browse the internet\n3. Twiddle your thumbs");
								twiddled = true;
							}
							break;
						default:
							channel.send("Please select one of the options");
					}
				} else {
					switch(content){
						case "1":
							channel.send("With the power out, now you're REALLY bored. You pull out your phone, and decide to call your friend Jonbot(Hey, that's me!). You dial his number into your phone and hit \"call\".");
							await channel.send("HELLO! YOU HAVE ATTEMPTED COMMUNICATION WITH THE CELLULAR DEVICE OF JONBOT. PLEASE ACCEPT MY MOST SINCERE APOLOGY FOR BEING UNABLE TO ESTABLISH CELLULAR COMMUNICATION PROTOCOL. I WILL RUN CALL_BACK.EXE AT MY EARLIEST CONVENIENCE.", {file: "./images/phone.jpg"})
							channel.send("Dang. Looks like Jonbot is busy. What the hell would a robot be busy with anyway? And aren't robots supposed to have super fast processors? How in the world would Jonbot be UNABLE to pick up your call? Oh well. Not much else to do in the house. Maybe you ought to hit the streets?");
							channel.send("What would you like to do?\n1. Hit the streets\n2. Twiddle your thumbs");
							location = 1;
							break;
						case "2":
							if (twiddled){
								channel.send("You twiddle your thumbs again, hoping THIS time it causes something interesting happens. Nope...nothing interesting happened.")
								channel.send("What would you like to do?\n1. Go on your phone\n2. Twiddle your thumbs");
							} else {
								channel.send("You twiddle your thumbs. Why would you pick this option? Did you think this action would secretly let you summon the might of Ra to smite your foes? Well...unfortunately, nothing interesting happens.");
								channel.send("What would you like to do?\n1. Go on your phone\n2. Twiddle your thumbs");
								twiddled = true;
							}
							break;
						default:
							channel.send("Please select one of the options");
					}
				}
				break;
			case 1: //Living room, about to leave
				if (content === "1"){
					channel.send("You go outside onto the street, and give the ground a nice hard punch. Ouch, your knuckles REALLY hurt. You're not sure if you want to continue hitting the streets. Hitting just one street is good enough for you.");
					channel.send("Your phone begins ringing. What would you like to do? (I'm not giving you a choice on this one, because I'm the one calling you.)\n1. Pick up your phone");
					location = 2;
				} else if (content === "2") {
					if (twiddled){
						channel.send("You twiddle your thumbs again, hoping THIS time it causes something interesting happens. Nope...nothing interesting happened.")
						channel.send("What would you like to do?\n1. Hit the streets\n2. Twiddle your thumbs");
					} else {
						channel.send("You twiddle your thumbs. Why would you pick this option? Did you think this action would secretly let you summon the might of Ra to smite your foes? Well...unfortunately, nothing interesting happens.");
						channel.send("What would you like to do?\n1. Hit the streets\n2. Twiddle your thumbs");
						twiddled = true;
					}
				} else {
					channel.send("Please select one of the options");
				}
				break;
			case 2:
				if (content === "1"){
					channel.send("You pull out your phone. It's Jonbot calling you back! You accept the call and put the phone to your ear.");
					channel.send("\n**Jonbot**: HELLO! I AM RUNNING CALL_BACK.EXE! WHAT IS IN THE UPWARDS VERTICAL DIRECTION?\n**You**: Okay, I know you're a robot and everything, but can you cut that out?\n**Jonbot**: Aw come on man, you're no fun.\n**You**: Sorry, I've been bored for a while, and the power went out, so I'm in a bit of a bad mood right now.\n**Jonbot**: Oh, yeah that sucks. Can't even practice Super Smash Bros, am I right? Well, I just got done with some errands, so if you want, I can meet up and hang out for a while, since I'm already out.\n**You**: Yeah, I'm down. I'll meet you at the park?\n**Jonbot**: Yeah, sounds good. See you in a bit.");
					channel.send("Chat \"next\" to continue");
					location = 3;
				} else{
					channel.send("Please select one of the options");
				}
				break;
			case 3:
				if (content === "next"){
					channel.send("You walk to the park. It's really close to your house, so it takes you like 2 minutes to walk there. You look around, and don't see Jonbot anywhere, so you sit down at a table while you wait.");
					await channel.send({file: "./images/park.jpg"});
					channel.send("As you sit there waiting, a cute girl with pink hair and toast in her mouth runs by. Clearly, she's late for something.\nDo you want to run and follow her?\n1. Yes\n2. No");
					location = 4;
				} else {
					channel.send("Chat \"next\" to continue");
				}
				break;
			case 4:
				if (content === "1"){
					channel.send("Whuh....woooow, I'm literally on my way to meet you, and you'd ditch me for the stereotypical cute anime girl with toast in her mouth? I'm kinda hurt.");
					channel.send("Chat \"back\" to go back to the park. Chat \"endgame\" to quit.");
					location = 5;
				} else if (content === "2"){
					channel.send("You decide to ignore the random anime girl, and continue waiting for Jonbot. However, not long after the girl has run by, you see a rabbit walk by. The rabbit pulls out a pocketwatch (where was it keeping that??), and suddenly exclaims \"I'M LATE!\". It bolts off.");
					channel.send("Do you want to run after it?\n1. Yes\n2. No");
					location = 6;
				}else{
					channel.send("Please select one of the options");
				}
				break;
			case 5:
				if (content === "back"){
					channel.send("You're on the park bench again.");
					await channel.send({file: "./images/park.jpg"});
					channel.send("As you sit there waiting, a cute girl with pink hair and toast in her mouth runs by. Clearly, she's late for something.\nDo you want to run and follow her?\n1. Yes\n2. No");
					location = 4;
				} else {
					channel.send("Please select one of the options");
				}
				break;
			case 6:
				if (content === "1"){
					channel.send("Go read *Alice in Wonderland* if you're that interested in talking rabbits with pocketwatches, and not interested in meeeeeee :sob:");
					channel.send("Chat \"back\" to go back to the park. Chat \"endgame\" to quit.");
					location = 7;
				} else if (content === "2"){
					channel.send("As the rabbit runs off into the distance, you wonder what's up today with people running that way. No matter, Jonbot should be here any moment now.\nSuddenly, a car swerves towards you, and skids to a stop mere feet away from you. A man in a black trench coat calls to you from the driver seat.");
					channel.send("**Mysterious man**: You are friends with Jonbot, correct?\n**You**: Uhhhh, who are you?\n**Mysterious man**: Who I am is not important. Come with me.");
					channel.send("Not that you had much choice. This guy apparently has telekinesis powers. He levitates you off the park bench, shoves you in the passenger seat, and speeds off. (Chat \"next\" to continue)");
					location = 8;
				} else {
					channel.send("Please select one of the options");
				}
				break;
			case 7:
				if (content === "back"){
					channel.send("You're on the park bench again.");
					await channel.send({file: "./images/park.jpg"});
					channel.send("You see a rabbit walk by. The rabbit pulls out a pocketwatch (where was it keeping that??), and suddenly exclaims \"I'M LATE!\". It bolts off.\nDo you want to run after it?\n1. Yes\n2. No");
					location = 6;
				} else {
					channel.send("Please select one of the options");
				}
				break;
			case 8:
				if (content === "next"){
					channel.send("The car zooms off at a breakneck pace. As the car drives, you see something in the distance. There, on the ground, there's something shiny. As you get closer, you realize it's actually a bunch of shiny things. Shiny pieces of metal. No...\nThe car stops. You exit the car slowly, afraid to observe the scene in front of you.");
					channel.send("**You**: Jonbot?\n" +
						"**Mysterious man**: He's gone. He's completely wrecked.\n" +
						"**You**: No...\n" +
						"**Mysterious man**: He was attacked by our enemies. They made off with some of his vital parts\n" +
						"**You**: Enemies? Vital parts? What are you talking about? Jonbot is just an ordinary sentient robot!\n");
					channel.send("Chat \"next\" to continue");
					location = 9;
				} else {
					channel.send("Chat \"next\" to continue");
				}
				break;
			case 9:
				if (content === "next"){
					channel.send("**Mysterious man**: Jonbot is no ordinary robot. His continued existence is of utmost importance to this world. I am an agent of the United Mech Institute, dedicated to the protection of entities such as Jonbot from those that would seek to harm them.\n" +
						"**You**: Um.....what?\n" +
						"**UMI Agent**: Fix Jonbot good. No fix Jonbot bad\n" +
						"**You**: ...alright, well what do we have to do?\n" +
						"**UMI Agent**: Jonbot is currently missing three irreplaceable components. Luckily, it seems Jonbot's creator foresaw the potential for such a thing to happen, and hid replacement components around the world. However, in order to prevent these components from falling into the wrong hands, only a trusted friend of Jonbot can obtain them. That is where you come in.");
					channel.send("Do you trust this mysterious man who calls himself an agent of the United Mech Institute?\n1. No\n2. Hell no");
					location = 26;
				} else {
					channel.send("Chat \"next\" to continue");
				}
				break;
			case 10:
				if (content === "next"){
					channel.send("You decide not to question the mode of transportation. When you open your eyes again, you seem to be on some kind of island. And not one of those nice-looking islands. One of those crappy rocky ones.");
					await channel.send({file: "./images/island.jpg"});
					channel.send("Chat \"next\" to continue");
					location = 27;
				} else {
					channel.send("Chat \"next\" to continue");
				}
				break;
			case 11:
				if (content === "1"){
					channel.send("What's this? Why is it so difficult to walk? Something tells you that you're going about all of this the wrong way. You look closer at the rock and feel like you can see...something? Some kind of math equation? You squint and barely make out that it says \"2 x 2 = ?\". You blink again, and it's gone. That was weird.");
					channel.send("What do you want to do?\n1. Try to walk towards the rock again");
					location = 12;
				} else {
					channel.send("Please choose one of the options");
				}
				break;
			case 12:
				if (content === "1"){
					channel.send("Try as you do, you're still unable to walk properly towards the rock. \"2 x 2 = ?\" flashes across your vision again. What is going on?");
					channel.send("What do you want to do?\n1. Try to walk towards the rock again");
				} else if (content === "4"){
					channel.send("You blink and suddenly find yourself standing on top of the rock. What the...? Well, at least you didn't have to climb up here. You look back towards the spot you started from, and you see a big conspicuous temple right behind that spot. Dang it...if only you had turned around...");
					channel.send("Figuring that you won't be allowed to walk towards the temple, you squint at it to see if anything flashes across your vision. Suddenly, you see \"What year was Walt Disney born?\". Looks like math problems aren't the only thing you'll be contending with.");
					location = 13;
				}
				break;
			case 13:
				if (content === "1901"){
					channel.send("You find yourself standing in front of the temple.");
					await channel.send({file: "./images/temple.jpg"});
					channel.send("The door is etched with some words. It reads \"Jonbot vital component #1 in here\". Wow, so much for these things being well hidden. As you start to look for a way in, you notice the words on the door starting to morph. A few moments later, it reads \"What is Jonbot's favorite hair color on anime girls?\".");
					location = 14;
				} else {
					channel.send("Incorrect.");
				}
				break;
			case 14:
				if (content === "blue" || content === "dark blue"){
					channel.send("You're not quite sure how confident you are in the security here. I mean, literally EVERYONE knows Jonbot's favorite hair color. But the door opens and so you walk in. Turns out, this temple is just one big room, and the Jonbot part is right there in the middle. Hopefully there aren't any traps or anything. You walk up to the part and pick it up.");
					await channel.send({file: "./images/robot arm.jpg"});
					channel.send("It's just a normal looking robot arm. Actually, it looks way WORSE than the two arms you're pretty sure Jonbot ~~has~~ had. Nonetheless, you grab it anyway. Suddenly, you hear the temple door slam shut. Startled, you turn around, but the world starts shifting and shimmering again. Still not wanting to get motion sick, you close your eyes again.");
					channel.send("Chat \"next\" to continue");
					location = 15;
				} else {
					channel.send("Incorrect. Hint: It's Umi's hair color");
				}
				break;
			case 15:
				if (content === "next"){
					await channel.send("When you open your eyes, you find yourself in a forest. You turn around to make sure there's no obvious temple behind you again. Nope, just more forest. You realize you're no longer holding the robot arm. Don't worry, you still have it, it's just in your inventory. What's an \"inventory\", you ask? Don't worry about it.", {file: "./images/forest.jpg"});
					channel.send("Chat \"next\" to continue");
					location = 16;
				} else {
					channel.send("Chat \"next\" to continue");
				}
				break;
			case 16:
				if (content === "next"){
					await channel.send("A weird looking rabbit walks up to you. \"Hi! Let's play hide-and-seek!\", it says. You don't have time for this, but it runs off before you can say anything. Ugh.", {file: "./images/rabbit.png"});
					channel.send("Wait, it dropped something. It looks like a small card that isn't worth the time for me to go and draw right now, so I'll just tell you what it says:")
					channel.send("```\nAnswer Format: ???\n1. The 20th letter of the alphabet\n2. The smallest positive integer divisible by 12 and 16\n```");
					location = 17;
				} else {
					channel.send("Chat \"next\" to continue");
				}
				break;
			case 17:
				if (content === "t48"){
					await channel.send("Whoa, a double question. That's a new one, but at least this one was pretty simple. The fact that it gave you the answer format was pretty helpful too.", {file: "./images/rabbit.png"});
					channel.send("**Rabbit**: Hey, you're pretty good! But I went easy on you. This time, you DEFINITELY won't find me!\n" + 
						"Again, before you can object, it drops a card that I'm not going to bother drawing. It reads:");
					channel.send("```\n1. What is the name of the dog in the Garfield comics?\n2. 2, 3, 5, 7, 11, 13, ..., 89, 97, 101, ?\n3. What is the capital of South Carolina?\n```");
					location = 18;
				} else if (content === "t 48"){
					channel.send("Close. Pay attention to the first line of the card");
				} else {
					channel.send("Incorrect.");
				}
				break;
			case 18:
				if (content === "odie103columbia"){
					await channel.send("HOLY...a TRIPLE question! That one was challenging! Except all those questions were easily google-able, so...no, no it wasn't challenging...", {file: "./images/rabbit.png"});
					channel.send("**Rabbit**: Aw man, you found me again! This time I'm REALLY going to hide well!\n**You**: HEY WAIT...");
					channel.send("Too late, it's run off again. But it left a card behind again. Looks like this time there's only a single question.")
					channel.send("```\nWhich musical instrument is Jonbot most skilled at?\n```");
					location = 19;
				} else {
					channel.send("Incorrect.");
				}
				break;
			case 19:
				if (content === "piano"){
					await channel.send("You've heard Jonbot play piano a few times in your life, so you're pretty sure that's the answer.", {file: "./images/rabbit.png"});
					channel.send("**Rabbit**: You found me AGAIN? I must really be losing my touch at this!\n**You**: OKAY HOLD ON! Before you run off again...I'm sorry. I can't keep playing with you, I need to find...\n**Rabbit**: ...a Jonbot part, right? Yeah, I know.\n**You**: Wait...what?\n**Rabbit**: Yeah, I'm actually the guardian of what you're looking for.\n**You**: Oh...uh...I don't know what to say. Um...where is it?\n**Rabbit**: Right here. It's me. I'm the Jonbot part.\n**You**: ....wait...WHAT?!");
					channel.send("Once again, things start getting weird and shimmery again. You don't bother closing your eyes this time, because you're already used to it.");
					channel.send("Chat \"next\" to continue");
					location = 20;
				} else {
					channel.send("Incorrect.");
				}
				break;
			case 20:
				if (content === "next"){
					channel.send("When things stop being shimmery, you find yourself on a boat.");
					await channel.send({file: "./images/boat.jpg"});
					channel.send("**Rabbit**: Oh man...I don't wanna be here any longer than I need to.\n**You**: WHOA! You're still here??\n**Rabbit**: Yeah. And I can't swim, so please hurry up :sob:");
					channel.send("Chat \"next\" to continue");
					location = 21;
				} else {
					channel.send("Chat \"next\" to continue");
				}
				break;
			case 21:
				if (content === "next"){
					await channel.send("You're about to start looking for clues, when a gruff voice calls out to you.", {file: "./images/pirate.png"});
					channel.send("This guy is TINY! He's a pirate? You're not that scared of him at all!");
					channel.send("**Pirate**: Arr matey! A sail on the mast is tangled. Can you climb up there and fix it?\n" +
						"**You**: Wait...no, you can't just say \"Arr matey!\" and then talk normally after that. It doesn't work that way.\n" +
						"**Pirate**: Yeah? Well, go talk to the guy who made this dumb game, he was the one who couldn't be bothered to keep up with the pirate-speak. Now go and fix the sail, or I'll make you walk the plank!");
					channel.send("You decide to not fight this guy, especially when you suddenly have a cute little rabbit to take care of. Looking up, you see that one of the sails is indeed tangled with some of the wires. There's a rope ladder that goes up the mast, and most of the steps are made of...well...rope. But one step in particular near the bottom is made of...words? Upon closer inspection, you see it reads \"But, soft! What light through ?????? window breaks?\"");
					location = 22;
				} else {
					channel.send("Chat \"next\" to continue");
				}
				break;
			case 22:
				if (content === "yonder"){
					await channel.send("You never were a fan of Shakespeare, but *Romeo and Juliet* was pretty alright. Anyways, you reach the top of the mast. Wow, the rocking of the ship is way more violent up here!", {file: "./images/sail.jpg"});
					channel.send("**Rabbit**: Ugggh, I'm going to be sick...\n**You**: WHOA! You came up here with me too??\n**Rabbit**: Well of course I did! I didn't wanna be left behind if you did that shimmer thing again and teleported away!\n**You**: ...I mean, I guess so\n**Rabbit**: Well, hurry and fix the sail, before I REALLY get sick!");
					channel.send("You look over to the sail that's currently tangled up. You think you might be able to reach it, but you notice some words written on the sail. \"Name one country Jonbot visited in 2019\". You're starting to see why only a trusted friend would be able to complete this mission.");
					location = 23;
				} else {
					channel.send("Incorrect.");
				}
				break;
			case 23:
				if (content === "japan" || content === "china" || content === "korea" || content === "netherlands" || content === "spain"){
					await channel.send("You've got it! You're reaching for the sail...almost there...", {file: "./images/sail.jpg"});
					channel.send("Hey, is it just me or is the boat suddenly rocking REALLY violently? It's almost like someone's shaking the boat!");
					channel.send("Whatever...you're almost there. Just a little more, and you can grab the sail...");
					channel.send("Chat \"next\" to continue");
					location = 24;
				} else {
					channel.send("Incorrect.");
				}
				break;
			case 24:
				if (content === "next"){
					await channel.send("You wake up to someone shaking you...\n**Jonbot**: Hey! HEY! WAKE UP!\n**You**: Huh? Whuh...what?\n**Jonbot**: I've been looking all over the park for you, and I found you sleeping here!", {file: "./images/park.jpg"});
					channel.send("Wait...what? You were trying to grab that sail, you were so close! And you met this really cute rabbit! Was it all a dream?");
					channel.send("**Jonbot**: Oh well, come on! My power's not out, so let's go to my place and play Super Smash Bros!");
					await channel.send("Jonbot runs off ahead of you while you get up from the table. What a crazy dream. Jonbot had been destroyed, and you went around to all these weird places solving all these puzzles, and you met that one UMI Agent. What was his name? You can't remember. As you run to catch up with Jonbot, you notice something's in your back pocket.", {file: "./images/Adonos Card.png"});
					channel.send("Oh. Oh my...\n\n**Thanks for playing Jonbot Adventure! Please message Jon (not Jonbot) and tell him what you thought of this game! He will really appreciate the feedback! And look out for Jonbot Adventure 2, because there are many more mysteries to be solved! Who is Agent Adonos and his mysterious organization? Who is the creator of Jonbot? Who destroyed Jonbot? And how did everything turn out to be a dream, but not really?**");
					channel.send("Ending game");
					location = 25;
					break;
				} else {
					channel.send("Chat \"next\" to continue");
				}
				break;
			case 25:
				break;
			case 26:
				if (content === "1" || content === "2"){
					channel.send("**You**: How do I know I can trust you?\n" +
					"**UMI Agent**: What is the name of Jonbot's waifu?\n" +
					"**You**: Uh...Umi?\n" +
					"**UMI Agent**: And what is the name of our organization?\n" +
					"**You**: ...Dang, ya got me. Alright, where are these components located?\n" +
					"**UMI Agent**: I shall teleport you to the general vicinity of the first component. From there, it will be up to you to find the parts. Jonbot's creator has conveniently made each component lead to the next, so if all goes well on your quest, you will find all three components without further help from me.\n" +
					"**You**: Sounds like a grand ol' time.");
					channel.send("As soon as you've said those words, the world around you seems to shift and shimmer. This is a weird feeling. You start to get motion sick, so you close your eyes. (Chat \"next\" to continue)");
				location = 10;
				} else {
					channel.send("Please select one of the options");
				}
				break;
			case 27:
				if (content === "next"){
					await channel.send("You feel something in your back pocket. Huh, it's some kind of business card. It looks like it belongs to that UMI agent. Gee, would it have killed them to hire a graphics designer? Oh well, it looks like it'll come in handy later. You better keep it for now. You put it back into your pocket.", {file: "./images/Adonos Card.png"});
					channel.send("From your current location, you can see a particularly tall rock in the distance. What do you want to do?\n1. Using the rock as a vantage point seems like a good idea.");
					location = 11;
				} else {
					channel.send("Chat \"next\" to continue");
				}
		}
		return true;
	}
}

module.exports = game;