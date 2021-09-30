const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use((req, res, next) => {
  if (req.method === "DELETE" && req.query["_cleanup"]) {
    const db = router.db;
    db.set("books", []).write();
    res.sendStatus(204);
  } else {
    next();
  }
});

server.use(middlewares);
server.use(router);

server.listen(port);
