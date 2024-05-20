const express = require("express");
const router = express.Router();

const {
  getAllProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
  updateProperty,
} = require("../queries/properties");

function isValidId(id) {
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId < 1) {
    return false;
  } else {
    return true;
  }
}

const PROPERTY_FIELDS = [
  "title",
  "description",
  "price",
  "location",
  "purpose",
  "is_favorite",
  "image_url",
];
const isValidProperty = (propertyById) => {
  // must have all the STUDENT_FIELDS
  for (let field of PROPERTY_FIELDS) {
    if (!propertyById.hasOwnProperty(field)) {
      return false;
    }
  }
  // should not have extra fields
  for (let field in propertyById) {
    if (!PROPERTY_FIELDS.includes(field)) {
      return false;
    }
  }
  return true;
};

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
    // const { title } = req.body;
    const property = req.body;
    if (!isValidProperty(property)) {
      return res.status(400).json({
        error: `Property must only have fields: ${PROPERTY_FIELDS.join(", ")}`,
      });
    }
    const createdProperty = await createProperty(req.body);

    if (!createdProperty) {
      res.status(400).json({
        status: false,
        message: "You have to give all fields for the property.",
      });
    } else {
      res.json({ status: true, data: createdProperty });
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidId(id)) {
        return res
          .status(400)
          .json({ message: `Id must be a positive number, not ${id}` });
      }

      const propertyById = await getPropertyById(Number(id));

      if (!propertyById) {
        return res
          .status(404)
          .json({ message: `Could not find property with id ${id}!` });
      }
      res.json(propertyById);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidId(id)) {
        return res.status(400).json({
          error: `Id must be a positive number, not ${id}`,
        });
      }
      const deletedProperty = await deleteProperty(id);

      if (deletedProperty.length === 0) {
        res
          .status(404)
          .json({ message: `Could not find property with id ${id}!` });
      } else {
        res.json(deletedProperty[0]);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidId(id)) {
        return res.status(400).json({
          error: `Id must be a positive number, not ${id}`,
        });
      }
      const updatedProperty = await updateProperty(id, req.body);

      if (updatedProperty.length === 0) {
        res
          .status(404)
          .json({ message: `Could not find property with id ${id}!` });
      }
      const property = req.body;
      if (!isValidProperty(property)) {
        return res.status(400).json({
          error: `property must only have fields: ${PROPERTY_FIELDS.join(
            ", "
          )}`,
        });
      }
      res.json(updatedProperty[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
