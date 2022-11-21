const { Schema, model } = require("mongoose");

const pollGroupSchema = Schema(
  {
    title: {
      type: String
    },

    archived: {
      type: Boolean,
    },

    polls_list: {
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("PollGroup", pollGroupSchema);
