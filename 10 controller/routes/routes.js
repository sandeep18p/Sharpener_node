const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/home", pageController.getHomePage);
router.get("/contactus", pageController.getContactPage);
router.post("/success", pageController.postSuccessPage);
router.get("/success", pageController.getSuccessPage);
router.get("/*", pageController.getErrorPage);

module.exports = router;
