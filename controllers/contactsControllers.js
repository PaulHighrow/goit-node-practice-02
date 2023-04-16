const {
  getAll,
  addContact,
  deleteContact,
  updateContact,
} = require("../services/contactsServices");

const getAllCtrl = async (__, res) => {
  res.json(await getAll());
};

const addContactCtrl = async (req, res) => {
  res.status(201).json(await addContact(req.body));
};

const deleteContactCtrl = async (req, res) => {
  res.json(await deleteContact(req.body));
};

const updateContactCtrl = async (req, res) => {
  res.json(await updateContact(req.body));
};

module.exports = {
  getAllCtrl,
  addContactCtrl,
  deleteContactCtrl,
  updateContactCtrl,
};
