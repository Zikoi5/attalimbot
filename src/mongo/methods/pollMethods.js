const PollModel = require("../models/poll");
const PollResultsModel = require("../models/poll_results.js");
const ObjectId = require("mongodb").ObjectId;

const DEFAULT_LIMIT = 10;

async function fetchPollsList(params) {
  const props = params || {};
  const limit = props.limit || DEFAULT_LIMIT;
  const skip = props.skip || 0;

  const polls = await PollModel.find({ ...props }, { __v: 0, updated_at: 0 })
    .skip(+skip || 0)
    .limit(+limit);

  return polls;
}

async function fetchUserPollResults(params) {
  const poll_results = await PollResultsModel.findOne(params);

  return poll_results || {};
}

async function createUserPollResult({
  user_id,
  poll_group_id,
  total_answers_count,
}) {
  try {
    return new Promise((resolve) => {
      return PollResultsModel.create(
        {
          poll_answers_list: [],
          user_id,
          poll_group_id,
          answers: { total: total_answers_count, right: 0, wrong: 0 },
        },
        function (err, doc) {
          // console.log("doc", doc);
          return resolve(doc);
        }
      );
    });
  } catch (err) {
    console.error(err);
  }
}

async function appendUserPollAnswer({
  user_id,
  poll_result_id,
  poll_id,
  answer_index,
  $inc,
}) {
  // console.log("_id", poll_result_id);
  // console.log("user_id", user_id);
  // console.log("poll_id", poll_id);
  // console.log("answer_index", answer_index);

  try {
    await PollResultsModel.updateOne(
      {
        _id: ObjectId(poll_result_id),
        user_id,
      },
      {
        $push: {
          poll_answers_list: {
            poll_id,
            answer_index,
          },
        },
        $inc,
      }
    );

    // console.log("res", res);
  } catch (err) {
    console.error("appendUserPollAnswer", err);
  }
}

async function getRandomPoll() {
  // console.log("Init getRandomPoll");
  const n = await PollModel.countDocuments();
  const r = Math.floor(Math.random() * n);
  // console.log("n", n, "r", r);
  const randomElement = await PollModel.find().limit(1).skip(r);
  return { data: randomElement, random_number: r, polls_count: n };
}

module.exports = {
  fetchPollsList,
  getRandomPoll,
  fetchUserPollResults,
  createUserPollResult,
  appendUserPollAnswer,
};
