const router = require('express').Router();
const regionRoutes = require('./regionRoutes');
const vinRoutes = require('./vinRoutes');

router.use('/regions', regionRoutes);
router.use('/vins', vinRoutes);

module.exports = router;
