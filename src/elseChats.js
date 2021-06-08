//This file handles the bot's responses to anybody who isn't Jon
const eightball = require('./eightball.js');
const game = require('./game.js');

const chats = {
	jonbot: "Hello! I am Jonbot, a bot made by Jon, designed to chat exactly the way Jon would. Pleased to meet you!",
	umi: "That's my waifuuuu~ :heart::heart_eyes::blue_heart:",
	jonGreet: "Hello!",
	cutegirl: "*sweats nervously*",
	miko: "Mikooooo so cute :heart:",
	waifu: "Waifu? Did someone say \"waifu\"? You can't have a conversation about waifus without including meeeee..."
}

function checkForString(word, match){
	return word === match || word.includes(` ${match} `) || word.startsWith(`${match} `) || word.endsWith(` ${match}`);
}

let elseChats = {
	"go" : (message, me) => {
		const content = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~\.]/g, "");
		//Someone (not me) is DMing Jonbot
		if (message.guild === null){
			me.send(message.author.username + " says:\n");
			me.send(content);
			return;
		}

		if (content === "jonbotadventure"){
			if (!game.gaming){
				message.channel.send("Jonbot Adventure is starting...");
				gameChannel = message.channel;
				game.gameIntro(gameChannel);
				game.gaming = true;
			} else {
				message.channel.send("Game is already running");
			}
			return;
		}
	
		if (game.gaming){
			if (game.gaming && message.channel === gameChannel){
				if (content === "endgame"){
					message.channel.send("Ending game");
					return;
				}
				game.gameLoop(content, message.channel);
				return;
			}
		}
	
		if (content.match(/jonbot oh jonbot .+/)){
			eightball.go(message.channel);
		} else if (checkForString(content, "jonbot")){
			message.channel.send(chats.jonbot);
			return;
		}
	
		if (checkForString(content, "umi")) {
			let image = Math.floor(Math.random() * 187) + 1;
			let fileName = "./images/Umi/";
			if (image <= 109) fileName += image + ".jpg";
			else fileName += (image - 109) + ".png";
			message.channel.send(chats.umi, {file: fileName});
		}
		if (checkForString(content, "jon") || checkForString(content, "jonathan")){
			// console.log(content);
			const hello = ["hi", "hello", "whats up", "yo", "hey"];
			for (const hi of hello){
				if (checkForString(content, hi)){
					message.channel.send(chats.jonGreet);
					break;
				}
			}
		}
		if (checkForString(content, "cute girl") || checkForString(content, "cute girls")){
			message.channel.send(chats.cutegirl);
		}
		if (checkForString(content, "miko")){
			message.channel.send(chats.miko);
		}
		if (checkForString(content, "waifu")){
			message.channel.send(chats.waifu);
		}
	}
};

module.exports = elseChats;