import { EventType, eventModule } from "@sern/handler";
import chalk from "chalk";

export default eventModule({
  emitter: "NativeConnection",
  type: EventType.External,
  name: "disconnected",
  execute: async () => {
    console.log(chalk.black("[MONGO] - Mongoose connection lost"));
  },
});
