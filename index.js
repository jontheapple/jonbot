const Discord = require('discord.js');
const {botkey, jonId} = require("./config.json");
const client = new Discord.Client();

const fs = require("fs");

const chats = {
	jonbot: "Hello! I am Jonbot, a bot made by Jon, designed to chat exactly the way Jon would. Pleased to meet you!",
	umi: "That's my waifuuuu~ :heart::heart_eyes::blue_heart:",
	jonGreet: "Hello!",
	cutegirl: "*sweats nervously*",
	miko: "Mikooooo so cute :heart:",
	waifu: "My waifu? It's Umi, of course! She's my one true waifu!"
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	//My bot should ignore me
	if (message.author.id === jonId) {
		return;
	}
	
	for (const chat in chats){
		if (message.content === chats[chat]){
			fs.writeFile("id.txt", message.author.id, (err) => {
				if (err) console.log(err);
			});
			return;
		}
	}
	const content = message.content.toLowerCase().replace(/[@'.,?;:()!~]/g, "");
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