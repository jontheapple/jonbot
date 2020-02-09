const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	const content = message.content.toLowerCase().replace(/[.,?;:()!~]/g, "");
	if (content === "hello i am jonbot a bot made by jon designed to chat exactly the way jon would pleased to meet you") return;
	if (checkForString(content, "umi")) {
		message.channel.send("That's my waifuuuu~ <3");
	}
	if (checkForString(content, "jon")){
		// console.log(content);
		const hello = ["hi", "hello", "whats up", "yo", "hey"];
		for (const hi of hello){
			if (checkForString(content, hi)){
				message.channel.send("Hello!");
				break;
			}
		}
	}
	if (checkForString(content, "cute girl") || checkForString(content, "cute girls")){
		message.channel.send("*sweats nervously*");
	}
	if (checkForString(content, "jonbot")){
		message.channel.send("Hello! I am Jonbot, a bot made by Jon, designed to chat exactly the way Jon would. Pleased to meet you!");
	}
});

client.login(process.env.JONBOT_KEY);

function checkForString(word, match){
	return word === match || word.includes(` ${match} `) || word.startsWith(`${match} `) || word.endsWith(` ${match}`);
}