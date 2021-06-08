//This file handles wishing people happy birthday in Applesquad
const {birthdays} = require("../../birthdays/appleBirthdays.json");
const sender = require("../sender.js");

let applesquadBirthday = {
	"go" : (client, today) => {
		let people = Object.keys(birthdays);
		for (const person of people){
			let birthday = new Date(birthdays[person]);
			if (today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate()){
				sender.findAndSend(client, "Applesquad", "applesquad-chat-🍏", "Happy Birthday, " + person.charAt(0).toUpperCase() + person.slice(1) + "!");
			}
		}
	}
};

module.exports = applesquadBirthday;