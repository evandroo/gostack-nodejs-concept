const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;
  const repositore = { id: uuid(), likes:0, title, url, techs };

  repositories.push(repositore);
  return response.json(repositore);
});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoreIndex = repositories.findIndex(repositore => repositore.id === id);

  if (repositoreIndex < 0 ) {
    return response.status(400).json({ error: 'Repositore not foud.' });
  }

  const { likes } = repositories[repositoreIndex];

  const repositore = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositoreIndex] = repositore;
  return response.json(repositore);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoreIndex = repositories.findIndex(repositore => repositore.id === id);

  if (repositoreIndex < 0) {
    return response.status(400).json({ error: 'Repositore not foud.' });
  }

  repositories.splice(repositoreIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoreIndex = repositories.findIndex(repositore => repositore.id === id);

  if (repositoreIndex < 0) {
    return response.status(400).json({ error: 'Repositore not foud.' });
  }

  let { likes, title, url, techs } = repositories[repositoreIndex];
  likes++;

  const repositore = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositoreIndex] = repositore;
  return response.json(repositore);

});

module.exports = app;
