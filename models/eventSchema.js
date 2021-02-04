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
    type: Date,
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
      about: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
  moderator: [
    {
      name: {
        type: String,
      },
      about: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
  material: [
    {
      data_type: {
        type: String,
      },
      data: {
        type: String,
      },
    },
  ],
  joining_info: {
    type: String,
    required: true,
  },
  organised_by: [
    {
      name: {
        type: String,
      },
    },
  ],
  tags: [
    {
      tag: {
        type: String,
      },
    },
  ],
});

//Export the model
module.exports = mongoose.model("Event", eventSchema);
