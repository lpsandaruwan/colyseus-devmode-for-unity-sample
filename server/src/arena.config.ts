import Arena from "/home/lahirup/Desktop/Colyseus/colyseus/packages/arena/build";

/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";
import {RedisPresence} from "../../../colyseus/packages/presence/redis-presence/build";
import {RedisDriver} from "../../../colyseus/packages/drivers/redis-driver/build";
import {WebSocketTransport} from "../../../colyseus/packages/transport/ws-transport/build";
import {monitor} from "../../../colyseus/packages/monitor/src";

export default Arena({
    getId: () => "Your Colyseus App",

    options: {
        presence: new RedisPresence(),
        driver: new RedisDriver()
    },

    // initializeTransport: () => {
    //   return new WebSocketTransport();
    // },

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom, { autoDisposeTimeout: 100 });
    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/monitor", monitor());
    },

});
