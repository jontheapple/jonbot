//This is the main function file

const Discord = require('discord.js');
const {botkey, jonId, botId} = require("../config.json");
const {otherBirthdays, appleBirthdays} = require("../birthdays.json");
const client = new Discord.Client();

const game = require("./game.js");
const sender = require("./sender.js");
const eightball = require('./eightball.js');
const jonChats = require('./jonChats.js');

// const fs = require("fs");

var gaming = false;
var gameChannel;
let me;

const chats = {
	jonbot: "Hello! I am Jonbot, a bot made by Jon, designed to chat exactly the way Jon would. Pleased to meet you!",
	umi: "That's my waifuuuu~ :heart::heart_eyes::blue_heart:",
	jonGreet: "Hello!",
	cutegirl: "*sweats nervously*",
	miko: "Mikooooo so cute :heart:",
	waifu: "Waifu? Did someone say \"waifu\"? You can't have a conversation about waifus without including meeeee..."
}

client.once('ready', async () => {
	var today = new Date();
	me = await client.fetchUser(jonId);
	
	var appleBirthdayPeople = Object.keys(appleBirthdays);
	for (const person of appleBirthdayPeople){
		var birthday = new Date(appleBirthdays[person]);
		if (today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate()){
			sender.findAndSend(client, "Applesquad", "applesquad-chat-🍏", "Happy Birthday, " + person.charAt(0).toUpperCase() + person.slice(1) + "!");
		}
	}
	
	var otherBirthdaysPeople = Object.keys(otherBirthdays);
	for (const person of otherBirthdaysPeople){
		var birthday = new Date(otherBirthdaysPeople[person]);
		if (today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate()){
			//Only wish birthday if the id exists. Sometimes I use the .json file just to track birthdays.
			if (otherBirthdays[person]["id"]){
				var target = await client.fetchUser(otherBirthdays[person]["id"]);
				target.send("Happy Birthday, " + person.charAt(0).toUpperCase() + person.slice(1) + "!");
			}
		}
	}

	console.log("Jonbot online");
});

client.on('message', async message => {
	//============================
	//Jonbot should ignore itself
	//============================
	if (message.author.id === botId) {
		if (message.content === "Ending game"){
			gaming = false;
		}
		return;
	}

	//=======================================
	//My bot should behave differently for me
	//=======================================
	if (jonChats.messageIsFromJon(message, jonId)) {
		jonChats.go(message);
		return;
	}

	//===============================
	//How Jonbot behaves for everyone
	//===============================
	//The beginnings of an urbandictionary thing
	if (jonContent.match(/jonbot whats .*/)){
		
	}

	//=================================
	//How Jonbot behaves towards others
	//=================================

	//now remove periods
	const content = jonContent.replace(/\./g, "");

	//Someone (not me) is DMing Jonbot
	if (message.guild === null){
		me.send(message.author.username + " says:\n");
		me.send(content);
		return;
	}

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
});

client.login(botkey);

function checkForString(word, match){
	return word === match || word.includes(` ${match} `) || word.startsWith(`${match} `) || word.endsWith(` ${match}`);
}