const fs = require("fs");
const path = require("path");
require("dotenv").config();

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const content = `window.runtimeConfig = {
  REACT_APP_BACKEND_URL: "${backendUrl}"
};`;

fs.writeFileSync(path.join(__dirname, "../public/config.js"), content, "utf8");

console.log("✅ config.js created!");
