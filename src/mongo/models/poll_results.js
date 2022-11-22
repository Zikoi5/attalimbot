const { Schema, model } = require("mongoose");

const pollResultsSchema = Schema(
  {
    poll_answers_list: {
      type: Array,
    },
    user_id: {
      type: String,
    },
    poll_group_id: {
      type: String,
    },

    answers: {
      total: {
        type: Number,
      },

      wrong: {
        type: Number,
      },

      right: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("PollResult", pollResultsSchema);
