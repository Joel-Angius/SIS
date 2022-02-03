const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require("discord.js");
const { watchFile } = require('fs');
const robloxJS = require('noblox.js')
const ranks = [

    { name: "Executive Operative", value: 236 },
    { name: "Deputy Chief of Intelligence", value: 238 },
    { name: "Chief of Intelligence", value: 239 },
    { name: "Deputy Director", value: 240 },
    { name: "Director", value: 241 },
]


module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command')
        .addStringOption(option =>
            option
                 .setName('username')
                 .setDescription('The username of the person being promoted')
                 .setRequired(true))
         .addNumberOption(option =>
                    option
                     .setName('ranks')
                     .setDescription('The username of the person being promoted')
                     .addChoice("Special Operative", 229)
                     .addChoice("Intelligence Operative", 230)
                     .addChoice("Senior Operative", 231)
                     .addChoice("Assistant Supervisory Operative", 232)
                     .addChoice("Supervisory Operative", 233)
                     .addChoice("Special Operative", 234)
                     .addChoice("Assistant Executive Operative", 235)
                     .addChoice("Executive Operative", 236)
                     .addChoice("Deputy Chief of Intelligence", 238)
                     .addChoice("Chief of Intelligence", 239)
                     .addChoice("Deputy Director", 240)
                     .addChoice("Director", 241)
                     .setRequired(true)),

    async execute(interaction) {

        if (!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
			interaction.reply("You do not have permission to use this command!");
			return;
		}
        const rankid = interaction.options.getNumber('ranks')
        const rankNameUpdated = interaction.options.name('ranks')

        // get username area 
        const NoUsernameProvided = new MessageEmbed()
        .setColor('#0F4C81')
        .setTitle(`SIS problem`)
        .setDescription(`I was unable to execute the command because of the following reason:`)
        .addFields(
            {
                name:'Error reason:',
                value: `No username was provided`
            }
        )
        const UsernameOfPlayer = interaction.options.getString('username')
        if (!UsernameOfPlayer) return interaction.reply({ embeds: [NoUsernameProvided] })
        // get username area 

            // embeds area 
            const InvalidUsernameProvided = new MessageEmbed()
            .setColor('#0F4C81')
            .setTitle(`SIS problem`)
            .setDescription(`I was unable to execute the command because of the following reason:`)
            .addFields(
                {
                    name:'Error reason:',
                    value: `The username provided does not exist`
                }
            )
    
            const unableToPromoteUser = new MessageEmbed()
            .setColor('#0F4C81')
            .setTitle(`SIS problem`)
            .setDescription(`I was unable to execute the command because of the following reasons`)
            .addFields(
                {
                    name:'Error reason:',
                    value: `The username provided is not in the group`
                },
                {
                    name:'Error reason:',
                    value: `Player is the rank above or below SIS Automations`
                },
                {
                    name:'Error reason:',
                    value: `The user is already that rank`
                },
            )
            // embeds area

        // turning the username into a id area
        let id = await robloxJS.getIdFromUsername(UsernameOfPlayer).catch(function(error) {
            console.log("The username which translated to an id did not exist")  
          });
        if (!id) return interaction.reply({ embeds: [InvalidUsernameProvided] }) 

        let PlayerJoinDate = await (await robloxJS.getPlayerInfo({userId: id})).age
        // turning the username into a id area

         // taking the user id and checking the group id 
         const rankName = await robloxJS.getRankNameInGroup(13636069, id)
         // taking the user id and checking the group id 


        await robloxJS.setRank(13636069, id, rankid)
        .then((success) => {
            var output = new MessageEmbed()
         .setColor('#0F4C81')
         .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${id}&width=180&height=180&format=png`)
         .setTitle(`${UsernameOfPlayer}`)
         .addFields(
             {
                 name: 'Username',
                 value: `[@${UsernameOfPlayer}](https://www.roblox.com/users/${id}/profile)`,
                 inline: true
             },
             {
                name: 'ID',
                value: `${id}`,
                inline: true
            },
             {
                name: 'Current rank in the group',
                value: `${rankName}`,
                inline: false
            },
            {
                name: 'New rank name',
                value: `${rankNameUpdated}`,
                inline: true
            },
            {
                name: 'Account age',
                value: `${PlayerJoinDate} days old`,
                inline: true
            },
         )
        
         interaction.reply({ embeds: [output] })
        }) 
        .catch(function(error) {
            interaction.reply({ embeds: [unableToPromoteUser] })
          })

        
       

    
    }
}