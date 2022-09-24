import type { Client } from "discord.js";
import mongoose from "mongoose";
import Guild from "../models/guild.js";
import pkg from "glob";
import { promisify } from "util";
import { createRequire } from "module";
import chalk from "chalk";

//const requiree = createRequire(import.meta.url);
const { glob } = pkg;
const PG = promisify(glob);

export class Util {
  client: Client<boolean>;
  constructor(client: Client) {
    this.client = client;
  }
  async dbConnect(url: string) {
    mongoose.connect(url, { keepAlive: true, keepAliveInitialDelay: 30000 });
  }
  async dbDisconnect() {
    mongoose.disconnect();
  }
  async createGuild(
    guildID: string,
    guildName: string,
    guildOwner: string,
    guildOwnerID: string
  ) {
    const guild = await Guild.findOne({
      gID: guildID,
    });
    if (!guild) {
      const newData = new Guild({
        gID: guildID,
        gName: guildName,
        gOwner: guildOwner,
        gOwnerID: guildOwnerID,
      });
      newData.save();
      console.log(
        chalk.greenBright(
          `[MONGO] - Successfully created new data for ${guildName}.`
        )
      );
      return newData;
    } else {
      return guild;
    }
  }
  async loadFiles(dir: string) {
    const files = await PG(
      `${process.cwd().replace(/\\/g, "/")}/${dir}/**/*.js`
    );
    files.forEach((file) => delete require.cache[require.resolve(file)]);
    return files;
  }
  async logger() {
    //commands
    const commandFiles = this.loadFiles(`./dist/commands`);
    let cCount = 0;
    (await commandFiles).forEach(async (file) => {
      cCount++;
    });
    console.log(chalk.blue(`[HANDLER] - Loaded ${cCount} Command(s)!`));

    //events
    const eventFiles = this.loadFiles(`./dist/events`);
    let eCount = 0;
    (await eventFiles).forEach(async (file) => {
      eCount++;
    });
    console.log(chalk.blue(`[HANDLER] - Loaded ${eCount} Event(s)!`));

    //plugins
    const plugins = this.loadFiles(`./dist/plugins`);
    let pCount = 0;
    (await plugins).forEach(async (file) => {
      pCount++;
    });
    console.log(chalk.magenta(`[PLUGINS] - Loaded ${pCount} Plugin(s)!`));

    //models
    const models = this.loadFiles(`./dist/models`);
    let mCount = 0;
    (await models).forEach(async (file) => {
      mCount++;
    });
    console.log(chalk.white(`[MODELS] - Loaded ${mCount} Database Model(s)!`));
  }
}
