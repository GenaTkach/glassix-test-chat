// get the channel to subscribe to
import ably from "ably";

const channel = ably.channels.get('quickstart');


/*
  Subscribe to a channel.
  The promise resolves when the channel is attached
  (and resolves synchronously if the channel is already attached).
*/
await channel.subscribe('greeting', (message) => {
    console.log('Received a greeting message in realtime: ' + message.data)
});
