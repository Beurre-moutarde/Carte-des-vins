const { Vin, Region, RegionVin } = require("./models"); // Importer les modèles de base de données

const regionController = {
  // GET all regions
  async getAllRegions(req, res) {
    try {
      const regions = await Region.find();
      res.json(regions);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },

  // GET a single region by id
  async getRegionById(req, res) {
    try {
      const region = await Region.findById(req.params.id).populate("vins");
      if (!region) {
        return res.status(404).json({ message: "Region not found" });
      }
      res.json(region);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
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
  async deleteRegion(req, res) {
    try {
      // Delete the region
      const deletedRegion = await Region.findByIdAndDelete(req.params.regionId);
      if (!deletedRegion) {
        return res.status(404).json({ message: "Region not found" });
      }
      // Delete all the wines assiociated with the region
      await Vin.deleteMany({ region: req.params.regionId });
      res
        .status(200)
        .json({ message: "Region and associated wines deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = regionController;
