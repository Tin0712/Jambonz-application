const router = require('express').Router();

router.use('/call-status', require('./call-status'));
router.use('/hello-world', require('./tts-hello-world'));
router.use('/inbound-ivr', require('./inbound-ivr'));
router.use('/auth', require('./auth'));
router.use('/record', require('./record'));
router.use('/inbound-queue', require('./inbound-queue'));
router.use('/inbound-ringgroup', require('./inbound-ringgroup'));
router.use('/outbound-PSTN', require('./outbound-PSTN'));
router.use('/outbound-user', require('./outbound-user'));

module.exports = router;
