const Query = require("../models/Query");

exports.createQuery = async (req, res) => {
  const { question } = req.body;

  const query = await Query.create({
    farmerId: req.user.id,
    question
  });

  res.status(201).json(query);
};
