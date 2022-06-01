import { Schema, type } from "@colyseus/schema";

export class TestRoomState extends Schema {

  @type("string") data: String = ""
}
