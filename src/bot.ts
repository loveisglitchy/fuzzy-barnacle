import "dotenv/config";
import { client } from "./structures/index";
const bot = new client(process.env);
bot.start();
