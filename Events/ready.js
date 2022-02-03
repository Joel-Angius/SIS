const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const robloxJS = require('noblox.js')
require("dotenv").config();

module.exports = {
	name: "ready",
	once: true,
	execute(client, commands) {
		console.log("SIS is now online");

		robloxJS.setCookie(process.env.COOKIE).then(function() {
			console.log("SIS roblox bot logged in")
		}).catch(function(err) {
			console.log("Unable to log in!", err)
		});

		const CLIENT_ID = client.user.id;

		const rest = new REST({
			version: "9",
		}).setToken(process.env.TOKEN);

		(async () => {
			try {
				if (process.env.ENV === "production") {
					await rest.put(Routes.applicationCommands(CLIENT_ID), {
						body: commands,
					});
					console.log("SIS commands logged internationally");
				} else {
					await rest.put(
						Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
						{
							body: commands,
						}
					);
					console.log("SIS commands logged locally");
				}
			} catch (err) {
				if (err) console.error(err);
			}
		})();
	},
};