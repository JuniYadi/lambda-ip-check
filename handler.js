"use strict";
const http = require("http");

exports.handler = function (event, context) {
  console.log("start request to http://ipcheck.premiumfast.net");
  const options = {
    method: "GET",
    hostname: "ipcheck.premiumfast.net",
  };

  const req = http.request(options);
  req.on("response", function (res) {
    let chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log("Got response: " + body.toString());
      context.succeed(body.toString());
    });
  });

  req.on("error", function (e) {
    console.log("Got error: " + e.message);
    context.done(null, "FAILURE");
  });

  req.end();
  console.log("end request to http://ipcheck.premiumfast.net");
};
