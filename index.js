const Discord = require('discord.js');
const {botkey, jonId, botId} = require("./config.json");
const client = new Discord.Client();

const game = require("./game.js");

const fs = require("fs");

var gaming = false;
var gameChannel;

const chats = {
	jonbot: "Hello! I am Jonbot, a bot made by Jon, designed to chat exactly the way Jon would. Pleased to meet you!",
	umi: "That's my waifuuuu~ :heart::heart_eyes::blue_heart:",
	jonGreet: "Hello!",
	cutegirl: "*sweats nervously*",
	miko: "Mikooooo so cute :heart:",
	waifu: "My waifu? It's Umi, of course! She's my one true waifu!"
}

client.once('ready', () => {
	console.log('Jonbot online!');
});

client.on('message', message => {
	//Jonbot should ignore itself
	if (message.author.id === botId) return;

	const content = message.content.toLowerCase().replace(/[@'.,?;:()!~]/g, "");

	//My bot should behave differently for me
	if (message.author.id === jonId) {
		if (content === "jonbot flip a coin"){
			var rng = Math.floor(Math.random() * 2);
			if (rng === 0){
				message.channel.send("Heads");
			} else {
				message.channel.send("Tails");
			}
		} else if (content === "jonbot roll a dice"){
			var rng = Math.floor(Math.random() * 6) + 1;
			message.channel.send(`You rolled a ${rng}`);
		}
		return;
	}

	if (content === "jonbotadventure"){
		if (!gaming){
			message.channel.send("Jonbot Adventure is starting...");
			gameChannel = message.channel;
			game.gameIntro(gameChannel);
			gaming = true;
		} else {
			message.channel.send("Game is already running");
		}
		return;
	}

	if (gaming){
		if (message.channel === gameChannel){
			if (content === "endgame"){
				gaming = false;
				message.channel.send("Ending game");
				return;
			}
			game.gameLoop(content, message.channel);
			return;
		}
	}
	
	for (const chat in chats){
		if (message.content === chats[chat]){
			fs.writeFile("id.txt", message.author.id, (err) => {
				if (err) console.log(err);
			});
			return;
		}
	}

	if (checkForString(content, "jonbot")){
		message.channel.send(chats.jonbot);
		return;
	}

	if (checkForString(content, "umi")) {
		message.channel.send(chats.umi);
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
});

client.login(botkey);

function checkForString(word, match){
	return word === match || word.includes(` ${match} `) || word.startsWith(`${match} `) || word.endsWith(` ${match}`);
}