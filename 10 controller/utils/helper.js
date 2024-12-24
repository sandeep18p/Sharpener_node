const path = require("path");

const exactPath = path.dirname(require.main.filename);

module.exports = exactPath;
