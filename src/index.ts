import Pusher from 'pusher-js';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher(process.env.PUSHER_KEY, { cluster: process.env.PUSHER_CLUSTER });

var channel_name = `channel-${window.location.hash.substr(1)}`;
document.getElementById('channel').innerText = channel_name
var channel = pusher.subscribe(channel_name);
var requests = document.getElementById('requests')
channel.bind('new-request', function(data) {
  var pre = document.createElement('pre')
  pre.innerHTML = JSON.stringify(data, undefined, 2)
  requests.appendChild(pre)
});
