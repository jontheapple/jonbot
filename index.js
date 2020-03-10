const Discord = require('discord.js');
const {botkey, jonId, botId} = require("./config.json");
const {otherBirthdays, appleBirthdays} = require("./birthdays.json");
const client = new Discord.Client();

const game = require("./game.js");
const sender = require("./sender.js");

// const fs = require("fs");

var gaming = false;
var gameChannel;

const chats = {
	jonbot: "Hello! I am Jonbot, a bot made by Jon, designed to chat exactly the way Jon would. Pleased to meet you!\n\nTry my new adventure game by chatting \"jonbotadventure\"!",
	umi: "That's my waifuuuu~ :heart::heart_eyes::blue_heart:",
	jonGreet: "Hello!",
	cutegirl: "*sweats nervously*",
	miko: "Mikooooo so cute :heart:",
	waifu: "My waifu? It's Umi, of course! She's my one true waifu!"
}

client.once('ready', async () => {
	console.log('Jonbot online!');


	var today = new Date();
	
	var appleBirthdayPeople = Object.keys(appleBirthdays);
	for (const person of appleBirthdayPeople){
		var birthday = new Date(appleBirthdays[person]);
		if (today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate()){
			sender.findAndSend(client, "Applesquad", "applesquad-chat", "Happy Birthday, " + person.charAt(0).toUpperCase() + person.slice(1) + "!");
		}
	}
	
	var otherBirthdaysPeople = Object.keys(otherBirthdays);
	for (const person of otherBirthdaysPeople){
		var target = await client.fetchUser(otherBirthdays[person]["id"]);
		target.send("Happy Birthday, " + person.charAt(0).toUpperCase() + person.slice(1) + "!");
	}
});

client.on('message', message => {
	//Jonbot should ignore itself
	if (message.author.id === botId) {
		if (message.content === "Ending game"){
			gaming = false;
		}
		return;
	}

	//remove punctuation, except not periods, because i need those for decimals
	const jonContent = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~]/g, "");

	//My bot should behave differently for me
	if (message.author.id === jonId) {
		if (jonContent === "jonbot flip a coin"){
			var rng = Math.floor(Math.random() * 2);
			if (rng === 0){
				message.channel.send("Heads");
			} else {
				message.channel.send("Tails");
			}
		} else if (jonContent === "jonbot roll a dice"){
			var rng = Math.floor(Math.random() * 6) + 1;
			message.channel.send(`You rolled a ${rng}`);
		} else if (jonContent === "endgame"){
			message.channel.send("Ending game");
		} else if (jonContent.match(/jonbot what is \d+(\.\d+)* of \d+(\.\d+)*/)){
			var vals = jonContent.split(" ");
			var percent = parseFloat(vals[3]);
			var denom = parseFloat(vals[5]);
			var numer = Math.round(denom * percent) / 100;
			message.channel.send(`${numer} is ${percent}% of ${denom}`);
		} else if (jonContent.match(/jonbot \d+(\.\d+)* is what of \d+(\.\d+)*/)){
			var vals = jonContent.split(" ");
			var numer = parseFloat(vals[1]);
			var denom = parseFloat(vals[5]);
			var percent = Math.round(numer * 10000 / denom) / 100;
			message.channel.send(`${numer} is ${percent}% of ${denom}`);
		} else if (jonContent.match(/jonbot \d+(\.\d+)* is \d+(\.\d+)* of what/)){
			var vals = jonContent.split(" ");
			var numer = parseFloat(vals[1]);
			var percent = parseFloat(vals[3]);
			var denom = Math.round(numer*10000 / percent) / 100;
			message.channel.send(`${numer} is ${percent}% of ${denom}`);
		} else if (jonContent === "thanks jonbot"){
			message.channel.send("Gotchu, fam.");
		}
		return;
	}

	//now remove periods
	const content = jonContent.replace(/\./g, "");

	if (content === "test"){

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
		if (gaming && message.channel === gameChannel){
			if (content === "endgame"){
				message.channel.send("Ending game");
				return;
			}
			game.gameLoop(content, message.channel);
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