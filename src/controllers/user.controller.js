const mongoose = require('mongoose');
const User = require('../models/user.model');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({ isDeleted: false })
      .populate('role')
      .sort({ createdAt: -1 });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findOne({ _id: id, isDeleted: false }).populate('role');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      req.body,
      { new: true, runValidators: true }
    ).populate('role');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted (soft delete)', user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({ message: 'email and username are required' });
    }

    const user = await User.findOneAndUpdate(
      {
        email: String(email).toLowerCase(),
        username,
        isDeleted: false
      },
      { status: true },
      { new: true }
    ).populate('role');

    if (!user) {
      return res.status(404).json({ message: 'User not found or information is incorrect' });
    }

    return res.json({ message: 'User status set to true', user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({ message: 'email and username are required' });
    }

    const user = await User.findOneAndUpdate(
      {
        email: String(email).toLowerCase(),
        username,
        isDeleted: false
      },
      { status: false },
      { new: true }
    ).populate('role');

    if (!user) {
      return res.status(404).json({ message: 'User not found or information is incorrect' });
    }

    return res.json({ message: 'User status set to false', user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
