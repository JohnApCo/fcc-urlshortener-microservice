const dns = require("dns");

const dnsLookup = (hostname) => {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err) => {
      if (err) {
        console.error(err);
        reject(new Error(`DNS lookup failed: ${err}`));
        return;
      }
      resolve("ok");
    });
  });
};

module.exports = dnsLookup;
