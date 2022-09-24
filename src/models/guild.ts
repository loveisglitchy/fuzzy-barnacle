import { Schema, model } from "mongoose";

const Guild = new Schema({
  gID: { type: String },
  gName: { type: String },
  gOwner: { type: String },
  gOwnerID: { type: String },
  modLogsChannelID: { type: String },
});

export default model("Guild", Guild, "Guild");
