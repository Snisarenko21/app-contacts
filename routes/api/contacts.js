const express = require("express");
const {
  ctrlWrapper,
  validation,
  isValidId,
  auth,
} = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { schemas } = require("../../models/contacts/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.changeById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
