const PollModel = require("../models/poll");

const DEFAULT_LIMIT = 10;

async function fetchPollsList(params) {
  const { limit = DEFAULT_LIMIT, skip = 0, ...props } = params || {};

  const polls = await PollModel.find({ ...props }, { __v: 0, updated_at: 0 })
    .skip(+skip || 0)
    .limit(+limit);

  return polls;
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
};
