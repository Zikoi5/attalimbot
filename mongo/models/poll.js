const { Schema, model } = require("mongoose");

const pollSchema = Schema(
  {
    type: {
      type: String,
      default: "regular",
    },

    question: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    allows_multiple_answers: {
      type: Boolean,
      default: false,
    },

    correct_option_id: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Poll", pollSchema);
