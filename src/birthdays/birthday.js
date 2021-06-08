const {birthdays} = require("../../birthdays/birthdays.json");

let birthday = {
	"go" : async (client, today) => {
		let people = Object.keys(birthdays);
		for (const person of people){
			let personBirthday = new Date(birthdays[person].birthday);
			if (today.getMonth() === personBirthday.getMonth() && today.getDate() === personBirthday.getDate()){
				//Only wish birthday if the id exists. Sometimes I use the .json file just to track birthdays.
				if (birthdays[person]["id"]){
					let target = await client.fetchUser(birthdays[person]["id"]);
					target.send("Happy Birthday, " + person.charAt(0).toUpperCase() + person.slice(1) + "!");
				}
			}
		}
	}
};

module.exports = birthday;