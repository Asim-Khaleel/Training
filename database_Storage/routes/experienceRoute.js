const express = require("express");
const router = express.Router();

const {
  getExperience,
  setExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");

router.get("/", getExperience);

router.post("/", setExperience);

router.put("/:id", updateExperience);

router.delete("/:id", deleteExperience);

module.exports = router;
