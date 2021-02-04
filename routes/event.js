const express = require("express");
const router = express.Router();
const Event = require("../models/eventSchema");

router.post("/", async (req, res) => {
  try {
    const {
      title,
      reg_link,
      when,
      about_ev,
      speakers,
      moderator,
      material,
      joining_info,
      organised_by,
      tags,
    } = req.body;
    const event = new Event({
      title,
      reg_link,
      when,
      about_ev,
      speakers,
      moderator,
      material,
      joining_info,
      organised_by,
      tags,
    });
    const newEvent = await event.save();
    res.send({ created_event: newEvent });
  } catch (err) {
    console.log(err);
    res.send({ error: err });
  }
});

module.exports = router;
