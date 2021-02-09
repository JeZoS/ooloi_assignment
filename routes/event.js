const express = require("express");
const router = express.Router();
const Event = require("../models/eventSchema");
const multer = require("multer");
//

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // console.log(req);
    var filname =
      file.originalname +
      new Date().toISOString() +
      "." +
      file.mimetype.split("/")[1];
    if (!req.body[file.fieldname]) {
      req.body[file.fieldname] = [{ type: file.mimetype, asset: filname }];
    } else {
      req.body[file.fieldname].push({ type: file.mimetype, asset: filname });
    }
    cb(null, filname);
  },
});
const upload = multer({ storage: storage });

//
//
//get Event  GET ----localhost:port/event/:id
// router.get("/:id", async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (event) {
//       res.send({
//         message: "Success",
//         event: event,
//       });
//     } else {
//       res.send({
//         error: "Failed : event no found",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({
//       error: err,
//     });
//   }
// });

//
//
//Create Event  POST ----localhost:port/event
router.post("/", upload.any(), async (req, res) => {
  req.body.image = null;
  if (req.body.unstructured) {
    if ((typeof req.body.unstructured).toString() === "string") {
      var unData = req.body.unstructured;
      req.body.unstructured = [JSON.parse(unData.toString())];
    } else {
      req.body.unstructured.map((el, idx) => {
        var st = (typeof el).toString();
        if (st === "string") {
          req.body.unstructured[idx] = JSON.parse(el.toString());
        }
      });
    }
  }
  if (req.body.speakers) {
    if ((typeof req.body.speakers).toString() === "string") {
      var unData = req.body.speakers;
      req.body.speakers = [unData];
    }
    req.body.speakers.map((el, idx) => {
      req.body.speakers[idx] = JSON.parse(el.toString());
      var image_Name = req.body.speakers[idx].image;
      var img_path = null;
      req.files.map((fl) => {
        if (fl.originalname === image_Name) {
          img_path = fl.path;
        }
      });
      req.body.speakers[idx].image = img_path;
    });
  }
  if (req.body.moderators) {
    if ((typeof req.body.moderators).toString() === "string") {
      var unData = req.body.moderators;
      req.body.moderators = [unData];
    }
    req.body.moderators.map((el, idx) => {
      req.body.moderators[idx] = JSON.parse(el.toString());
      var image_Name = req.body.moderators[idx].image;
      var img_path = null;
      req.files.map((fl) => {
        if (fl.originalname === image_Name) {
          img_path = fl.path;
        }
      });
      req.body.moderators[idx].image = img_path;
    });
  }
  console.log(req.body, req.files);
  res.send({ ok: "ok" });
  // try {
  //   const {
  //     title,
  //     reg_link,
  //     when,
  //     about_ev,
  //     speakers,
  //     moderator,
  //     unstructured,
  //     joining_info,
  //     organised_by,
  //     tags,
  //   } = req.body;
  //   const event = new Event({
  //     title,
  //     reg_link,
  //     when,
  //     about_ev,
  //     speakers,
  //     moderator,
  //     material,
  //     joining_info,
  //     organised_by,
  //     tags,
  //   });
  //   const newEvent = await event.save();
  //   res.send({ created_event: newEvent });
  // } catch (err) {
  //   console.log(err);
  //   res.send({ error: err });
  // }
});

//
//
//Update Event  POST ----localhost:port/event/:id
// router.post("/:id", async (req, res) => {
//   const event = await Event.findById(req.params.id);
//   if (event) {
//     try {
//       event.title = req.body.title || event.title;
//       event.reg_link = req.body.reg_link || event.reg_link;
//       event.when = req.body.when || event.when;
//       event.about_ev = req.body.about_ev || event.about_ev;
//       event.speakers = req.body.speakers || event.speakers;
//       event.moderator = req.body.moderator || event.moderator;
//       event.material = req.body.moderator || event.moderator;
//       event.joining_info = req.body.joining_info || event.joining_info;
//       event.organised_by = req.body.organised_by || event.organised_by;
//       event.tags = req.body.tags || event.tags;

//       const updatedEvent = await event.save();
//       res.send({
//         msg: "Event Updated",
//         event: updatedEvent,
//       });
//     } catch (err) {
//       console.log(err);
//       res.send({
//         error: err,
//       });
//     }
//   } else {
//     res.send({
//       error: "No event with this title",
//     });
//   }
// });

// //
// //
// //Delete event  POST ----localhost:port/event/:id
// router.delete("/:id", async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     await event.delete();
//     res.send({
//       message: "Event deleted",
//     });
//   } catch (err) {
//     console.log(err);
//     res.send({
//       error: "err",
//     });
//   }
// });

module.exports = router;
