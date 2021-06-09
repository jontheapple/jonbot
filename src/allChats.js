//This file handles the bot's responses to everybody
const joncoin = require('./joncoin.js');

let allChats = {
	"go" : (message) => {
		let content = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~\.]/g, "");

		if (content === "earn joncoin"){
			joncoin.earnJoncoin(message.author, message.channel);
			return true;
		}
		return false;
	}
}

module.exports = allChats;