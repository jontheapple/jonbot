//This is the main function file

const Discord = require('discord.js');
const {botkey, jonId, botId} = require("../config.json");
const client = new Discord.Client();

const game = require("./game.js");
const applesquadBirthday = require("./birthdays/applesquadBirthday.js");
const birthday = require("./birthdays/birthday.js");
const jonChats = require('./jonChats.js');
const elseChats = require('./elseChats');

let me;

client.once('ready', async () => {
	let today = new Date();
	me = await client.fetchUser(jonId);
	
	applesquadBirthday.go(client, today);
	birthday.go(client, today);

	console.log("Jonbot online");
});

client.on('message', message => {
	//============================
	//Jonbot should ignore itself
	//============================
	if (message.author.id === botId) {
		if (message.content === "Ending game"){
			game.gaming = false;
		}
		return;
	}

	//=======================================
	//How Jonbot behaves for me
	//=======================================
	if (jonChats.messageIsFromJon(message, jonId)) {
		jonChats.go(message, me, client);
		return;
	}

	//===============================
	//How Jonbot behaves for everyone
	//===============================

	//=================================
	//How Jonbot behaves towards others
	//=================================
	elseChats.go(message, me);
});

client.login(botkey);
