import { EventType, eventModule } from "@sern/handler";
import chalk from "chalk";

export default eventModule({
  emitter: "NativeConnection",
  type: EventType.External,
  name: "connecting",
  execute: async () => {
    console.log(chalk.yellowBright("[MONGO] - Mongoose is connecting..."));
  },
});
