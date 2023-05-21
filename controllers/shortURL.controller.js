const ShortURL = require("../models/shortURL");

const createShortURL = async (req, res) => {
  try {
    const url = req.body.url.toLowerCase();

    // Check if url is already in the db
    const shortURL = await ShortURL.findOne({ originalURL: url });
    if (shortURL) {
      return res.json({
        originalURL: shortURL.originalURL,
        shortURL: shortURL.shortURL,
        createdAt: shortURL.createdAt,
      });
    }

    // Count the docs
    const count = await ShortURL.estimatedDocumentCount();

    console.log("count", count ? count + 1 : 1);

    const urlObj = {
      originalURL: url,

      // First short_url is 1 and then increments by 1
      shortURL: count ? count + 1 : 1,
    };

    // Create new item
    const newShortURL = new ShortURL(urlObj);

    // Save the item
    await newShortURL.save();

    // Send response
    return res.json(urlObj);
  } catch (e) {
    return res.json({ error: e.message });
  }
};

const getShortURL = async (req, res) => {
  try {
    const shortURL = req.params.short_url;

    // Don't allow strings and zero for short url
    if (isNaN(+shortURL) || shortURL === "0") {
      throw Error("Wrong format");
    }

    // Find item by short url in the database
    const item = await ShortURL.findOne({ shortURL: +shortURL });
    if (!item) throw Error(`No short URL found for the given input`);

    // Redirect to the original url
    return res.redirect(302, item.shortURL);
  } catch (e) {
    return res.json({ error: e.message });
  }
};

module.exports = {
  createShortURL: createShortURL,
  getShortURL: getShortURL,
};
