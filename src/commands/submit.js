const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit')
        .setDescription('Submit content for a campaign')
        .addStringOption(option =>
            option.setName('link')
                .setDescription('Link to your content (TikTok/Instagram)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Brief description of your content')
                .setRequired(true)),

    async execute(interaction) {
        try {
            // Only allow submissions in campaign channels
            if (!interaction.channel.name.startsWith('campaign-')) {
                await interaction.reply({
                    content: 'You can only submit content in campaign channels!',
                    ephemeral: true
                });
                return;
            }

            const link = interaction.options.getString('link');
            const description = interaction.options.getString('description');

            // Create submission embed
            await interaction.channel.send({
                embeds: [{
                    title: '📥 New Submission',
                    fields: [
                        {
                            name: '👤 Creator',
                            value: `${interaction.user}`,
                        },
                        {
                            name: '🔗 Content Link',
                            value: link,
                        },
                        {
                            name: '📝 Description',
                            value: description,
                        }
                    ],
                    color: 0x0099ff,
                    timestamp: new Date(),
                    footer: {
                        text: `Submitted by ${interaction.user.tag}`,
                        icon_url: interaction.user.displayAvatarURL(),
                    },
                }]
            });

            await interaction.reply({
                content: 'Your submission has been received!',
                ephemeral: true
            });

        } catch (error) {
            console.error('Error submitting content:', error);
            await interaction.reply({
                content: 'There was an error submitting your content.',
                ephemeral: true
            });
        }
    },
};