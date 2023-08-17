const router = require('express').Router();
const { WebhookResponse } = require('@epac/node-client');

const normalizeDest = (dest) => {
  if (dest.startsWith('+')) return dest.slice(1);
  if (dest.startsWith('00')) return dest.slice(2);
  return dest;  
};

router.post('/', (req,res) => {
  const{logger} = req.app.locals;
  const dest = normalizeDest(req.body.to);
  logger.debug({payload: req.body}, 'POST/outbound-PSTN');
  try {
      const app = new WebhookResponse();
      app.dial({
          callerId: req.body.from,
          answerOnBridge: true,
          target: [
          {
              type: 'phone',
              number: `${dest}`,
              trunk: 'sbc'
          }
          ]
      });
      res.status(200).json(app);
  } catch (err) {
      logger.error({err}, 'Error');
      res.sendStatus(503);
  }
});

module.exports = router;