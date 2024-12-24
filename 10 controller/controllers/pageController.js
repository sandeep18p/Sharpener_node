const path = require("path");
const helper = require("../utils/helper");

exports.getHomePage = (req, res) => {
    res.sendFile(path.join(helper, "views", "index.html"));
};

exports.getContactPage = (req, res) => {
    res.sendFile(path.join(helper, "views", "contactus.html"));
};

exports.postSuccessPage = (req, res) => {
    res.redirect("/success");
};

exports.getSuccessPage = (req, res) => {
    res.sendFile(path.join(helper, "views", "success.html"));
};

exports.getErrorPage = (req, res) => {
    res.sendFile(path.join(helper, "views", "404.html"));
};
