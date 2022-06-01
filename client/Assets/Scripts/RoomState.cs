using System;
using Colyseus.Schema;

[Serializable]
public partial class RoomState: Schema
{
    [Colyseus.Schema.Type(0, "string")]
    public string data = default(string);
}