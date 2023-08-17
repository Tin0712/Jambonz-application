const router = require('express').Router();
const WebhookResponse = require('@epac/node-client').WebhookResponse;


router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body, query: req.query}, 'POST /inbound-ivr');
  try {
    const app = new WebhookResponse();
    app.gather({
        actionHook: '/inbound-ivr/collect',
        input: ['digits'],
        maxDigits: 1,
        timeout: 5,
        say: {
            text: 'Nhấn 1 để gặp 100, nhấn 2 để gặp 101'
        }
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/collect', (req, res) => {
    const {logger} = req.app.locals;
    const payload = req.body;
    logger.debug({payload}, 'POST /inbound-ivr/collect');
    try {
      const app = new WebhookResponse();
      if (payload.digits == '1') {
        app
          .say({
            text:
            `<speak>
              Vui lòng chờ trong giây lát!
            </speak>`
          })
          .dial({
            callerId: req.body.from,
            answerOnBridge: true,
            dtmfCapture: ['*2', '*3'],
            dtmfHook: '/inbound-ivr/dtmf',
            target: [
              {
                type: 'phone',
                number: tel
              }
            ]
          });
      }
      else {
        app
          .say({text: 'Are you there?  We did not collect any input.'})
          .gather(gatherTN);
      }
      res.status(200).json(app);
    } catch (err) {
      logger.error({err}, 'Error');
      res.sendStatus(503);
    }
  });

module.exports = router;