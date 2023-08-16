const express = require("express");
const router = express.Router();

const {
  getAllProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
  updateProperty,
} = require("../queries/properties");

router
  .route("/")
  .get(async (req, res) => {
    const allProperties = await getAllProperties();

    if (!allProperties) {
      res.status(500).json({ error: "Server error" });
    } else {
      res.json(allProperties);
    }
  })
  .post(async (req, res) => {
    const { title } = req.body;
    const createdProperty = await createProperty(req.body);

    if (!title) {
      res.status(400).json({
        status: false,
        message: "You have to give a title for the property.",
      });
    } else {
      res.json({ status: true, data: createdProperty });
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;

    const propertyById = await getPropertyById(id);

    if (!propertyById) {
      res.status(400).json({
        status: false,
        message: "Id not found!",
      });
    } else {
      res.json(propertyById);
    }
  })

  .delete(async (req, res) => {
    const { id } = req.params;
    const deletedProperty = await deleteProperty(id);

    if (deletedProperty.length === 0) {
      res.status(404).json({ message: "Id not found!" });
    } else {
      res.json(deletedProperty[0]);
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const updatedProperty = await updateProperty(id, req.body);

    if (updatedProperty.length === 0) {
      res.status(404).json({ message: "Id not found!" });
    } else {
      res.json(updatedProperty);
    }
  });

module.exports = router;
