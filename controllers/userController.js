const { User, Thought } = require('../models');

module.exports = {
    // Get all Users
    getAllUsers (req, res) {
        User.find()
            .then((allUsers) => res.json(allUsers))
            .catch((err) => res.status(500).json(err));
    },

    //Get a single User
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json({user})
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
      },

    //Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

  // Delete a user and remove posted thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id' })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
        { users: req.params.userId },
        { $set:  req.body  },
        { runValidators: true, new: true }
    )
    .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user found with that ID' })
            : res.json({user})
        )
        .catch((err) => res.status(500).json(err));
  },

  //Add new friend to user
  addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true}
    )
    .then((user) =>
    !user
      ? res
          .status(404)
          .json({ message: 'No user found with that ID' })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
  },

  //Delete a friend from user profile
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friend: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
}
