const { Router } = require("express");
const router = Router();

const {
  createShortURL,
  getShortURL,
} = require("../controllers/shortURL.controller");
const urlValidator = require("../middlewares/urlValidator");

router.post("/new", urlValidator, createShortURL);

router.get("/:short_url", getShortURL);

module.exports = router;
