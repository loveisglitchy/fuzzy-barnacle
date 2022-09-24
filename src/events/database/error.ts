import { EventType, eventModule } from "@sern/handler";
import chalk from "chalk";

export default eventModule({
  emitter: "NativeConnection",
  type: EventType.External,
  name: "error",
  execute: async (err: any) => {
    console.log(
      chalk.redBright(`[MONGO] - Mongoose connection error: \n${err}`)
    );
  },
});
