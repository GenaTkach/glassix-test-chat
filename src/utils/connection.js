import Ably from "ably/callbacks";

const KEY = "Pns68A.YZZ_rg:7kRIzyMgEs_ZtiQL";

const ably = new Ably.Realtime.Promise(KEY);
await ably.connection.once('connected');
console.log('Connected to Ably!');