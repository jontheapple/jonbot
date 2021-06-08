const Discord = require('discord.js');
const {botkey, jonId, botId} = require("../config.json");
const {otherBirthdays, appleBirthdays} = require("../birthdays.json");
const client = new Discord.Client();


const game = require("./game.js");
const sender = require("./sender.js");
const eightball = require('./eightball.js');

// const fs = require("fs");

var gaming = false;
var gameChannel;
let me;

const jonChats = {
	"thanks jonbot": "You're welcome, Jon-kun!",
	"right jonbot": "Right, Jon!",
	"jonbot you there": "Yeah, I'm here",
	"jonbot you alive": "Yeah, I'm here",
	"hey jonbot": "Yes, Jon?",
	"thanks jonbot i really appreciate it": "Yeah, anytime!",
	"sorry jonbot": "It's okay! I forgive you",
	"goodnight jonbot": "Good night, Jon!",
	"good night jonbot": "Good night, Jon!",
}

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

	//remove punctuation, except not periods, because i need those for decimals
	const jonContent = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~]/g, "");

	if (message.author.id === jonId) {
		//if I am DMing the bot, then I am giving different commands
		if (message.guild === null){
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
		}
		
		//Otherwise, these commands are for use in a server
		else if (jonContent === "jonbot flip a coin"){
			let rng = Math.floor(Math.random() * 2);
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
		} else if (jonContent.match(/jonbot oh jonbot .+/)){
			eightball.jonGo(message.channel);
		}else{
			let keys = Object.keys(jonChats);
			for (let i = 0; i < keys.length; i++){
				if (jonContent === keys[i]){
					message.channel.send(jonChats[keys[i]]);
				}
			}
		}
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