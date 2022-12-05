const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder, WebhookClient } = require("discord.js");

var itemList = [];

const webhookClient = new WebhookClient({
  id: process.env.WEBHOOK_ID,
  token: process.env.WEBHOOK_TOKEN,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crafting")
    .setDescription("Shows the current map rotation."),
  execute: async ({ interaction }) => {
    await interaction.deferReply();

    const res = await axios.get(
      `https://api.mozambiquehe.re/crafting?auth=${process.env.APEX_API_KEY}`
    );

    res.data.forEach(async (item) => {
      await item.bundleContent.forEach(async (entry) => {
        if (
          entry.itemType.name === "ammo" ||
          entry.itemType.name === "evo_armor" ||
          entry.itemType.name === "med_kit" ||
          entry.itemType.name === "large_shield_cell"
        ) {
          return;
        }
        itemList.push(
          new EmbedBuilder()
            .setColor(entry.itemType.rarityHex)
            .setTitle(
              `${
                entry.itemType.name.charAt(0).toUpperCase() +
                entry.itemType.name.slice(1).replaceAll("_", " ")
              }`
            )
            .setDescription(
              `Rarity: ${entry.itemType.rarity}\nCost: ${
                entry.cost
              } Crafting Materials\nType: ${
                item.bundleType.charAt(0).toUpperCase() +
                item.bundleType.slice(1)
              }`
            )
            .setThumbnail(entry.itemType.asset)
        );
      });
    });

    if (!webhookClient) {
      return;
    }

    await webhookClient.send({
      content: "Current crafting rotation:",
      embeds: itemList,
    });

    await interaction.editReply("Here you go, king 👑");

    itemList = [];
    webhookClient.destroy();
  },
};
