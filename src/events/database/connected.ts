import { EventType, eventModule } from "@sern/handler";
import chalk from "chalk";

export default eventModule({
  emitter: "NativeConnection",
  type: EventType.External,
  name: "connected",
  execute: async () => {
    console.log(
      chalk.greenBright("[MONGO] - Mongoose has successfully connected!")
    );
  },
});
