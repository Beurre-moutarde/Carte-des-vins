const vinController = require('../../controllers/vinController');

const router = require('express').Router();

const {
    getAllVins,
    getVinById,
    createVin,
    updateVin,
    deleteVin
} = require('../../controllers/vinController');

// Set up GET and POST at api/vins
router
    .route('/')
    .get(getAllVins)
    .post(createVin);

//Set up GET one, PUT and DELETE at /api/vins/:id
router
    .route('/:vinId')
    .get(getVinById)
    .put(updateVin)
    .delete(deleteVin);    

module.exports = router;