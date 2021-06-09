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
		fs.writeFileSync("./joncoin.json", JSON.stringify(bank).replace("},{", "}\n,{"));
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
		bank.push({"id": user.id, "joncoins": 0});
		bankInd = bank.length - 1;
		console.log(bank.length);
		writeBank(channel, bank);
	}
	return bank[bankInd];
}

//basic joncoin earnage function, earns the user 1 joncoin
function earnJoncoin(user, channel){
	let bank = readBank(channel);
	let wallet = getWallet(user, bank, channel);
	wallet.joncoins++;
	writeBank(channel, bank);
	if (wallet.joncoins === 1){
		channel.send(user.username + ", you now have " + wallet.joncoins + " Joncoin!");
	} else {
		channel.send(user.username + ", you now have " + wallet.joncoins + " Joncoins!");
	}
}

let joncoin = {
	"earnJoncoin" : earnJoncoin
};

module.exports = joncoin;