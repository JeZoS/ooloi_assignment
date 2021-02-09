const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  reg_link: {
    type: String,
    required: true,
  },
  when: {
    type: String,
    required: true,
  },
  about_ev: {
    type: String,
    required: true,
  },
  speakers: [
    {
      name: {
        type: String,
      },
      // about: {
      //   type: String,
      // },
      image: {
        type: String,
      },
    },
  ],
  moderators: [
    {
      name: {
        type: String,
      },
      // about: {
      //   type: String,
      // },
      image: {
        type: String,
      },
    },
  ],
  unstructured: [
    {
      type: {
        type: String,
      },
      subtype: {
        type: String,
        default: "image",
      },
      asset: {
        type: String,
      },
    },
  ],
  joining_info: {
    type: String,
    required: true,
  },
  organised_by: [],
  tags: [],
});

//Export the model
module.exports = mongoose.model("Event", eventSchema);
