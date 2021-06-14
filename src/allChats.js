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
		if (content === "jonbot what are you selling"){
			message.channel.send("I am selling the following items!\n1. Game time with Jon for 350 Joncoins(gametime)\n2. More items coming soon!\nTo buy an item, type \"buy <word_in_parenthesis>\". For example, to buy game time with Jon, type \"buy gametime\"");
			return true;
		}
		if (content === "buy gametime"){
			joncoin.productGameTime(message.author, message.channel);
			return true;
		}


		content = message.content.toLowerCase()
		if (content.match(/give .+ \d+ joncoin/) || content.match(/give .+ \d+ joncoins/)){
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