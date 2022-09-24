import { Client, GatewayIntentBits, Utils } from "discord.js";
import { Sern, SernEmitter } from "@sern/handler";
import Chalk from "chalk";
import mongoose from "mongoose";
import pkg from "node:timers/promises";
const wait = pkg.setTimeout;
import { Util } from "./Util";
// let utils = new Util();

const { connection } = mongoose;
const { DISCORD_TOKEN, BotOwnerID, Connect } = process.env;

export class client extends Client {
  utils: Util;
  constructor(options = {}) {
    super({
      intents: 3276799,
      allowedMentions: { parse: ["roles", "users"] },
      sweepers: {
        messages: {
          lifetime: 21600,
          interval: 43200,
        },
        invites: {
          lifetime: 21600,
          interval: 43200,
        },
      },
    });
    this.utils = new Util(this);
    this.token = DISCORD_TOKEN!;
    this.validate(options);
    Sern.addExternal(process);
    Sern.addExternal(connection);
    Sern.init({
      client: this,
      defaultPrefix: "!",
      commands: "dist/commands",
      events: "dist/events",
      sernEmitter: new SernEmitter(),
    });
  }

  validate(options: any) {
    if (!options.DISCORD_TOKEN)
      throw new Error(`You must pass a token for the client to login.`);
    this.token = options.DISCORD_TOKEN;
  }

  async start(token = this.token) {
    console.log(Chalk.yellowBright(`[CLIENT] - connecting to discord....`));
    if (!BotOwnerID || BotOwnerID == (null || undefined))
      return console.log(`You must set my owner id!`);
    this.users.cache.map((user) => {
      if (user.id !== BotOwnerID)
        return console.log(`I am not available to my owner!`);
    });

    await super.login(token!).then(async () => {
      this.utils.dbConnect(Connect!);
      wait(5000).then(() => {
        if (!this.users.cache.get(BotOwnerID)) {
          throw new Error(
            `The discord user id you specified is not in my cache.(${process.env.BotOwnerID})`
          );
        }
      });

      await this.utils.logger();
      // await utils.loadPlugins();
      return;
    });
  }
}
