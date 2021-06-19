//This file handles the bot's responses to anybody who isn't Jon
const eightball = require('./eightball.js');
const game = require('./game.js');
const coin = require('./coin.js');

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
		let content = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~\.]/g, "");
		//Someone (not me) is DMing Jonbot
		if (message.guild === null){
			me.send(message.author.username + " says:\n");
			me.send(content);
			return;
		}

		if (content === "jonbotadventure"){
			if (!game.isGaming(message.author, message.channel)){
				message.channel.send("Jonbot Adventure is starting...");
				game.newGame(message.author, message.channel);
			} else {
				message.channel.send("You are already playing Jonbot Adventure");
			}
			return;
		}
	
		if (game.isGaming(message.author, message.channel)){
			if (content === "endgame"){
				game.endGame(message.author, message.channel);
				return;
			}
			game.gameLoop(message.author, content, message.channel);
			return;
		}
	
		if (content.match(/^jonbot oh jonbot .+/)){
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

		//Joncoin handling
		content = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~\.]/g, "");

		if (content === "earn joncoin"){
			coin.earnJoncoin(message.author, message.channel);
			return;
		}
		if (content === "check joncoin balance" || content === "check joncoins" || content === "joncoins"){
			coin.checkBalance(message.author, message.channel);
			return;
		}
		if (content === "jonbot what are you selling"){
			message.channel.send("I am selling the following items!\n1. Game time with Jon for 350 Joncoins(gametime)\n2. More items coming soon!\nTo buy an item, type \"buy <word_in_parenthesis>\". For example, to buy game time with Jon, type \"buy gametime\"");
			return;
		}
		if (content === "buy gametime"){
			coin.productGameTime(message.author, message.channel);
			return;
		}

		content = message.content.toLowerCase()
		if (content.match(/^give .+ \d+ joncoin$/) || content.match(/^give .+ \d+ joncoins$/)){
			let vals = content.split(" ");
			let transferAmt = parseInt(vals[2]);
			if (Number.isNaN(transferAmt)) {
				message.channel.send("You must enter a numeric value for the transfer amount.");
				return;
			}
			coin.giveCoins(message.author, vals[1].toLowerCase(), transferAmt, message.channel);
			return;
		}
	}
};

module.exports = elseChats;