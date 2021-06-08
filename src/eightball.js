const eightBallChatsPositive = [
	"Yup!",
	"Yes!",
	"Yeah!",
	"Aww yea",
	"Almost certainly",
	"It would seem to be the case",
	"I believe so",
	"Yaaaaaaaaaaas"
];

const eightBallChatsNegative = [
	"I don't think so",
	"Jonbot says no",
	"I wouldn't count on it",
	"Noooooooo..."
];

let eightBallRig = "none";

let eightball = {
	//When Jon invokes the eightball
	"jonGo" : (channel) => {
		if (eightBallRig === "yes"){
			rng = Math.floor(Math.random() * eightBallChatsPositive.length);
			channel.send(eightBallChatsPositive[rng]);
		} else if (eightBallRig === "no"){
			rng = Math.floor(Math.random() * eightBallChatsNegative.length);
			channel.send(eightBallChatsNegative[rng]);
		} else{
			let rng = Math.floor(Math.random() * 3);
			if (rng === 0){
				rng = Math.floor(Math.random() * eightBallChatsNegative.length);
				channel.send(eightBallChatsNegative[rng]);
			} else {
				rng = Math.floor(Math.random() * eightBallChatsPositive.length);
				channel.send(eightBallChatsPositive[rng]);
			}
		}
		eightBallRig = "none";
	},
	//When someone other than Jon invokes the eightball
	"go" : (channel) => {
		let rng = Math.floor(Math.random() * 3);
		if (rng === 0){
			rng = Math.floor(Math.random() * eightBallChatsNegative.length);
			channel.send(eightBallChatsNegative[rng]);
		} else {
			rng = Math.floor(Math.random() * eightBallChatsPositive.length);
			channel.send(eightBallChatsPositive[rng]);
		}
	},
	//When Jon DMs Jonbot to rig the eightball for himself
	"rig" : (theRig, me) => {
		if (theRig === "yes"){
			eightBallRig = "yes";
			me.send("Your next answer will be \"yes\"");
		} else if (theRig === "no"){
			eightBallRig = "no";
			me.send("Your next answer will be \"no\"");
		} else if (theRig === "unrig"){
			eightBallRig = "none";
			me.send("Your next answer has been unrigged");
		}
		else{
			me.send("I didn't understand you");
		}
	}
};
module.exports = eightball;