//This is the main function file

const Discord = require('discord.js');
const {botkey, jonId, botId} = require("../config.json");
const client = new Discord.Client();

const applesquadBirthday = require("./birthdays/applesquadBirthday.js");
const birthday = require("./birthdays/birthday.js");
const jonChats = require('./jonChats.js');
const elseChats = require('./elseChats');

let me;

client.once('ready', async () => {
	me = await client.fetchUser(jonId);
	
	applesquadBirthday.go(client);
	birthday.go(client);

	console.log("Jonbot online");
});

client.on('message', message => {
	//============================
	//Jonbot should ignore itself
	//============================
	if (message.author.id === botId);

	//=======================================
	//How Jonbot behaves for me
	//=======================================
	else if (jonChats.messageIsFromJon(message, jonId)) jonChats.go(message, me, client);

	//===============================
	//How Jonbot behaves for everyone
	//===============================

	//=================================
	//How Jonbot behaves towards others
	//=================================
	else elseChats.go(message, me);
});

client.login(botkey);
