//This is the main function file

const Discord = require('discord.js');
const {botkey, jonId, botId} = require("../config.json");
const {otherBirthdays, appleBirthdays} = require("../birthdays.json");
const client = new Discord.Client();

const game = require("./game.js");
const sender = require("./sender.js");
const jonChats = require('./jonChats.js');
const elseChats = require('./elseChats');

// const fs = require("fs");

var gameChannel;
let me;

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
			game.gaming = false;
		}
		return;
	}

	//=======================================
	//How Jonbot behaves for me
	//=======================================
	if (jonChats.messageIsFromJon(message, jonId)) {
		jonChats.go(message);
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
