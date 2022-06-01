using System;
using System.Collections.Generic;
using UnityEngine;

using Colyseus;

[Serializable]
class Message
{
    public string Data { get; set; }
    
    public Message() {}

    public Message(string msg)
    {
        Data = msg;
    }
}

[Serializable]
public class RoomController
{
    private static ColyseusClient client = new ColyseusClient("ws://192.168.8.163:2567");
    private static ColyseusRoom<RoomState> room;
    
    public static async void JoinOrCreateRoom()
    {
        Dictionary<string, object> roomOptionsDictionary = new Dictionary<string, object>();
        // Populate an options dictionary with custom options provided elsewhere
        var options = new Dictionary<string, object>();
        foreach (var option in roomOptionsDictionary) options.Add(option.Key, option.Value);
        
        room = await client.JoinOrCreate<RoomState>("my_room", options);
        room.OnMessage<Message>("up", obj =>
        {
            Debug.Log(obj.Data);
        });
        Debug.Log($"{room.RoomId} <- room");
    }

    public static async void SendMessage()
    {
        await room.Send("up", new Message($"{room.SessionId} has sent a message at {DateTime.Now.ToString()}!"));
    }
}
