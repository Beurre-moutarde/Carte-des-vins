const router = require('express').Router();
const regionRoutes = require('./regionRoutes');

router.use('/regions', regionRoutes);

module.exports = router;
