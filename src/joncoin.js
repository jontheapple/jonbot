//This file handles Jonbot's cryptocurrency, Joncoin
const fs = require("fs");

try {
	fs.accessSync("./joncoin.json", fs.constants.R_OK | fs.constants.W_OK);
} catch (err){
	fs.writeFileSync("./joncoin.json", "[]");
}

//reports an error
function reportError(errcode, channel){
	channel.send("An error (code: " + errcode + ") occurred, please inform Jon that this happened");
}

//returns the array of the bank of joncoin
function readBank(channel){
	let bank;
	try {
		const jsonString = fs.readFileSync("./joncoin.json");
		bank = JSON.parse(jsonString)
	} catch (err){
		reportError("JONCOIN1", channel);
		console.log(err);
	}
	return bank;
}

//writes the bank to the json file
function writeBank(channel, bank){
	try {
		fs.writeFileSync("./joncoin.json", JSON.stringify(bank).replace(/},{/g, "}\n,{"));
	} catch (err){
		reportError("JONCOIN2", channel);
		console.log(err);
	}
}

//returns the index on the "bank" array corresponding to the current user, or returns -1 if current user is not currently registered
function getWalletIndex(bank, id){
	for (let i = 0; i < bank.length; i++){
		if (bank[i].id === id) return i;
	}
	return -1;
}

//retrieves the user's wallet, creating one if it doesn't exist
function getWallet(user, bank, channel){
	let bankInd = getWalletIndex(bank, user.id);
	if (bankInd === -1){
		bank.push({"id": user.id, "joncoins": 0, "username": user.username, "discriminator": user.discriminator});
		bankInd = bank.length - 1;
		console.log(bank.length);
		writeBank(channel, bank);
	}
	return bank[bankInd];
}

//returns an array of wallets with username and optionally discriminator matching the given username and discriminator
function getWalletByUsername(username, bank, discriminator = ""){
	let ret = [];
	for (let i = 0; i < bank.length; i++){
		if (bank[i].username === username){
			if (discriminator === "") ret.push(bank[i]);
			else {
				if (bank[i].discriminator === discriminator) ret.push(bank[i]);
			}
		}
	}

	return ret;
}

//checks the user's joncoin balance
function checkBalance(user, channel){
	let bank = readBank(channel);
	let wallet = getWallet(user,bank,channel);
	if (wallet.joncoins === 1){
		channel.send(user.username + ", you have " + wallet.joncoins + " Joncoin!");
	} else if (wallet.joncoins === 69){
		channel.send(user.username + ", you have " + wallet.joncoins + " Joncoins. Nice!");
	} else {
		channel.send(user.username + ", you have " + wallet.joncoins + " Joncoins!");
	}
}

//allows a user to give joncoins to another user
function giveCoins(user, recipientName, numCoins, channel){
	//Handle user trying to "give negative coins"
	if (numCoins < 0){
		channel.send("Nice try, " + user.username + ".")
		return;
	}

	let bank = readBank(channel);
	let userWallet = getWallet(user, bank, channel);
	if (recipientName.includes("#")){
		//use discriminator
		let recipientNameParts = recipientName.split('#');
		let recipientWallet = getWalletByUsername(recipientNameParts[0], bank, recipientNameParts[1]);
		if (recipientWallet.length === 0){
			channel.send("Did not find registered Joncoin owner with username " + recipientName + ".");
		} else if (userWallet.joncoins < numCoins){
			channel.send("Your balance is not high enough to send that many Joncoins.");
		} else{
			userWallet.joncoins = userWallet.joncoins - numCoins;
			recipientWallet[0].joncoins = recipientWallet[0].joncoins + numCoins;
			channel.send("Successfully transferred " + numCoins + " Joncoins to " + recipientName);
			writeBank(channel, bank);
		}
	} else {
		//don't use discriminator
		let recipientWallet = getWalletByUsername(recipientName, bank);
		if (recipientWallet.length === 0){
			channel.send("Did not find registered Joncoin owner with username " + recipientName + ".");
		} else if (recipientWallet.length > 1){
			channel.send("Found multiple registered Joncoin owners with username " + recipientName + ". Please add a numeric discriminator to your recipient name (e.g. Jontheapple#9999).");
		} else if (userWallet.joncoins < numCoins){
			channel.send("Your balance is not high enough to send that many Joncoins.");
		} else{
			userWallet.joncoins = userWallet.joncoins - numCoins;
			recipientWallet[0].joncoins = recipientWallet[0].joncoins + numCoins;
			channel.send("Successfully transferred " + numCoins + " Joncoins to " + recipientName);
			writeBank(channel, bank);
		}
	}
	
}

//basic joncoin earnage function, earns the user 1 joncoin
function earnJoncoin(user, channel){
	let bank = readBank(channel);
	let wallet = getWallet(user, bank, channel);
	wallet.joncoins++;
	writeBank(channel, bank);
	if (wallet.joncoins === 1){
		channel.send(user.username + ", you now have " + wallet.joncoins + " Joncoin!");
	} else if (wallet.joncoins === 69){
		channel.send(user.username + ", you now have " + wallet.joncoins + " Joncoins. Nice!");
	} else {
		channel.send(user.username + ", you now have " + wallet.joncoins + " Joncoins!");
	}
}

//remove joncoins from user's wallet. returns true on success, otherwise returns false.
function removeJoncoins(user, amt, channel){
	let bank = readBank(channel);
	let wallet = getWallet(user, bank, channel);
	if (wallet.joncoins < amt){
		channel.send("You do not have enough Joncoins to do that.");
		return false;
	} else{
		wallet.joncoins = wallet.joncoins - amt;
		if (wallet.joncoins === 1){
			channel.send(user.username + ", you now have " + wallet.joncoins + " Joncoin!");
		} else if (wallet.joncoins === 69){
			channel.send(user.username + ", you now have " + wallet.joncoins + " Joncoins. Nice!");
		} else {
			channel.send(user.username + ", you now have " + wallet.joncoins + " Joncoins!");
		}
		writeBank(channel, bank);
		return true;
	}
}

//function for the "game time with Jon" product
function productGameTime(user, channel){
	if (removeJoncoins(user, 350, channel)){
		channel.send(user.username + ", you have successfully purchased 30 minutes of game time (game of your choice) with Jon!");
	}
}

let joncoin = {
	"earnJoncoin" : earnJoncoin,
	"checkBalance" : checkBalance,
	"giveCoins" : giveCoins,
	"productGameTime": productGameTime
};

module.exports = joncoin;