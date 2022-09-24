import { eventModule, EventType } from "@sern/handler";
import chalk from "chalk";
import type { Client } from "discord.js";
import { Util } from "../../structures/Util";
import { randomStatus } from "../../tools/statuses";

export default eventModule({
  type: EventType.Discord,
  name: "ready",
  description: "ready",
  async execute(client: Client) {
    const util = new Util(client);
    client.guilds.cache.forEach(async (guild) => {
      let owner = await guild.members.fetch(guild.ownerId);
      util.createGuild(
        guild.id,
        guild.name,
        owner.user.username,
        guild.ownerId
      );
    });

    console.log(
      chalk.greenBright(
        `[CLIENT] - ${client.user?.tag} has successfully logged into discord!`
      )
    );
    randomStatus(client);
  },
});
