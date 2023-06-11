const remarkSomething = require("remark-something");
const { remarkCodeHike } = require("@code-hike/mdx");
const theme = require("shiki/themes/github-dark.json");

const mdxOptions = {
  remarkPlugins: [
    [remarkCodeHike, { theme, lineNumbers: false }],
  ],
};
