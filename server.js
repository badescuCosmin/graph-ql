const express = require("express");
const path = require("path");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { createHandler } = require("graphql-http/lib/use/express");

const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

const resolversArray = loadFilesSync("**/*", {
  extensions: [".resolvers.js"],
});

const schema = makeExecutableSchema({
  typeDefs: [typesArray],
  resolvers: resolversArray,
});

const app = express();

app.all("/graphql", createHandler({ schema }));

app.listen(3000, () => console.log("app started at port 3000"));
