const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('systems')
        .setDescription('promote command'),


    async execute(interaction) {
        
     interaction.reply('SIS systems are fully operational!')

    }
}