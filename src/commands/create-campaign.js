const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-campaign')
        .setDescription('Create a new brand campaign')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the campaign')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Description of the campaign')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('requirements')
                .setDescription('Campaign requirements')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('budget')
                .setDescription('Campaign budget in USD')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        try {
            const name = interaction.options.getString('name');
            const description = interaction.options.getString('description');
            const requirements = interaction.options.getString('requirements');
            const budget = interaction.options.getInteger('budget');

            // Create a new channel for the campaign
            const channel = await interaction.guild.channels.create({
                name: `campaign-${name.toLowerCase().replace(/\s+/g, '-')}`,
                type: 0, // Text channel
                topic: `Budget: $${budget} | ${description}`,
            });

            // Send initial message in the channel
            await channel.send({
                embeds: [{
                    title: `🎯 Campaign: ${name}`,
                    description: description,
                    fields: [
                        {
                            name: '📋 Requirements',
                            value: requirements,
                        },
                        {
                            name: '💰 Budget',
                            value: `$${budget}`,
                        }
                    ],
                    color: 0x00ff00,
                    timestamp: new Date(),
                }]
            });

            await interaction.reply({
                content: `Campaign channel created successfully! Check out ${channel}`,
                ephemeral: true
            });

        } catch (error) {
            console.error('Error creating campaign:', error);
            await interaction.reply({
                content: 'There was an error creating the campaign channel.',
                ephemeral: true
            });
        }
    },
};