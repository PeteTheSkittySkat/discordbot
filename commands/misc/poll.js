const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "poll",
    description: "creates a poll",
    aliases: ['vote'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        var newargs = args.join(' ').split('"')

        var question = newargs[1]
        var options = newargs[3]
        var time = newargs[4]

        var emojiList = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'];
        var optionsList = options.split(",");
        if (optionsList.length >= 10) {
            return msg.channel.send('Cannot have more than 10 poll options!')
        }

        var optionsText = "";
        for (var i = 0; i < optionsList.length; i++) {
            optionsText += emojiList[i] + " " + optionsList[i] + "\n";
        }

        const pollembed = new MessageEmbed()
            .setTitle(':bar_chart: ' + question)
            .setDescription(optionsText)
            .setColor(0xD53C55) // Green: 0x00AE86
            .setTimestamp();

        msg.delete();

        msg.channel.send({ embeds: [pollembed]})
            .then(async function (message) {
                var reactionArray = [];
                for (var i = 0; i < optionsList.length; i++) {
                    reactionArray[i] = await message.react(emojiList[i]);
                }
        });

    },
};
