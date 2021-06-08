var sender = {
	"findAndSend" : function(client, guildName, channelName, message){
		var guildKeys = client.guilds.keys();
		var guildInfo = guildKeys.next();
		var guildFound = false;
		var guild;
		var channel;
		while (!guildInfo.done){
			if (client.guilds.get(guildInfo.value).name === guildName){
				guild = client.guilds.get(guildInfo.value);
				guildFound = true;
				break;
			}
			guildInfo = guildKeys.next();
		}

		if (guildFound){
			var channelKeys = guild.channels.keys();
			var channelInfo = channelKeys.next();
			var channelFound = false;
			while (!channelInfo.done){
				if (guild.channels.get(channelInfo.value).name === channelName){
					channel = guild.channels.get(channelInfo.value);
					channelFound = true;
					break;
				}
				channelInfo = channelKeys.next();
			}

			if (channelFound){
				if (message){
					channel.send(message);
				}
			}
		}
		return channel;
	}
}

module.exports = sender;