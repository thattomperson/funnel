import { NowRequest, NowResponse } from '@vercel/node'
import Pusher from 'pusher';

const { PUSHER_APPID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env

if (!PUSHER_APPID || !PUSHER_KEY || !PUSHER_SECRET || !PUSHER_CLUSTER)  {
  throw new Error('Invalid config, please set all PUSHER_* env vars')
}

var pusher = new Pusher({
  appId: PUSHER_APPID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: true
});

export default function (req: NowRequest, res: NowResponse) {
  pusher.trigger(`channel-${req.query.key}`, 'new-request', {
    'body': req.body,
    'url': req.url,
    'method': req.method,
  }, () => {
    res.send('Ok')
    res.end()
  });
}