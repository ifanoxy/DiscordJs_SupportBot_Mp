const { ActionRowBuilder } = require('@discordjs/builders');
const { CommandInteraction, TextInputBuilder, ModalBuilder, TextInputStyle} = require('discord.js');
const { Client } = require("discord.js")

module.exports = {
    name:'interactionCreate',
    once: false,
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        if(!interaction.isButton())return;
        const id = interaction.customId.startsWith(`Répondre_${interaction.channel.id}_`)
        if(id === true){
            const modal = new ModalBuilder()
			.setCustomId(interaction.customId)
			.setTitle('Response Support');

		const oned = new TextInputBuilder()
			.setCustomId('Reponse')
			.setLabel("Define the answer.")
			.setStyle(TextInputStyle.Paragraph);
		const one = new ActionRowBuilder().addComponents(oned);

		modal.addComponents(one);

		await interaction.showModal(modal);
        } 
    }
}
