const mongoose = require('mongoose');
const Role = require('../models/role.model');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    return res.status(201).json(role);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getAllRoles = async (_req, res) => {
  try {
    const roles = await Role.find({ isDeleted: false }).sort({ createdAt: -1 });
    return res.json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid role id' });
    }

    const role = await Role.findOne({ _id: id, isDeleted: false });

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    return res.json(role);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid role id' });
    }

    const role = await Role.findOneAndUpdate(
      { _id: id, isDeleted: false },
      req.body,
      { new: true, runValidators: true }
    );

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    return res.json(role);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.softDeleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid role id' });
    }

    const role = await Role.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    return res.json({ message: 'Role deleted (soft delete)', role });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
