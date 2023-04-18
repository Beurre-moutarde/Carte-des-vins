const router = require('express').Router();
const regionRoutes = require('./regionRoutes');
const vinRoutes = require('./vinRoutes');
const userRoutes = require('./userRoutes');

router.use('/regions', regionRoutes);
router.use('/vins', vinRoutes);
router.use('/users', userRoutes);

module.exports = router;
