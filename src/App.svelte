<script>
import Pusher from 'pusher-js';
import { writable, derived } from 'svelte/store'

Pusher.logToConsole = true;
const pusher = new Pusher(process.env.PUSHER_KEY, { cluster: process.env.PUSHER_CLUSTER });


Math.random().toString(36).substring(2, 15)

const new_key = () => Math.random().toString(36).substring(2, 8)


let hash = window.location.hash.substr(1) 
let channel_key = hash ? hash : new_key()
let channel_name = writable(`channel-${channel_key}`);
$: channel_name.set(`channel-${channel_key}`)



let channel = derived(channel_name, (channel_name) => {
  $channel?.unsubscribe()
  return pusher.subscribe(channel_name)
})
let requests = [];

channel.subscribe((channel) => {
  channel.bind('new-request', function(data) {
    requests = [...requests, data]
  });
})
$: api_url = `${window.location.protocol}//${window.location.host}/api/${channel_key}`

</script>

<svelte:head>
  <title>funnel {channel_key}</title>
</svelte:head>
<header>
  <h1>funnel</h1>
  <span><i class="fas fa-sync-alt" on:click={() => channel_key = new_key()}></i><input bind:value={channel_key}></span>
</header>
<div class="log">
  {#each requests as request}
    <pre><code>
      {JSON.stringify(request, undefined, 2)}
    </code></pre>
  {/each}
</div>
<footer>
  <span>send api requests to <a href={api_url}>{api_url}</a></span>
  <a href="https://github.com/thattomperson/funnel"><i class="fab fa-github"></i></a>
</footer>