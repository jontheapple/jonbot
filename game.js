var location;
var power;
var twiddled;

var game = {
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
					channel.send("You go outside onto the street, and give the ground a nice hard punch. Ouch, your knuckles REALLY hurt. You're not sure if you want to continue hitting the streets. Hitting one street is good enough for you.");
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
					channel.send("\n**Jonbot**: \"HELLO! I AM RUNNING CALL_BACK.EXE! WHAT IS IN THE UPWARDS VERTICAL DIRECTION?\"\n**You**: \"Okay, I know you're a robot and everything, but can you cut that out?\"\n**Jonbot**: \"Aw come on man, you're no fun. Anyways, what's up?\"\n**You**: \"Well, I was bored, and then the power went out so now I'm even boreder.\"\n**Jonbot**: \"Oh, yeah that sucks. Can even practice Super Smash Bros, am I right? Well, I just got done with my errands, so I can meet up and hang out for a while, since I'm already out.\"\n**You**: \"Yeah, I'm down. I'll meet you at the park?\"\n**Jonbot**: \"Yeah, sounds good. See you in a bit.\"");
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
					channel.send("Dude, are you kidding? Chat \"next\".");
				}
				break;
			case 4:
				if (content === "1"){
					channel.send("Whuh....woooow, I'm literally on my way to meet you, and you'd ditch me for the stereotypical cute anime girl with toast in her mouth? I'm kinda hurt.");
					channel.send("Chat \"back\" to go back to the park. Chat \"endgame\" to quit.");
					location = 5;
				} else if (content === "2"){
					channel.send("You decide to ignore the random anime girl, and continue waiting for Jonbot. However, not long after the girl has run by, ")
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
		}
		return true;
	}
}

module.exports = game;