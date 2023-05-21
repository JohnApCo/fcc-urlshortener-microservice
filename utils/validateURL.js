const dnsLookup = require("./dnsLookup");

const validateUrl = async (url) => {
  const urlPattern =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;

  try {
    if (typeof url !== "string" || url === "" || !urlPattern.test(url)) {
      throw new Error();
    }

    const { hostname } = new URL(url);

    if (hostname === process.env.HOSTNAME || hostname === "localhost") {
      throw new Error();
    }
    console.log("dnsLookup: " + hostname);
    await dnsLookup(hostname);
  } catch {
    throw new Error("Invalid URL");
  }
};

module.exports = validateUrl;
