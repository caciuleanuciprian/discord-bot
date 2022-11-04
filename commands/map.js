const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("Shows the current map rotation.")
    .addSubcommand((subcommand) => {
      return subcommand
        .setName("current")
        .setDescription("Shows the current map.");
    })
    .addSubcommand((subcommand) => {
      return subcommand.setName("next").setDescription("Shows the next map.");
    }),

  execute: async ({ interaction }) => {
    const res = await axios.get(
      `https://api.mozambiquehe.re/maprotation?auth=${process.env.APEX_API_KEY}`
    );
    if (interaction.options.getSubcommand() === "current") {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(res.data.current.map)
            .setDescription(
              `Current map is ${res.data.current.map} and it will end in ${res.data.current.remainingTimer}`
            )
            .setThumbnail(res.data.current.asset),
        ],
      });
    } else if (interaction.options.getSubcommand() === "next") {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(res.data.next.map)
            .setDescription(`Next map is ${res.data.next.map}`),
        ],
      });
    }
  },
};
