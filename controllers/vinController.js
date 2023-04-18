const { Vin } = require("../models"); // Importer les modèles de base de données

const vinController = {
  //GET all wines
  getAllVins(req, res) {
    Vin.find()
      .select("-__v")
      .then((vins) => res.json(vins))
      .catch((err) => res.status(500).json(err));
  },

  //GET a single wine
  getVinById(req, res) {
    Vin.findOne({ _id: req.params.vinId })
      .then((vin) =>
        !vin
          ? res.status(404).json({ message: "No wine with that ID" })
          : res.json(vin)
      )
      .catch((err) => res.status(500).json(err));
  },

  //POST a new wine
  createVin(req, res) {
    Vin.create(req.body)
      .then((vin) => res.json(vin))
      .catch((err) => res.status(500).json(err));
  },

  //Put to update a wine by id
  updateVin({ params, body }, res) {
    Vin.findOneAndUpdate({ _id: params.vinId }, body, {
      new: true,
      runValidators: true,
    })
      .then((vin) => {
        !vin
          ? res.status(404).json({ message: "No Wine found with this id!" })
          : res.json(vin);
      })
      .catch((err) => res.json(err));
  },
  //DELETE to remove a wine by id
  deleteVin(req, res) {
    Vin.findOneAndDelete({ _id: req.params.vinId })
      .then((vin) => {
        !vin
          ? res.status(404).json({ message: "No wine with that ID" })
          : res.json(vin);
      })
      .catch((err) => res.status(500).json(err));
  },

//   //PUT/Add an avis to a wine by updating wine
//   addAvis({ params }, res) {
//     Vin.findOneAndUpdate(
//       { _id: params.vinId },
//       { $push: { avis: params.avisId } },
//       { new: true }
//     )
//       .then((vin) => {
//         !vin
//           ? res.status(404).json({ message: "No wine found with this id" })
//           : res.json(vin);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   //Delete an avis by updating wine
//   deleteAvis({ params }, res) {
//     Vin.findOneAndDelete(
//       { _id: params.vinId },
//       { $pull: { avis: params.avisId } },
//       { new: true }
//     )
//       .then((vin) => {
//         !vin
//           ? res.status(400).json({ message: "No wine found with this id" })
//           : res.json(vin);
//       })
//       .catch((err) => res.status(500).json(err));
//   },
};

module.exports = vinController;

