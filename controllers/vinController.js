// const { Vin, RegionVin } = require('./models'); // Importer les modèles de base de données

// // Récupérer les détails d'un vin
// app.get('/vins/:vinId', async (req, res) => {
//     try {
//       const vinId = req.params.vinId;
//       const vin = await Vin.findById(vinId);
//       res.json(vin);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Erreur de serveur');
//     }
//   });

//     // Ajouter un vin à une région
//     app.post('/regions/:regionId/vins', async (req, res) => {
//         try {
//           const regionId = req.params.regionId;
//           const vin = new Vin(req.body);
//           const savedVin = await vin.save();
//           const regionVin = new RegionVin({ region_id: regionId, vin_id: savedVin._id });
//           await regionVin.save();
//           res.json(savedVin);
//         } catch (err) {
//           console.error(err);
//           res.status(500).send('Erreur de serveur');
//         }
//       });

//       // Supprimer un vin d'une région
// app.delete('/regions/:regionId/vins/:vinId', async (req, res) => {
//     try {
//       const regionId = req.params.regionId;
//       const vinId = req.params.vinId;
//       await RegionVin.findOneAndDelete({ region_id: regionId, vin_id: vinId });
//       await Vin.findByIdAndDelete(vinId);
//       res.send('Vin supprimé');
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Erreur de serveur');
//     }
//   });
  
//   // Mettre à jour un vin
//   app.put('/vins/:vinId', async (req, res) => {
//     try {
//       const vinId = req.params.vinId;
//       const updatedVin = await Vin.findByIdAndUpdate(vinId, req.body, { new: true });
//       res.json(updatedVin);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Erreur de serveur');
//     }
//   });
  
//   // Récupérer un vin par son identifiant
//   app.get('/vins/:vinId', async (req, res) => {
//     try {
//       const vinId = req.params.vinId;
//       const vin = await Vin.findById(vinId);
//       res.json(vin);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Erreur de serveur');
//     }
//   });
  
//   // Lister tous les vins
//   app.get('/vins', async (req, res) => {
//     try {
//       const vins = await Vin.find();
//       res.json(vins);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Erreur de serveur');
//     }
//   });