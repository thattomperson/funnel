import { NowRequest, NowResponse } from '@vercel/node'
import Pusher from 'pusher';

var pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

export default function (req: NowRequest, res: NowResponse) {
  console.log(req.body)
  console.log(`channel-${req.query.key}`)
  pusher.trigger(`channel-${req.query.key}`, 'new-request', {
    'body': req.body,
    'url': req.url,
    'method': req.method,
  }, () => {
    res.send('Ok')
    res.end()
  });
}