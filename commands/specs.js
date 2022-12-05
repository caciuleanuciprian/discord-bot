const si = require("systeminformation");

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

var computerSpecs = {
  System: null,
  CPU: null,
  Graphics: null,
  RAM: null,
  OS: null,
};
const ONE_MB = 1048576;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("specs")
    .setDescription("Shows specifications for your PC."),
  execute: async ({ interaction }) => {
    await interaction.deferReply();

    await si
      .system()
      .then(
        (data) =>
          (computerSpecs.System = `${data.manufacturer} ${data.version}`)
      )
      .catch((error) => console.error(error));
    await si
      .cpu()
      .then(
        (data) =>
          (computerSpecs.CPU = `${data.manufacturer} ${data.brand} with ${data.physicalCores} Cores`)
      )
      .catch((error) => console.error(error));
    await si
      .graphics()
      .then(
        (data) =>
          (computerSpecs.Graphics = `${data.controllers[0].model} ${data.controllers[0].vram}MB`)
      )
      .catch((error) => console.error(error));
    await si
      .memLayout()
      .then((data) => {
        let ramMemory = 0;
        data.forEach((ram) => (ramMemory += ram.size / ONE_MB));
        computerSpecs.RAM = `${ramMemory}MB`;
      })
      .catch((error) => console.error(error));
    await si
      .osInfo()
      .then((data) => (computerSpecs.OS = `${data.distro} ${data.arch}`))
      .catch((error) => console.error(error));

    console.log(computerSpecs);

    await interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${computerSpecs.System}`)
          .setDescription(
            `CPU: ${computerSpecs.CPU} \n Graphics: ${computerSpecs.Graphics} \n RAM: ${computerSpecs.RAM} \n OS: ${computerSpecs.OS}`
          ),
      ],
    });
  },
};
