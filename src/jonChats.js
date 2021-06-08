//This file handles the bot's responses to Jon
const eightball = require('./eightball.js');

const chats = {
	"thanks jonbot": "You're welcome, Jon-kun!",
	"right jonbot": "Right, Jon!",
	"jonbot you there": "Yeah, I'm here",
	"jonbot you alive": "Yeah, I'm here",
	"hey jonbot": "Yes, Jon?",
	"thanks jonbot i really appreciate it": "Yeah, anytime!",
	"sorry jonbot": "It's okay! I forgive you",
	"goodnight jonbot": "Good night, Jon!",
	"good night jonbot": "Good night, Jon!",
	"good morning jonbot": "Good morning, Jon!"
}

let jonChats = {
	"messageIsFromJon" : (message, jonId) => {
		return message.author.id === jonId;
	},
	"go" : async (message, me, client) => {
		//if I am DMing the bot, then I am giving different commands
		if (message.guild === null){
			//Remove Punctuation
			let jonContent = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~\.]/g, "");

			let args = jonContent.split(" ");
			let command = args[0];
			if (command === "message"){
				let id = args[1];
				let target = await client.fetchUser(id);
				let msg = "";
				for (let i = 2; i < args.length; i++){
					msg += args[i] + " ";
				}
				target.send(msg.trim());
			} else if (command === "rig8ball"){
				eightball.rig(args[1], me);
			} else if (command === "commands"){
				me.send("message (targetID) (message)+");
				me.send("rig8ball (how to rig)");
			}
		} else{
			//Otherwise, these commands are for use in a server
			//Remove Punctuation except periods and %
			let jonContent = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~]/g, "");

			//Percentage calculation requires periods
			if (jonContent.match(/jonbot what is \d+(\.\d+)* of \d+(\.\d+)*/)){
				let vals = jonContent.split(" ");
				let percent = parseFloat(vals[3]);
				let denom = parseFloat(vals[5]);
				let numer = Math.round(denom * percent) / 100;
				message.channel.send(`${numer} is ${percent}% of ${denom}`);
			} else if (jonContent.match(/jonbot \d+(\.\d+)* is what of \d+(\.\d+)*/)){
				let vals = jonContent.split(" ");
				let numer = parseFloat(vals[1]);
				let denom = parseFloat(vals[5]);
				let percent = Math.round(numer * 10000 / denom) / 100;
				message.channel.send(`${numer} is ${percent}% of ${denom}`);
			} else if (jonContent.match(/jonbot \d+(\.\d+)* is what percent of \d+(\.\d+)*/)){
				let vals = jonContent.split(" ");
				let numer = parseFloat(vals[1]);
				let denom = parseFloat(vals[6]);
				let percent = Math.round(numer * 10000 / denom) / 100;
				message.channel.send(`${numer} is ${percent}% of ${denom}`);
			}else if (jonContent.match(/jonbot \d+(\.\d+)* is \d+(\.\d+)* of what/)){
				let vals = jonContent.split(" ");
				let numer = parseFloat(vals[1]);
				let percent = parseFloat(vals[3]);
				let denom = Math.round(numer*10000 / percent) / 100;
				message.channel.send(`${numer} is ${percent}% of ${denom}`);
			}

			//Remove periods
			jonContent = jonContent.replace(/\./g, "");

			if (jonContent === "jonbot flip a coin"){
				let rng = Math.floor(Math.random() * 2);
				if (rng === 0){
					message.channel.send("Heads");
				} else {
					message.channel.send("Tails");
				}
			} else if (jonContent === "jonbot roll a dice"){
				let rng = Math.floor(Math.random() * 6) + 1;
				message.channel.send(`You rolled a ${rng}`);
			} else if (jonContent === "endgame"){
				message.channel.send("Ending game");
			} else if (jonContent.match(/jonbot oh jonbot .+/)){
				eightball.jonGo(message.channel);
			}else{
				let keys = Object.keys(chats);
				for (let i = 0; i < keys.length; i++){
					if (jonContent === keys[i]){
						message.channel.send(chats[keys[i]]);
					}
				}
			}
		}
	}
};

module.exports = jonChats;