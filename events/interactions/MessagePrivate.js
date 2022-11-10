const { EmbedBuilder, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const { Client } = require("discord.js");
const config = require("../../config.json")

module.exports = {
    name:'messageCreate',
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client) {
        if(message.channel.type !== 1)return;
        if(message.author.id == client.user.id)return;
        const support = config.Categorie
        if(!client.channels.cache.get(support))return message.author.send('Votre message à bien reçu, mais le support n\'est pas activé.');
        if(!support)return;
        const channel = client.channels.cache.find(chn => chn.topic == `${message.author.id}`)
        if(channel){
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('Fermer_support')
                .setStyle(ButtonStyle.Danger)
                .setLabel('Fermer le support'),
                new ButtonBuilder()
                .setCustomId(`Répondre_${channel.id}_${message.author.id}`)
                .setStyle(ButtonStyle.Primary)
                .setLabel('Répondre')
                .setDisabled(false)
            )
            const img = message.attachments.map(a => a.url)
            client.channels.cache.get(channel.id).send({components: [row],embeds:[new EmbedBuilder().setColor('Blue').setTitle(`Support de ${message.author.username}`).setDescription(`__Description :__\n${message.content}`).setTimestamp()], files: img})
            .then(
                message.author.send(config.message)
            )
        }else{
        client.guilds.cache.get(config.developerGuilds).channels.create({
            name: `Support-${message.author.username}`,
            parent: support,
            topic: `${message.author.id}`,
            position: 1
        }).then(chn => {
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('Fermer_support')
                .setStyle(ButtonStyle.Danger)
                .setLabel('Fermer le support'),
                new ButtonBuilder()
                .setCustomId(`Répondre_${chn.id}_${message.author.id}`)
                .setStyle(ButtonStyle.Primary)
                .setLabel('Répondre')
                .setDisabled(false)
            )
            client.channels.cache.get(chn.id).send({components: [row],embeds:[new EmbedBuilder().setColor('Blue').setTitle(`Support de ${message.author.username}`).setDescription(`__Description :__\n${message.content}`).setTimestamp()]})
        }).then(
            message.author.send(config.message)
        )
        }
    }
}
