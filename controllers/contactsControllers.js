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
  const { contactId } = req.params;
  await deleteContact(contactId);
  res.status(204).json();
};

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { name, number } = req.body;
  const user = await updateContact(contactId, { name, number });
  console.log(user);
  await res.status(200).json(user);
};

module.exports = {
  getAllCtrl,
  addContactCtrl,
  deleteContactCtrl,
  updateContactCtrl,
};
