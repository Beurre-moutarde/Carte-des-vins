const { Vin, Region, RegionVin } = require("../models"); // Importer les modèles de base de données

const regionController = {
  // GET all regions
  getAllRegions(req, res) {
    Region.find({})
      .select("-__v")
      .then((regions) => res.json(regions))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single region by id
  getRegionById(req, res) {
    Region.findOne({ _id: req.params.regionId })
      // .populate("vins")
      .then((region) =>
        !region
          ? res.status(404).json({ message: "Region not found" })
          : res.json(region)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST a new region
  async createRegion(req, res) {
    try {
      const newRegion = await Region.create(req.body);
      res.status(201).json(newRegion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  //PUT/Update a region by id
  async updateRegion(req, res) {
    try {
      const updatedRegion = await Region.findByIdAndUpdate(
        req.params.regionId,
        req.body,
        { new: true }
      );
      if (!updatedRegion) {
        return res.status(404).json({ message: "Region not found" });
      }
      res.status(200).json(updatedRegion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  //DELETE a region by id
  deleteRegion(req, res) {
    Region.findOneAndDelete({ _id: req.params.regionId })
      .then((region) =>
        !region
          ? res.status(404).json({ message: "No region with that ID" })
          : Vin.deleteMany({ region: req.params.regionId })
      )
      .then(() =>
        res.json({
          message: "Region and associated wines deleted successfully",
        })
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = regionController;
