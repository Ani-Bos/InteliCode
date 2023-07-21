const Example = {
  id: 0,
  inputText: "",
  outputText: "",
  explanation: undefined,
  img: undefined,
};

const Problem = {
  id: "",
  title: "",
  problemStatement: "",
  examples: [],
  constraints: "",
  order: 0,
  starterCode: "",
  handlerFunction: "",
  starterFunctionName: "",
};

const DBProblem = {
  id: "",
  title: "",
  category: "",
  difficulty: "",
  likes: 0,
  dislikes: 0,
  order: 0,
  videoId: undefined,
  link: undefined,
};

module.exports = {
  Example,
  Problem,
  DBProblem,
};
