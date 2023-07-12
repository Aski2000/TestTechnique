const { ObjectID } = require("bson");
const client = require("../db/connect");
const { Product } = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    let product = new Product(
      req.body.name,
      req.body.type,
      req.body.price,
      req.body.rating,
      req.body.warranty_years,
      req.body.available,
    );
    let result = await client
      .db()
      .collection("products")
      .insertOne(product);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const getProducts = async (req, res) => {
  try {
    let cursor = client
      .db()
      .collection("products")
      .find()
      .sort({ name: 1 });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ msg: "Aucun utilisateur trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let cursor = client.db().collection("products").find({ _id: id });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ msg: "Cet utilisateur n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let name = req.body.name;
    let type = req.body.type;
    let price = req.body.price;
    let rating = req.body.rating;
    let warranty_years = req.body.warranty_years;
    let available = req.body.available;
    let result = await client
      .db()
      .collection("products")
      .updateOne({ _id: id }, { $set: { name, type, price, rating, warranty_years, available } });

    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: "Modification réussie" });
    } else {
      res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let result = await client
      .db()
      .collection("products")
      .deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ msg: "Suppression réussie" });
    } else {
      res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
    }
  } catch (error) {
    console.log(error);

    res.status(501).json(error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
