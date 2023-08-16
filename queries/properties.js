const db = require("../db/dbConfig");

const getAllProperties = async () => {
  try {
    const allProperties = await db.any("SELECT * FROM properties");

    return allProperties;
  } catch (e) {
    return e;
  }
};

const getPropertyById = async (id) => {
  try {
    const propertyById = await db.any(
      `SELECT * FROM properties WHERE id = $1`,
      id
    );

    return propertyById;
  } catch (e) {
    return e;
  }
};

const createProperty = async (data) => {
  try {
    const newProperty = await db.one(
      `INSERT INTO properties (title, description, price, location, image_url)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [data.title, data.description, data.price, data.location, data.image_url]
    );

    return newProperty;
  } catch (e) {
    return e;
  }
};

const deleteProperty = async (id) => {
  try {
    const deletedProperty = await db.any(
      `DELETE FROM properties WHERE id = $1 RETURNING *`,
      id
    );
    console.log(deletedProperty);
    return deletedProperty;
  } catch (e) {
    console.log(e);
  }
};

const updateProperty = async (id, property) => {
  let { title, description, price, location, image_url } = property;
  try {
    const updatedPropery = await db.any(
      `UPDATE properties SET title = $1, description = $2, price = $3, location = $4, image_url = $5 WHERE id = $6 RETURNING *`,
      [title, description, price, location, image_url, id]
    );

    return updatedPropery;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyById,
  deleteProperty,
  updateProperty,
};
