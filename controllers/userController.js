const { User } = require("../models"); // Importer les modèles de base de données

const userController = {
    //GET all users
    getAllUsers(req, res) {
      User.find()
        .select("-__v")
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
  
    //GET a single user
    getUserById(req, res) {
      User.findOne({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: "No user with that ID" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    //POST to create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
  
    //Put to update a user by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.userId }, body, {
        new: true,
        runValidators: true,
      })
        .then((user) => {
          !user
            ? res.status(404).json({ message: "No User found with this id!" })
            : res.json(user);
        })
        .catch((err) => res.json(err));
    },
    //DELETE to remove a user by id
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
          !user
            ? res.status(404).json({ message: "No user with that ID" })
            : res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController;
