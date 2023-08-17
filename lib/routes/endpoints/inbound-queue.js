const router = require('express').Router();
const WebhookResponse = require('@epac/node-client').WebhookResponse;
const fs = require('fs');



router.post('/', (req, res) => {
  const { logger } = req.app.locals;
  logger.debug({ payload: req.body }, `POST /inbound-queue`);
  try {
    const app = new WebhookResponse();
    app
      .enqueue({
        name: 'sup',
        waitHook: '/inbound-queue/park',
        actionHook: '/inbound-queue/dequeue'
      });
    res.status(200).json(app);
  } catch (err) {
    logger.error({ err }, 'Error');
    res.sendStatus(503);
  }
});

router.post('/park', (req, res) => {
  const { logger } = req.app.locals;
  logger.debug({ payload: req.body }, 'POST /park');
  const json_string = fs.readFileSync('./data/extensions.json', 'utf8');
  const extensions = JSON.parse(json_string);
  const availableExtension = extensions.filter(e => e.status !== 'in-progress' && e.status !== 'ringing' );
  console.log(`tin: ${availableExtension}`);

  try {
    const app = new WebhookResponse();
    app
      // .play({
      //   url: '',
      //   earlyMedia : true,
      // })
      .pause({
        length: 1
      })
    if(availableExtension.length != 0){
      app.leave();
      }
    res.status(200).json(app);
  } catch (err) {
    logger.error({ err }, 'Error');
    res.sendStatus(503);
  }
});

router.post('/dequeue', (req, res) => {
  const { logger } = req.app.locals;
  logger.debug({ payload: req.body }, 'POST /dequeue');
  try {
    const app = new WebhookResponse();
    app.dial({
      answerOnBridge: true,
      callerId: req.body.from,
      dialMusic : 'https://c3-ex-swe.nixcdn.com/NhacCuaTui2023/Vaicaunoicokhiennguoithaydoi-GREYDDoanTheLan-7576195.mp3?st=eYKxe--5gMuFaOvabZ-LxA&e=1677640159&t=1677039065086',
      target: [
        {
          type: 'user',
          name: '101@congtya.com'
        },
        {
          type: 'user',
          name: '100@congtya.com'
        }
      ]
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({ err }, 'Error');
    res.sendStatus(503);
  }
});



module.exports = router;