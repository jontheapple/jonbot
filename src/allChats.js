//This file handles the bot's responses to everybody
const joncoin = require('./joncoin.js');

let allChats = {
	"go" : (message) => {
		let content = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~\.]/g, "");

		if (content === "earn joncoin"){
			joncoin.earnJoncoin(message.author, message.channel);
			return true;
		}
		if (content === "check joncoin balance" || content === "check joncoins" || content === "joncoins"){
			joncoin.checkBalance(message.author, message.channel);
			return true;
		}
		content = message.content.toLowerCase().replace(/[@',%\?;:\(\)!~\.]/g, "");
		if (content.match(/give \w+ \d+ joncoin/) || content.match(/give \w+ \d+ joncoins/)){
			let vals = content.split(" ");
			let transferAmt = parseInt(vals[2]);
			if (Number.isNaN(transferAmt)) {
				message.channel.send("You must enter a numeric value for the transfer amount.");
				return true;
			}
			joncoin.giveCoins(message.author, vals[1].toLowerCase(), transferAmt, message.channel);
			return true;
		}
		return false;
	}
}

module.exports = allChats;