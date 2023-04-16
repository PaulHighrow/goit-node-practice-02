const express = require("express");
const {
  getAllCtrl,
  addContactCtrl,
  deleteContactCtrl,
  updateContactCtrl,
} = require("../controllers/contactsControllers");
const asyncWrapper = require("../helpers/asyncWrapper");
const validateAddContact = require("../middlewares/postContactMdlw");

const router = express.Router();

router.get("/", asyncWrapper(getAllCtrl));

router.post("/", validateAddContact, asyncWrapper(addContactCtrl));

router.delete("/:contactId", asyncWrapper(deleteContactCtrl));

router.patch("/:contactId", asyncWrapper(updateContactCtrl));

module.exports = router;
