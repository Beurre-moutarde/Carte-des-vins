const regionController = require('../../controllers/regionController');

const router = require('express').Router();

const {
    getAllRegions,
    getRegionById,
    createRegion,
    updateRegion,
    deleteRegion
} = require('../../controllers/regionController');

// Set up GET and POST at api/regions
router
    .route('/')
    .get(getAllRegions)
    .post(createRegion);

//Set up GET one, PUT and DELETE at /api/regions/:id
router
    .route('/:regionId')
    .get(getRegionById)
    .put(updateRegion)
    .delete(deleteRegion);    

module.exports = router;
